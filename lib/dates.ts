export const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
] as const;

export const MONTHS_LONG = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
] as const;

/**
 * Formats a stored month/year pair for display. Structured storage is what
 * makes this consistent -- the free-text era produced "Nov 2024" alongside
 * "July 2025" on the same page.
 */
export function formatMonthYear(
  month: number | null,
  year: number | null,
  fallback: string | null = null,
): string | null {
  if (!month || !year) return fallback;
  return `${MONTHS[month - 1]} ${year}`;
}
