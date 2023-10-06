import json

from flask import Blueprint, redirect, jsonify, render_template
from common.CustomLoggin import Logger
from common.jwt_utils import jwt_token_generate, verify_token

logger = Logger()

# Parent api/auth

auth_paths = Blueprint("auth_paths", __name__)

@auth_paths.route('/generate_token', methods=['GET'])
def api_generate_token():
    
    data = {
        "id": 1234,
        "dni": 1002159985,
        "role": 'admin',
        "password": 'jesus123',
    }

    api_session = jwt_token_generate(data)

    return jsonify(api_session)