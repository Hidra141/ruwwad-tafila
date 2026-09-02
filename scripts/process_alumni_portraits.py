import os
import glob
import math
import numpy as np
from PIL import Image, ImageFilter, ImageDraw
import scipy.ndimage as ndimage
import rembg

ALUMNI_DIR = r"d:\ruwwad_f\public\assets\alumni"
TRANSPARENT_DIR = os.path.join(ALUMNI_DIR, "transparent")
UNIFIED_DIR = os.path.join(ALUMNI_DIR, "unified")

os.makedirs(TRANSPARENT_DIR, exist_ok=True)
os.makedirs(UNIFIED_DIR, exist_ok=True)

print("Initializing human segmentation session...", flush=True)
session = rembg.new_session("u2net_human_seg")

def fill_and_refine_mask(rgba_img):
    """
    Cleans cutout edges, removes dark fringe/halos, and fills inner mask holes.
    """
    arr = np.array(rgba_img).astype(np.float32)
    alpha = arr[:, :, 3]

    # Binary threshold for solid body
    mask = alpha > 20
    # Fill internal holes (e.g. inside clothes/hijab/hair)
    filled_mask = ndimage.binary_fill_holes(mask)

    # Convert filled mask back to smooth alpha (0..255)
    # Apply a tiny 0.6px gaussian blur to edge for natural anti-aliased blending
    smoothed_mask = ndimage.gaussian_filter(filled_mask.astype(np.float32), sigma=0.6)
    final_alpha = np.clip(smoothed_mask * 255.0, 0, 255).astype(np.uint8)

    # Remove fringe: where original alpha was partially transparent, clean color bleeding
    out_arr = arr.astype(np.uint8)
    out_arr[:, :, 3] = final_alpha
    return Image.fromarray(out_arr)

def create_clean_studio_background(width=800, height=1000):
    """
    Creates a ultra-clean, modern studio background (crisp off-white to soft cyan-gray).
    NO dark spots, NO heavy vignettes.
    """
    base = Image.new("RGBA", (width, height), (255, 255, 255, 255))
    draw = ImageDraw.Draw(base)

    # Soft linear vertical background gradient (#FAFCFD to #EDF4F7)
    for y in range(height):
        factor = y / float(height)
        r = int(250 * (1 - factor) + 237 * factor)
        g = int(252 * (1 - factor) + 244 * factor)
        b = int(253 * (1 - factor) + 247 * factor)
        draw.line([(0, y), (width, y)], fill=(r, g, b, 255))

    # Subtle soft white glow in the upper-center behind face
    glow = Image.new("RGBA", (width, height), (0, 0, 0, 0))
    glow_draw = ImageDraw.Draw(glow)
    center_x, center_y = width // 2, int(height * 0.38)
    max_r = int(width * 0.7)

    for r in range(max_r, 0, -5):
        a = int(40 * (1.0 - (r / max_r)))
        glow_draw.ellipse(
            [center_x - r, center_y - r, center_x + r, center_y + r],
            fill=(255, 255, 255, a)
        )

    glow = glow.filter(ImageFilter.GaussianBlur(radius=20))
    base = Image.alpha_composite(base, glow)
    return base

def process_portrait(input_path):
    filename = os.path.basename(input_path)
    name, ext = os.path.splitext(filename)

    if ext.lower() not in [".jpg", ".jpeg", ".png", ".webp"]:
        return

    print(f"Processing: {filename}...", flush=True)

    orig_img = Image.open(input_path).convert("RGBA")

    # 1. High precision rembg with alpha matting
    try:
        no_bg = rembg.remove(
            orig_img,
            session=session,
            alpha_matting=True,
            alpha_matting_foreground_threshold=240,
            alpha_matting_background_threshold=10,
            alpha_matting_erode_size=10
        )
    except Exception as e:
        print(f"Fallback for {filename}: {e}", flush=True)
        no_bg = rembg.remove(orig_img, session=session)

    # 2. Refine mask (remove dark halo, fill holes)
    clean_no_bg = fill_and_refine_mask(no_bg)

    # Save transparent PNG
    transparent_path = os.path.join(TRANSPARENT_DIR, f"{name}.png")
    clean_no_bg.save(transparent_path, "PNG")

    # 3. Composite onto clean studio background
    target_width, target_height = 800, 1000
    studio_bg = create_clean_studio_background(target_width, target_height)

    # Crop tightly to non-transparent bounding box
    bbox = clean_no_bg.getbbox()
    if bbox:
        cropped = clean_no_bg.crop(bbox)
    else:
        cropped = clean_no_bg

    c_w, c_h = cropped.size

    # Calculate scale so person fills height comfortably (~88% of 1000)
    desired_h = int(target_height * 0.90)
    scale = desired_h / float(c_h)
    new_w = int(c_w * scale)
    new_h = int(c_h * scale)

    # If width is too wide, scale by width
    if new_w > int(target_width * 0.92):
        scale = (target_width * 0.92) / float(c_w)
        new_w = int(c_w * scale)
        new_h = int(c_h * scale)

    resized_cutout = cropped.resize((new_w, new_h), Image.Resampling.LANCZOS)

    # Center horizontally and anchor STRICTLY to the bottom edge
    paste_x = (target_width - new_w) // 2
    paste_y = target_height - new_h  # Touches bottom boundary seamlessly

    composite = studio_bg.copy()
    # Paste WITHOUT any dark drop shadow (prevents dirty dark halo)
    composite.paste(resized_cutout, (paste_x, paste_y), resized_cutout)

    # Save as WebP and PNG
    unified_webp_path = os.path.join(UNIFIED_DIR, f"{name}.webp")
    unified_png_path = os.path.join(UNIFIED_DIR, f"{name}.png")

    composite.convert("RGB").save(unified_webp_path, "WEBP", quality=95)
    composite.convert("RGB").save(unified_png_path, "PNG")
    print(f"Saved clean studio portrait: {unified_webp_path}", flush=True)

def main():
    files = os.listdir(ALUMNI_DIR)
    processed_stems = set()

    for f in sorted(files):
        full_path = os.path.join(ALUMNI_DIR, f)
        if os.path.isfile(full_path):
            stem, ext = os.path.splitext(f)
            if ext.lower() in [".jpg", ".jpeg", ".png", ".webp"] and stem not in processed_stems:
                processed_stems.add(stem)
                process_portrait(full_path)

if __name__ == "__main__":
    main()
