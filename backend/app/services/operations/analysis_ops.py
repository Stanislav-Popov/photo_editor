import cv2
import numpy as np


def histogram(image_path):
    img = cv2.imread(image_path, 0)
    if img is None:
        return {'error': 'Image not found'}

    hist = cv2.calcHist([img], [0], None, [256], [0, 256])

    return {
        'status': 'ok',
        'histogram': hist.flatten().tolist()
    }


def contours(image_path):
    img = cv2.imread(image_path, 0)
    if img is None:
        return {'error': 'Image not found'}

    _, thresh = cv2.threshold(img, 127, 255, cv2.THRESH_BINARY)
    cnts, _ = cv2.findContours(
        thresh, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE
    )

    return {
        'status': 'ok',
        'contours_count': len(cnts)
    }
