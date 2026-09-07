-- =============================================================================
-- 01 · Helpers, admin identity, and shared triggers
-- =============================================================================
-- Run this first. Everything downstream depends on public.is_admin().
-- =============================================================================

-- -----------------------------------------------------------------------------
-- Admin allowlist
-- -----------------------------------------------------------------------------
-- Identity is keyed on *email* rather than auth.users.id so that the very first
-- OTP login already resolves as admin. Keying on user_id would create a
-- chicken-and-egg problem: the row cannot exist until the user does, but the
-- user cannot write anything until the row exists.
create table if not exists public.admin_emails (
  email      text primary key,
  created_at timestamptz not null default now()
);

comment on table public.admin_emails is
  'Allowlist of emails permitted to write content. Never exposed to clients; '
  'read exclusively through public.is_admin(), which is SECURITY DEFINER.';

insert into public.admin_emails (email)
values ('code.by.ashwin@gmail.com')
on conflict (email) do nothing;

-- RLS on with zero policies = deny all direct access, including to the
-- publishable key. The table stays reachable only via is_admin() below.
alter table public.admin_emails enable row level security;

-- -----------------------------------------------------------------------------
-- is_admin()
-- -----------------------------------------------------------------------------
-- SECURITY DEFINER so it can read admin_emails past that table's own RLS.
-- search_path is pinned to '' and every reference fully qualified, which is the
-- standard hardening against search_path hijacking on definer functions.
create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1
    from public.admin_emails ae
    where lower(ae.email) = lower(coalesce(auth.jwt() ->> 'email', ''))
  );
$$;

comment on function public.is_admin() is
  'True when the current JWT belongs to an allowlisted admin. Used by every '
  'write policy in the schema.';

revoke execute on function public.is_admin() from public;
grant execute on function public.is_admin() to authenticated;

-- -----------------------------------------------------------------------------
-- updated_at trigger
-- -----------------------------------------------------------------------------
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at := now();
  return new;
end;
$$;
