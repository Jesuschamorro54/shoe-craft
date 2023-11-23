import json
import pymysql
from common.utils import search

from config.configure import db
from common.exceptions import *
from common.CustomLoggin import Logger
from models.packages import Packages, PackagesSchema
from models.products import Products


package_schema = PackagesSchema()
packages_schemas = PackagesSchema(many=True)
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

        if user['role'] != 'admin':
            params.update({'employee_id': user['id']})

        logger.info(execution_message.format(set(params)))

    except Exception as e:
        logger.error(e)
        return InsufficientParametersException()

    result = { 'status': False,  'data': [] }
    
    result['data'] = search(Packages, params, fields)
    # logger.info(result)


    if result['data']:
        result['status'] = True 
    else:
        result.update({
            'status': False,
            'data': [],
            'error': 'ResourceNotFoundException',
            'errorMessage': 'The packages does not exists.'
        })

    return {
        'statusCode': 200,
        'body': json.dumps(result, default=str)
    }