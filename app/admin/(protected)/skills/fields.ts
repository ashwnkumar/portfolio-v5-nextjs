import type { FieldDef } from "@/components/admin/SimpleForm";

export const CATEGORY_FIELDS: FieldDef[] = [
  {
    kind: "text",
    name: "name",
    label: "Category name",
    required: true,
    hint: "Shown above the icon grid on the home and about pages.",
  },
];
