import json
import pymysql

from config.configure import db
from common.exceptions import *
from common.CustomLoggin import Logger
from common.jwt_utils import SECRET_KEY, jwt_token_generate
from models.employees import Employees, EmployeesSchema
from werkzeug.security import check_password_hash


employee_schema = EmployeesSchema()
employees_schemas = EmployeesSchema(many=True)
logger = Logger()

execution_message = '''

    Data: {0}
'''

def main(event):
    try:

        # logger.info(event)
        data = event['body']['data']
        params = {}

        logger.info(execution_message.format(set(data)))

    except Exception as e:
        return InsufficientParametersException()

    result = {
        'status': False, 
        "userSession": -1,
        "idToken": None,
        "payload": None,
        "message": ""
    }
    
    try:
        
        user = db.session.query(Employees).filter(Employees.dni == data['dni']).first()

        if user is not None:

            user = user.to_dict()

            if (check_password_hash(user.pop('password', ''), data['password'])):
                result = jwt_token_generate(user)

            else:   
                result['errorMessage'] = "PasswordAuthenticationError"
                result['message'] = "User password is invalid"
        else:
            result['errorMessage'] = "DniAuthenticationError"
            result['message'] = "User identification is incorrect"

    except Exception as e:
        return PyMysqlIntegrityError(e)

    result = {'status': True, 'data': result}

    return {
        'statusCode': 200,
        'body': json.dumps(result, default=str)
    }