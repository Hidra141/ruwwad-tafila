import os
import shutil
import json

ref_path = r"D:\ruwwad_f\reference\اليافعين"
journey_dir = r"d:\ruwwad_f\public\assets\alumni\journey"
drosos_pool_dir = r"d:\ruwwad_f\public\assets\drosos\phases"

alumni_slugs = {
    "أحمد نبيل المرافي": "ahmed-nabeel-al-marafi",
    "أوس معتصم السهارين": "aws-moatasem-al-sahareen",
    "روعة محمد الحوامدة": "rowa-mohammad-al-hawamdeh",
    "عبدالله بكر الحجاج": "abdullah-bakr-al-hajjaj",
    "لجين علاء البدور": "lujain-alaa-al-badoor",
    "وسام فيصل المصري": "wisam-faisal-al-masri",
    "عبدالله نمر السكور": "abdullah-nimr-al-sokoor",
    "عمران عماد الطرمان": "omran-emad-al-torman",
    "قطر الندى أحمد القيسي": "qatr-al-nada-ahmed-al-qaisi",
    "رجاء طارق القيسي": "rajaa-tariq-al-qaisi",
    "مصطفى خالد العدينات": "mustafa-khaled-al-odainat",
    "غنى محمد الشماسات": "ghana-mohammad-al-shamasat",
    "جود عمر الهدار": "joud-omar-al-haddar",
    "كرم عمر الهدار": "karam-omar-al-haddar",
    "عمر علاء الفراهيد": "omar-alaa-al-farahid",
    "مودة مروان القيسي": "mawaddah-marwan-al-qaisi",
    "محمد علي العوران": "mohammad-ali-al-owran",
    "محمد نبيل المرافي": "mohammad-nabeel-al-marafi",
    "ساره عمر السوالقه": "sara-omar-al-sawalqah",
    "مريم عبدالكريم الفريجات": "maryam-abdulkarim-al-furaij",
    "عبدالرحمن زياد النعانعة": "abdulrahman-ziad-al-naanaah",
    "محمد المصري": "mohammad-al-masri",
}

stages = [
    ("foundation", ["التأسيسية", "مرحلة"]),
    ("digital-fluency", ["الطلاقة", "حاسوب", "اساسيات"]),
    ("studio-green-circuit", ["الاستوديو الاول", "الاستوديو الأول"]),
    ("studio-innovate-earth", ["الاستوديو الثاني"]),
    ("fellowship", ["زمالة", "تواصل"]),
]

drosos_pool = []
if os.path.exists(drosos_pool_dir):
    drosos_pool = [f"/assets/drosos/phases/{f}" for f in os.listdir(drosos_pool_dir) if f.endswith(".webp")]

photo_map = {}

for ar_name, slug in alumni_slugs.items():
    folder_p = os.path.join(ref_path, ar_name)
    youth_journey_dir = os.path.join(journey_dir, slug)
    
    # Clean previous journey dir to eliminate duplicates
    if os.path.exists(youth_journey_dir):
        shutil.rmtree(youth_journey_dir)
    os.makedirs(youth_journey_dir, exist_ok=True)
    
    if not os.path.exists(folder_p):
        continue
    
    files = [f for f in os.listdir(folder_p) if not f.startswith("01_")]
    used_files = set()
    photo_map[slug] = {}

    for stage_id, keywords in stages:
        # Find an unused matching file
        matched_file = None
        for f in files:
            if f not in used_files and any(k in f for k in keywords):
                matched_file = f
                break
        
        # If no unused keyword match, grab any unused file from the folder
        if not matched_file:
            for f in files:
                if f not in used_files:
                    matched_file = f
                    break
        
        if matched_file:
            used_files.add(matched_file)
            ext = os.path.splitext(matched_file)[1].lower()
            dst_name = f"{stage_id}{ext}"
            shutil.copy2(os.path.join(folder_p, matched_file), os.path.join(youth_journey_dir, dst_name))
            photo_map[slug][stage_id] = f"/assets/alumni/journey/{slug}/{dst_name}"
        else:
            # Fallback to pool photo if youth has no more photos
            if drosos_pool:
                fallback_photo = drosos_pool[len(photo_map[slug]) % len(drosos_pool)]
                photo_map[slug][stage_id] = fallback_photo

print(f"Processed unique photos for {len(photo_map)} youth!")

code = f"""/**
 * Pre-generated map of unique non-repeating journey photos per youth.
 */
export const alumniJourneyPhotosMap: Record<string, Record<string, string>> = {json.dumps(photo_map, indent=2)};

export function getStagePhotoClient(slug: string, stageId: string, graduateName: string, stageName: string) {{
  const src = alumniJourneyPhotosMap[slug]?.[stageId];
  if (!src) return undefined;
  return {{
    src,
    alt: {{ ar: `${{graduateName}} في ${{stageName}}` }}
  }};
}}
"""

with open(r"d:\ruwwad_f\src\data\alumni-journey-photos.ts", "w", encoding="utf-8") as f:
    f.write(code)

print("Updated src/data/alumni-journey-photos.ts with 100% unique photos!")
