import json
import pymysql
from common.utils import search

from config.configure import db
from common.exceptions import *
from common.CustomLoggin import Logger
from models.payments import Payments, PaymentsSchema
from models.pay_datails import PayDetails
from models.employees import Employees
from werkzeug.security import check_password_hash


employee_schema = PaymentsSchema()
employees_schemas = PaymentsSchema(many=True)
logger = Logger()

execution_message = '''

    Parameters: {0}
'''

fields = (
    Payments.date,
    Payments.id,
    Payments.employee_id,
    Payments.state,
    Payments.total
)

user_fields = (
    Employees.name,
    Employees.dni,
    Employees.image,
    Employees.role,
    Employees.id
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
     
    payments = search(Payments, params)

    for payment in payments:

        params = {'payment_id': payment['id']}
        user_params = {'id': payment['employee_id']}

        detail = search(PayDetails, params)
        user = search(Employees, user_params, user_fields)

        payment.update({'details': detail, 'user': user})

    result['data'] = payments

    if result['data']:
        result['status'] = True
    else:
        result.update({
            'status': False,
            'data': [],
            'error': 'ResourceNotFoundException',
            'errorMessage': 'The payments does not exists or role(s) are admin'
        })

    return {
        'statusCode': 200,
        'body': json.dumps(result, default=str)
    }