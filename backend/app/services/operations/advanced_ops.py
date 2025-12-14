import cv2
import os
import uuid
import numpy as np

OUTPUT_DIR = 'storage/processed'


def split_merge_channels(image_path):
    img = cv2.imread(image_path)
    if img is None:
        return {'error': 'Image not found'}

    b, g, r = cv2.split(img)
    merged = cv2.merge([b, g, r])

    filename = f"channels_{uuid.uuid4().hex}.png"
    out_path = os.path.join(OUTPUT_DIR, filename)
    cv2.imwrite(out_path, merged)

    return {
        'status': 'ok',
        'output_path': out_path
    }


def color_balance(image_path, r=0, g=0, b=0):
    img = cv2.imread(image_path).astype(np.int16)
    if img is None:
        return {'error': 'Image not found'}

    img[:, :, 2] += r
    img[:, :, 1] += g
    img[:, :, 0] += b

    img = np.clip(img, 0, 255).astype(np.uint8)

    filename = f"color_{uuid.uuid4().hex}.png"
    out_path = os.path.join(OUTPUT_DIR, filename)
    cv2.imwrite(out_path, img)

    return {
        'status': 'ok',
        'output_path': out_path
    }


def add_noise(image_path):
    img = cv2.imread(image_path)
    if img is None:
        return {'error': 'Image not found'}

    noise = np.random.normal(0, 25, img.shape)
    noisy = np.clip(img + noise, 0, 255).astype(np.uint8)

    filename = f"noise_{uuid.uuid4().hex}.png"
    out_path = os.path.join(OUTPUT_DIR, filename)
    cv2.imwrite(out_path, noisy)

    return {
        'status': 'ok',
        'output_path': out_path
    }


def blur_image(image_path):
    img = cv2.imread(image_path)
    if img is None:
        return {'error': 'Image not found'}

    blurred = cv2.GaussianBlur(img, (9, 9), 0)

    filename = f"blur_{uuid.uuid4().hex}.png"
    out_path = os.path.join(OUTPUT_DIR, filename)
    cv2.imwrite(out_path, blurred)

    return {
        'status': 'ok',
        'output_path': out_path
    }


def morphology_open(image_path):
    img = cv2.imread(image_path, 0)
    if img is None:
        return {'error': 'Image not found'}

    kernel = np.ones((5, 5), np.uint8)
    opened = cv2.morphologyEx(img, cv2.MORPH_OPEN, kernel)

    filename = f"morph_{uuid.uuid4().hex}.png"
    out_path = os.path.join(OUTPUT_DIR, filename)
    cv2.imwrite(out_path, opened)

    return {
        'status': 'ok',
        'output_path': out_path
    }
