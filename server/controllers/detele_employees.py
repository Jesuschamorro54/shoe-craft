import json
import pymysql
from common.utils import build_filters, list_to_listdict, search, delete

from config.configure import db
from common.exceptions import *
from common.CustomLoggin import Logger
from models.employees import Employees, EmployeesSchema
from werkzeug.security import check_password_hash


employee_schema = EmployeesSchema()
employees_schemas = EmployeesSchema(many=True)
logger = Logger()

execution_message = '''

    Parameters: {0}
'''

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

        params['id']

        logger.info(execution_message.format(set(params)))

    except Exception as e:
        logger.error(e)
        return InsufficientParametersException()

    result = { 'status': False,  'data': [] }
    
    
    result = delete(Employees, params)
    

    if not result['status']:

        result.update({
            'status': False,
            'data': [],
            'error': 'ResourceNotFoundException',
            'errorMessage': 'The user does not exists.'
        })

    return {
        'statusCode': 200,
        'body': json.dumps(result, default=str)
    }