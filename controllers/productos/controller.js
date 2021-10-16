import { ObjectId } from 'mongodb';
import { getDB} from  '../../db/db.js';

const queryAllproducts = async(callback)=>{
  const baseDeDatos = getDB();
  await baseDeDatos.collection("producto").find({}).limit(50).toArray(callback);
}

const crearProducto = async(datosProducto, callback)=>{
  
 
  if (Object.keys(datosProducto).includes('idproducto') &&
      Object.keys(datosProducto).includes('nombre') &&
      Object.keys(datosProducto).includes('cantidad') &&
      Object.keys(datosProducto).includes('fecha') &&
      Object.keys(datosProducto).includes('preciou') 
      ){
       //implementar codigo para crear producto en la BD
       const baseDeDatos = getDB();
       await baseDeDatos.collection('producto').insertOne(datosProducto,callback);
   
    }else {

      return "error";
    }

};

const editarProducto  = async(edicion, callback )=>{
  const filtroProducto = {_id: new ObjectId(edicion.id)};
  delete edicion.id;
  const operacion = {
    $set:edicion,
  };
  const baseDeDatos = getDB();
  await baseDeDatos.collection('producto').findOneAndUpdate(filtroProducto,operacion,{upsert:true, returnOriginal:true}, callback);

};

const eliminarProducto = async(id, callback )=>{
  const filtroProducto = {_id: new ObjectId(id)};
  const baseDeDatos = getDB();
  await baseDeDatos.collection('producto').deleteOne(filtroProducto,callback);
};

export {queryAllproducts,crearProducto, editarProducto ,eliminarProducto }