from datetime import datetime
from config.configure import ma, db, app
from marshmallow import fields, validate


class Packages(db.Model):
    __tablename__ = 'packages'

    id = db.Column(db.Integer, primary_key = True)
    employee_id = db.Column(db.Integer, db.ForeignKey('employees.id'))

    name = db.Column(db.String(50))
    total_cost = db.Column(db.Double, default=0)
    total_products = db.Column(db.Integer, default=0)
    state = db.Column(db.Integer, default=1)
    date = db.Column(db.DateTime(), default=datetime.utcnow())

    def __init__(self, employee_id, name, total_cost):
        self.employee_id = employee_id
        self.name = name
        self.total_cost = total_cost

    def to_dict(self):
        return {column.name: getattr(self, column.name) for column in self.__table__.columns}

with app.app_context():
    db.create_all()

class PackagesSchema(ma.Schema):

    id = fields.Int(dump_only=True) 
    employee_id = fields.Int(required=True)
    name = fields.Str()
    total_cost = fields.Float()
    total_products = fields.Int()
    state = fields.Int()
    date = fields.Date()

    class Meta:
        fields = ('id', 'employee_id', 'name', 'total_cost', 'total_products', 'state', 'date')