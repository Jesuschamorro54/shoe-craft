# General libraries inputs
from common.CustomLoggin import Logger
import routes

# Flask imports
from flask import Flask
from flask import Flask
from flask_cors import CORS


# Module imports
from config.configure import app

logger = Logger()

def api_register_blueprint():
    
    try:
        CORS(app, resources={r"/*": {"origins": "*"}})
        
        # From auth
        app.register_blueprint(routes.auth_paths, url_prefix = "/api/auth" )
        app.register_blueprint(routes.employees_paths, url_prefix = "/api" )
        app.register_blueprint(routes.packages_paths, url_prefix = "/api" )
        app.register_blueprint(routes.products_paths, url_prefix = "/api" )
        app.register_blueprint(routes.payments_paths, url_prefix = "/api" )

    except Exception as e:
        logger.error(e, "ErrorRouteRecording")


# APP
if __name__ == "__main__":
    
    # Register all api routes
    api_register_blueprint()

    # App run
    app.run(debug=True, port=5000, host='0.0.0.0')
