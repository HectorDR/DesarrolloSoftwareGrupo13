import React, {useState, Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Modal, ModalBody, ModalHeader, ModalFooter} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import ForbidenComponent from "forbiden/ForbidenComponent"


function Venta() {

  const dataVenta = [
    {id: 1,
      cliente: 1004523566,
      idproducto:  "PAP0001	"    , 
      nombre: 'Papel resistente	',
      cantidad: "12000",
      precio: "3500",
      direccion: "calle 40 #10-90 Bucaramanga" ,
      fecha: "01-10-2021",
    
    },
    {id: 2,
      cliente: 90012548,
      idproducto:  'PAP65489'    , 
      nombre: 'Papel humedo	',
      cantidad: "250000",
      precio: "128.500",
     direccion: "calle 29D #30-09 Barranquilla",
      fecha: "29-09-2021",
    },
    {id: 3,
      cliente: 1003256977,
      idproducto:  'PAP32654'    , 
      nombre: 'Papel para corrugar	',
      cantidad: "540000",
      precio: "629.450",
      direccion: "calle 107 #43-28 Bogota" ,
      fecha: "27-09-2021",
    },
    {id: 4,
      cliente: 1332589644,
      idproducto:  'PAP034654'    , 
      nombre: 'Cartulina',
      cantidad: 80222,
      direccion: "calle 32 #20-08 Medellin",
      fecha: '2021-10-05',
      precio: 50000 ,
    },
    
   
  ];

  const [data, setData] = useState(dataVenta);
  const [modalEditar, setModalEditar] = useState(false);
  const [modalEliminar, setModalEliminar] = useState(false);
  const [modalInsertar, setModalInsertar] = useState(false);
  

 

  const [ventaSeleccionado, setVentaSeleccionado] = useState({
    id: '',
    cliente: "",
    idproducto: '',
    nombre: '',
    cantidad: '',
    fecha: '',
    precio: '',
    dieccion: ""
  });
 

  const seleccionarVenta=(elemento, caso)=>{
setVentaSeleccionado(elemento);
(caso==='Editar')?setModalEditar(true):setModalEliminar(true)
  }

  const handleChange=e=>{
    
    const {name, value}=e.target;
    setVentaSeleccionado((prevState)=>({
      ...prevState,
      [name]: value
    }));
  }

  const editar=()=>{
    var dataNueva=data;
    dataNueva.map(venta=>{
      if(venta.id===ventaSeleccionado.id){
        venta.cliente=ventaSeleccionado.cliente;
        venta.idproducto=ventaSeleccionado.idproducto;
        venta.cantidad=ventaSeleccionado.cantidad;
        venta.nombre=ventaSeleccionado.nombre;
        venta.fecha=ventaSeleccionado.fecha;
        venta.precio=ventaSeleccionado.precio;
        venta.direccion=ventaSeleccionado.direccion;
      }
    });
    setData(dataNueva);
    setModalEditar(false);
  }

  const eliminar =()=>{
    setData(data.filter(venta=>venta.id!==ventaSeleccionado.id));
    setModalEliminar(false);
  }

  const abrirModalInsertar=()=>{
    setVentaSeleccionado(null);
    setModalInsertar(true);
  }

  const insertar =()=>{
    var valorInsertar=ventaSeleccionado;
    valorInsertar.id=data[data.length-1].id+1;
    var dataNueva = data;
    dataNueva.push(valorInsertar);
    setData(dataNueva);
    setModalInsertar(false);
  }

  


  return (
    
     <div className="App">
       
      <div className="containerInput">
        <input
          className="form-control inputBuscar"
         
          placeholder="Búsqueda por ID del cliente"
          onChange={handleChange}
        />
        <button className="btn btn-success">
          <FontAwesomeIcon icon={faSearch}/>
        </button>
      </div>
      <h2>Ventas de la Papeleria GsusSurvivors</h2>
      <br />
    <button className="btn btn-success" onClick={()=>abrirModalInsertar()}>Agregar Venta</button>
    <br /><br />
    <table className="table table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>Cliente</th>
            <th>IdProducto</th>
            <th>Nombre</th>
            <th>Cantidad</th>
            <th>Fecha</th>
            <th>Precio</th>
            <th>Direccion</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {data.map(elemento=>(
            <tr>
              <td>{elemento.id}</td>
              <td>{elemento.cliente}</td>
              <td>{elemento.idproducto}</td>
              <td>{elemento.nombre}</td>
              <td>{elemento.cantidad}</td>
              <td>{elemento.fecha}</td>
              <td>{elemento.precio}</td>
              <td>{elemento.direccion}</td>
              <td><button className="btn btn-primary" onClick={()=>seleccionarVenta(elemento, 'Editar')}>Editar</button> {"   "} 
              <button className="btn btn-danger" onClick={()=>seleccionarVenta(elemento, 'Eliminar')}>Eliminar</button></td>
            </tr>
          ))
          }
        </tbody>
      </table> 

      <Modal isOpen={modalEditar}>
        <ModalHeader>
          <div>
            <h3>Editar Venta</h3>
          </div>
        </ModalHeader>
        <ModalBody>
          <div className="form-group">
           

            <label>ID Producto</label>
            <input
              className="form-control"
              readOnly
              type="text"
              name="idproducto"
              value={ventaSeleccionado && ventaSeleccionado.idproducto}
              onChange={handleChange}
            />
            <br />
            <label>Cliente</label>
            <input
              className="form-control"
              readOnly
              type="text"
              name="cliente"
              value={ventaSeleccionado && ventaSeleccionado.cliente}
              onChange={handleChange}
            />
            <br />

            <label>Nombre</label>
            <input
              className="form-control"
              type="text"
              name="nombre"
              value={ventaSeleccionado && ventaSeleccionado.nombre}
              onChange={handleChange}
            />
            <br />
            
            <label>Cantidad</label>
            <input
              className="form-control"
              type="text"
              name="cantidad"
              value={ventaSeleccionado && ventaSeleccionado.cantidad}
              onChange={handleChange}
            />
            <br />
            
            <label>Fecha</label>
            <input
              className="form-control"
              type="text"
              name="fecha"
              value={ventaSeleccionado && ventaSeleccionado.fecha}
              onChange={handleChange}
            />
            <br />
            
            <label>Precio</label>
            <input
              className="form-control"
              type="text"
              name="precio"
              value={ventaSeleccionado && ventaSeleccionado.precio}
              onChange={handleChange}
            />
            <br />
            <label>Direccion</label>
            <input
              className="form-control"
              type="text"
              name="direccion"
              value={ventaSeleccionado && ventaSeleccionado.direccion}
              onChange={handleChange}
            />
            <br />
          </div>
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-primary" onClick={()=>editar()}>
            Actualizar
          </button>
          <button
            className="btn btn-danger"
            onClick={()=>setModalEditar(false)}
          >
            Cancelar
          </button>
        </ModalFooter>
      </Modal>


      <Modal isOpen={modalEliminar}>
        <ModalBody>
          Estás Seguro que deseas eliminar esta Venta {ventaSeleccionado && ventaSeleccionado.nombre}
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-danger" onClick={()=>eliminar()}>
            Sí
          </button>
          <button
            className="btn btn-secondary"
            onClick={()=>setModalEliminar(false)}
          >
            No
          </button>
        </ModalFooter>
      </Modal>


        <Modal isOpen={modalInsertar}>
        <ModalHeader>
          <div>
            <h3>Agregar Venta</h3>
          </div>
        </ModalHeader>
        <ModalBody>
          <div className="form-group">
            <label>ID</label>
            <input
              className="form-control"
              readOnly
              type="text"
              name="id"
              value={data[data.length-1].id+1}
            />
            <br />
            <label>Cliente</label>
            <input
              className="form-control"
              type="text"
              name="cliente"
              value={ventaSeleccionado ? ventaSeleccionado.cliente: ''}
              onChange={handleChange}
            />
            <br />
            <label>Direccion</label>
            <input
              className="form-control"
              type="text"
              name="direccion"
              value={ventaSeleccionado ? ventaSeleccionado.direccion: ''}
              onChange={handleChange}
            />
            <br />
            <label>ID Producto</label>
            <input
              className="form-control"
              type="text"
              name="idproducto"
              value={ventaSeleccionado ? ventaSeleccionado.idproducto: ''}
              onChange={handleChange}
            />
            <br />
            

            <label>Nombre</label>
            <input
              className="form-control"
              type="text"
              name="nombre"
              value={ventaSeleccionado ? ventaSeleccionado.nombre: ''}
              onChange={handleChange}
            />
            <br />

            
            <label>Cantidad</label>
            <input
              className="form-control"
              type="text"
              name="cantidad"
              value={ventaSeleccionado ? ventaSeleccionado.cantidad: ""}
              onChange={handleChange}
            />
            <br />
            
            <label>Fecha</label>
            <input
              className="form-control"
              type="text"
              name="fecha"
              value={ventaSeleccionado ? ventaSeleccionado.fecha: ""}
              onChange={handleChange}
            />
            <br />
            
            <label>Precio</label>
            <input
              className="form-control"
              type="text"
              name="precio"
              value={ventaSeleccionado ? ventaSeleccionado.precio: ""}
              onChange={handleChange}
            />
            <br />
          </div>
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-primary"
          onClick={()=>insertar()}>
            Insertar
          </button>
          <button
            className="btn btn-danger"
            onClick={()=>setModalInsertar(false)}
          >
            Cancelar
          </button>
        </ModalFooter>
      </Modal> 
    </div> 
    
    

    
  );
}

export default Venta;