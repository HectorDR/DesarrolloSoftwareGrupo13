//hacer el import de express
//const express = require('express');
//escribiento type:module en el package.json se puede hacer el import tradicional 


import Express from 'express';
import { MongoClient,ObjectId } from 'mongodb';
import  Cors from 'cors';

// crear una instancia de la clase mongodb
const stringConexion = 'mongodb+srv://HectorDB:base123@gsussurvivors.5aqj3.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

const client = new MongoClient(stringConexion,{
  useNewUrlParser:true,
  useUnifiedTopology:true,
});
let baseDeDatos;
const app = Express();
//para poder recibir la informacion en json y luego enviarla hay que usar Express.json
app.use(Express.json());
app.use(Cors());

app.get('/productos',(req, res)=>{
  console.log("alguien hizo get en la ruta /productos"); //con find puedo hacer los filtros eje por id o nombre o fecha
  baseDeDatos.collection("producto").find({}).limit(50).toArray((err,result)=>{
    if (err){
      res.status(500).send('Error consultado los productos');
    }
    else{
      res.json(result);
    }
  });
});

app.post("/productos/nuevo",(req, res)=>{
  //implementar codigo para crear producto en la base de datos
  const datosProducto = req.body;
  console.log('llaves ',Object.keys(datosProducto));

  try{
  if (Object.keys(datosProducto).includes('idproducto') &&
      Object.keys(datosProducto).includes('nombre') &&
      Object.keys(datosProducto).includes('cantidad') &&
      Object.keys(datosProducto).includes('fecha') &&
      Object.keys(datosProducto).includes('preciou') 
      ){
       //implementar codigo para crear producto en la BD
       baseDeDatos.collection('producto').insertOne(datosProducto,(err, result)=>{
        if(err){
          console.error(err);
          res.sendStatus(500);
        }
        else{
        console.log(result);
        res.sendStatus(200);
      }
    });
    }else {

      res.sendStatus(500);
    }
  }catch{
    res.sendStatus(500);
  }
});

app.patch('/productos/editar',(req,res)=>{
const edicion = req.body;
console.log(edicion);
const filtroProducto = {_id: new ObjectId(edicion.id)};
delete edicion.id;
const operacion = {
  $set:edicion,
}
baseDeDatos.collection('producto').findOneAndUpdate(filtroProducto,operacion,{upsert:true, returnOriginal:true}, (err,result)=>{
if(err){
console.error("error actualizando el vehiculo",err);
res.sendStatus(500);
}
else{
  console.log("actualizado con exito");
  res.sendStatus(200);
}

});

});

//Eliminar
app.delete('/productos/eliminar',(req,res)=>{
  const filtroProducto = {_id: new ObjectId(req.body.id)};
  baseDeDatos.collection('producto').deleteOne(filtroProducto,(err,result)=>{
    if (err){
      console.error(err);
      res.sendStatus(500);
    }
    else{
      console.log("eliminado con exito");
      res.sendStatus(200);
    }
  });

});




//una vez que se crea la bd y se le dan los caminos se debe conectar para ello se crea la sgte funcion

const main =()=>{
  client.connect((err,db)=>{
    if(err){
      console.error('Error conectando a la base de datos');
      return 'error';
    }
    baseDeDatos = db.db('productos');
    console.log('baseDeDatos exitosa');
  
  return app.listen(5000, ()=> {
    console.log('escuchando puerto 5000');
  });
});
};

main();


