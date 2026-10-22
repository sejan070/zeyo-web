from PIL import Image

# Load upscaled full logo
src_path = "public/client-media/upscaled/imgi_76_764925256_122115199113393169_2647078799602672828_n.jpg"
img = Image.open(src_path).convert("RGBA")
w, h = img.size

# Let's crop the text 'zeyo' at the bottom
# In 1600x1600 image:
# Let's inspect where the text starts and ends
text_crop = img.crop((380, 890, 1220, 1160))
text_crop.save("public/client-media/zeyo-wordmark-cropped.png")
print("Saved zeyo-wordmark-cropped.png:", text_crop.size)

# Create transparent PNG using PIL pixel manipulation
# Letters are bright silver/white, background is dark navy (R<30, G<35, B<55)
pix = text_crop.load()
width, height = text_crop.size

trans_img = Image.new("RGBA", (width, height), (0, 0, 0, 0))
trans_pix = trans_img.load()

for y in range(height):
    for x in range(width):
        r, g, b, a = pix[x, y]
        # Calculate brightness
        lum = 0.299 * r + 0.587 * g + 0.114 * b
        # Background is typically lum ~ 15-30
        if lum <= 35:
            trans_pix[x, y] = (0, 0, 0, 0)
        elif lum >= 120:
            trans_pix[x, y] = (r, g, b, 255)
        else:
            # Smooth anti-aliased edge
            alpha = int(((lum - 35) / (120 - 35)) * 255)
            trans_pix[x, y] = (r, g, b, alpha)

bbox = trans_img.getbbox()
if bbox:
    trans_img = trans_img.crop(bbox)
    pad = 12
    final_img = Image.new("RGBA", (trans_img.width + pad * 2, trans_img.height + pad * 2), (0, 0, 0, 0))
    final_img.paste(trans_img, (pad, pad))
    final_img.save("public/client-media/zeyo-wordmark.png")
    print("Saved zeyo-wordmark.png successfully:", final_img.size)
