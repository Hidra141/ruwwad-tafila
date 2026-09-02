import json
import re
import os

manifest_path = r"d:\ruwwad_f\src\data\_youth_photos_manifest.json"
alumni_path = r"d:\ruwwad_f\src\data\alumni.ts"
journeys_path = r"d:\ruwwad_f\src\data\alumni-journeys.ts"

with open(manifest_path, "r", encoding="utf-8") as f:
    manifest = json.load(f)

# 1. Update alumni.ts
with open(alumni_path, "r", encoding="utf-8") as f:
    alumni_code = f.read()

for slug, data in manifest.items():
    portrait = data.get("portrait")
    if not portrait:
        continue
    
    # Match block for slug
    pattern = rf'(id:\s*"{slug}".*?portrait:\s*\{{\s*src:\s*")[^"]+(")'
    alumni_code = re.sub(pattern, rf'\g<1>{portrait}\g<2>', alumni_code, flags=re.DOTALL)

with open(alumni_path, "w", encoding="utf-8") as f:
    f.write(alumni_code)

print("Updated portraits in alumni.ts successfully!")

# 2. Update alumni-journeys.ts with real phase photos
with open(journeys_path, "r", encoding="utf-8") as f:
    journeys_code = f.read()

for slug, data in manifest.items():
    photos = data.get("phase_photos", [])
    if not photos:
        continue
    
    # Categorize photos by phase name in original_name
    fellowship = [p["src"] for p in photos if "زمالة" in p["original_name"]]
    digital = [p["src"] for p in photos if "الطلاقة" in p["original_name"] or "حاسوب" in p["original_name"]]
    foundation = [p["src"] for p in photos if "التأسيسية" in p["original_name"]]
    studio1 = [p["src"] for p in photos if "الاستوديو الاول" in p["original_name"]]
    studio2 = [p["src"] for p in photos if "الاستوديو الثاني" in p["original_name"]]
    
    all_pics = [p["src"] for p in photos]
    print(f"{slug}: Total {len(all_pics)} phase pics -> Fellowship:{len(fellowship)}, Digital:{len(digital)}, Found:{len(foundation)}, St1:{len(studio1)}, St2:{len(studio2)}")

print("Done parsing journeys!")
