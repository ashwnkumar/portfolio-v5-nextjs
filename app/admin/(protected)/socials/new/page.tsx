import { AdminPage } from "@/components/admin/ui/AdminPage";
import { SimpleForm } from "@/components/admin/SimpleForm";
import { createSocial } from "../actions";
import { SOCIAL_FIELDS } from "../fields";

export default function NewSocialPage() {
  return (
    <AdminPage label="socials / new" title="New link">
      <SimpleForm
        action={createSocial}
        fields={SOCIAL_FIELDS}
        row={{ is_visible: true }}
        cancelHref="/admin/socials"
        panelLabel="link"
      />
    </AdminPage>
  );
}
