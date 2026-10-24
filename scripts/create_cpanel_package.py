import os
import zipfile
import shutil

base_dir = r"d:\All Projects\Zeyo- event management"

# Active videos referenced in code
ACTIVE_VIDEOS = {
    "hero-cinematic-master.mp4",
    "hero-cinematic-thumb.jpg",
    "luxury-wedding-decor.mp4",
    "birthday-celebration.mp4",
    "birthday-reel.mp4",
    "birthday-thumb.jpg",
    "dreamy-white-decor.mp4",
    "dreamy-white-thumb.jpg",
    "pink-wedding-theme.mp4",
    "pink-wedding-thumb.jpg",
    "zeyo-stage-craft.mp4",
    "zeyo-stage-craft-thumb.jpg",
    "grand-pavilion-thumb.jpg",
    "pinterest-decor-thumb.jpg"
}

# Directories and files to exclude from source zip
EXCLUDE_DIRS = {
    ".git",
    ".next",
    "node_modules",
    ".system_generated",
    ".tempmediaStorage",
    "temp_enhance",
    "temp_montage",
    "temp_dynamic_montage",
    "mixkit_thumbs"
}

EXCLUDE_EXTENSIONS = {
    ".log",
    ".tmp"
}

zip_output = os.path.join(base_dir, "zeyo-cpanel-ready.zip")

print("Building cPanel deployment zip package...")

file_count = 0
total_uncompressed = 0

with zipfile.ZipFile(zip_output, "w", zipfile.ZIP_DEFLATED, compresslevel=6) as zipf:
    for root, dirs, files in os.walk(base_dir):
        # Filter out excluded directories in-place
        dirs[:] = [d for d in dirs if d not in EXCLUDE_DIRS]
        
        rel_root = os.path.relpath(root, base_dir)
        
        # Don't add zip files themselves or scripts that generate them
        for file in files:
            if file.endswith(".zip") or file in ("test_shadow_preview.png",):
                continue
            
            ext = os.path.splitext(file)[1].lower()
            if ext in EXCLUDE_EXTENSIONS:
                continue

            file_path = os.path.join(root, file)
            rel_file_path = os.path.relpath(file_path, base_dir)
            
            # Check public/videos to only keep active videos
            if "public" in rel_root and "videos" in rel_root:
                if file not in ACTIVE_VIDEOS:
                    continue
            
            zipf.write(file_path, rel_file_path)
            file_count += 1
            total_uncompressed += os.path.getsize(file_path)

zip_size_bytes = os.path.getsize(zip_output)
zip_size_mb = zip_size_bytes / (1024 * 1024)
uncompressed_mb = total_uncompressed / (1024 * 1024)

print(f"SUCCESS!")
print(f"Total files packed: {file_count}")
print(f"Uncompressed size: {uncompressed_mb:.2f} MB")
print(f"Final Zip size: {zip_size_mb:.2f} MB")
print(f"Output path: {zip_output}")
