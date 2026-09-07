import { AdminPage } from "@/components/admin/ui/AdminPage";
import { SimpleForm } from "@/components/admin/SimpleForm";
import { createCategory } from "../actions";
import { CATEGORY_FIELDS } from "../fields";

export default function NewCategoryPage() {
  return (
    <AdminPage label="skills / new" title="New category">
      <SimpleForm
        action={createCategory}
        fields={CATEGORY_FIELDS}
        panelLabel="category"
        cancelHref="/admin/skills"
        submitLabel="Create category"
      />
    </AdminPage>
  );
}
