import type { FieldDef } from "@/components/admin/SimpleForm";

export const EDUCATION_FIELDS: FieldDef[] = [
  { kind: "text", name: "degree", label: "Degree", required: true },
  { kind: "text", name: "institution", label: "Institution", required: true },
  { kind: "text", name: "score", label: "Score", hint: "e.g. 7.65 CGPA or 85%" },
  { kind: "text", name: "year", label: "Year" },
];
