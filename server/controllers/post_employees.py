import json
import pymysql

from config.configure import db
from common.exceptions import *
from common.CustomLoggin import Logger
from common.utils import SECRET_KEY
from models.employees import Employees, EmployeesSchema
from werkzeug.security import generate_password_hash


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
        user = event['authorizer']['jwt']

        has_error = employee_schema.validate(data)

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

    
    data['password'] = generate_password_hash(data['password'], method='pbkdf2:sha256')
    
    try:
        
        user_data = Employees(**data)
        db.session.add(user_data)
        db.session.commit()

    except Exception as e:
        return PyMysqlIntegrityError(e)

    result = {'status': True, 'data': user_data.to_dict()}

    return {
        'statusCode': 200,
        'body': json.dumps(result, default=str)
    }