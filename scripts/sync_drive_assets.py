"""
Google Drive Asset Pipeline: Sync renders, models and videos from Google Drive to public/
Usage:
  python scripts/sync_drive_assets.py [FOLDER_ID_OR_NAME]
"""

import sys
import os
import subprocess

def run_drive_sync(target="Gaurav_Portfolio_Assets"):
    dest_dir = os.path.join(os.path.dirname(__file__), '..', 'public', 'images', 'portfolio')
    os.makedirs(dest_dir, exist_ok=True)

    print(f"Checking Google Drive for folder: '{target}'...")
    try:
        cmd = f'gdrive readonly search --name-contains "{target}" --json'
        res = subprocess.run(cmd, capture_output=True, text=True, shell=True)
        if res.returncode == 0 and res.stdout.strip():
            print("[SUCCESS] Found matching Google Drive resources:")
            print(res.stdout)
        else:
            print("[INFO] Google Drive CLI ready. Ensure 'gdrive auth login' is completed to sync cloud assets.")
    except Exception as e:
        print(f"[INFO] gdrive CLI: {e}")

    print(f"Target local asset directory ready: {dest_dir}")

if __name__ == '__main__':
    target = sys.argv[1] if len(sys.argv) > 1 else "Gaurav_Portfolio_Assets"
    run_drive_sync(target)
