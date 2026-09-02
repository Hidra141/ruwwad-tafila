type ClassValue = string | number | null | undefined | false | ClassValue[];

/**
 * Minimal class-name joiner. Deliberately not `clsx` + `tailwind-merge` —
 * the project does not yet have the conflict-heavy variant surface that would
 * justify the dependency.
 */
export function cn(...values: ClassValue[]): string {
  const out: string[] = [];
  for (const value of values) {
    if (!value) continue;
    if (Array.isArray(value)) {
      const nested = cn(...value);
      if (nested) out.push(nested);
    } else {
      out.push(String(value));
    }
  }
  return out.join(" ");
}
