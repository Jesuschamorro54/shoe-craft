import json

from flask import Blueprint, request, jsonify
from common.CustomLoggin import Logger
from controllers import *
from routes.routes import generate_event, loggin_required, generate_token

# Parent api/auth

logger = Logger()

auth_paths = Blueprint("auth_paths", __name__)


@auth_paths.route('/users', methods=['POST'])
@loggin_required
def api_user_register():    
    try:

        response = ({"message": "Communication error"}, 500)

        event = generate_event(request)

        if event['request']['method'] == 'POST':

            execution = post_employees.main(event)
            response = (execution['body'], execution['statusCode'])
        
    except Exception as e:
        response = ({ "message": "Internal server error" }, 500) 

    return response


@auth_paths.route('/token', methods=['GET'])
def api_test():
    
    token =  generate_token()

    print(token)

    return {"status": True, 'token': token['idToken']}