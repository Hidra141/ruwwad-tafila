import type { Program } from "@/types";

import { ProgramCard } from "./ProgramCard";

interface ProgramGridProps {
  programs: Program[];
  label: string;
  columns?: 2 | 3;
}

/** Grid of programme cards. Renders nothing while the list is empty. */
export function ProgramGrid({ programs, label, columns }: ProgramGridProps) {
  if (programs.length === 0) return null;

  const cols = columns ?? (programs.length % 2 === 0 ? 2 : 3);
  const gridClass = cols === 2 
    ? "grid grid-cols-1 gap-6 md:grid-cols-2" 
    : "grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3";

  return (
    <ul
      aria-label={label}
      className={gridClass}
    >
      {programs.map((program) => (
        <li key={program.id}>
          <ProgramCard program={program} />
        </li>
      ))}
    </ul>
  );
}
