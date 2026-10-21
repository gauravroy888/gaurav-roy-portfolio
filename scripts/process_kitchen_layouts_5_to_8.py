import os
import shutil
from PIL import Image

src_base = r"G:\potrait\Interior\Kitchen Layouts"
out_dir = r"public\images\portfolio\kitchen"
high_res_dir = os.path.join(out_dir, "high-res")

os.makedirs(high_res_dir, exist_ok=True)

files_to_process = [
    # Layout 5
    (
        os.path.join(src_base, "Layout 5", "Accessories.png"),
        "kitchen-layout5-accessories",
        2560
    ),
    (
        os.path.join(src_base, "Layout 5", "1628425_362010-Double.png"),
        "kitchen-layout5-workstation",
        2560
    ),
    (
        os.path.join(src_base, "Layout 5", "Silent shield.png"),
        "kitchen-layout5-silentshield",
        2560
    ),
    (
        os.path.join(src_base, "Layout 5", "Depth render.png"),
        "kitchen-layout5-depth",
        2560
    ),
    (
        os.path.join(src_base, "Layout 5", "Kohler Kitchen Mood Board-1.png"),
        "kitchen-layout5-moodboard",
        1920
    ),

    # Layout 6
    (
        os.path.join(src_base, "Layout 6", "Bar.png"),
        "kitchen-layout6-bar",
        2560
    ),
    (
        os.path.join(src_base, "Layout 6", "Bar viewport.png"),
        "kitchen-layout6-viewport",
        2560
    ),
    (
        os.path.join(src_base, "Layout 6", "Midnight Stone Kitchen Moodboard-2.png"),
        "kitchen-layout6-moodboard",
        1920
    ),

    # Layout 7
    (
        os.path.join(src_base, "Layout 7", "last.png"),
        "kitchen-layout7-nature",
        2560
    ),
    (
        os.path.join(src_base, "Layout 7", "last viewport.png"),
        "kitchen-layout7-viewport",
        2560
    ),
    (
        os.path.join(src_base, "Layout 7", "Kohler Kitchen Nature-Inspired Mood Board-3.png"),
        "kitchen-layout7-moodboard",
        1920
    ),

    # Layout 8
    (
        os.path.join(src_base, "Layout 8", "Render (7).png"),
        "kitchen-layout8-smoked-oak",
        2560
    ),
    (
        os.path.join(src_base, "Layout 8", "Viewport.png"),
        "kitchen-layout8-viewport",
        2560
    ),
    (
        os.path.join(src_base, "Layout 8", "Kohler Kitchen Mood Board-4.png"),
        "kitchen-layout8-moodboard",
        1920
    ),
]

print(f"Starting conversion for {len(files_to_process)} kitchen assets (Layouts 5-8)...")

for src_path, base_slug, max_w in files_to_process:
    if not os.path.exists(src_path):
        print(f"ERROR: File not found: {src_path}")
        continue

    print(f"\nProcessing {os.path.basename(src_path)} -> {base_slug}...")
    
    # 1. High-res copy (as PNG)
    dst_png = os.path.join(high_res_dir, f"{base_slug}.png")
    if not os.path.exists(dst_png) or os.path.getsize(dst_png) == 0:
        if src_path.lower().endswith(".tif") or src_path.lower().endswith(".tiff"):
            im_tif = Image.open(src_path)
            im_tif.save(dst_png, "PNG")
            print(f"  Converted TIF to PNG: {dst_png} ({os.path.getsize(dst_png)/(1024*1024):.2f} MB)")
        else:
            shutil.copy2(src_path, dst_png)
            print(f"  Copied original PNG: {dst_png} ({os.path.getsize(dst_png)/(1024*1024):.2f} MB)")
    else:
        print(f"  High-res PNG already exists.")

    # 2. WebP export
    dst_webp = os.path.join(out_dir, f"{base_slug}.webp")
    img = Image.open(src_path)
    
    # Handle RGBA mode
    if img.mode in ('RGBA', 'LA'):
        alpha = img.split()[-1]
        extrema = alpha.getextrema()
        if extrema[0] < 255:
            bg = Image.new('RGB', img.size, (255, 255, 255))
            bg.paste(img, mask=alpha)
            rgb_img = bg
        else:
            rgb_img = img.convert('RGB')
    else:
        rgb_img = img.convert('RGB')

    # Resize if larger than max_w
    orig_w, orig_h = rgb_img.size
    if orig_w > max_w:
        ratio = max_w / float(orig_w)
        new_h = int(float(orig_h) * ratio)
        disp_img = rgb_img.resize((max_w, new_h), Image.Resampling.LANCZOS)
    else:
        disp_img = rgb_img

    disp_img.save(dst_webp, "WEBP", quality=90, method=6)
    print(f"  Generated WebP: {dst_webp} ({disp_img.size[0]}x{disp_img.size[1]}, {os.path.getsize(dst_webp)/1024:.1f} KB)")

print("\nLayouts 5-8 processing completed successfully!")
