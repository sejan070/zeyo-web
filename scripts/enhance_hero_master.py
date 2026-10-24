import os
import subprocess
import json
import imageio_ffmpeg

ff = imageio_ffmpeg.get_ffmpeg_exe()
base_dir = r"d:\All Projects\Zeyo- event management"
vdir = os.path.join(base_dir, "public", "videos")
temp_dir = os.path.join(vdir, "temp_enhance")

os.makedirs(temp_dir, exist_ok=True)

vid_luxury = os.path.join(vdir, "luxury-wedding-decor.mp4")
vid_stage = os.path.join(vdir, "hero-clip2.mp4")
vid_clip3 = os.path.join(vdir, "hero-clip3.mp4")
vid_chandelier = os.path.join(vdir, "chandelier-1080.mp4")
vid_sparklers = os.path.join(vdir, "sparklers-1080.mp4")

# Curated high-impact shots with enhanced brightness, vibrant colors, and sharp contrast
shots = [
    {
        "name": "01_golden_arch_lawn",
        "src": vid_luxury,
        "start": "00:00:01.8",
        "dur": 3.6,
        "desc": "Grand banquet lawn with golden circular arches and chandeliers"
    },
    {
        "name": "02_bd_royal_wedding_stage",
        "src": vid_stage,
        "start": "00:00:00.5",
        "dur": 3.6,
        "desc": "Bangladeshi royal wedding stage with gold chairs and rose garlands"
    },
    {
        "name": "03_crystal_chandelier_gleam",
        "src": vid_chandelier if os.path.exists(vid_chandelier) else vid_luxury,
        "start": "00:00:02.0",
        "dur": 3.2,
        "desc": "Dazzling crystal chandelier casting warm golden light"
    },
    {
        "name": "04_banquet_dining_flowers",
        "src": vid_luxury,
        "start": "00:00:13.5",
        "dur": 3.4,
        "desc": "Luxury banquet dining table with fresh floral centerpieces"
    },
    {
        "name": "05_evening_sparklers_celebration",
        "src": vid_sparklers if os.path.exists(vid_sparklers) else vid_luxury,
        "start": "00:00:01.0",
        "dur": 3.2,
        "desc": "Evening celebration with warm sparkling fireworks"
    },
    {
        "name": "06_white_floral_stage_arch",
        "src": vid_luxury,
        "start": "00:00:17.5",
        "dur": 3.6,
        "desc": "Grand outdoor wedding stage with white floral installation"
    },
    {
        "name": "07_bd_stage_walkway",
        "src": vid_stage,
        "start": "00:00:04.0",
        "dur": 3.4,
        "desc": "Persian carpet royal walkway leading to the bride and groom thrones"
    }
]

speed_factor = 0.75  # ~1.33x dynamic pace
final_clip_durs = []
seg_files = []

# Enhance filter:
# 1. scale to 1920x1080
# 2. eq: brightness +0.03, contrast 1.08, saturation 1.18 (vibrant luxury colors)
# 3. unsharp: 5:5:0.8:5:5:0.3 (crisp fine details on florals and chandeliers)
enhance_filter = "eq=contrast=1.08:brightness=0.03:saturation=1.18,unsharp=5:5:0.8:5:5:0.3"

print("1. Extracting, color-grading and upscaling segments...")
for idx, shot in enumerate(shots):
    out_file = os.path.join(temp_dir, f"shot_{idx}.mp4")
    seg_files.append(out_file)
    actual_dur = round(shot["dur"] * speed_factor, 2)
    final_clip_durs.append(actual_dur)
    
    print(f"[{idx+1}/{len(shots)}] Processing {shot['name']} ({shot['desc']})...")
    vf = f"setpts={speed_factor}*PTS,scale=1920:1080:force_original_aspect_ratio=decrease,pad=1920:1080:(ow-iw)/2:(oh-ih)/2,{enhance_filter},fps=30,format=yuv420p"
    
    cmd = [
        ff, "-y",
        "-ss", shot["start"],
        "-i", shot["src"],
        "-t", str(shot["dur"]),
        "-vf", vf,
        "-c:v", "libx264",
        "-preset", "veryfast",
        "-crf", "18",
        "-an",
        out_file
    ]
    res = subprocess.run(cmd, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True, encoding="utf-8", errors="ignore")
    if res.returncode != 0:
        print("Error on shot", idx, res.stderr[-500:])
        raise RuntimeError(f"Shot {idx} failed")

print("2. Stitching with smooth cross-dissolve xfade transitions...")
trans_dur = 0.5
filter_complex = ""
current_duration = final_clip_durs[0]
last_label = "[0:v]"

merge_args = [ff, "-y"]
for f in seg_files:
    merge_args.extend(["-i", f])

for i in range(1, len(shots)):
    offset = round(current_duration - trans_dur, 2)
    next_label = f"[v{i}]"
    filter_complex += f"{last_label}[{i}:v]xfade=transition=fade:duration={trans_dur}:offset={offset}{next_label};"
    last_label = next_label
    current_duration = round(offset + final_clip_durs[i], 2)

if filter_complex.endswith(";"):
    filter_complex = filter_complex[:-1]

final_output = os.path.join(vdir, "hero-cinematic-master.mp4")
poster_output = os.path.join(vdir, "hero-cinematic-thumb.jpg")

merge_args.extend([
    "-filter_complex", filter_complex,
    "-map", last_label,
    "-c:v", "libx264",
    "-preset", "fast",
    "-crf", "18",
    "-pix_fmt", "yuv420p",
    "-movflags", "+faststart",
    final_output
])

print(f"Executing final master merge (total dur ~{current_duration}s)...")
res = subprocess.run(merge_args, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True, encoding="utf-8", errors="ignore")
if res.returncode != 0:
    print("Merge failed:", res.stderr[-500:])
    raise RuntimeError("Merge failed")

print("Extracting high-res crisp poster frame...")
poster_cmd = [
    ff, "-y",
    "-ss", "00:00:01.0",
    "-i", final_output,
    "-frames:v", "1",
    "-q:v", "2",
    poster_output
]
subprocess.run(poster_cmd, stdout=subprocess.PIPE, stderr=subprocess.PIPE)

# Cleanup
for f in seg_files:
    try:
        os.remove(f)
    except:
        pass
try:
    os.rmdir(temp_dir)
except:
    pass

print(f"SUCCESS! New enhanced master video saved to {final_output} (Size: {os.path.getsize(final_output)} bytes)")
