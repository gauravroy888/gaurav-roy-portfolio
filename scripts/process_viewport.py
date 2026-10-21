import os
from PIL import Image

src_path = r"C:\Users\thorr\.gemini\antigravity\brain\fde4744e-6766-4693-9983-e941f51f82f2\.user_uploaded\media_1791875615763_c75fbb58.jpg"
dst_dir = r"G:\potrait\Gaurav's Website\public\images\portfolio\teakberry"
os.makedirs(dst_dir, exist_ok=True)

im = Image.open(src_path).convert("RGB")
w, h = im.size
print(f"Original size: {w}x{h}")

# Save webp version
im.save(os.path.join(dst_dir, "c4d-viewport.webp"), "WEBP", quality=92, method=6)

# Save thumb
scale_thumb = min(1.0, 640 / max(w, h))
im_thumb = im.resize((int(w * scale_thumb), int(h * scale_thumb)), Image.Resampling.LANCZOS)
im_thumb.save(os.path.join(dst_dir, "c4d-viewport-thumb.webp"), "WEBP", quality=85, method=6)

# Save original copy in high-res
high_res_dir = os.path.join(dst_dir, "high-res")
os.makedirs(high_res_dir, exist_ok=True)
im.save(os.path.join(high_res_dir, "c4d-viewport-original.jpg"), "JPEG", quality=98)
print("Successfully processed Cinema 4D viewport screenshot!")
