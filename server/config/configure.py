from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
import os

app = Flask(__name__)

if os.environ.get('APP_ENV') == 'production':
    
    print("\n:: Runing on production:: \n")

    host = 'Jesusthor.mysql.pythonanywhere-services.com'
    user = 'Jesusthor'
    password = 'Jesuschamorro54'
    name_database = 'Jesusthor$shoe_craft'
    app.config['SQLALCHEMY_DATABASE_URI'] = f'mysql+pymysql://{user}:{password}@{host}/{name_database}'

else:
    
    print("\n:: Runing on develop ::\n")

    app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:20023006@localhost/shoe_craft'


app.config['SQLALCHEMY_TRACK_MODIFACATIONS'] = False
app.secret_key = "WebAvanzada_a6U7MEQ6rzasJz4A"

# Creamos los objetos de bd

db = SQLAlchemy(app)
ma = Marshmallow(app)


