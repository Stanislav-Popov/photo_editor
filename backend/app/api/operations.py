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
    return jsonify(ImagePipeline.resize(
        path=data['path'],
        scale=data.get('scale'),
        width=data.get('width'),
        height=data.get('height')
    ))

@operations_bp.route('/crop', methods=['POST'])
def crop():
    data = request.json
    return jsonify(ImagePipeline.crop(
        path=data['path'],
        x=data['x'],
        y=data['y'],
        width=data['width'],
        height=data['height']
    ))

@operations_bp.route('/flip', methods=['POST'])
def flip():
    data = request.json
    return jsonify(ImagePipeline.flip(
        path=data['path'],
        mode=data['mode']
    ))

@operations_bp.route('/rotate', methods=['POST'])
def rotate():
    data = request.json
    return jsonify(ImagePipeline.rotate(
        path=data['path'],
        angle=data['angle']
    ))

@operations_bp.route('/channels', methods=['POST'])
def channels():
    data = request.json
    return jsonify(ImagePipeline.channels(data['path']))

@operations_bp.route('/color-balance', methods=['POST'])
def color_balance():
    data = request.json
    return jsonify(ImagePipeline.color_balance(
        path=data['path'],
        r=data.get('r', 0),
        g=data.get('g', 0),
        b=data.get('b', 0)
    ))

@operations_bp.route('/noise', methods=['POST'])
def noise():
    data = request.json
    return jsonify(ImagePipeline.noise(data['path']))

@operations_bp.route('/blur', methods=['POST'])
def blur():
    data = request.json
    return jsonify(ImagePipeline.blur(data['path']))

@operations_bp.route('/morphology', methods=['POST'])
def morphology():
    data = request.json
    return jsonify(ImagePipeline.morphology(data['path']))

@operations_bp.route('/histogram', methods=['POST'])
def histogram():
    data = request.json
    return jsonify(ImagePipeline.histogram(data['path']))

@operations_bp.route('/contours', methods=['POST'])
def contours():
    data = request.json
    return jsonify(ImagePipeline.contours(data['path']))
