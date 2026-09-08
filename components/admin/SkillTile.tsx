"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { XIcon, WarningIcon } from "@phosphor-icons/react/dist/ssr";
import { deviconUrl } from "@/lib/devicon";
import { cn } from "@/lib/utils";
import { IconPicker, type IconChoice } from "./IconPicker";
import { ConfirmDialog } from "./ConfirmDialog";
import { updateSkill, deleteSkill } from "@/app/admin/(protected)/skills/actions";

export type SkillRow = {
  id: string;
  name: string;
  icon_id: string | null;
  icon_variant: string | null;
  invert_dark: boolean;
};

/** A tile in the admin grid, mirroring how the public SkillsGrid renders. */
export function SkillTile({
  skill,
  duplicate,
  onChanged,
}: {
  skill: SkillRow;
  duplicate: boolean;
  onChanged: () => void;
}) {
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(skill.name);
  const [icon, setIcon] = useState<IconChoice | null>(
    skill.icon_id ? { iconId: skill.icon_id, iconVariant: skill.icon_variant ?? "original" } : null,
  );
  const [invert, setInvert] = useState(skill.invert_dark);
  const [pending, setPending] = useState(false);

  const url = deviconUrl(icon?.iconId, icon?.iconVariant);

  if (!editing) {
    return (
      <button
        type="button"
        onClick={() => setEditing(true)}
        className="group flex flex-col items-center gap-1.5 w-20 p-2 border border-transparent hover:border-border/70 transition-colors"
        title={`Edit ${skill.name}`}
      >
        <span className="relative w-11 h-11 flex items-center justify-center">
          {url ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={url}
              alt=""
              className={cn("w-full h-full object-contain", skill.invert_dark && "dark:invert")}
            />
          ) : (
            <span className="w-11 h-11 border border-border/70 flex items-center justify-center font-pixel-square text-[10px] text-muted-foreground">
              {skill.name.slice(0, 2).toUpperCase()}
            </span>
          )}
          {duplicate && (
            <WarningIcon
              className="absolute -top-1 -right-1 w-3.5 h-3.5 text-amber-500"
              aria-label="Another skill uses this icon"
            />
          )}
        </span>
        <span className="text-[10px] text-center leading-tight text-muted-foreground group-hover:text-foreground truncate w-full">
          {skill.name}
        </span>
      </button>
    );
  }

  return (
    <div className="w-full border border-foreground/30 p-3 space-y-3">
      <div className="space-y-1.5">
        <Label className="text-xs">Name</Label>
        <Input value={name} onChange={(e) => setName(e.target.value)} autoFocus />
      </div>

      <div className="space-y-1.5">
        <Label className="text-xs">Icon</Label>
        <IconPicker
          value={icon}
          onSelect={(choice) => setIcon(choice)}
        />
      </div>

      <div className="flex items-start gap-2.5 border border-border/70 p-2.5">
        <Switch id={`inv-${skill.id}`} checked={invert} onCheckedChange={setInvert} />
        <div className="space-y-0.5">
          <Label htmlFor={`inv-${skill.id}`} className="text-xs">Invert in dark mode</Label>
          <p className="text-[11px] text-muted-foreground">
            For plain black marks that vanish on the dark theme.
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <Button
            type="button"
            size="sm"
            disabled={pending}
            onClick={async () => {
              setPending(true);
              const r = await updateSkill(skill.id, {
                name,
                iconId: icon?.iconId ?? null,
                iconVariant: icon?.iconVariant ?? null,
                invertDark: invert,
              });
              setPending(false);
              if (r.error) return toast.error(r.error);
              toast.success("Skill updated");
              setEditing(false);
              onChanged();
            }}
          >
            {pending ? "Saving…" : "Save"}
          </Button>
          <Button type="button" size="sm" variant="ghost" onClick={() => setEditing(false)}>
            Cancel
          </Button>
        </div>

        <ConfirmDialog
          title="Remove this skill?"
          description={<p>“{skill.name}” will be removed from your skills grid.</p>}
          confirmLabel="Remove"
          onConfirm={async () => {
            const r = await deleteSkill(skill.id);
            if (r.error) toast.error(r.error);
            else {
              toast.success("Skill removed");
              onChanged();
            }
          }}
          trigger={
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="h-7 w-7 text-muted-foreground hover:text-destructive"
              aria-label="Remove skill"
            >
              <XIcon className="w-3.5 h-3.5" />
            </Button>
          }
        />
      </div>
    </div>
  );
}
