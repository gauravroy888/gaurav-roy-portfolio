import os
import re
from PIL import Image

def main():
    with open('src/data/portfolioData.ts', 'r', encoding='utf-8') as f:
        data = f.read()

    referenced = set(re.findall(r'/images/portfolio/[^\'\" ]+\.png', data))
    print(f"Found {len(referenced)} referenced PNGs in portfolioData.ts")

    total_png_size = 0
    total_webp_size = 0
    converted_count = 0

    for ref in referenced:
        png_path = os.path.normpath(os.path.join('public', ref.lstrip('/')))
        webp_path = png_path[:-4] + '.webp'

        if not os.path.exists(png_path):
            print(f"Warning: {png_path} does not exist")
            continue

        png_size = os.path.getsize(png_path)
        total_png_size += png_size

        if not os.path.exists(webp_path):
            try:
                with Image.open(png_path) as im:
                    im.save(webp_path, 'WEBP', quality=88, method=4)
                converted_count += 1
            except Exception as e:
                print(f"Error converting {png_path}: {e}")
                continue

        webp_size = os.path.getsize(webp_path)
        total_webp_size += webp_size

    print(f"Converted {converted_count} new images.")
    print(f"Original PNG total: {total_png_size / (1024*1024):.2f} MB")
    print(f"Optimized WebP total: {total_webp_size / (1024*1024):.2f} MB")
    if total_png_size > 0:
        savings = (1 - total_webp_size / total_png_size) * 100
        print(f"Total Bandwidth Savings: {savings:.1f}%")

if __name__ == '__main__':
    main()
