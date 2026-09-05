from PIL import Image

def crop_bottom(img_path):
    img = Image.open(img_path)
    width, height = img.size
    
    # Let's crop the bottom 25% to remove the year "2012" text
    crop_height = int(height * 0.8)
    
    cropped_img = img.crop((0, 0, width, crop_height))
    cropped_img.save(img_path)
    print(f"Cropped {img_path} from {width}x{height} to {width}x{crop_height}")

crop_bottom("public/images/modak_gold_hd.png")
crop_bottom("public/images/modak_cream_hd.png")
