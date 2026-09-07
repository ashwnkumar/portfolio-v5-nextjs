-- =============================================================================
-- 05 · Structured experience dates
-- =============================================================================
-- start_date / end_date were free text ('Nov 2024', 'July 2025'), which already
-- produced inconsistent formatting on the live about page and forced sort_order
-- to be maintained by hand.
--
-- Storing month + year as integers lets the UI enforce consistency by
-- construction, and makes chronological order derivable rather than manual.
--
-- Idempotent and non-destructive: the original text columns are kept as
-- start_date_text / end_date_text so nothing is lost if the parse is wrong.
-- =============================================================================

alter table public.experience
  add column if not exists start_month smallint check (start_month between 1 and 12),
  add column if not exists start_year  smallint check (start_year between 1900 and 2200),
  add column if not exists end_month   smallint check (end_month between 1 and 12),
  add column if not exists end_year    smallint check (end_year between 1900 and 2200);

-- -----------------------------------------------------------------------------
-- Backfill from the existing text, accepting both 'Nov 2024' and 'July 2025'
-- -----------------------------------------------------------------------------
do $$
declare
  r record;
  months text[] := array[
    'jan','feb','mar','apr','may','jun','jul','aug','sep','oct','nov','dec'
  ];
  idx int;
begin
  -- Skip entirely once the rename below has happened, so a re-run is a no-op
  -- rather than an error on the now-missing start_date column.
  if not exists (
    select 1 from information_schema.columns
    where table_schema = 'public'
      and table_name = 'experience'
      and column_name = 'start_date'
  ) then
    return;
  end if;

  for r in select id, start_date, end_date from public.experience loop
    -- start
    idx := array_position(months, lower(substr(trim(r.start_date), 1, 3)));
    if idx is not null then
      update public.experience
        set start_month = idx,
            start_year  = nullif(regexp_replace(r.start_date, '\D', '', 'g'), '')::smallint
        where id = r.id;
    end if;

    -- end (null means "current")
    if r.end_date is not null then
      idx := array_position(months, lower(substr(trim(r.end_date), 1, 3)));
      if idx is not null then
        update public.experience
          set end_month = idx,
              end_year  = nullif(regexp_replace(r.end_date, '\D', '', 'g'), '')::smallint
          where id = r.id;
      end if;
    end if;
  end loop;
end;
$$;

-- -----------------------------------------------------------------------------
-- Keep the originals rather than dropping them
-- -----------------------------------------------------------------------------
do $$
begin
  if exists (
    select 1 from information_schema.columns
    where table_schema = 'public' and table_name = 'experience' and column_name = 'start_date'
  ) then
    alter table public.experience rename column start_date to start_date_text;
    alter table public.experience rename column end_date   to end_date_text;
  end if;
end;
$$;

alter table public.experience alter column start_date_text drop not null;

comment on column public.experience.start_date_text is
  'Pre-migration free-text date, retained as a fallback. Display now derives '
  'from start_month / start_year.';

-- -----------------------------------------------------------------------------
-- Chronological ordering, newest first, current role always on top
-- -----------------------------------------------------------------------------
create index if not exists experience_chronological_idx
  on public.experience (is_current desc, start_year desc, start_month desc);
