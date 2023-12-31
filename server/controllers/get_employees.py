import json
import pymysql
from common.utils import search

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

fields = (
    Employees.id,
    Employees.dni, 
    Employees.email,
    Employees.name,
    Employees.role
)

def main(event):
    try:

        # logger.info(event)
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

    except Exception as e:
        return InsufficientParametersException()

    result = { 'status': False,  'data': [] }
     
    result['data'] = search(Employees, params, fields)


    if result['data']:
        result['status'] = True
    else:
        result.update({
            'status': False,
            'data': [],
            'error': 'ResourceNotFoundException',
            'errorMessage': 'The user does not exists or role(s) are admin'
        })

    return {
        'statusCode': 200,
        'body': json.dumps(result, default=str)
    }