import json

from controllers import *
from flask import Blueprint, request, jsonify
from common.CustomLoggin import Logger
from routes.routes_controller import generate_event, loggin_required, generate_token, admin_required

# Parent /api

logger = Logger()

packages_paths = Blueprint("packages_paths", __name__)


@packages_paths.route('/packages', methods=['POST', 'GET'])
@loggin_required
def api_get_packages(claims=None):
    try:

        response = ({"message": "Communication error"}, 500)

        event = generate_event(request, claims)

        if event['request']['method'] == 'POST':

            execution = post_packages.main(event)
            response = (execution['body'], execution['statusCode'])
        
        if event['request']['method'] == 'GET':
            execution = get_packages.main(event)
            response = (execution['body'], execution['statusCode'])

    except Exception as e:
        logger.error(e)
        response = ({ "message": "Internal server error" }, 500) 

    return response


@packages_paths.route('/packages/<id>', methods=['DELETE'])
@loggin_required
def api_delete_packages(id, claims=None):
    try:

        response = ({"message": "Communication error"}, 500)

        event = generate_event(request, claims)

        if event['request']['method'] == 'DELETE':

            execution = delete_packages.main(event)
            response = (execution['body'], execution['statusCode'])
        
    except Exception as e:
        logger.error(e)
        response = ({ "message": "Internal server error" }, 500) 

    return response