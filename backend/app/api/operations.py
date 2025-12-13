from flask import Blueprint, request, jsonify
from app.services.image_pipeline import ImagePipeline


operations_bp = Blueprint('operations', __name__)

@operations_bp.route('/upload', methods=['POST'])
def upload():
    if 'file' not in request.files:
        return {'error': 'No file part'}, 400

    file = request.files['file']
    if file.filename == '':
        return {'error': 'No selected file'}, 400

    result = ImagePipeline.save_image(file)
    return jsonify(result)

@operations_bp.route('/resize', methods=['POST'])
def resize():
    data = request.json
    result = ImagePipeline.resize(**data)
    return jsonify(result)


@operations_bp.route('/rotate', methods=['POST'])
def rotate():
    data = request.json
    result = ImagePipeline.rotate(**data)
    return jsonify(result)