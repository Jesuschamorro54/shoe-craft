import json
from models.employees import Employees, EmployeesSchema
from config.configure import db


employee_schema = EmployeesSchema()
employees_schemas = EmployeesSchema(many=True)

def main(event):
    # try:

    #     data = event['data']
    #     employee_schema.validate(data)
        
    # except:
    #     pass

    

    # user = Employees(**data)

    # db.session.add(user)
    # db.session.commit()

    result = {'status': True, 'data': {}}

    return {
        'statusCode': 200,
        'body': json.dumps(result, default=str)
    }