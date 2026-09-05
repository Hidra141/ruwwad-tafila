/**
 * One photograph per learning phase, per graduate.
 *
 * Every path here must live under `/assets/alumni/journey/<slug>/`. Two
 * entries did not: Maryam Al-Furaij and Sara Al-Sawalqah had no folder of
 * their own, so they had been filled in from the programme's generic
 * `/assets/drosos/phases/` pool — five photographs of the Drosos sessions,
 * showing other youths, captioned "<her name> in <phase>". Three of the ten
 * were the same file on both pages.
 *
 * Their entries are gone. A graduate with no photographs of their own shows
 * none: `getStagePhotoClient` returns `undefined` for an absent slug, and the
 * stage renders as text. Attributing someone else's photograph to a named
 * person is worse than showing nothing.
 *
 * The rule, checked against the repository: a path belongs to the graduate
 * whose slug is in it, the file exists, and no image appears twice — within a
 * page or across two of them.
 */
export const alumniJourneyPhotosMap: Record<string, Record<string, string>> = {
  "abdullah-bakr-al-hajjaj": {
    "foundation": "/assets/alumni/journey/abdullah-bakr-al-hajjaj/foundation.jpeg",
    "digital-fluency": "/assets/alumni/journey/abdullah-bakr-al-hajjaj/digital-fluency.jpeg",
    "studio-green-circuit": "/assets/alumni/journey/abdullah-bakr-al-hajjaj/studio-green-circuit.jpeg",
    "studio-innovate-earth": "/assets/alumni/journey/abdullah-bakr-al-hajjaj/studio-innovate-earth.jpeg",
    "fellowship": "/assets/alumni/journey/abdullah-bakr-al-hajjaj/fellowship.jpg"
  },
  "abdullah-nimr-al-sokoor": {
    "foundation": "/assets/alumni/journey/abdullah-nimr-al-sokoor/foundation.jpeg",
    "digital-fluency": "/assets/alumni/journey/abdullah-nimr-al-sokoor/digital-fluency.jpeg",
    "studio-green-circuit": "/assets/alumni/journey/abdullah-nimr-al-sokoor/studio-green-circuit.jpg",
    "studio-innovate-earth": "/assets/alumni/journey/abdullah-nimr-al-sokoor/studio-innovate-earth.jpg",
    "fellowship": "/assets/alumni/journey/abdullah-nimr-al-sokoor/fellowship.jpeg"
  },
  "abdulrahman-ziad-al-naanaah": {
    "foundation": "/assets/alumni/journey/abdulrahman-ziad-al-naanaah/foundation.jpeg",
    "digital-fluency": "/assets/alumni/journey/abdulrahman-ziad-al-naanaah/digital-fluency.jpg",
    "studio-green-circuit": "/assets/alumni/journey/abdulrahman-ziad-al-naanaah/studio-green-circuit.jpg",
    "studio-innovate-earth": "/assets/alumni/journey/abdulrahman-ziad-al-naanaah/studio-innovate-earth.jpg",
    "fellowship": "/assets/alumni/journey/abdulrahman-ziad-al-naanaah/fellowship.jpg"
  },
  "ahmed-nabeel-al-marafi": {
    "foundation": "/assets/alumni/journey/ahmed-nabeel-al-marafi/foundation.jpeg",
    "digital-fluency": "/assets/alumni/journey/ahmed-nabeel-al-marafi/digital-fluency.jpg",
    "studio-green-circuit": "/assets/alumni/journey/ahmed-nabeel-al-marafi/studio-green-circuit.jpg",
    "studio-innovate-earth": "/assets/alumni/journey/ahmed-nabeel-al-marafi/studio-innovate-earth.jpg",
    "fellowship": "/assets/alumni/journey/ahmed-nabeel-al-marafi/fellowship.jpeg"
  },
  "aws-moatasem-al-sahareen": {
    "foundation": "/assets/alumni/journey/aws-moatasem-al-sahareen/foundation.jpeg",
    "digital-fluency": "/assets/alumni/journey/aws-moatasem-al-sahareen/digital-fluency.jpeg",
    "studio-green-circuit": "/assets/alumni/journey/aws-moatasem-al-sahareen/studio-green-circuit.jpg",
    "studio-innovate-earth": "/assets/alumni/journey/aws-moatasem-al-sahareen/studio-innovate-earth.jpg",
    "fellowship": "/assets/alumni/journey/aws-moatasem-al-sahareen/fellowship.jpg"
  },
  "ghana-mohammad-al-shamasat": {
    "foundation": "/assets/alumni/journey/ghana-mohammad-al-shamasat/foundation.jpeg",
    "digital-fluency": "/assets/alumni/journey/ghana-mohammad-al-shamasat/digital-fluency.jpeg",
    "studio-green-circuit": "/assets/alumni/journey/ghana-mohammad-al-shamasat/studio-green-circuit.jpeg",
    "studio-innovate-earth": "/assets/alumni/journey/ghana-mohammad-al-shamasat/studio-innovate-earth.jpg",
    "fellowship": "/assets/alumni/journey/ghana-mohammad-al-shamasat/fellowship.jpg"
  },
  "joud-omar-al-haddar": {
    "foundation": "/assets/alumni/journey/joud-omar-al-haddar/foundation.jpeg",
    "digital-fluency": "/assets/alumni/journey/joud-omar-al-haddar/digital-fluency.jpeg",
    "studio-green-circuit": "/assets/alumni/journey/joud-omar-al-haddar/studio-green-circuit.jpg",
    "studio-innovate-earth": "/assets/alumni/journey/joud-omar-al-haddar/studio-innovate-earth.jpg",
    "fellowship": "/assets/alumni/journey/joud-omar-al-haddar/fellowship.jpeg"
  },
  "karam-omar-al-haddar": {
    "foundation": "/assets/alumni/journey/karam-omar-al-haddar/foundation.jpeg",
    "digital-fluency": "/assets/alumni/journey/karam-omar-al-haddar/digital-fluency.jpeg",
    "studio-green-circuit": "/assets/alumni/journey/karam-omar-al-haddar/studio-green-circuit.jpg",
    "studio-innovate-earth": "/assets/alumni/journey/karam-omar-al-haddar/studio-innovate-earth.jpg",
    "fellowship": "/assets/alumni/journey/karam-omar-al-haddar/fellowship.jpg"
  },
  "lujain-alaa-al-badoor": {
    "foundation": "/assets/alumni/journey/lujain-alaa-al-badoor/foundation.jpeg",
    "digital-fluency": "/assets/alumni/journey/lujain-alaa-al-badoor/digital-fluency.jpeg",
    "studio-green-circuit": "/assets/alumni/journey/lujain-alaa-al-badoor/studio-green-circuit.jpg",
    "studio-innovate-earth": "/assets/alumni/journey/lujain-alaa-al-badoor/studio-innovate-earth.jpg",
    "fellowship": "/assets/alumni/journey/lujain-alaa-al-badoor/fellowship.jpeg"
  },
  "mawaddah-marwan-al-qaisi": {
    "foundation": "/assets/alumni/journey/mawaddah-marwan-al-qaisi/foundation.jpeg",
    "digital-fluency": "/assets/alumni/journey/mawaddah-marwan-al-qaisi/digital-fluency.jpeg",
    "studio-green-circuit": "/assets/alumni/journey/mawaddah-marwan-al-qaisi/studio-green-circuit.jpg",
    "studio-innovate-earth": "/assets/alumni/journey/mawaddah-marwan-al-qaisi/studio-innovate-earth.jpg",
    "fellowship": "/assets/alumni/journey/mawaddah-marwan-al-qaisi/fellowship.jpg"
  },
  "mohammad-al-masri": {
    "foundation": "/assets/alumni/journey/mohammad-al-masri/foundation.jpg",
    "digital-fluency": "/assets/alumni/journey/mohammad-al-masri/digital-fluency.jpg",
    "studio-green-circuit": "/assets/alumni/journey/mohammad-al-masri/studio-green-circuit.jpg",
    "studio-innovate-earth": "/assets/alumni/journey/mohammad-al-masri/studio-innovate-earth.jpg",
    "fellowship": "/assets/alumni/journey/mohammad-al-masri/fellowship.jpg"
  },
  "mohammad-ali-al-owran": {
    "foundation": "/assets/alumni/journey/mohammad-ali-al-owran/foundation.jpeg",
    "digital-fluency": "/assets/alumni/journey/mohammad-ali-al-owran/digital-fluency.jpeg",
    "studio-green-circuit": "/assets/alumni/journey/mohammad-ali-al-owran/studio-green-circuit.jpg",
    "studio-innovate-earth": "/assets/alumni/journey/mohammad-ali-al-owran/studio-innovate-earth.jpg",
    "fellowship": "/assets/alumni/journey/mohammad-ali-al-owran/fellowship.jpeg"
  },
  "mohammad-nabeel-al-marafi": {
    "foundation": "/assets/alumni/journey/mohammad-nabeel-al-marafi/foundation.jpeg",
    "digital-fluency": "/assets/alumni/journey/mohammad-nabeel-al-marafi/digital-fluency.jpeg",
    "studio-green-circuit": "/assets/alumni/journey/mohammad-nabeel-al-marafi/studio-green-circuit.jpeg",
    "studio-innovate-earth": "/assets/alumni/journey/mohammad-nabeel-al-marafi/studio-innovate-earth.jpg",
    "fellowship": "/assets/alumni/journey/mohammad-nabeel-al-marafi/fellowship.jpg"
  },
  "mustafa-khaled-al-odainat": {
    "foundation": "/assets/alumni/journey/mustafa-khaled-al-odainat/foundation.jpeg",
    "digital-fluency": "/assets/alumni/journey/mustafa-khaled-al-odainat/digital-fluency.jpeg",
    "studio-green-circuit": "/assets/alumni/journey/mustafa-khaled-al-odainat/studio-green-circuit.jpg",
    "studio-innovate-earth": "/assets/alumni/journey/mustafa-khaled-al-odainat/studio-innovate-earth.jpg",
    "fellowship": "/assets/alumni/journey/mustafa-khaled-al-odainat/fellowship.jpeg"
  },
  "omar-alaa-al-farahid": {
    "foundation": "/assets/alumni/journey/omar-alaa-al-farahid/foundation.jpeg",
    "digital-fluency": "/assets/alumni/journey/omar-alaa-al-farahid/digital-fluency.jpeg",
    "studio-green-circuit": "/assets/alumni/journey/omar-alaa-al-farahid/studio-green-circuit.jpg",
    "studio-innovate-earth": "/assets/alumni/journey/omar-alaa-al-farahid/studio-innovate-earth.jpg",
    "fellowship": "/assets/alumni/journey/omar-alaa-al-farahid/fellowship.jpeg"
  },
  "omran-emad-al-torman": {
    "foundation": "/assets/alumni/journey/omran-emad-al-torman/foundation.jpeg",
    "digital-fluency": "/assets/alumni/journey/omran-emad-al-torman/digital-fluency.jpeg",
    "studio-green-circuit": "/assets/alumni/journey/omran-emad-al-torman/studio-green-circuit.jpg",
    "studio-innovate-earth": "/assets/alumni/journey/omran-emad-al-torman/studio-innovate-earth.jpg",
    "fellowship": "/assets/alumni/journey/omran-emad-al-torman/fellowship.jpeg"
  },
  "qatr-al-nada-ahmed-al-qaisi": {
    "foundation": "/assets/alumni/journey/qatr-al-nada-ahmed-al-qaisi/foundation.jpeg",
    "digital-fluency": "/assets/alumni/journey/qatr-al-nada-ahmed-al-qaisi/digital-fluency.jpg",
    "studio-green-circuit": "/assets/alumni/journey/qatr-al-nada-ahmed-al-qaisi/studio-green-circuit.jpg",
    "studio-innovate-earth": "/assets/alumni/journey/qatr-al-nada-ahmed-al-qaisi/studio-innovate-earth.jpg",
    "fellowship": "/assets/alumni/journey/qatr-al-nada-ahmed-al-qaisi/fellowship.jpg"
  },
  "rajaa-tariq-al-qaisi": {
    "foundation": "/assets/alumni/journey/rajaa-tariq-al-qaisi/foundation.jpeg",
    "digital-fluency": "/assets/alumni/journey/rajaa-tariq-al-qaisi/digital-fluency.jpeg",
    "studio-green-circuit": "/assets/alumni/journey/rajaa-tariq-al-qaisi/studio-green-circuit.jpg",
    "studio-innovate-earth": "/assets/alumni/journey/rajaa-tariq-al-qaisi/studio-innovate-earth.jpg",
    "fellowship": "/assets/alumni/journey/rajaa-tariq-al-qaisi/fellowship.jpg"
  },
  "rowa-mohammad-al-hawamdeh": {
    "foundation": "/assets/alumni/journey/rowa-mohammad-al-hawamdeh/foundation.jpeg",
    "digital-fluency": "/assets/alumni/journey/rowa-mohammad-al-hawamdeh/digital-fluency.jpeg",
    "studio-green-circuit": "/assets/alumni/journey/rowa-mohammad-al-hawamdeh/studio-green-circuit.jpeg",
    "studio-innovate-earth": "/assets/alumni/journey/rowa-mohammad-al-hawamdeh/studio-innovate-earth.jpg",
    "fellowship": "/assets/alumni/journey/rowa-mohammad-al-hawamdeh/fellowship.jpg"
  },
  "wisam-faisal-al-masri": {
    "foundation": "/assets/alumni/journey/wisam-faisal-al-masri/foundation.jpeg",
    "digital-fluency": "/assets/alumni/journey/wisam-faisal-al-masri/digital-fluency.jpeg",
    "studio-green-circuit": "/assets/alumni/journey/wisam-faisal-al-masri/studio-green-circuit.jpg",
    "studio-innovate-earth": "/assets/alumni/journey/wisam-faisal-al-masri/studio-innovate-earth.jpg",
    "fellowship": "/assets/alumni/journey/wisam-faisal-al-masri/fellowship.jpg"
  }
};

export function getStagePhotoClient(slug: string, stageId: string, graduateName: string, stageName: string) {
  const src = alumniJourneyPhotosMap[slug]?.[stageId];
  if (!src) return undefined;
  return {
    src,
    alt: { ar: `${graduateName} في ${stageName}` }
  };
}
