import json
import pymysql

from config.configure import db
from common.exceptions import *
from common.CustomLoggin import Logger
from common.utils import SECRET_KEY
from models.payments import Payments, PaymentsSchema
from models.pay_datails import PayDetails, PayDetailsSchema
from werkzeug.security import generate_password_hash


payment_schema = PaymentsSchema()
payments_schema = PaymentsSchema(many=True)

pay_details_schema = PaymentsSchema()
pay_details_schema = PayDetailsSchema(many=True)

logger = Logger()

execution_message = '''

    Data: {0}
'''

def main(event):
    try:

        # logger.info(event)

        data = event['body']['data']
        details = data.pop('details')
        user = event['authorizer']['jwt']

        has_error = payment_schema.validate(data)
        
        logger.info(has_error)
        logger.info(data)


        if has_error:
            raise AttributeError()
        

        authorized = user['role'] == 'admin'
        if not authorized:
            raise PermissionError()


        logger.info(execution_message.format(set(data)))

    except PermissionError as e:
        return UnauthorizedCreationException()

    except Exception as e:
        logger.error(e)
        return InsufficientParametersException(has_error.keys())
    
    try:

        payment_data = Payments(**data)
        db.session.add(payment_data)
        db.session.commit()

        total_payment = 0
        details_data = []
        for detail in details:
            total_payment += detail['value']

            detail['payment_id'] = payment_data.id

            detail_data = PayDetails(**detail)
            db.session.add(detail_data)

            db.session.commit()


            details_data.append(detail_data.to_dict())

        payment_data.total = total_payment

        logger.info(f"Payment: { payment_data.to_dict() }")

    except Exception as e:
        return PyMysqlIntegrityError(e)

    data_to_return = {
        **payment_data.to_dict(),
        'details': details_data
    }

    result = {'status': True, 'data': data_to_return }

    return {
        'statusCode': 200,
        'body': json.dumps(result, default=str)
    }