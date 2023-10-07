from datetime import datetime
from config.configure import ma, db, app
from sqlalchemy import Enum


class Employees(db.Model):
    __tablename__ = 'employee'

    id = db.Column(db.Integer, primary_key = True)
    dni = db.Column(db.String(50))
    name = db.Column(db.String(50))
    email = db.Column(db.String(50))
    password = db.Column(db.String(150))
    state = db.Column(db.Integer)
    password = db.Column(db.String(150))
    role = db.Column(db.Enum('admin', 'cutter', 'trimmer', 'assembler' ))
    creation = db.Column(db.Date)

    def __init__(self):
       pass

with app.app_context():
    db.create_all()

class EmployeesSchema(ma.Schema):
    class Meta:
        fields = ('id', 'dni', 'nombre', 'email', 'password', 'state', 'password', 'role', 'creation')