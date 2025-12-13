from flask import Flask
from flask_cors import CORS
from app.api.operations import operations_bp




def create_app():
    app = Flask(__name__)
    app.config.from_object('app.config.Config')


    CORS(app)
    app.register_blueprint(operations_bp, url_prefix='/api/operations')


    @app.route('/api/health')
    def health():
        return {'status': 'ok'}


    return app