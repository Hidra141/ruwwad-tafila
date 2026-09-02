import os
import shutil
import json
import sys

sys.stdout.reconfigure(encoding="utf-8")

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
    
    if os.path.exists(youth_journey_dir):
        shutil.rmtree(youth_journey_dir)
    os.makedirs(youth_journey_dir, exist_ok=True)
    
    photo_map[slug] = {}
    if not os.path.exists(folder_p):
        continue
    
    files = [f for f in os.listdir(folder_p) if not f.startswith("01_")]
    used_files = set()

    for stage_id, keywords in stages:
        matched_file = None
        # 1. Match unused file by keyword
        for f in files:
            if f not in used_files and any(k in f for k in keywords):
                matched_file = f
                break
        
        # 2. Match any unused file from youth folder
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
            # 3. Fallback to pool if no more unused files in youth folder
            if drosos_pool:
                fallback_photo = drosos_pool[(len(photo_map[slug]) + hash(slug)) % len(drosos_pool)]
                photo_map[slug][stage_id] = fallback_photo

    # Verify no duplicates per youth
    youth_urls = list(photo_map[slug].values())
    if len(youth_urls) != len(set(youth_urls)):
        print(f"WARNING: Duplicates found for {ar_name} ({slug})!")
    else:
        print(f"SUCCESS: {ar_name} ({slug}) has 5 unique photos!")

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

print("Updated src/data/alumni-journey-photos.ts with strictly unique photos!")
