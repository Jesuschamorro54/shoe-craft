import json

from config.configure import db
from common.exceptions import *
from common.CustomLoggin import Logger
from common.utils import get_object, xupdate
from models.products import Products, ProductsSchema


product_schema = ProductsSchema()
products_schemas = ProductsSchema(many=True)
logger = Logger()

execution_message = '''

    Data: {0}
'''

def main(event):
    try:

        logger.info(event)

        params = {}
        data = event['body']['data']

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
    

    statement = xupdate(Products, params, data)

    db.session.execute(statement)
    db.session.commit()

    result = {'status': True, 'row_affects': 1}

    return {
        'statusCode': 200,
        'body': json.dumps(result, default=str)
    }