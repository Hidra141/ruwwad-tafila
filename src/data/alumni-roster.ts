/**
 * Roster attributes that the identity records in `alumni.ts` do not carry.
 *
 * Only gender, and for one reason: Arabic marks it on the noun, so a page has
 * to know whether to write "خريج" or "خريجة". It comes from the official
 * roster spreadsheet in `reference/source`.
 */
export type AlumniGender = "female" | "male";

const rosterGender: Record<string, AlumniGender> = {
  "ahmed-nabeel-al-marafi": "male",
  "aws-moatasem-al-sahareen": "male",
  "rowa-mohammad-al-hawamdeh": "female",
  "abdullah-bakr-al-hajjaj": "male",
  "lujain-alaa-al-badoor": "female",
  "wisam-faisal-al-masri": "male",
  "abdullah-nimr-al-sokoor": "male",
  "omran-emad-al-torman": "male",
  "qatr-al-nada-ahmed-al-qaisi": "female",
  "rajaa-tariq-al-qaisi": "female",
  "mustafa-khaled-al-odainat": "male",
  "ghana-mohammad-al-shamasat": "female",
  "joud-omar-al-haddar": "female",
  "karam-omar-al-haddar": "male",
  "omar-alaa-al-farahid": "male",
  "mawaddah-marwan-al-qaisi": "female",
  "mohammad-ali-al-owran": "male",
  "mohammad-nabeel-al-marafi": "male",
  "sara-omar-al-sawalqah": "female",
  "maryam-abdulkarim-al-furaij": "female",
  "abdulrahman-ziad-al-naanaah": "male",
  "mohammad-al-masri": "male",
};

/** Roster gender for a graduate. Falls back to the masculine form. */
export function getAlumniGender(slug: string): AlumniGender {
  return rosterGender[slug] ?? "male";
}

/**
 * Shown for a graduate with no photograph on file.
 *
 * A brand medallion, not a stand-in portrait: it reads as "no photograph yet"
 * rather than implying a likeness. Generated with the official Ruwwad wing as a
 * watermark and framed on the same 4:5 ratio as the real portraits, so it drops
 * into the archive grid without disturbing the rhythm.
 */
export const GRADUATE_AVATAR = {
  src: "/assets/alumni/graduate-avatar.webp",
  width: 1000,
  height: 1250,
} as const;

/**
 * Portraits that arrived after the identity records were written.
 *
 * Kept here rather than edited into `alumni.ts` so the roster file stays a
 * plain list; `src/lib/alumni.ts` joins these on. Both were supplied as HEIC
 * from the same studio session as the rest of the cohort.
 */
export const rosterPortraits: Record<
  string,
  { src: string; width: number; height: number; alt: string }
> = {
  "mohammad-al-masri": {
    src: "/assets/alumni/mohammad-al-masri.jpg",
    width: 900,
    height: 1600,
    alt: "صورة محمد المصري",
  },
  "abdulrahman-ziad-al-naanaah": {
    src: "/assets/alumni/abdulrahman-ziad-al-naanaah.jpg",
    width: 900,
    height: 1600,
    alt: "صورة عبدالرحمن زياد النعانعة",
  },
};
