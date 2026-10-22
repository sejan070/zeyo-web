from PIL import Image

# Use the alpha mask of zeyo-wordmark-clean.png to create a dark navy version
clean = Image.open("public/client-media/zeyo-wordmark-clean.png").convert("RGBA")
w, h = clean.size

dark_img = Image.new("RGBA", (w, h), (0, 0, 0, 0))
pix_clean = clean.load()
pix_dark = dark_img.load()

# Deep navy brand color: (8, 19, 41)
NAVY_R, NAVY_G, NAVY_B = 8, 19, 41

for y in range(h):
    for x in range(w):
        r, g, b, a = pix_clean[x, y]
        if a > 0:
            pix_dark[x, y] = (NAVY_R, NAVY_G, NAVY_B, a)

dark_img.save("public/client-media/zeyo-wordmark-dark.png")
print("Saved public/client-media/zeyo-wordmark-dark.png successfully!")
