from PIL import Image

src_path = r"C:\Users\admin\.gemini\antigravity-ide\brain\136dcd8e-4fbe-4171-bed8-0725770dd3d0\.user_uploaded\media_1792666225605.png"
img = Image.open(src_path).convert("RGBA")

# 1. Save original cropped image
img.save("public/client-media/zeyo-wordmark-original.png")

# 2. Extract transparent version
w, h = img.size
trans = Image.new("RGBA", (w, h), (0, 0, 0, 0))

# Background is (8, 19, 41)
bg_r, bg_g, bg_b = 8, 19, 41
bg_lum = 0.299 * bg_r + 0.587 * bg_g + 0.114 * bg_b  # approx 18.2

pix_src = img.load()
pix_out = trans.load()

for y in range(h):
    for x in range(w):
        r, g, b, a = pix_src[x, y]
        lum = 0.299 * r + 0.587 * g + 0.114 * b
        
        # Color difference from bg
        diff = ((r - bg_r)**2 + (g - bg_g)**2 + (b - bg_b)**2)**0.5
        
        if diff < 12:
            pix_out[x, y] = (0, 0, 0, 0)
        elif diff > 90:
            pix_out[x, y] = (r, g, b, 255)
        else:
            alpha = int(((diff - 12) / (90 - 12)) * 255)
            # Un-blend color with background to get true foreground color
            alpha_f = alpha / 255.0
            unblended_r = min(255, max(0, int((r - bg_r * (1 - alpha_f)) / alpha_f))) if alpha_f > 0.05 else r
            unblended_g = min(255, max(0, int((g - bg_g * (1 - alpha_f)) / alpha_f))) if alpha_f > 0.05 else g
            unblended_b = min(255, max(0, int((b - bg_b * (1 - alpha_f)) / alpha_f))) if alpha_f > 0.05 else b
            pix_out[x, y] = (unblended_r, unblended_g, unblended_b, alpha)

# Crop tight bounding box
bbox = trans.getbbox()
if bbox:
    cropped_trans = trans.crop(bbox)
    # Pad by 6px
    padded = Image.new("RGBA", (cropped_trans.width + 12, cropped_trans.height + 12), (0, 0, 0, 0))
    padded.paste(cropped_trans, (6, 6))
    padded.save("public/client-media/zeyo-wordmark-clean.png")
    print("Saved public/client-media/zeyo-wordmark-clean.png:", padded.size)
