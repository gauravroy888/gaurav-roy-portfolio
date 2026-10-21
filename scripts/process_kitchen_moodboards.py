import os
import shutil
from PIL import Image

src_v1 = r"G:\potrait\Interior\Kitchen Layouts\Villa 1, Kitchen Mood Board.png"
src_v2 = r"G:\potrait\Interior\Kitchen Layouts\Villa 2, Kitchen Mood Board.png"

out_dir = r"public\images\portfolio\kitchen"
high_res_dir = os.path.join(out_dir, "high-res")
os.makedirs(high_res_dir, exist_ok=True)

items = [
    (src_v1, "villa-1-moodboard"),
    (src_v2, "villa-2-moodboard")
]

print("Processing kitchen mood board images...")

for src, base in items:
    if not os.path.exists(src):
        print(f"File not found: {src}")
        continue
        
    # 1. High-res copy
    dst_png = os.path.join(high_res_dir, f"{base}.png")
    shutil.copy2(src, dst_png)
    print(f"  Copied {dst_png} ({os.path.getsize(dst_png)/(1024*1024):.2f} MB)")
    
    # 2. WebP export
    img = Image.open(src).convert("RGB")
    dst_webp = os.path.join(out_dir, f"{base}.webp")
    img.save(dst_webp, "WEBP", quality=90, method=6)
    print(f"  Generated {dst_webp} ({os.path.getsize(dst_webp)/1024:.1f} KB)")

print("Kitchen mood board processing completed!")
