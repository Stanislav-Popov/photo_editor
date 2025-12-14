import os

# базовые
from app.services.operations.basic_ops import (
    resize_image,
    crop_image,
    flip_image,
    rotate_image
)

# продвинутые
from app.services.operations.advanced_ops import (
    split_merge_channels,
    color_balance,
    add_noise,
    blur_image,
    morphology_open
)

# анализ
from app.services.operations.analysis_ops import (
    histogram as histogram_calc,
    contours as contours_calc
)


class ImagePipeline:
    """
    Связывает API и OpenCV-операции
    """

    # =========================
    # Upload
    # =========================
    @staticmethod
    def save_image(file):
        from app.config import Config
        import uuid

        filename = f"{uuid.uuid4().hex}_{file.filename}"
        path = os.path.join(Config.STORAGE_ORIGINALS, filename)
        file.save(path)

        return {
            'status': 'ok',
            'path': path,
            'image_url': f"/files/originals/{filename}"
        }

    # =========================
    # ЭТАП 3 — базовые
    # =========================
    @staticmethod
    def resize(path, scale=None, width=None, height=None):
        return resize_image(path, scale, width, height)

    @staticmethod
    def crop(path, x, y, width, height):
        return crop_image(path, x, y, width, height)

    @staticmethod
    def flip(path, mode):
        return flip_image(path, mode)

    @staticmethod
    def rotate(path, angle):
        return rotate_image(path, angle)

    # =========================
    # ЭТАП 4 — продвинутые
    # =========================
    @staticmethod
    def channels(path):
        return split_merge_channels(path)

    @staticmethod
    def color_balance(path, r=0, g=0, b=0):
        return color_balance(path, r, g, b)

    @staticmethod
    def noise(path):
        return add_noise(path)

    @staticmethod
    def blur(path):
        return blur_image(path)

    @staticmethod
    def morphology(path):
        return morphology_open(path)

    # =========================
    # ЭТАП 5 — анализ
    # =========================
    @staticmethod
    def histogram(path):
        return histogram_calc(path)

    @staticmethod
    def contours(path):
        return contours_calc(path)
