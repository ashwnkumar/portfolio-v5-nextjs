import { AdminPage } from "@/components/admin/ui/AdminPage";
import { ExperienceForm } from "@/components/admin/ExperienceForm";
import { createExperience } from "../actions";

export default function NewExperiencePage() {
  return (
    <AdminPage label="experience / new" title="New role">
      <ExperienceForm action={createExperience} />
    </AdminPage>
  );
}
