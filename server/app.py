# General libraries inputs
from common.CustomLoggin import Logger
import routes

# Flask imports
from flask import Flask, request
from flask_cors import CORS, cross_origin

# Module imports
from config.configure import app

logger = Logger()

def api_register_blueprint():

    try:

        cors = CORS(app)
        app.config['CORS_HEADERS'] = 'Content-Type'

        # From auth
        app.register_blueprint(routes.auth_paths, url_prefix = "/api/auth" )
        app.register_blueprint(routes.employees_paths, url_prefix = "/api" )
        app.register_blueprint(routes.packages_paths, url_prefix = "/api" )
        app.register_blueprint(routes.products_paths, url_prefix = "/api" )
        app.register_blueprint(routes.payments_paths, url_prefix = "/api" )

    except Exception as e:
        logger.error(e, "ErrorRouteRecording")

api_register_blueprint()

@app.route("/", methods=['GET'])
def main():

    return {
        "api_name": "SHOE-CRAFT",
        "domain": request.host,
        "status": True,
        "version": "1.1"
    } 
