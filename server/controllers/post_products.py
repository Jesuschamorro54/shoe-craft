import json
import pymysql

from config.configure import db
from common.exceptions import *
from common.CustomLoggin import Logger
from common.utils import insert
from models.products import Products, ProductsSchema
from werkzeug.security import generate_password_hash


product_schema = ProductsSchema()
products_schemas = ProductsSchema(many=True)
logger = Logger()

execution_message = '''

    Data: {0}
'''

def main(event):
    try:

        # logger.info(event)

        data = event['body']['data']
        user = event['authorizer']['jwt']

        has_error = product_schema.validate(data)

        if has_error:
            raise AttributeError()
        

        authorized = user['role'] == 'admin'
        if not authorized:
            raise PermissionError()


        logger.info(execution_message.format(set(data)))

    except PermissionError as e:
        return UnauthorizedCreationException()

    except Exception as e:
        return InsufficientParametersException(has_error.keys())
    
    try:
        
        result = insert(Products, data)

    except Exception as e:
        return PyMysqlIntegrityError(e)

    result = {'status': True, 'data': result}

    return {
        'statusCode': 200,
        'body': json.dumps(result, default=str)
    }