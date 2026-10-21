import os
from PIL import Image

src_dir = r"G:\potrait\Interior\Layout 1(teakberry)"
dst_dir = r"G:\potrait\Gaurav's Website\public\images\portfolio\teakberry"
os.makedirs(dst_dir, exist_ok=True)

files_map = {
    'Warm Earth Bathroom Mood Board.png': ('moodboard.webp', 'moodboard-thumb.webp'),
    'Master.png': ('master.webp', 'master-thumb.webp'),
    'A1.png': ('angle-1.webp', 'angle-1-thumb.webp'),
    'A2.png': ('angle-2.webp', 'angle-2-thumb.webp'),
    'A3.png': ('angle-3.webp', 'angle-3-thumb.webp'),
}

for src_name, (webp_name, thumb_name) in files_map.items():
    src_path = os.path.join(src_dir, src_name)
    im = Image.open(src_path).convert('RGB')
    
    # Save optimized web version (max 2400px width/height)
    w, h = im.size
    scale = min(1.0, 2400 / max(w, h))
    if scale < 1.0:
        im_web = im.resize((int(w * scale), int(h * scale)), Image.Resampling.LANCZOS)
    else:
        im_web = im
    im_web.save(os.path.join(dst_dir, webp_name), 'WEBP', quality=88, method=6)
    
    # Save thumbnail (max 640px)
    scale_thumb = min(1.0, 640 / max(w, h))
    im_thumb = im.resize((int(w * scale_thumb), int(h * scale_thumb)), Image.Resampling.LANCZOS)
    im_thumb.save(os.path.join(dst_dir, thumb_name), 'WEBP', quality=82, method=6)
    print(f"Processed {src_name} -> {webp_name}, {thumb_name}")

# Concept slides from user uploads
brain_dir = r"C:\Users\thorr\.gemini\antigravity\brain\fde4744e-6766-4693-9983-e941f51f82f2\.user_uploaded"
slides = {
    'media_1791872297100_63683926.png': 'color-story.webp',
    'media_1791872328093_f72e83b1.png': 'lush-teakberry-spec.webp',
    'media_1791872400211_a0807d58.jpg': 'india-design-2025.webp'
}

for s_name, out_name in slides.items():
    s_path = os.path.join(brain_dir, s_name)
    if os.path.exists(s_path):
        im = Image.open(s_path).convert('RGB')
        w, h = im.size
        scale = min(1.0, 1920 / max(w, h))
        if scale < 1.0:
            im = im.resize((int(w * scale), int(h * scale)), Image.Resampling.LANCZOS)
        im.save(os.path.join(dst_dir, out_name), 'WEBP', quality=88, method=6)
        print(f"Processed slide {s_name} -> {out_name}")

print("All teakberry assets generated successfully!")
