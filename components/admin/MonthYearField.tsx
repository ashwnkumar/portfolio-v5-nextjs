"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { MONTHS_LONG } from "@/lib/dates";

const THIS_YEAR = new Date().getFullYear();
// A generous but finite window; free text is what produced "Nov" beside "July".
const YEARS = Array.from({ length: 40 }, (_, i) => THIS_YEAR + 2 - i);

export function MonthYearField({
  label,
  monthName,
  yearName,
  month,
  year,
  disabled,
}: {
  label: string;
  monthName: string;
  yearName: string;
  month?: number | null;
  year?: number | null;
  disabled?: boolean;
}) {
  return (
    <div className="space-y-1.5">
      <Label className="text-xs">{label}</Label>
      <div className="flex gap-2">
        <Select name={monthName} defaultValue={month ? String(month) : undefined} disabled={disabled}>
          <SelectTrigger className="flex-1">
            <SelectValue placeholder="Month" />
          </SelectTrigger>
          <SelectContent>
            {MONTHS_LONG.map((m, i) => (
              <SelectItem key={m} value={String(i + 1)}>
                {m}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select name={yearName} defaultValue={year ? String(year) : undefined} disabled={disabled}>
          <SelectTrigger className="w-28">
            <SelectValue placeholder="Year" />
          </SelectTrigger>
          <SelectContent>
            {YEARS.map((y) => (
              <SelectItem key={y} value={String(y)}>
                {y}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
