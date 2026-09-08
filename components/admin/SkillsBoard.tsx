"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { PlusIcon, CheckIcon, XIcon } from "@phosphor-icons/react/dist/ssr";
import { SectionLabel } from "./ui/AdminPage";
import { ConfirmDialog } from "./ConfirmDialog";
import { IconPicker, type IconChoice } from "./IconPicker";
import { SkillTile, type SkillRow } from "./SkillTile";
import {
  addSkill,
  createCategory,
  deleteCategory,
  renameCategory,
} from "@/app/admin/(protected)/skills/actions";

export type CategoryRow = { id: string; name: string; skills: SkillRow[] };

function AddSkill({ categoryId, onDone }: { categoryId: string; onDone: () => void }) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [icon, setIcon] = useState<IconChoice | null>(null);
  const [invert, setInvert] = useState(false);
  const [pending, setPending] = useState(false);

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="flex flex-col items-center justify-center gap-1.5 w-20 h-[76px] border border-dashed border-border/70 text-muted-foreground hover:text-foreground hover:border-foreground/40 transition-colors"
      >
        <PlusIcon className="w-4 h-4" />
        <span className="text-[10px]">add</span>
      </button>
    );
  }

  return (
    <div className="w-full border border-foreground/30 p-3 space-y-3">
      <div className="space-y-1.5">
        <Label className="text-xs">Find an icon</Label>
        {/* Selecting fills the name too, so one action covers both fields. */}
        <IconPicker
          autoFocus
          value={icon}
          onSelect={(choice, suggested) => {
            setIcon(choice);
            if (!name.trim()) setName(suggested);
          }}
        />
      </div>

      <div className="space-y-1.5">
        <Label className="text-xs">Name</Label>
        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Shown under the icon"
        />
      </div>

      <div className="flex items-start gap-2.5 border border-border/70 p-2.5">
        <Switch id={`inv-new-${categoryId}`} checked={invert} onCheckedChange={setInvert} />
        <Label htmlFor={`inv-new-${categoryId}`} className="text-xs">
          Invert in dark mode
        </Label>
      </div>

      <div className="flex items-center gap-1.5">
        <Button
          type="button"
          size="sm"
          disabled={pending || !name.trim()}
          onClick={async () => {
            setPending(true);
            const r = await addSkill(categoryId, {
              name,
              iconId: icon?.iconId ?? null,
              iconVariant: icon?.iconVariant ?? null,
              invertDark: invert,
            });
            setPending(false);
            if (r.error) return toast.error(r.error);
            toast.success("Skill added");
            setName("");
            setIcon(null);
            setInvert(false);
            setOpen(false);
            onDone();
          }}
        >
          {pending ? "Adding…" : "Add skill"}
        </Button>
        <Button type="button" size="sm" variant="ghost" onClick={() => setOpen(false)}>
          Cancel
        </Button>
      </div>
    </div>
  );
}

function CategoryHeader({
  category,
  onChanged,
}: {
  category: CategoryRow;
  onChanged: () => void;
}) {
  const [renaming, setRenaming] = useState(false);
  const [name, setName] = useState(category.name);

  return (
    <div className="flex items-center justify-between gap-3 border-b border-border/70 pl-4 pr-2 py-1.5 min-h-10">
      {renaming ? (
        <div className="flex items-center gap-1.5 flex-1">
          <Input
            value={name}
            autoFocus
            onChange={(e) => setName(e.target.value)}
            className="h-7 max-w-xs"
          />
          <Button
            type="button"
            size="icon"
            variant="ghost"
            className="h-7 w-7"
            aria-label="Save name"
            onClick={async () => {
              const r = await renameCategory(category.id, name);
              if (r.error) toast.error(r.error);
              else {
                toast.success("Category renamed");
                setRenaming(false);
                onChanged();
              }
            }}
          >
            <CheckIcon className="w-3.5 h-3.5" />
          </Button>
          <Button
            type="button"
            size="icon"
            variant="ghost"
            className="h-7 w-7"
            aria-label="Cancel"
            onClick={() => {
              setName(category.name);
              setRenaming(false);
            }}
          >
            <XIcon className="w-3.5 h-3.5" />
          </Button>
        </div>
      ) : (
        <SectionLabel>
          {category.name.toLowerCase()} · {category.skills.length}
        </SectionLabel>
      )}

      {!renaming && (
        <div className="flex items-center gap-0.5">
          <Button type="button" variant="ghost" size="sm" onClick={() => setRenaming(true)}>
            Rename
          </Button>
          <ConfirmDialog
            title="Delete this category?"
            description={
              <>
                <p>
                  Deleting <strong className="text-foreground">{category.name}</strong> also
                  permanently deletes its {category.skills.length} skill
                  {category.skills.length === 1 ? "" : "s"}.
                </p>
                <p>This cannot be undone.</p>
              </>
            }
            onConfirm={async () => {
              const r = await deleteCategory(category.id);
              if (r.error) toast.error(r.error);
              else {
                toast.success("Category deleted");
                onChanged();
              }
            }}
            trigger={
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="text-destructive hover:text-destructive"
              >
                Delete
              </Button>
            }
          />
        </div>
      )}
    </div>
  );
}

export function SkillsBoard({ categories }: { categories: CategoryRow[] }) {
  const router = useRouter();
  const [addingCategory, setAddingCategory] = useState(false);
  const [newCategory, setNewCategory] = useState("");
  const refresh = () => router.refresh();

  // Two skills sharing an icon renders the same logo twice in the public grid,
  // which is invisible from a list but obvious in a grid.
  const iconCounts = new Map<string, number>();
  for (const c of categories) {
    for (const s of c.skills) {
      if (s.icon_id) iconCounts.set(s.icon_id, (iconCounts.get(s.icon_id) ?? 0) + 1);
    }
  }

  return (
    <div className="space-y-4">
      {categories.map((category) => (
        <section key={category.id} className="w-full border border-border/70">
          <CategoryHeader category={category} onChanged={refresh} />
          <div className="p-3 flex flex-wrap gap-1.5 items-start">
            {category.skills.map((skill) => (
              <SkillTile
                key={skill.id}
                skill={skill}
                duplicate={!!skill.icon_id && (iconCounts.get(skill.icon_id) ?? 0) > 1}
                onChanged={refresh}
              />
            ))}
            <AddSkill categoryId={category.id} onDone={refresh} />
          </div>
        </section>
      ))}

      {addingCategory ? (
        <div className="border border-foreground/30 p-3 space-y-3 max-w-sm">
          <div className="space-y-1.5">
            <Label className="text-xs">Category name</Label>
            <Input
              value={newCategory}
              autoFocus
              placeholder="e.g. DevOps"
              onChange={(e) => setNewCategory(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-1.5">
            <Button
              type="button"
              size="sm"
              disabled={!newCategory.trim()}
              onClick={async () => {
                const r = await createCategory(newCategory);
                if (r.error) return toast.error(r.error);
                toast.success("Category created");
                setNewCategory("");
                setAddingCategory(false);
                refresh();
              }}
            >
              Create
            </Button>
            <Button type="button" size="sm" variant="ghost" onClick={() => setAddingCategory(false)}>
              Cancel
            </Button>
          </div>
        </div>
      ) : (
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="gap-1.5"
          onClick={() => setAddingCategory(true)}
        >
          <PlusIcon className="w-3.5 h-3.5" />
          New category
        </Button>
      )}
    </div>
  );
}
