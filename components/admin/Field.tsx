import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

/**
 * Form controls stay in Geist for legibility; the pixel faces are carried by
 * headings and `//` labels. shadcn primitives are already rounded-none, which
 * matches the site.
 */
function Hint({ children }: { children?: string }) {
  if (!children) return null;
  return (
    <p className="text-xs text-muted-foreground leading-relaxed">{children}</p>
  );
}

export function Field({
  name,
  label,
  hint,
  defaultValue,
  required,
  type = "text",
}: {
  name: string;
  label: string;
  hint?: string;
  defaultValue?: string | null;
  required?: boolean;
  type?: string;
}) {
  return (
    <div className="space-y-1.5">
      <Label htmlFor={name} className="text-xs">
        {label}
        {required && <span className="text-muted-foreground"> *</span>}
      </Label>
      <Input
        id={name}
        name={name}
        type={type}
        required={required}
        defaultValue={defaultValue ?? ""}
      />
      <Hint>{hint}</Hint>
    </div>
  );
}

export function TextField({
  name,
  label,
  hint,
  defaultValue,
  rows = 4,
}: {
  name: string;
  label: string;
  hint?: string;
  defaultValue?: string | null;
  rows?: number;
}) {
  return (
    <div className="space-y-1.5">
      <Label htmlFor={name} className="text-xs">
        {label}
      </Label>
      <Textarea
        id={name}
        name={name}
        rows={rows}
        defaultValue={defaultValue ?? ""}
        className="font-mono text-xs leading-relaxed"
      />
      <Hint>{hint}</Hint>
    </div>
  );
}

export function CheckField({
  name,
  label,
  hint,
  defaultChecked,
}: {
  name: string;
  label: string;
  hint?: string;
  defaultChecked?: boolean;
}) {
  return (
    <div className="flex items-start gap-2.5 border border-border p-3">
      <input
        id={name}
        name={name}
        type="checkbox"
        defaultChecked={defaultChecked}
        className="mt-0.5 accent-foreground"
      />
      <div className="space-y-0.5">
        <Label htmlFor={name} className="text-xs">
          {label}
        </Label>
        <Hint>{hint}</Hint>
      </div>
    </div>
  );
}
