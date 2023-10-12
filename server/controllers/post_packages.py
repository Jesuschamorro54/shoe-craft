import json
from math import ceil
import pymysql
import datetime

from config.configure import db
from common.exceptions import *
from common.CustomLoggin import Logger
from common.utils import search, get_object
from models.packages import Packages, PackagesSchema
from models.products import Products


package_schema = PackagesSchema()
packages_schemas = PackagesSchema(many=True)
logger = Logger()

execution_message = '''

    Data: {0}
'''

def main(event):
    try:

        logger.info(event['body'])

        data = event['body']['data']
        user = event['authorizer']['jwt']

        has_error = package_schema.validate(data)

        if has_error:
            raise AttributeError()
        
        logger.info(execution_message.format(set(data)))

    except AttributeError as e:
        return InsufficientParametersException(has_error.keys())
    except Exception as e:
        logger.error(e)

    data_post = []

    params = {
        'employee_id': data['employee_id'],
        'product_id': data['product_id'],
        'state': 0,
    }

    product = search(Products, {'id': params['product_id']})
    incomplete_package = search(Packages, params)
    print(incomplete_package)

    if not incomplete_package:
        data_post = distribute_total_products(data, product)
    else:
        print("ENCONTRADO")
        item = incomplete_package[0]
        package = Packages.query.get(item['id']) 
        available = 12 - item['total_products']

        item['total_products'] = item['total_products'] + data['total_products'] if available >= data['total_products'] else 12
        
        package.total_products = item['total_products']
        package.total_cost = item['total_products'] * product[0]['cost']
        package.state = 1 if item['total_products'] == 12 else 0

        db.session.add(package)
        db.session.commit()
        data_post.append(package.to_dict())


        data['total_products'] = data['total_products'] - available # Overflow

        data_post += distribute_total_products(data, product)

    result = {'status': True, 'data': data_post}

    return {
        'statusCode': 200,
        'body': json.dumps(result, default=str)
    }


def distribute_total_products(data, product):
    result = []
    for i in range(0, ceil(data['total_products']/12)):

        

        if data['total_products'] <= 12:
            
            data['name'] += ref()
            data['state'] = 1 if data['total_products'] == 12 else 0
            data['total_cost'] = data['total_products'] * product[0]['cost']
            # Lo hago una vez
            data_post = Packages(**data)
            db.session.add(data_post)
            db.session.commit()
            result.append(data_post.to_dict())
            
            break

        # Inserto el registro con 12
        complete = data.copy()

        complete.update({
            'total_products': 12,
            'name': ref(),
            'state': 1,
            'total_cost': complete['total_products'] * product[0]['cost'],
            'date': datetime.datetime.utcnow()
        })

        data_post = Packages(**complete)
        db.session.add(data_post)
        db.session.commit()
        result.append(data_post.to_dict())

        # Calculo restantes
        data['total_products'] -= 12 

    return result

import random

def ref():
    longitud = 5

    # Define los caracteres válidos para la cadena aleatoria
    caracteres_validos = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"

    # Genera una cadena aleatoria
    result = ''.join(random.choice(caracteres_validos) for _ in range(longitud))
    return f"_REF:{result}"