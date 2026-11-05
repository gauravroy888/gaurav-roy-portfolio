"""Generate production portfolio images from archived source artwork.

Run once with --seed-from-public to archive the current public image library.
Later runs read only archive/portfolio-image-sources and replace the generated
public/images/portfolio directory plus its responsive image variants.
"""

from __future__ import annotations

import argparse
import os
import shutil
import sys
import tempfile
from pathlib import Path

from PIL import Image, ImageOps, UnidentifiedImageError


ROOT = Path(__file__).resolve().parents[1]
SOURCE_ROOT = ROOT / "archive" / "portfolio-image-sources"
PUBLIC_ROOT = ROOT / "public" / "images" / "portfolio"
SUPPORTED_EXTENSIONS = {".webp", ".jpg", ".jpeg", ".png"}
RESPONSIVE_WIDTHS = (480, 960)
DISPLAY_MAX_EDGE = 1400
DETAIL_MAX_EDGE = 2200
DISPLAY_QUALITY = 82
DETAIL_QUALITY = 84


def seed_originals_from_public() -> None:
    source_files = [path for path in SOURCE_ROOT.rglob("*") if path.is_file()] if SOURCE_ROOT.exists() else []
    if source_files:
        raise SystemExit(
            f"Refusing to seed: {SOURCE_ROOT} already contains source files. "
            "Review the archive before migrating."
        )
    if not PUBLIC_ROOT.is_dir():
        raise SystemExit(f"Cannot seed source artwork: {PUBLIC_ROOT} does not exist.")
    SOURCE_ROOT.parent.mkdir(parents=True, exist_ok=True)
    shutil.copytree(PUBLIC_ROOT, SOURCE_ROOT, dirs_exist_ok=True)
    print(f"Archived existing images under {SOURCE_ROOT.relative_to(ROOT)}")


def save_image(image: Image.Image, destination: Path, image_format: str, quality: int) -> None:
    destination.parent.mkdir(parents=True, exist_ok=True)
    if image_format == "WEBP":
        image.save(destination, format="WEBP", quality=quality, method=6)
    elif image_format == "JPEG":
        if image.mode not in ("RGB", "L"):
            image = image.convert("RGB")
        image.save(destination, format="JPEG", quality=quality, optimize=True, progressive=True)
    else:
        raise ValueError(f"Unsupported output format: {image_format}")


def optimize_image(source: Path, output_root: Path) -> tuple[str, dict]:
    relative = source.relative_to(SOURCE_ROOT)
    relative_parts = {part.lower() for part in relative.parts}
    is_detail = "high-res" in relative_parts or "highres" in relative_parts
    max_edge = DETAIL_MAX_EDGE if is_detail else DISPLAY_MAX_EDGE
    quality = DETAIL_QUALITY if is_detail else DISPLAY_QUALITY
    output_format = "JPEG" if source.suffix.lower() in {".jpg", ".jpeg"} else "WEBP"
    output_suffix = ".jpg" if output_format == "JPEG" else ".webp"
    output_relative = relative.with_suffix(output_suffix)
    output = output_root / output_relative

    try:
        with Image.open(source) as opened:
            image = ImageOps.exif_transpose(opened)
            image.load()
            if image.mode not in ("RGB", "RGBA", "L"):
                image = image.convert("RGBA" if "A" in image.getbands() else "RGB")

            base = image.copy()
            if is_detail:
                base.thumbnail((max_edge, max_edge), Image.Resampling.LANCZOS)
            else:
                target_height = max(1, round(base.height * max_edge / base.width))
                base = base.resize((max_edge, target_height), Image.Resampling.LANCZOS)
            save_image(base, output, output_format, quality)

            for target_width in (() if is_detail else RESPONSIVE_WIDTHS):
                variant = image.copy()
                target_height = max(1, round(variant.height * target_width / variant.width))
                variant = variant.resize((target_width, target_height), Image.Resampling.LANCZOS)
                variant_name = f"{source.stem}-{target_width}w{output_suffix}"
                variant_relative = relative.parent / variant_name
                save_image(variant, output_root / variant_relative, output_format, quality)
            return "/images/portfolio/" + output_relative.as_posix(), {}
    except (OSError, UnidentifiedImageError) as error:
        raise RuntimeError(f"Could not process {source.relative_to(ROOT)}: {error}") from error


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument(
        "--seed-from-public",
        action="store_true",
        help="Copy the current public portfolio images into the source archive before optimizing.",
    )
    args = parser.parse_args()

    if args.seed_from_public:
        seed_originals_from_public()

    if not SOURCE_ROOT.is_dir():
        raise SystemExit(
            f"Source artwork not found at {SOURCE_ROOT}. "
            "For the initial migration, run with --seed-from-public."
        )

    source_files = sorted(
        path for path in SOURCE_ROOT.rglob("*")
        if path.is_file() and path.suffix.lower() in SUPPORTED_EXTENSIONS
    )
    if not source_files:
        raise SystemExit(f"No supported source images found under {SOURCE_ROOT}.")

    staging_root = Path(tempfile.mkdtemp(prefix="portfolio-images-", dir=ROOT))
    original_bytes = sum(path.stat().st_size for path in source_files)
    try:
        for source in source_files:
            optimize_image(source, staging_root)

        managed_parent = ROOT / "public" / "images"
        resolved_output = PUBLIC_ROOT.resolve()
        if resolved_output != (managed_parent / "portfolio").resolve():
            raise RuntimeError(f"Unsafe generated image directory: {resolved_output}")

        if PUBLIC_ROOT.exists():
            shutil.rmtree(PUBLIC_ROOT)
        os.replace(staging_root, PUBLIC_ROOT)
    except Exception:
        if staging_root.exists():
            shutil.rmtree(staging_root)
        raise

    generated_bytes = sum(path.stat().st_size for path in PUBLIC_ROOT.rglob("*") if path.is_file())
    savings = (1 - generated_bytes / original_bytes) * 100
    print(
        f"Optimized {len(source_files)} source images: "
        f"{original_bytes / 1024 / 1024:.1f} MiB to "
        f"{generated_bytes / 1024 / 1024:.1f} MiB "
        f"({savings:.1f}% smaller, including responsive variants)."
    )
    print("Generated 480w/960w variants for regular images; high-res files are on-demand only.")


if __name__ == "__main__":
    try:
        main()
    except (RuntimeError, OSError, ValueError) as error:
        print(str(error), file=sys.stderr)
        raise SystemExit(1) from error
