import os
import shutil
from PIL import Image

src_dir = r"G:\potrait\Interior\Verticle layouts"
out_dir = r"public\images\portfolio\kohler-vertical-layouts"
high_res_dir = os.path.join(out_dir, "high-res")
os.makedirs(high_res_dir, exist_ok=True)

print("Processing Vertical Bathroom Mood Boards & Viewport Screenshots...")

for i in range(1, 8):
    layout_prefix = f"layout-{i:02d}"
    
    # 1. Process Mood Board (1.png to 7.png)
    mb_src = os.path.join(src_dir, f"{i}.png")
    if os.path.exists(mb_src):
        dst_mb_png = os.path.join(high_res_dir, f"{layout_prefix}-moodboard.png")
        dst_mb_webp = os.path.join(out_dir, f"{layout_prefix}-moodboard.webp")
        
        shutil.copy2(mb_src, dst_mb_png)
        img_mb = Image.open(mb_src).convert("RGB")
        img_mb.save(dst_mb_webp, "WEBP", quality=90, method=6)
        print(f"[{layout_prefix}] Mood Board processed: PNG={os.path.getsize(dst_mb_png)/(1024*1024):.2f}MB, WebP={os.path.getsize(dst_mb_webp)/1024:.1f}KB")
    else:
        print(f"[{layout_prefix}] Mood Board source missing: {mb_src}")

    # 2. Process Viewport Screenshot (Viewport 1.png to Viewport 7.png)
    vp_src = os.path.join(src_dir, f"Viewport {i}.png")
    if os.path.exists(vp_src):
        dst_vp_png = os.path.join(high_res_dir, f"{layout_prefix}-viewport.png")
        dst_vp_webp = os.path.join(out_dir, f"{layout_prefix}-viewport.webp")
        
        shutil.copy2(vp_src, dst_vp_png)
        img_vp = Image.open(vp_src).convert("RGB")
        
        # Scale down slightly if width > 1600 to keep responsive WebP snappy
        w, h = img_vp.size
        if w > 1600:
            scale = 1600.0 / w
            img_vp_display = img_vp.resize((1600, int(h * scale)), Image.Resampling.LANCZOS)
        else:
            img_vp_display = img_vp
            
        img_vp_display.save(dst_vp_webp, "WEBP", quality=88, method=6)
        print(f"[{layout_prefix}] Viewport processed: PNG={os.path.getsize(dst_vp_png)/(1024*1024):.2f}MB, WebP={os.path.getsize(dst_vp_webp)/1024:.1f}KB")
    else:
        print(f"[{layout_prefix}] Viewport source missing: {vp_src}")

print("\nAll vertical bathroom assets successfully processed!")
