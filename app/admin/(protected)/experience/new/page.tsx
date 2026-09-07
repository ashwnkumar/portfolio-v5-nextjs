import { ExperienceForm } from "@/components/admin/ExperienceForm";
import { createExperience } from "../actions";

export default function NewExperiencePage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-medium">New role</h1>
      <ExperienceForm action={createExperience} />
    </div>
  );
}
