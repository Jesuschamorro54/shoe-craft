import json

from controllers import *
from flask import Blueprint, request, jsonify
from common.CustomLoggin import Logger
from routes.routes_controller import generate_event, loggin_required, generate_token

# Parent api/auth

logger = Logger()

auth_paths = Blueprint("auth_paths", __name__)


@auth_paths.route('/employee', methods=['POST'])
@loggin_required
def api_user_register(claims=None):    
    try:

        response = ({"message": "Communication error"}, 500)

        event = generate_event(request, claims)

        if event['request']['method'] == 'POST':

            execution = post_employees.main(event)
            response = (execution['body'], execution['statusCode'])
        
    except Exception as e:
        logger.error(e)
        response = ({ "message": "Internal server error" }, 500) 

    return response


@auth_paths.route('/login', methods=['POST'])
def api_user_login(claims=None):    
    try:

        response = ({"message": "Communication error"}, 500)

        event = generate_event(request, claims)

        if event['request']['method'] == 'POST':

            execution = user_authenticate.main(event)
            response = (execution['body'], execution['statusCode'])
        
    except Exception as e:
        logger.error(e)
        response = ({ "message": "Internal server error" }, 500) 

    return response


@auth_paths.route('/token', methods=['GET'])
def api_test():
    
    token =  generate_token()
    return {"status": True, 'token': token['idToken']}