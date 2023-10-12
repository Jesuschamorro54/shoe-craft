from datetime import datetime
from config.configure import ma, db, app
from marshmallow import fields, validate


class PackagesDetails(db.Model):
    __tablename__ = 'packages_details'

    id = db.Column(db.Integer, primary_key = True)
    package_id = db.Column(db.Integer, db.ForeignKey('packages.id'))
    product_id = db.Column(db.Integer, db.ForeignKey('products.id'))
    state = db.Column(db.Integer, default=1)
    date = db.Column(db.DateTime(), default=datetime.utcnow())

    def __init__(self, payment_id, package_id):
        self.payment_id = payment_id
        self.package_id = package_id

    def to_dict(self):
        return {column.name: getattr(self, column.name) for column in self.__table__.columns}

with app.app_context():
    db.create_all()

class PackagesDetailsSchema(ma.Schema):

    id = fields.Int(dump_only=True) 
    package_id = fields.Int(required=True)
    payment_id = fields.Int(required=True)
    state = fields.Int()
    date = fields.Date()

    class Meta:
        fields = ('id', 'package_id', 'payment_id', 'state', 'date')