
import React, { useEffect, useState, useRef,Fragment } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
// construccion de productos backend
const productosBackend = [
  {
    idproducto:  'PAP001'    , 
    nombre: 'Papel bond',
    cantidad: 15,
    fecha: '2021-05-15',
    preciou: 50000 ,
  },
  {
    idproducto:  'PAP002'    , 
    nombre: 'Papel  mache',
    cantidad: 20,
    fecha: '2021-08-23',
    preciou: 30000 ,
  },
  {
    idproducto:  'PAP003'    , 
    nombre: 'Papel roca',
    cantidad: 8,
    fecha: '2021-09-12',
    preciou: 8000 ,
  },
  {
    idproducto:  'PAP004'    , 
    nombre: 'Cartulina',
    cantidad: 8,
    fecha: '2021-10-05',
    preciou: 50000 ,
  },
  
];

//estados de productos

const Productos = () => {
const [mostrarTabla, setMostrarTabla] = useState(true);
const [productos, setProductos] = useState([]);
const [textoBoton, setTextoBoton] = useState('Crear Nuevo Producto');
const [colorBoton, setColorBoton] = useState('indigo');

//aqui se origina la pagina

useEffect(() => {
  //obtener lista de productos desde el backend
  setProductos(productosBackend);
}, []);
useEffect(() => { //cambio de colores del boton para alternar la tabla 
  if (mostrarTabla) {
    setTextoBoton('Crear Nuevo Producto');
    setColorBoton('indigo');
  } else {
    setTextoBoton('Mostrar Todos los productos');
    setColorBoton('green');
  }
}, [mostrarTabla]);
//este es el return de la funcion muestra la tabla o crea un vehiculo
return (
  <div className='flex h-full w-full flex-col items-center justify-start p-8'>
    <div className='flex flex-col'>
      <h2 className='text-3xl font-extrabold text-gray-900'class="card-title mb-1">
        Página de administración de Productos
      </h2>
      <button
        onClick={() => {
          setMostrarTabla(!mostrarTabla);
        }}
        className={`btn btn-primary btn-sm float-right p-2 rounded-full m-6 w-20 self-end `} style={{backgroundColor: "#ffc107"}}><i class="fa fa-plus-circle p-2"></i>
        {textoBoton}
      </button>
    </div>
    {mostrarTabla ? (
       <TablaProductos listaProductos={productos} />
     ) : (
       <FormularioCreacionProductos
         setMostrarTabla={setMostrarTabla}
         listaProductos={productos}
         setProductos={setProductos}
       />
     )}
     <ToastContainer position='bottom-center' autoClose={5000} />
  </div>
);
};

<br/>

const TablaProductos = ({ listaProductos }) => {
  useEffect(() => {
    console.log('este es el listado de productos en el componente de tabla', listaProductos);
  }, [listaProductos]);
  return (
    <Fragment>
    <ul class="nav nav-tabs justify-content-end">
			<li class="nav-item">
			<a class="nav-link active" id="list-tab" data-toggle="tab" href="#list" role="tab" aria-controls="list" aria-selected="false">Lista</a>
			</li>
			
		</ul>
    
    <div class="tab-content" id="myTabContent">
			<div class="tab-pane fade show active" id="list" role="tabpanel" aria-labelledby="list-tab"/>
				<div class="card"/>
					<div class="card-header">
						<h4>Lista de Productos</h4>
					</div>
      <div class="card-body"/>
						<div class="table-responsive">
							<table id="userList" class="table table-bordered table-hover table-striped">
              <thead class="thead-light">
          <tr>
            <th>Id producto</th>
            <th>Nombre producto</th>
            <th>Cantidad</th>
            <th>Fecha</th>
            <th>Precio unitario</th>
            <th>Editar</th>
          </tr>
        </thead>
        <tbody>
          {listaProductos.map((producto) => {
            return (
              <tr>
                <td>{producto.idproducto}</td>
                <td>{producto.nombre}</td>
                <td>{producto.cantidad}</td>
                <td>{producto.fecha}</td>
                <td>{producto.preciou}</td>
                <td>
										<Link to="/Producto"><i class="fas fa-edit"></i></Link> | <Link href="#"><i class="fas fa-user-times"></i></Link>
									</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
    </div>
    </Fragment>
   );
 };

const FormularioCreacionProductos = ({ setMostrarTabla, listaProductos, setProductos }) => {
   const form = useRef(null);

   const submitForm = (e) => {
     e.preventDefault();
     const fd = new FormData(form.current);

     const nuevoProducto = {};
     fd.forEach((value, key) => {
       nuevoProducto[key] = value;
     });

     setMostrarTabla(true);
     setProductos([...listaProductos, nuevoProducto]);
     // identificar el caso de éxito y mostrar un toast de éxito
     toast.success('Producto agregado con éxito');
     // identificar el caso de error y mostrar un toast de error
     // toast.error('Error creando un vehículo');
   };


   return (
    <div className='flex flex-col items-center justify-center '>
      <ul class="nav nav-tabs justify-content-end">
			<li class="nav-item">
			<a class="nav-link active" id="list-tab" data-toggle="tab" href="#list" role="tab" aria-controls="list" aria-selected="false">Lista</a>
			</li>
			
		</ul>
      <h2 className='text-2xl font-extrabold text-gray-800'>Crear nuevo producto</h2>
      <form ref={form} onSubmit={submitForm} className='flex flex-col'>
        <label className='flex flex-col' htmlFor='idproducto'>
          ID del producto
          <input
            name='idproducto'
            className='bg-gray-50 border border-gray-600 p-2 rounded-lg m-2'
            type='text'
            placeholder='PAP y el numero'
            required
          />
        </label>
        
        <label className='flex flex-col' htmlFor='nombre'>
          Nombre del producto
          <input
            name='nombre'
            className='bg-gray-50 border border-gray-600 p-2 rounded-lg m-2'
            type='text'
            placeholder='Tipo de papel o cartulina'
            required
          />
        </label>
        
        <label className='flex flex-col' htmlFor='cantidad'>
          Cantidad del producto
          <input
            name='cantidad'
            className='bg-gray-50 border border-gray-600 p-2 rounded-lg m-2'
            type='number'
            placeholder='Volumen'
            required
          />
        </label>
        
       <label className='flex flex-col' htmlFor='fecha'>
         Fecha de creacion de producto
         <input
           name='fecha'
           className='bg-gray-50 border border-gray-600 p-2 rounded-lg m-2'
           type='date'
            min={'2021-01-01'}
            
            placeholder='yyyy-mm-dd'
            required
          />
        </label>


        <label className='flex flex-col' htmlFor='preciou'>
          Precio Unitario
          <input
            name='preciou'
            className='bg-gray-50 border border-gray-600 p-2 rounded-lg m-2'
            type='number'
            placeholder='Volumen'
            required
          />
        </label>


        <button style={{backgroundColor: "#ffc107"}} id="btnAgregarCompra" class="btn btn-primary btn-sm float-right" ><i class="fa fa-plus-circle" aria-hidden="true"></i> Agregar Producto
                            </button>
     </form>
   </div>
 );
};
export default Productos;


