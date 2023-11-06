import json

from controllers import *
from flask import Blueprint, request, jsonify
from common.CustomLoggin import Logger
from routes.routes_controller import generate_event, loggin_required, generate_token, admin_required

# Parent /api

logger = Logger()

products_paths = Blueprint("products_paths", __name__)


@products_paths.route('/products', methods=['POST', 'GET'])
@loggin_required
def api_get_products(claims=None):
    try:

        response = ({"message": "Communication error"}, 500)

        event = generate_event(request, claims)

        if event['request']['method'] == 'POST':

            execution = post_products.main(event)
            response = (execution['body'], execution['statusCode'])
        
        if event['request']['method'] == 'GET':
            execution = get_products.main(event)
            response = (execution['body'], execution['statusCode'])

    except Exception as e:
        logger.error(e)
        response = ({ "message": "Internal server error" }, 500) 

    return response


@products_paths.route('/products/<id>', methods=['PUT', 'DELETE'])
@admin_required
def api_delete_products(id, claims=None):
    try:

        response = ({"message": "Communication error"}, 500)

        event = generate_event(request, claims)

        if event['request']['method'] == 'DELETE':

            execution = delete_products.main(event)
            response = (execution['body'], execution['statusCode'])

        if event['request']['method'] == 'PUT':

            execution = put_products.main(event)
            response = (execution['body'], execution['statusCode'])
        
    except Exception as e:
        logger.error(e)
        response = ({ "message": "Internal server error" }, 500) 

    return response