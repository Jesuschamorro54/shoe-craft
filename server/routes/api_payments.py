import json

from controllers import *
from flask import Blueprint, request, jsonify
from common.CustomLoggin import Logger
from routes.routes_controller import generate_event, loggin_required, generate_token, admin_required

# Parent /api

logger = Logger()

payments_paths = Blueprint("payments_paths", __name__)


@payments_paths.route('/payments', methods=['POST', 'GET'])
@loggin_required
def api_get_packages(claims=None):
    try:

        response = ({"message": "Communication error"}, 500)

        event = generate_event(request, claims)

        if event['request']['method'] == 'POST':

            execution = post_payments.main(event)
            response = (execution['body'], execution['statusCode'])
        
        if event['request']['method'] == 'GET':
            pass

    except Exception as e:
        logger.error(e)
        response = ({ "message": "Internal server error" }, 500)

    return response