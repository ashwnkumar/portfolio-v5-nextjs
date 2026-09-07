import { AdminPage } from "@/components/admin/ui/AdminPage";
import { SimpleForm } from "@/components/admin/SimpleForm";
import { createEducation } from "../actions";
import { EDUCATION_FIELDS } from "../fields";

export default function NewEducationPage() {
  return (
    <AdminPage label="education / new" title="New entry">
      <SimpleForm
        action={createEducation}
        fields={EDUCATION_FIELDS}
        panelLabel="qualification"
        cancelHref="/admin/education"
      />
    </AdminPage>
  );
}
