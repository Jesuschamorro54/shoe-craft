from datetime import datetime
from config.configure import ma, db, app
from marshmallow import fields, validate


class Products(db.Model):
    __tablename__ = 'products'

    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String(50))
    cost = db.Column(db.Double, default=0)
    creation = db.Column(db.DateTime(), default=datetime.utcnow())
    image = db.Column(db.String)

    def __init__(self, name, cost, image=""):
        self.name = name
        self.cost = cost
        self.image = image

    def to_dict(self):
        return {column.name: getattr(self, column.name) for column in self.__table__.columns}

with app.app_context():
    db.create_all()

class ProductsSchema(ma.Schema):

    id = fields.Int(dump_only=True)
    name = fields.Str(required=True, validate=validate.Length(min=1, max=50))
    cost = fields.Float()
    image = fields.Str()

    class Meta:
        fields = ('id', 'name', 'cost', 'image')