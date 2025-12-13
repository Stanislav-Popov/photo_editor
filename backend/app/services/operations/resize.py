import cv2
import os
import uuid


OUTPUT_DIR = 'storage/processed'




def resize_image(image_path, scale):
    img = cv2.imread(image_path)
    if img is None:
        return {'error': 'Image not found'}


    h, w = img.shape[:2]
    new_size = (int(w * scale), int(h * scale))


    interp = cv2.INTER_CUBIC if scale > 2 else cv2.INTER_LINEAR
    resized = cv2.resize(img, new_size, interpolation=interp)


    filename = f"resize_{uuid.uuid4().hex}.png"
    out_path = os.path.join(OUTPUT_DIR, filename)
    cv2.imwrite(out_path, resized)


    return {
    'status': 'ok',
    'output_path': out_path,
    'size': resized.shape
    }