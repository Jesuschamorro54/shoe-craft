import json
import pymysql
from common.utils import search

from config.configure import db
from common.exceptions import *
from common.CustomLoggin import Logger
from models.products import Products, ProductsSchema
from models.products import Products


product_schema = ProductsSchema()
products_schemas = ProductsSchema(many=True)
logger = Logger()

execution_message = '''

    Parameters: {0}
'''

fields = None

def main(event):
    try:
        params = {}

        # check optional pathParameters
        if 'pathParameters' in event:
            path = event['pathParameters']
            params.update({ k:json.loads(v) for k, v in path.items() })
        
        # check optional queryParameters
        if 'queryStringParameters' in event:
            query = event['queryStringParameters']
            params.update({ k:json.loads(v) for k, v in query.items() })


        user = event['authorizer']['jwt']        

        authorized = user['role'] == 'admin'
        if not authorized:
            raise PermissionError()

        logger.info(execution_message.format(set(params)))

    except PermissionError as e:
        return UnauthorizedCreationException()
    
    except Exception as e:
        logger.error(e)
        return InsufficientParametersException()

    result = { 'status': False,  'data': [] }
    
    result['data'] = search(Products, params, fields)
    # logger.info(result)


    if result['data']:
        result['status'] = True
    else:
        result.update({
            'status': False,
            'data': [],
            'error': 'ResourceNotFoundException',
            'errorMessage': 'The Products does not exists.'
        })

    return {
        'statusCode': 200,
        'body': json.dumps(result, default=str)
    }