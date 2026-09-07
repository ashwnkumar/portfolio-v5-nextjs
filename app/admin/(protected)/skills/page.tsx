import { Suspense } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { Button } from "@/components/ui/button";
import { AdminPage } from "@/components/admin/ui/AdminPage";
import { Panel, RowList, Row, EmptyState } from "@/components/admin/ui/Panel";
import { DeleteButton } from "@/components/admin/DeleteButton";
import { MoveButtons } from "@/components/admin/MoveButtons";
import { AddSkillForm } from "@/components/admin/AddSkillForm";
import {
  addSkill,
  deleteCategory,
  deleteSkill,
  moveCategory,
  moveSkill,
} from "./actions";

async function SkillsBoard() {
  const supabase = await createClient();
  const { data: categories } = await supabase
    .from("skill_categories")
    .select("id, name, sort_order, skills(id, name, icon_id, sort_order)")
    .order("sort_order");

  if (!categories?.length) {
    return (
      <Panel label="categories">
        <EmptyState>no categories yet</EmptyState>
      </Panel>
    );
  }

  return (
    <div className="space-y-4">
      {categories.map((category, ci) => {
        const skills = [...category.skills].sort((a, b) => a.sort_order - b.sort_order);

        return (
          <Panel
            key={category.id}
            label={`${category.name.toLowerCase()} · ${skills.length}`}
            action={
              <div className="flex items-center gap-0.5">
                <MoveButtons
                  isFirst={ci === 0}
                  isLast={ci === categories.length - 1}
                  onMove={async (direction) => {
                    "use server";
                    await moveCategory(category.id, direction);
                  }}
                />
                <Button variant="ghost" size="sm" asChild>
                  <Link href={`/admin/skills/${category.id}`}>Rename</Link>
                </Button>
                <DeleteButton
                  label="Delete category"
                  // Spells out the cascade: skills go with the category.
                  confirmText={
                    `Delete the "${category.name}" category?\n\n` +
                    `This also permanently deletes its ${skills.length} skill` +
                    `${skills.length === 1 ? "" : "s"}. This cannot be undone.`
                  }
                  action={async () => {
                    "use server";
                    await deleteCategory(category.id);
                  }}
                />
              </div>
            }
          >
            {skills.length === 0 ? (
              <EmptyState>no skills in this category</EmptyState>
            ) : (
              <RowList>
                {skills.map((skill, si) => (
                  <Row key={skill.id} className="py-1.5">
                    <MoveButtons
                      isFirst={si === 0}
                      isLast={si === skills.length - 1}
                      onMove={async (direction) => {
                        "use server";
                        await moveSkill(skill.id, direction);
                      }}
                    />
                    {skill.icon_id ? (
                      <img
                        src={`https://skillicons.dev/icons?i=${skill.icon_id}&theme=dark`}
                        alt=""
                        className="w-6 h-6 shrink-0"
                      />
                    ) : (
                      <span className="w-6 h-6 shrink-0 border border-border/70 flex items-center justify-center font-pixel-square text-[9px] text-muted-foreground">
                        {skill.name.slice(0, 2).toUpperCase()}
                      </span>
                    )}
                    <p className="flex-1 min-w-0 truncate text-sm">{skill.name}</p>
                    <p className="font-mono text-xs text-muted-foreground shrink-0">
                      {skill.icon_id ?? "—"}
                    </p>
                    <DeleteButton
                      label="Remove"
                      confirmText={`Remove "${skill.name}"?`}
                      action={async () => {
                        "use server";
                        await deleteSkill(skill.id);
                      }}
                    />
                  </Row>
                ))}
              </RowList>
            )}

            <AddSkillForm
              action={async (formData) => {
                "use server";
                await addSkill(category.id, formData);
              }}
            />
          </Panel>
        );
      })}
    </div>
  );
}

export default function SkillsAdminPage() {
  return (
    <AdminPage
      label="skills"
      title="Skills"
      description="Icon ids come from skillicons.dev — the name shown is used as a fallback when one is missing."
      action={
        <Button asChild>
          <Link href="/admin/skills/new">+ New category</Link>
        </Button>
      }
    >
      <Suspense fallback={<div className="h-96 border border-border/70 bg-muted/20 animate-pulse" />}>
        <SkillsBoard />
      </Suspense>
    </AdminPage>
  );
}
