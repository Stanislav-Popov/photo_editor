import os


class Config:
    BASE_DIR = os.path.dirname(os.path.abspath(__file__))
    STORAGE_ORIGINALS = os.path.join(BASE_DIR, '..', 'storage', 'originals')
    STORAGE_PROCESSED = os.path.join(BASE_DIR, '..', 'storage', 'processed')