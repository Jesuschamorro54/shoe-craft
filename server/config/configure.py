from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow

app = Flask(__name__)

# PRODUCTION
# host = 'Jesusthor.mysql.pythonanywhere-services.com'
# user = 'Jesusthor'
# password = 'Jesuschamorro54'
# name_database = 'Jesusthor$shoe_craft'

# # Creamos las credenciales para conectarnos a la bd
# app.config['SQLALCHEMY_DATABASE_URI'] = f'mysql+pymysql://{user}:{password}@{host}/{name_database}'
# app.config['SQLALCHEMY_TRACK_MODIFACATIONS'] = False


# DEVELOP
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:20023006@localhost/shoe_craft'
app.config['SQLALCHEMY_TRACK_MODIFACATIONS'] = False

app.secret_key = "WebAvanzada_a6U7MEQ6rzasJz4A"

# Creamos los objetos de bd

db = SQLAlchemy(app)
ma = Marshmallow(app)


