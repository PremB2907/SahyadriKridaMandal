from rembg import remove
from PIL import Image
import os

def process_modak(input_path, output_path):
    print(f"Processing {input_path}...")
    img = Image.open(input_path)
    
    # Remove the background
    output = remove(img)
    
    # Get bounding box of the non-transparent pixels to crop tight
    bbox = output.getbbox()
    if bbox:
        # Give a small padding
        padding = 5
        bbox = (
            max(0, bbox[0] - padding),
            max(0, bbox[1] - padding),
            min(output.width, bbox[2] + padding),
            min(output.height, bbox[3] + padding)
        )
        output = output.crop(bbox)
        
    output.save(output_path)
    print(f"Saved to {output_path}")

if __name__ == '__main__':
    process_modak("public/images/modak_gold_raw.png", "public/images/modak_gold_hd.png")
    process_modak("public/images/modak_cream_raw.png", "public/images/modak_cream_hd.png")
