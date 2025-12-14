from flask import Flask, app
from flask_cors import CORS
from app.api.operations import operations_bp
from flask import send_from_directory
from app.config import STORAGE_PROCESSED, STORAGE_ORIGINALS



def create_app():

    app = Flask(__name__)
    
    CORS(app)
    
    app.register_blueprint(operations_bp, url_prefix='/api')


    @app.route('/api/health')
    def health():
        return {'status': 'ok'}

    # Отдача обработанных изображений
    @app.route('/storage/processed/<filename>')
    def serve_processed(filename):
        return send_from_directory(STORAGE_PROCESSED, filename)

    # Отдача оригинальных изображений
    @app.route('/storage/originals/<filename>')
    def serve_original(filename):
        return send_from_directory(STORAGE_ORIGINALS, filename)

    return app