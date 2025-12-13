import os
import uuid
from app.config import Config
from app.services.operations.resize import resize_image
from app.services.operations.rotate import rotate_image

class ImagePipeline:

    @staticmethod
    def save_image(file):
        filename = f"{uuid.uuid4().hex}_{file.filename}"
        path = os.path.join(Config.STORAGE_ORIGINALS, filename)
        file.save(path)

        return {
            'status': 'ok',
            'filename': filename,
            'path': path
        }
    
    @staticmethod
    def resize(image_path, scale):
        return resize_image(image_path, scale)


    @staticmethod
    def rotate(image_path, angle):
        return rotate_image(image_path, angle)