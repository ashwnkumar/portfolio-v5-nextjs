/**
 * devicon URLs need both the icon name and a variant: one devicon name contains
 * a hyphen and 19 icons have no "original", so the variant cannot be recovered
 * by splitting a combined string. Hence two stored columns.
 */
export function deviconUrl(
  iconId: string | null | undefined,
  variant: string | null | undefined = "original",
): string | null {
  if (!iconId) return null;
  const v = variant || "original";
  return `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${iconId}/${iconId}-${v}.svg`;
}
