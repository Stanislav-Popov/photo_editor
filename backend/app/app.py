from flask import Flask
from flask_cors import CORS
from app.api.operations import operations_bp




def create_app():
    
    app = Flask(__name__)

    

    CORS(app)
    app.register_blueprint(operations_bp, url_prefix='/api')


    @app.route('/api/health')
    def health():
        return {'status': 'ok'}


    return app