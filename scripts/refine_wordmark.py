from PIL import Image

img = Image.open("public/client-media/zeyo-wordmark-clean.png")
pix = img.load()
w, h = img.size

# Remove the tiny stray speck near top (x ~ 190 to 260, y ~ 0 to 12)
for y in range(15):
    for x in range(w):
        # letters start around y=10-15 except z and y tips
        # specifically between x=180 and 260, letters have a dip between e and y
        if 180 <= x <= 260 and y <= 15:
            pix[x, y] = (0, 0, 0, 0)

# Save high-res clean transparent wordmark
img.save("public/client-media/zeyo-wordmark-clean.png")
print("Cleaned tiny artifacts!")
