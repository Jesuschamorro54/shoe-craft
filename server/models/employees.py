from datetime import datetime
from config.configure import ma, db, app
from marshmallow import fields, validate


class Employees(db.Model):
    __tablename__ = 'employees'

    id = db.Column(db.Integer, primary_key = True)
    dni = db.Column(db.String(50), unique=True)
    name = db.Column(db.String(50))
    password = db.Column(db.String(150))
    email = db.Column(db.String(50))
    state = db.Column(db.Integer, default=1)
    role = db.Column(db.Enum('admin', 'cutter', 'trimmer', 'assembler' ))
    creation = db.Column(db.DateTime(), default=datetime.utcnow())

    def __init__(self, dni, name, email, password, role):
        self.dni = dni
        self.name = name
        self.email = email
        self.password = password
        self.role = role

    def to_dict(self):
        return {column.name: getattr(self, column.name) for column in self.__table__.columns}

with app.app_context():
    db.create_all()

class EmployeesSchema(ma.Schema):

    id = fields.Int(dump_only=True) 
    dni = fields.Str(required=True, validate=validate.Length(min=1, max=15))
    name = fields.Str(required=True, validate=validate.Length(min=1, max=50))
    email = fields.Email(required=True)
    password = fields.Str(required=True, validate=validate.Length(min=6, max=150))
    state = fields.Int()
    role = fields.Str(required=True, validate=validate.OneOf(['admin', 'cutter', 'trimmer', 'assembler']))
    creation = fields.Date()

    class Meta:
        fields = ('id', 'dni', 'name', 'email', 'password', 'state', 'role', 'creation')