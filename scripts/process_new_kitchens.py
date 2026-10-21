import os
import shutil
from PIL import Image

src_base = r"G:\potrait\Interior\Kitchen Layouts"
out_dir = r"public\images\portfolio\kitchen"
high_res_dir = os.path.join(out_dir, "high-res")

os.makedirs(high_res_dir, exist_ok=True)

files_to_process = [
    # 1. Beam Faucet
    (
        os.path.join(src_base, "Beam Faucet", "Full kitchen view.png"),
        "kitchen-beam-full",
        2560
    ),
    (
        os.path.join(src_base, "Beam Faucet", "Front view.png"),
        "kitchen-beam-front",
        2560
    ),
    (
        os.path.join(src_base, "Beam Faucet", "Left view.png"),
        "kitchen-beam-left",
        2560
    ),
    (
        os.path.join(src_base, "Beam Faucet", "Right view.tif"),
        "kitchen-beam-right",
        2560
    ),
    (
        os.path.join(src_base, "Beam Faucet", "Warm Stone Kitchen Mood Board (1).png"),
        "kitchen-beam-moodboard",
        1920
    ),

    # 2. CP Faucet
    (
        os.path.join(src_base, "Cp faucet", "Wide.png"),
        "kitchen-cp-wide",
        2560
    ),
    (
        os.path.join(src_base, "Cp faucet", "Closeup @1.png"),
        "kitchen-cp-closeup-1",
        2560
    ),
    (
        os.path.join(src_base, "Cp faucet", "Closeup @2.png"),
        "kitchen-cp-closeup-2",
        2560
    ),
    (
        os.path.join(src_base, "Cp faucet", "viewport.png"),
        "kitchen-cp-viewport",
        2560
    ),
    (
        os.path.join(src_base, "Cp faucet", "Modern Refined Kitchen Mood Board-2.png"),
        "kitchen-cp-moodboard",
        1920
    ),

    # 3. Layout 1
    (
        os.path.join(src_base, "Layout 1", "With Accessories.png"),
        "kitchen-layout1-accessories",
        2560
    ),
    (
        os.path.join(src_base, "Layout 1", "1628422_301810-Single.png"),
        "kitchen-layout1-workstation",
        2560
    ),
    (
        os.path.join(src_base, "Layout 1", "1628422_301810-Single...png"),
        "kitchen-layout1-sink-detail",
        2560
    ),
    (
        os.path.join(src_base, "Layout 1", "Depth render @1.png"),
        "kitchen-layout1-depth",
        2560
    ),
    (
        os.path.join(src_base, "Layout 1", "Viewport.png"),
        "kitchen-layout1-viewport",
        2560
    ),
    (
        os.path.join(src_base, "Layout 1", "Walnut Warmth Kitchen Mood Board-3.png"),
        "kitchen-layout1-moodboard",
        1920
    ),

    # 4. Layout 2
    (
        os.path.join(src_base, "Layout 2", "1628420_241810-Single.png"),
        "kitchen-layout2-workstation",
        2560
    ),
    (
        os.path.join(src_base, "Layout 2", "1628420_241810-Single...png"),
        "kitchen-layout2-sink-detail",
        2560
    ),
    (
        os.path.join(src_base, "Layout 2", "Silent shield @1.png"),
        "kitchen-layout2-silentshield",
        2560
    ),
    (
        os.path.join(src_base, "Layout 2", "Depth render @1.png"),
        "kitchen-layout2-depth",
        2560
    ),
    (
        os.path.join(src_base, "Layout 2", "Viewport.png"),
        "kitchen-layout2-viewport",
        2560
    ),
    (
        os.path.join(src_base, "Layout 2", "Ivory Stone Kitchen Mood Board-4.png"),
        "kitchen-layout2-moodboard",
        1920
    ),
]

print(f"Starting conversion for {len(files_to_process)} kitchen assets...")

for src_path, base_slug, max_w in files_to_process:
    if not os.path.exists(src_path):
        print(f"ERROR: File not found: {src_path}")
        continue

    print(f"\nProcessing {os.path.basename(src_path)} -> {base_slug}...")
    
    # 1. High-res copy (as PNG)
    dst_png = os.path.join(high_res_dir, f"{base_slug}.png")
    if not os.path.exists(dst_png) or os.path.getsize(dst_png) == 0:
        if src_path.lower().endswith(".tif") or src_path.lower().endswith(".tiff"):
            # Convert TIF to PNG
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
        # Check if alpha is meaningful
        alpha = img.split()[-1]
        extrema = alpha.getextrema()
        if extrema[0] < 255: # has transparency
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

print("\nAll kitchen assets successfully processed!")
