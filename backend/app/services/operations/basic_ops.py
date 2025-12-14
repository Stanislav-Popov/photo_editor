import cv2
import os
import uuid
import numpy as np

OUTPUT_DIR = 'storage/processed'


def resize_image(image_path, scale=None, width=None, height=None):
    img = cv2.imread(image_path)
    if img is None:
        return {'error': 'Image not found'}

    h, w = img.shape[:2]

    if scale:
        new_w, new_h = int(w * scale), int(h * scale)
    else:
        new_w, new_h = width, height

    interp = cv2.INTER_CUBIC if new_w > w else cv2.INTER_AREA
    resized = cv2.resize(img, (new_w, new_h), interpolation=interp)

    filename = f"resize_{uuid.uuid4().hex}.png"
    out_path = os.path.join(OUTPUT_DIR, filename)
    cv2.imwrite(out_path, resized)

    return {
        'status': 'ok',
        'output_path': out_path,
        'size': resized.shape
    }


def crop_image(image_path, x, y, w, h):
    img = cv2.imread(image_path)
    if img is None:
        return {'error': 'Image not found'}

    h_img, w_img = img.shape[:2]
    if x < 0 or y < 0 or x+w > w_img or y+h > h_img:
        return {'error': 'Crop out of bounds'}

    cropped = img[y:y+h, x:x+w]

    filename = f"crop_{uuid.uuid4().hex}.png"
    out_path = os.path.join(OUTPUT_DIR, filename)
    cv2.imwrite(out_path, cropped)

    return {
        'status': 'ok',
        'output_path': out_path,
        'size': cropped.shape
    }


def flip_image(image_path, mode):
    img = cv2.imread(image_path)
    if img is None:
        return {'error': 'Image not found'}

    flip_code = {'horizontal': 1, 'vertical': 0, 'both': -1}.get(mode, 1)
    flipped = cv2.flip(img, flip_code)

    filename = f"flip_{uuid.uuid4().hex}.png"
    out_path = os.path.join(OUTPUT_DIR, filename)
    cv2.imwrite(out_path, flipped)

    return {
        'status': 'ok',
        'output_path': out_path
    }


def rotate_image(image_path, angle):
    img = cv2.imread(image_path)
    if img is None:
        return {'error': 'Image not found'}

    h, w = img.shape[:2]
    center = (w // 2, h // 2)

    M = cv2.getRotationMatrix2D(center, angle, 1.0)
    rotated = cv2.warpAffine(img, M, (w, h), flags=cv2.INTER_LINEAR)

    filename = f"rotate_{uuid.uuid4().hex}.png"
    out_path = os.path.join(OUTPUT_DIR, filename)
    cv2.imwrite(out_path, rotated)

    return {
        'status': 'ok',
        'output_path': out_path
    }
