import type { FieldDef } from "@/components/admin/SimpleForm";

export const SOCIAL_FIELDS: FieldDef[] = [
  {
    kind: "text",
    name: "platform",
    label: "Platform slug",
    required: true,
    hint:
      "Lookup key used by the site — github, linkedin, email, instagram, " +
      "instagram-photography, artstation, twitter. Renaming one breaks that link.",
  },
  { kind: "text", name: "label", label: "Label", hint: "Display text, e.g. ashwnkumar" },
  { kind: "text", name: "url", label: "URL", required: true, hint: "Include mailto: for email" },
  { kind: "text", name: "username", label: "Username", hint: "Optional" },
  { kind: "check", name: "is_visible", label: "Visible on the site" },
];
