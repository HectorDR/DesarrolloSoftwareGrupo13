import Express from 'express';
import { queryAllproducts, crearProducto, editarProducto, eliminarProducto } from '../../controllers/productos/controller.js';



const rutasProducto = Express.Router();

const genericCallback = (res)=>(err, result)=>{
    if (err){
      res.status(500).send('Error consultado los productos');
    }
    else{
      res.json(result);
    }
  };


rutasProducto.route('/productos').get((req, res)=>{
  console.log("alguien hizo get en la ruta /productos"); //con find puedo hacer los filtros eje por id o nombre o fecha
  
  queryAllproducts(genericCallback(res));
});

rutasProducto.route("/productos/nuevo").post((req, res)=>{
  //implementar codigo para crear producto en la base de datos
  crearProducto(req.body,genericCallback(res));
});

rutasProducto.route('/productos/editar').patch((req,res)=>{
editarProducto(req.body,genericCallback(res));

});

//Eliminar
rutasProducto.route('/productos/eliminar').delete((req,res)=>{
  eliminarProducto(req.body.id,genericCallback(res))

});

export default rutasProducto;

