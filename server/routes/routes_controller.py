import functools
from flask import Request, jsonify, request
from common.CustomLoggin import Logger
from common.utils import jwt_token_generate, verify_token

logger = Logger()
def generate_event(request: Request, claims={}) -> dict:
    event = {
        'body': request.json if request.method == 'POST' else None,
        'queryStringParameters': dict(request.args),
        'pathParameters': request.view_args,
        'request': {
            'headers': dict(request.headers),
            'ip_client': request.remote_addr,
            'cookies': dict(request.cookies),
            'method': request.method
        },

        'authorizer': {
            'jwt': claims
        }
    }

    return event


def generate_token():
    
    data = {
        "id": 1234,
        "dni": 1002159985,
        "role": 'cutter',
        "password": 'jesus123',
    }

    api_session = jwt_token_generate(data)

    return api_session


def loggin_required(function):
    """
    Decorator to check if a user is logged in.

    Args:
        function (callable): The function to be wrapped.

    Returns:
        callable: The wrapped function.

    Raises:
        KeyError: If the 'Authorization' header is not found in the request.
        Exception: If there is an error while verifying the token.
    """
    @functools.wraps(function)
    def wraped_access(**kwargs):

        try:

            token = request.headers['Authorization']
            token = token.replace("Bearer","").replace(" ","")

            # Call the function to validate token
            valid = verify_token(token)

            if not valid['status']:
                return {"message": 'Unauthorized'}, 401
            
        except:
            return {"message": 'Unauthorized'}, 401
        
        # Update the user login info
        kwargs.update({'claims': valid['data']})

        return function(**kwargs)
     
    return wraped_access

def admin_required(function):
    """
    Decorator to check if a user is logged in and him role is admin.

    Args:
        function (callable): The function to be wrapped.

    Returns:
        callable: The wrapped function.

    Raises:
        KeyError: If the 'Authorization' header is not found in the request.
        Exception: If there is an error while verifying the token.
    """
    @functools.wraps(function)
    def wraped_access(**kwargs):

        try:

            token = request.headers['Authorization']
            token = token.replace("Bearer","").replace(" ","")

            # Call the function to validate token
            valid = verify_token(token, True)

            logger.info(valid)

            if not valid['status'] or valid['data']['role'] != 'admin':
                return {"message": 'Unauthorized'}, 401
            
        except:
            return {"message": 'Unauthorized'}, 401
        
        # Update the user login info
        kwargs.update({'claims': valid['data']})

        return function(**kwargs)
    return wraped_access