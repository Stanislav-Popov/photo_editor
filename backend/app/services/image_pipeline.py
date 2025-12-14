import os
from app.config import (
    STORAGE_ORIGINALS,
    STORAGE_PROCESSED
)

# базовые операции
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
    Связывает API и OpenCV-операции.
    Работает ТОЛЬКО с image_id, а не с абсолютными путями.
    """

    # =========================
    # Upload
    # =========================
    @staticmethod
    def save_image(file):

        import uuid

        os.makedirs(STORAGE_ORIGINALS, exist_ok=True)

        image_id = f"{uuid.uuid4().hex}_{file.filename}"
        path = os.path.join(STORAGE_ORIGINALS, image_id)
        file.save(path)

        return {
            "status": "ok",
            "image_id": image_id,
            "url": f"/storage/originals/{image_id}"
        }

    # =========================
    # БАЗОВЫЕ ОПЕРАЦИИ
    # =========================
    @staticmethod
    def resize(image_id, scale=None, width=None, height=None):
        src = os.path.join(STORAGE_ORIGINALS, image_id)
        result = resize_image(src, scale, width, height)
        return ImagePipeline._format_result(result)

    @staticmethod
    def crop(image_id, x, y, width, height):
        src = os.path.join(STORAGE_ORIGINALS, image_id)
        result = crop_image(src, x, y, width, height)
        return ImagePipeline._format_result(result)

    @staticmethod
    def flip(image_id, mode):
        src = os.path.join(STORAGE_ORIGINALS, image_id)
        result = flip_image(src, mode)
        return ImagePipeline._format_result(result)

    @staticmethod
    def rotate(image_id, angle):
        src = os.path.join(STORAGE_ORIGINALS, image_id)
        result = rotate_image(src, angle)
        return ImagePipeline._format_result(result)

    # =========================
    # ПРОДВИНУТЫЕ
    # =========================
    @staticmethod
    def channels(image_id):
        src = os.path.join(STORAGE_ORIGINALS, image_id)
        return split_merge_channels(src)

    @staticmethod
    def color_balance(image_id, r=0, g=0, b=0):
        src = os.path.join(STORAGE_ORIGINALS, image_id)
        result = color_balance(src, r, g, b)
        return ImagePipeline._format_result(result)

    @staticmethod
    def noise(image_id):
        src = os.path.join(STORAGE_ORIGINALS, image_id)
        result = add_noise(src)
        return ImagePipeline._format_result(result)

    @staticmethod
    def blur(image_id):
        src = os.path.join(STORAGE_ORIGINALS, image_id)
        result = blur_image(src)
        return ImagePipeline._format_result(result)

    @staticmethod
    def morphology(image_id):
        src = os.path.join(STORAGE_ORIGINALS, image_id)
        result = morphology_open(src)
        return ImagePipeline._format_result(result)

    # =========================
    # АНАЛИЗ
    # =========================
    @staticmethod
    def histogram(image_id):
        src = os.path.join(STORAGE_ORIGINALS, image_id)
        return histogram_calc(src)

    @staticmethod
    def contours(image_id):
        src = os.path.join(STORAGE_ORIGINALS, image_id)
        return contours_calc(src)

    # =========================
    # INTERNAL
    # =========================
    @staticmethod
    def _format_result(result):
        """
        Приводит результат операций к единому виду
        """
        if "error" in result:
            return result

        filename = os.path.basename(result["output_path"])
        return {
            "status": "ok",
            "image_id": filename,
            "url": f"/storage/processed/{filename}"
        }
