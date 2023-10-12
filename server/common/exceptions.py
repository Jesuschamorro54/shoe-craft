import json
import re

def UnauthorizedCreationException(args=None):
    return {
        'statusCode': 200,
        'body': json.dumps({
            'status': False,
            'result': 'UnauthorizedCreationException',
            'errorMessage': 'Your has not authorization to perform this operation',
        })
    }


def InsufficientParametersException(missing_fields=None):
    return {
        'statusCode': 200,
        'body': json.dumps({
            'status': False,
            'result': 'InsufficientParametersException',
            'errorMessage': 'You passed insufficient parameters to this method.',
            'missingFields': list(missing_fields) if missing_fields else []
        })
    }

def PyMysqlIntegrityError(error):
    
    error_message = "Could not execute query to MySQL instance"

    # Define a regular expression pattern to extract the error details
    pattern = r"\((\w+)\) \((\d+), \"(.+?)\"\)"

    # Use re.search to find the pattern in the error string
    
    match = str(error.args[0]).replace('(', '').split(') ')

    error_message = match[1].replace(')', '').split(',')[1]

    print(error_message)

    error_data = {
        'statusCode': 200,
        'body': json.dumps({ 
            'status': False, 
            'result': 'PyMysqlIntegrityError',
            'errorMessage': error_message, 
        }, default=str)
    }

    


    return error_data


