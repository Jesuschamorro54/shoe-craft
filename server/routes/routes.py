import functools
from flask import Request, jsonify, request
from common.jwt_utils import jwt_token_generate, verify_token


def generate_event(request: Request) -> dict:
    event = {
        'body': request.json if request.method == 'POST' else None,
        'queryStringParameters': dict(request.args),
        'pathParameters': request.view_args,
        'request': {
            'headers': dict(request.headers),
            'ip_client': request.remote_addr,
            'cookies': dict(request.cookies),
            'method': request.method
        }
    }

    return event


def generate_token():
    
    data = {
        "id": 1234,
        "dni": 1002159985,
        "role": 'admin',
        "password": 'jesus123',
    }

    api_session = jwt_token_generate(data)

    return api_session



def loggin_required(function):
    
    @functools.wraps(function)
    def wraped_access(*args, **kwargs):

        try:

            token = request.headers['Authorization']
            token = token.replace("Bearer","").replace(" ","")

            # Call the function to validate token
            valid = verify_token(token)

            if not valid['status']:
                return {"message": 'Unauthorized'}, 401
            
        except:
            return {"message": 'Unauthorized'}, 401
        

        return function(*args)
     
    return wraped_access