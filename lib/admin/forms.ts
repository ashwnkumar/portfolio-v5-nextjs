/** Shared helpers for parsing admin form submissions. */

export function text(form: FormData, key: string): string {
  return String(form.get(key) ?? "").trim();
}

/** Optional field: empty string becomes null rather than "". */
export function nullableText(form: FormData, key: string): string | null {
  const value = text(form, key);
  return value === "" ? null : value;
}

export function bool(form: FormData, key: string): boolean {
  return form.get(key) === "on" || form.get(key) === "true";
}

/** Textareas hold one array item per line; blank lines are dropped. */
export function lines(form: FormData, key: string): string[] {
  return text(form, key)
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

/** Comma-separated input, for short lists like tech stacks. */
export function csv(form: FormData, key: string): string[] {
  return text(form, key)
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

export type ActionState = { error: string | null; ok?: boolean };
