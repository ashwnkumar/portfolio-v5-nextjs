import { SimpleForm } from "@/components/admin/SimpleForm";
import { createEducation } from "../actions";
import { EDUCATION_FIELDS } from "../fields";

export default function NewEducationPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-medium">New entry</h1>
      <SimpleForm
        action={createEducation}
        fields={EDUCATION_FIELDS}
        cancelHref="/admin/education"
      />
    </div>
  );
}
