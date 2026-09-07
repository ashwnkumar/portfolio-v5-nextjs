import { SimpleForm } from "@/components/admin/SimpleForm";
import { createSocial } from "../actions";
import { SOCIAL_FIELDS } from "../fields";

export default function NewSocialPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-medium">New link</h1>
      <SimpleForm
        action={createSocial}
        fields={SOCIAL_FIELDS}
        row={{ is_visible: true }}
        cancelHref="/admin/socials"
      />
    </div>
  );
}
