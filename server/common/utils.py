import jwt
import inspect
from config.configure import db
from datetime import datetime, timedelta, timezone
from sqlalchemy import and_, or_, update

SECRET_KEY = "a6U7MEQ6rzasJz4A"


from common.CustomLoggin import Logger

logger = Logger()

def jwt_token_generate(payload: dict):
    """
    Generates a JWT token with the provided payload.

    Args:
        :payload (dict): A dictionary containing the user's information.

    Returns:
        dict: A dictionary containing information about the generated token.
    """
    try:

        user = payload.copy()
        user.update({
            "id": payload['id'],
            "dni": payload['dni'],
            "role": payload['role'],
            "exp": due_date_generate(days=1, seconds=30),
        })

        user['creation'] = user["creation"].strftime('%Y-%m-%d %H:%M:%S')

        logger.info(user)
        
        token = jwt.encode(user, SECRET_KEY, algorithm="HS256")

        userSession = {
            "status": True,
            "userSession": 1,
            "idToken": token,
            "payload": payload,
            "message": "Successfully generated token",   
        }

        # logger.info(userSession)

        return userSession

    except Exception as e:
        return map_error(e, "Error generating token", "GenerateTokenException", 500)


def verify_token(token, signature=False) -> dict:
    """
    Verifies the authenticity of a JWT token.

    Args:
        token (str): The JWT token to be verified.

    Returns:
        dict: A dictionary indicating the result of the token verification.
    """
    
    try:

        is_valid = jwt.decode(token, SECRET_KEY, algorithms="HS256")
        
        if is_valid:
            
            logger.info("Valid Token")

            response = {
                "status": True,
                "message": "Token verification successful",
                "data": is_valid,
            }

            return response 
        else:
            raise ValueError([])
        
    except ValueError as e:
        return map_error(e, "Invalid Token", "InvalidTokenError", 102)
    except jwt.ExpiredSignatureError as e:
        return map_error(e, "Expired token", "ExpiredSignatureError", 101)
    except jwt.exceptions.InvalidSignatureError as e:
        return map_error(e, "Token signature is invalid", "InvalidSignatureError", 102)
    except jwt.exceptions.InvalidTokenError as e:
        return map_error(e, "Invalid Token", "InvalidTokenError", 102)
    except jwt.exceptions.InvalidKeyError as e:
        return map_error(e, "Invalid Token Secret Key", "InvalidKeyError", 102)
    

def due_date_generate(days=0, hours=0, minutes=0, seconds=60) -> float:

    """
    Generates a due date based on the specified time intervals.

    Args:
        days (int, optional): Number of days. Defaults to 0.
        hours (int, optional): Number of hours. Defaults to 0.
        minutes (int, optional): Number of minutes. Defaults to 0.
        seconds (int, optional): Number of seconds. Defaults to 60.

    Returns:
        float: The timestamp of the due date.
    """

    current_date = datetime.now(tz=timezone.utc)
    due_time = timedelta(days, hours, minutes, seconds)
    due_date = datetime.timestamp(current_date + due_time)

    return due_date


def map_error(error, message, error_message, error_code=None) -> dict:

    """
    Maps an error to a structured response format.

    Args:
        error (Exception): The raised exception.
        message (str): A descriptive message for the response.
        error_message (str): An error identifier for the response.
        error_code (int, optional): An error code. Defaults to None.

    Returns:
        dict: A structured response indicating the error.
    """

    jwt_error = bool(len(error.args) > 1)

    logger.error(error.args[1] if jwt_error else error.args[0], errorMessage=error_message)

    response = {
        "status": False,
        "errorMessage": error_message,
        "message": message,
    }


    return response


def list_to_listdict(fields, data: list):
    
    field_names = [str(field).split('.')[1] for field in fields ]
    data_return = []

    for item in data:
        new_item = {}
        for i, value in enumerate(item):
            new_item.update({field_names[i]: value})
            # print(f"{field_names[i]}: {value}")

        data_return.append(new_item)

    return data_return


def build_filters(Table, params):
    filters = []
    dates_range = params.pop('dates', None)
    init = params.pop('init', None)
    end = params.pop('end', None)

    table_name = Table.__name__

    for key, value in params.items():
        
        attribute = getattr(Table, key, None)

        if attribute is not None:
            filters.append(attribute == value)

    if dates_range:
        date_column = getattr(Table, 'date', None)  # Reemplaza 'date' con el nombre de tu columna de fecha
        if date_column is not None:
            date_range_condition = False
            if init and end:
                date_range_condition = and_(date_column >= init, date_column <= end)
            elif init:
                date_range_condition = date_column >= init
            elif end:
                date_range_condition = date_column <= end

            if date_range_condition is not None:
                filters.append(date_range_condition)

    if table_name == 'Employees':
        filters.append(Table.role != 'admin')

    return filters


def search(Table, params, fields=None):
    filters = build_filters(Table, params)
    if fields:
        result = list_to_listdict(fields, db.session.query(*fields).filter(*filters).all())
    else: 
        fields = [attr for attr in dir(Table) if not attr.startswith("_")]
        items = db.session.query(Table).filter(*filters).all()

        result = [item.to_dict() for item in items]

    return result


def xupdate(Table, params, data):

    result = {'status': False, 'row_affect': 0}

    action = update(Table)
    filters = build_filters(Table, params)

    statement = action.where(*filters).values(**data)
    
    execution = db.session.execute(statement)
    db.session.commit()

    if execution.rowcount > 0:
        print("entree")
        result.update({ 'status': True, 'row_affect': execution.rowcount })

    return result

def delete(Table, params):

    result = {'status': False, 'row_affect': 0}
    
    filters = build_filters(Table, params)

    item = db.session.query(Table).filter(*filters).first()

    if item:
        db.session.delete(item)
        db.session.commit()

        if not db.session.is_modified(item):
            result.update({ 'status': True, 'row_affect': 1 })

    return result

def insert(Table, data):

    result = {'status': False, 'data': {} }

    item = Table(**data)
    db.session.add(item)
    db.session.commit()

    if item.id:
        result.update({
            'status': True,
            'data': item.to_dict()
        })

    return result

def get_object(Table, params):
    result = {'row_affect': 0}
    filters = build_filters(Table, params)
    item = db.session.query(Table).filter(*filters).first()

    return item