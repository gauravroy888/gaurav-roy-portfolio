import os
import shutil
from PIL import Image

src_dir = r"G:\potrait\Interior\Verticle layouts"
out_dir = r"public\images\portfolio\kohler-vertical-layouts"
high_res_dir = os.path.join(out_dir, "high-res")

os.makedirs(high_res_dir, exist_ok=True)

files_map = [
    ("1 (1).png", "layout-01-courtyard-zen-suite"),
    ("1 (2).png", "layout-02-japandi-fluted-oak"),
    ("1 (3).png", "layout-03-moody-charcoal-marble"),
    ("1 (4).png", "layout-04-highrise-penthouse-master"),
    ("1 (5).png", "layout-05-powder-rose-gold-luxury"),
    ("1 (6).png", "layout-06-mediterranean-biophilic-spa"),
    ("1 (7).png", "layout-07-laurent-gold-ultra-luxury"),
]

print("Starting image processing...")

for src_name, base_name in files_map:
    src_path = os.path.join(src_dir, src_name)
    dst_png = os.path.join(high_res_dir, f"{base_name}-original.png")
    dst_webp = os.path.join(out_dir, f"{base_name}.webp")
    dst_thumb = os.path.join(out_dir, f"{base_name}-thumb.webp")
    
    print(f"\nProcessing {src_name} -> {base_name}...")
    
    # 1. Copy original high-res PNG
    if not os.path.exists(dst_png) or os.path.getsize(dst_png) != os.path.getsize(src_path):
        shutil.copy2(src_path, dst_png)
        print(f"  Copied original PNG: {os.path.getsize(dst_png)/(1024*1024):.2f} MB")
    else:
        print(f"  Original PNG already exists.")
        
    # 2. Open image with PIL
    img = Image.open(src_path)
    if img.mode in ('RGBA', 'LA'):
        # Convert RGBA to RGB with white background if saving as standard RGB webp
        background = Image.new('RGB', img.size, (255, 255, 255))
        background.paste(img, mask=img.split()[3]) # 3 is alpha channel
        rgb_img = background
    else:
        rgb_img = img.convert('RGB')
        
    # 3. Create display webp (width=1500, preserving aspect ratio)
    target_width = 1500
    w_percent = target_width / float(rgb_img.size[0])
    target_height = int((float(rgb_img.size[1]) * float(w_percent)))
    
    display_img = rgb_img.resize((target_width, target_height), Image.Resampling.LANCZOS)
    display_img.save(dst_webp, 'WEBP', quality=88, method=6)
    print(f"  Generated WebP ({target_width}x{target_height}): {os.path.getsize(dst_webp)/(1024):.1f} KB")
    
    # 4. Create thumb webp (width=500)
    thumb_width = 500
    t_percent = thumb_width / float(rgb_img.size[0])
    thumb_height = int((float(rgb_img.size[1]) * float(t_percent)))
    
    thumb_img = rgb_img.resize((thumb_width, thumb_height), Image.Resampling.LANCZOS)
    thumb_img.save(dst_thumb, 'WEBP', quality=82, method=6)
    print(f"  Generated Thumbnail ({thumb_width}x{thumb_height}): {os.path.getsize(dst_thumb)/(1024):.1f} KB")

print("\nAll 7 layout images processed successfully!")
