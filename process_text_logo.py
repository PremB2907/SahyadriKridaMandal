from PIL import Image
import os

image_path = 'public/images/sahyadri_text_logo_mr.jpg'
if not os.path.exists(image_path):
    print(f"Error: {image_path} does not exist.")
    exit(1)

img = Image.open(image_path)
img = img.convert("RGBA")
datas = img.getdata()

newData = []
# Set tolerance for white
tolerance = 200
for item in datas:
    # change all light pixels to transparent
    if item[0] > tolerance and item[1] > tolerance and item[2] > tolerance:
        newData.append((255, 255, 255, 0))
    else:
        newData.append(item)

img.putdata(newData)

# find bounding box of non-transparent pixels
bbox = img.getbbox()
if bbox:
    img = img.crop(bbox)

# Save the new image
output_path = 'public/images/sahyadri_text_logo_mr_transparent.png'
img.save(output_path, "PNG")
print(f"Saved processed image to {output_path}")
