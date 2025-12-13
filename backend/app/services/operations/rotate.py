import cv2
import os
import uuid


OUTPUT_DIR = 'storage/processed'




def rotate_image(image_path, angle):
    img = cv2.imread(image_path)
    if img is None:
        return {'error': 'Image not found'}


    h, w = img.shape[:2]
    center = (w // 2, h // 2)


    matrix = cv2.getRotationMatrix2D(center, angle, 1.0)
    rotated = cv2.warpAffine(img, matrix, (w, h))


    filename = f"rotate_{uuid.uuid4().hex}.png"
    out_path = os.path.join(OUTPUT_DIR, filename)
    cv2.imwrite(out_path, rotated)


    return {
        'status': 'ok',
        'output_path': out_path
    }