import os

# Корень backend/app
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

# backend/
BACKEND_ROOT = os.path.dirname(BASE_DIR)

# storage/
STORAGE_DIR = os.path.join(BACKEND_ROOT, "storage")

# storage/originals
STORAGE_ORIGINALS = os.path.join(STORAGE_DIR, "originals")

# storage/processed
STORAGE_PROCESSED = os.path.join(STORAGE_DIR, "processed")
