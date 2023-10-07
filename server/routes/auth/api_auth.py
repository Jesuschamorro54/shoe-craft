import json

from flask import Blueprint, request, jsonify
from common.CustomLoggin import Logger
from common.jwt_utils import jwt_token_generate, verify_token
from controllers import *
from routes.routes import generate_event

# Parent api/auth

logger = Logger()

auth_paths = Blueprint("auth_paths", __name__)

def generate_token():
    
    data = {
        "id": 1234,
        "dni": 1002159985,
        "role": 'admin',
        "password": 'jesus123',
    }

    api_session = jwt_token_generate(data)

    return jsonify(api_session)

@auth_paths.route('/users', methods=['POST'])
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


@auth_paths.route('/users', methods=['GET'])
def api_test():


    return {"status": True}