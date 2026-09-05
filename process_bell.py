from PIL import Image

def remove_white_background(input_path, output_path, threshold=240):
    img = Image.open(input_path).convert("RGBA")
    datas = img.getdata()

    newData = []
    for item in datas:
        # If the pixel is close to white, make it transparent
        if item[0] > threshold and item[1] > threshold and item[2] > threshold:
            newData.append((255, 255, 255, 0))
        else:
            newData.append(item)

    img.putdata(newData)
    
    # Crop to non-transparent bounding box
    bbox = img.getbbox()
    if bbox:
        img = img.crop(bbox)
        
    img.save(output_path, "PNG")
    print(f"Saved processed image to {output_path}")

input_img = r'C:\Users\prite\.gemini\antigravity-ide\brain\eebb7569-b288-47ee-b58a-12e95ae74abe\realistic_golden_bell_1788427509411.jpg'
output_img = 'public/images/realistic_bell.png'

remove_white_background(input_img, output_img)
