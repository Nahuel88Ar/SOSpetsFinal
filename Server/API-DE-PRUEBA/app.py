from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow

app = Flask(__name__)
CORS(app)

app.config["SQLALCHEMY_DATABASE_URI"] = "mysql+pymysql://root:12345678@localhost/prueba2"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
db = SQLAlchemy(app)
ma = Marshmallow(app)

class Refugio(db.Model):  
    
    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(45))
    domicilio = db.Column(db.String(45))
    ciudad = db.Column(db.String(45))
    provincia = db.Column(db.String(45))

    def __init__(self, nombre, domicilio, ciudad, provincia):
        self.nombre = nombre
        self.domicilio = domicilio
        self.ciudad = ciudad
        self.provincia = provincia

with app.app_context():
    db.create_all() 

class RefugioSchema(ma.Schema):
    class Meta:
        fields = ("id", "nombre", "domicilio", "ciudad", "provincia")

refugio_schema = RefugioSchema()  
refugios_schema = RefugioSchema(many=True)

@app.route("/refugios", methods=["GET"])
def get_Refugios():
    all_refugios = Refugio.query.all()  
    result = refugios_schema.dump(all_refugios)  
    return jsonify(result) 

@app.route("/refugios/<id>", methods=["GET"])
def get_refugio(id):
    refugio = Refugio.query.get(id)  
    return refugio_schema.jsonify(refugio)  

@app.route("/refugios/<id>", methods=["DELETE"])
def delete_producto(id):
    refugio = Refugio.query.get(id) 
    db.session.delete(refugio)
    db.session.commit() 
    return refugio_schema.jsonify(refugio)

@app.route("/refugios", methods=["POST"]) 
def create_producto():
    nombre = request.json["nombre"]  
    domicilio = request.json["domicilio"]  
    ciudad = request.json["ciudad"] 
    provincia = request.json["provincia"] 
    new_refugio = Refugio(nombre, domicilio, ciudad, provincia)
    db.session.add(new_refugio)
    db.session.commit()
    return refugio_schema.jsonify(new_refugio)

@app.route("/refugios/<id>", methods=["PUT"])
def update_refugio(id):
    
    refugio = Refugio.query.get(id)

    refugio.nombre = request.json["nombre"]
    refugio.domicilio = request.json["domicilio"]
    refugio.ciudad = request.json["ciudad"]
    refugio.provincia = request.json["provincia"]

    db.session.commit()  
    return refugio_schema.jsonify(refugio)  

# Programa Principal
if __name__ == "__main__":
    # Ejecuta el servidor Flask en el puerto 5000 en modo de depuración
    app.run(debug=True, port=5000)