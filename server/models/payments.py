from datetime import datetime
from config.configure import ma, db, app
from marshmallow import fields, validate


class Payments(db.Model):
    __tablename__ = 'payments'

    id = db.Column(db.Integer, primary_key = True)
    employee_id = db.Column(db.Integer, db.ForeignKey('employees.id'))
    total = db.Column(db.Double, default=0)
    state = db.Column(db.Integer, default=1)
    date = db.Column(db.DateTime(), default=datetime.utcnow())

    def __init__(self, employee_id):
        self.employee_id = employee_id

    def to_dict(self):
        return {column.name: getattr(self, column.name) for column in self.__table__.columns}

with app.app_context():
    db.create_all()

class PaymentsSchema(ma.Schema):

    id = fields.Int(dump_only=True)
    employee_id = fields.Int(required=True)

    total = fields.Float()
    state = fields.Int()
    date = fields.Date()

    class Meta:
        fields = ('id', 'employee_id', 'state', 'date')