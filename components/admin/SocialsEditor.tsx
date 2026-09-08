"use client";

import { useActionState, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  ArrowSquareOutIcon,
  LockSimpleIcon,
  PlusIcon,
} from "@phosphor-icons/react/dist/ssr";
import { cn } from "@/lib/utils";
import { ConfirmDialog } from "./ConfirmDialog";
import { SocialIcon } from "./SocialIcon";
import { reachFor, isWired } from "@/lib/admin/social-reach";
import {
  saveSocials,
  deleteSocial,
  type SocialDraft,
} from "@/app/admin/(protected)/socials/actions";
import type { ActionState } from "@/lib/admin/forms";

const INITIAL: ActionState = { error: null };
type Draft = SocialDraft & { key: string };

const toDraft = (r: Partial<SocialDraft> = {}): Draft => ({
  key: Math.random().toString(36).slice(2),
  id: r.id ?? null,
  platform: r.platform ?? "",
  display_name: r.display_name ?? "",
  label: r.label ?? "",
  url: r.url ?? "",
  is_visible: r.is_visible ?? true,
});

/** Strip the scheme so the row scans as a destination, not a URL. */
const pretty = (url: string) =>
  url.replace(/^https?:\/\//, "").replace(/^mailto:/, "").replace(/\/$/, "");

function SocialRow({
  draft,
  expanded,
  onToggleExpand,
  onChange,
  onRemove,
  onDelete,
}: {
  draft: Draft;
  expanded: boolean;
  onToggleExpand: () => void;
  onChange: (patch: Partial<Draft>) => void;
  onRemove: () => void;
  onDelete: () => Promise<void>;
}) {
  const wired = isWired(draft.platform);
  const reach = reachFor(draft.platform);
  const urlValid = /^(https?:\/\/|mailto:)/.test(draft.url);

  return (
    <div className="bg-background">
      {/* ---------------------------------------------------------- collapsed */}
      <div
        className={cn(
          "flex items-center gap-3 px-3 py-2.5 border-b border-border/70",
          !draft.is_visible && "opacity-50",
          expanded && "bg-muted/30",
        )}
      >
        <SocialIcon platform={draft.platform} className="w-4 h-4 shrink-0 text-muted-foreground" />

        <span className="font-medium text-sm w-28 shrink-0 truncate">
          {draft.display_name || <span className="text-muted-foreground">Unnamed</span>}
        </span>

        <span className="font-mono text-xs text-muted-foreground flex-1 min-w-0 truncate">
          {pretty(draft.url) || "no url"}
        </span>

        <span className="hidden lg:block font-mono text-[11px] text-muted-foreground/80 w-56 shrink-0 truncate text-right">
          {reach.length > 2 ? `${reach.slice(0, 2).join(" · ")} +${reach.length - 2}` : reach.join(" · ")}
        </span>

        <Switch
          checked={draft.is_visible}
          onCheckedChange={(v) => onChange({ is_visible: v })}
          aria-label={draft.is_visible ? "Hide this link" : "Show this link"}
          className="shrink-0"
        />

        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={onToggleExpand}
          className="shrink-0"
        >
          {expanded ? "Done" : "Edit"}
        </Button>
      </div>

      {/* ----------------------------------------------------------- expanded */}
      {expanded && (
        <div className="px-3 pb-4 pt-3 space-y-3 border-b border-border/70 bg-muted/10">
          <div className="grid md:grid-cols-[10rem_1fr_1fr] gap-3">
            <div className="space-y-1.5">
              <Label className="text-xs">Slug</Label>
              {wired ? (
                <div
                  className="flex items-center gap-1.5 h-9 px-2.5 border border-border/70 bg-muted/40 font-mono text-xs text-muted-foreground"
                  title="Referenced by name in the site code — renaming it here would break those links."
                >
                  <LockSimpleIcon className="w-3 h-3 shrink-0" />
                  <span className="truncate">{draft.platform}</span>
                </div>
              ) : (
                <Input
                  value={draft.platform}
                  onChange={(e) => onChange({ platform: e.target.value })}
                  placeholder="platform-slug"
                  className="font-mono text-xs"
                />
              )}
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs" htmlFor={`name-${draft.key}`}>Display name</Label>
              <Input
                id={`name-${draft.key}`}
                value={draft.display_name}
                onChange={(e) => onChange({ display_name: e.target.value })}
                placeholder="GitHub"
              />
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs" htmlFor={`label-${draft.key}`}>Handle</Label>
              <Input
                id={`label-${draft.key}`}
                value={draft.label}
                onChange={(e) => onChange({ label: e.target.value })}
                placeholder={draft.platform === "email" ? "you@example.com" : "ashwnkumar"}
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <Label className="text-xs" htmlFor={`url-${draft.key}`}>URL</Label>
            <div className="flex gap-2">
              <Input
                id={`url-${draft.key}`}
                value={draft.url}
                onChange={(e) => onChange({ url: e.target.value })}
                placeholder="https://… or mailto:…"
                className={cn("font-mono text-xs", draft.url && !urlValid && "border-destructive")}
              />
              <Button
                type="button"
                variant="secondary"
                size="icon"
                disabled={!urlValid}
                aria-label="Open in a new tab"
                onClick={() => window.open(draft.url, "_blank", "noopener,noreferrer")}
              >
                <ArrowSquareOutIcon className="w-4 h-4" />
              </Button>
            </div>
            {draft.url && !urlValid && (
              <p className="text-xs text-destructive">Must start with https:// or mailto:</p>
            )}
          </div>

          <div className="flex items-start justify-between gap-4 pt-1">
            <p className="font-mono text-[11px] text-muted-foreground">
              appears on: {reach.join(" · ")}
            </p>

            {draft.id ? (
              <ConfirmDialog
                title="Delete this link?"
                description={
                  <>
                    <p>
                      <strong className="text-foreground">{draft.display_name || draft.platform}</strong>{" "}
                      will be removed from: {reach.join(", ")}.
                    </p>
                    <p>This cannot be undone.</p>
                  </>
                }
                onConfirm={onDelete}
                trigger={
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="text-destructive hover:text-destructive shrink-0"
                  >
                    Delete link
                  </Button>
                }
              />
            ) : (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="text-destructive hover:text-destructive shrink-0"
                onClick={onRemove}
              >
                Remove
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export function SocialsEditor({ rows }: { rows: SocialDraft[] }) {
  const router = useRouter();
  const [drafts, setDrafts] = useState<Draft[]>(rows.map((r) => toDraft(r)));
  const [expanded, setExpanded] = useState<string | null>(null);
  const [state, formAction, pending] = useActionState(saveSocials, INITIAL);

  const baseline = useMemo(() => JSON.stringify(rows), [rows]);
  const payload = JSON.stringify(drafts.map(({ key, ...rest }) => rest)); // eslint-disable-line @typescript-eslint/no-unused-vars
  const dirty = baseline !== payload;

  useEffect(() => {
    if (!state.ok) return;
    toast.success("Social links saved");
    setExpanded(null);
    router.refresh();
  }, [state, router]);

  return (
    <form action={formAction} className="space-y-4">
      <input type="hidden" name="payload" value={payload} />

      <div className="flex items-center justify-between">
        <p className="font-pixel-square text-xs text-muted-foreground">
          // {drafts.length} link{drafts.length === 1 ? "" : "s"}
        </p>
      </div>

      <div className="border border-border/70 border-b-0">
        {drafts.map((draft) => (
            <SocialRow
              key={draft.key}
              draft={draft}
              expanded={expanded === draft.key}
              onToggleExpand={() => setExpanded(expanded === draft.key ? null : draft.key)}
              onChange={(patch) =>
                setDrafts((prev) => prev.map((d) => (d.key === draft.key ? { ...d, ...patch } : d)))
              }
              onRemove={() => setDrafts((prev) => prev.filter((d) => d.key !== draft.key))}
              onDelete={async () => {
                const result = await deleteSocial(draft.id!);
                if (result.error) toast.error(result.error);
                else {
                  toast.success("Link deleted");
                  setDrafts((prev) => prev.filter((d) => d.key !== draft.key));
                  router.refresh();
                }
              }}
            />
        ))}

        {drafts.length === 0 && (
          <p className="px-4 py-10 text-center font-pixel-square text-sm text-muted-foreground border-b border-border/70">
            no links
          </p>
        )}
      </div>

      {state.error && (
        <p className="border border-destructive/50 px-3 py-2 text-sm text-destructive">
          {state.error}
        </p>
      )}

      <div className="flex items-center justify-between">
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="gap-1.5"
          onClick={() => {
            const draft = toDraft();
            setDrafts((prev) => [...prev, draft]);
            setExpanded(draft.key);
          }}
        >
          <PlusIcon className="w-3.5 h-3.5" />
          Add link
        </Button>

        <div className="flex items-center gap-3">
          {dirty && <span className="font-mono text-xs text-muted-foreground">unsaved changes</span>}
          <Button type="submit" disabled={!dirty || pending}>
            {pending ? "Saving…" : "Save"}
          </Button>
        </div>
      </div>
    </form>
  );
}
