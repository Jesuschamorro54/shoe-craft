import json

from controllers import *
from flask import Blueprint, request, jsonify
from common.CustomLoggin import Logger
from routes.routes_controller import generate_event, loggin_required, generate_token, admin_required

# Parent /api

logger = Logger()

employees_paths = Blueprint("employees_paths", __name__)


@employees_paths.route('/employees', methods=['GET'])
@admin_required
def api_get_employees(claims=None):
    try:

        response = ({"message": "Communication error"}, 500)

        event = generate_event(request, claims)

        if event['request']['method'] == 'GET':

            execution = get_employees.main(event)
            response = (execution['body'], execution['statusCode'])
        
    except Exception as e:
        logger.error(e)
        response = ({ "message": "Internal server error" }, 500) 

    return response


@employees_paths.route('/employees/<id>', methods=['DELETE'])
@admin_required
def api_delete_employees(id, claims=None):
    try:

        response = ({"message": "Communication error"}, 500)

        event = generate_event(request, claims)

        if event['request']['method'] == 'DELETE':

            execution = detele_employees.main(event)
            response = (execution['body'], execution['statusCode'])
        
    except Exception as e:
        logger.error(e)
        response = ({ "message": "Internal server error" }, 500) 

    return response