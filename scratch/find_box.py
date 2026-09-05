from PIL import Image
import numpy as np

img = Image.open('public/images/royal_scroll_isolated.png')
print("Dimensions:", img.size)

# Right tassel is located around x: 350..390, y: 110..220
# Let's crop right tassel and paste mirrored to left tassel!
# Let's find exact coordinates
