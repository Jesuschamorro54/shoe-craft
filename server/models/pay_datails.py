from datetime import datetime
from config.configure import ma, db, app
from marshmallow import fields, validate


class PayDetails(db.Model):
    __tablename__ = 'payment_details'

    id = db.Column(db.Integer, primary_key = True)
    package_id = db.Column(db.Integer, db.ForeignKey('packages.id'))
    payment_id = db.Column(db.Integer, db.ForeignKey('payments.id'))

    value = db.Column(db.Double, default=0)
    state = db.Column(db.Integer, default=1)
    date = db.Column(db.DateTime(), default=datetime.utcnow())

    def __init__(self, package_id, payment_id, value):
        self.payment_id = payment_id
        self.package_id = package_id
        self.value = value

    def to_dict(self):
        return {column.name: getattr(self, column.name) for column in self.__table__.columns}

with app.app_context():
    db.create_all()

class PayDetailsSchema(ma.Schema):

    id = fields.Int(dump_only=True) 
    package_id = fields.Int(required=True)
    payment_id = fields.Int(required=True)
    value = fields.Float()
    state = fields.Int()
    date = fields.Date()

    class Meta:
        fields = ('id', 'package_id', 'payment_id', 'value', 'state', 'date')