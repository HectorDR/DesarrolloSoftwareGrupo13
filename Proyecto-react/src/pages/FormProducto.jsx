import React, {useState, Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Modal, ModalBody, ModalHeader, ModalFooter} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';



function Producto() {

  const dataProducto = [
    {id: 1,
      idproducto:  'PAP001'    , 
      nombre: 'Papel bond',
      cantidad: 15,
      fecha: '2021-05-15',
      precio: 50000 ,
    },
    {id: 2,
      idproducto:  'PAP002'    , 
      nombre: 'Papel  mache',
      cantidad: 20,
      fecha: '2021-08-23',
      precio: 30000 ,
    },
    {id: 3,
      idproducto:  'PAP003'    , 
      nombre: 'Papel roca',
      cantidad: 8,
      fecha: '2021-09-12',
      precio: 8000 ,
    },
    {id: 4,
      idproducto:  'PAP004'    , 
      nombre: 'Cartulina',
      cantidad: 8,
      fecha: '2021-10-05',
      precio: 50000 ,
    },
    
   
  ];

  const [data, setData] = useState(dataProducto);
  const [modalEditar, setModalEditar] = useState(false);
  const [modalEliminar, setModalEliminar] = useState(false);
  const [modalInsertar, setModalInsertar] = useState(false);
  const [busqueda, setBusqueda]= useState("");
 

  const [paisSeleccionado, setPaisSeleccionado] = useState({
    id: '',
    idproducto: '',
    nombre: '',
    cantidad: '',
    fecha: '',
    precio: ''
  });

  const seleccionarPais=(elemento, caso)=>{
setPaisSeleccionado(elemento);
(caso==='Editar')?setModalEditar(true):setModalEliminar(true)
  }

  const handleChange=e=>{
    setBusqueda(e.target.value);
    filtrar(e.target.value);
    const {name, value}=e.target;
    setPaisSeleccionado((prevState)=>({
      ...prevState,
      [name]: value
    }));
  }

  const editar=()=>{
    var dataNueva=data;
    dataNueva.map(pais=>{
      if(pais.id===paisSeleccionado.id){
        pais.idproducto=paisSeleccionado.idproducto;
        pais.cantidad=paisSeleccionado.cantidad;
        pais.nombre=paisSeleccionado.nombre;
        pais.fecha=paisSeleccionado.fecha;
        pais.precio=paisSeleccionado.precio;
      }
    });
    setData(dataNueva);
    setModalEditar(false);
  }

  const eliminar =()=>{
    setData(data.filter(pais=>pais.id!==paisSeleccionado.id));
    setModalEliminar(false);
  }

  const abrirModalInsertar=()=>{
    setPaisSeleccionado(null);
    setModalInsertar(true);
  }

  const insertar =()=>{
    var valorInsertar=paisSeleccionado;
    valorInsertar.id=data[data.length-1].id+1;
    var dataNueva = data;
    dataNueva.push(valorInsertar);
    setData(dataNueva);
    setModalInsertar(false);
  }

  
  const filtrar=(terminoBusqueda)=>{
    var resultadosBusqueda=dataProducto.filter((producto)=>{
      if(producto.nombre.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())
       || producto.idproducto.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())
      ){
        return producto;
      }
    });
    setData(resultadosBusqueda);
  }

  return (
    
    <div className="App">
       
        <div className="containerInput">
        <input
          className="form-control inputBuscar"
          value={busqueda}
          placeholder="Búsqueda por ID o nombre del producto"
          onChange={handleChange}
        />
        <button className="btn btn-success">
          <FontAwesomeIcon icon={faSearch}/>
        </button>
      </div>
      <h2>Productos de la Papeleria GsusSurvivors</h2>
      <br />
    <button className="btn btn-success" onClick={()=>abrirModalInsertar()}>Insertar</button>
    <br /><br />
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>IdProducto</th>
            <th>Nombre</th>
            <th>Cantidad</th>
            <th>Fecha</th>
            <th>Precio</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {data.map(elemento=>(
            <tr>
              <td>{elemento.id}</td>
              <td>{elemento.idproducto}</td>
              <td>{elemento.nombre}</td>
              <td>{elemento.cantidad}</td>
              <td>{elemento.fecha}</td>
              <td>{elemento.precio}</td>
              <td><button className="btn btn-primary" onClick={()=>seleccionarPais(elemento, 'Editar')}>Editar</button> {"   "} 
              <button className="btn btn-danger" onClick={()=>seleccionarPais(elemento, 'Eliminar')}>Eliminar</button></td>
            </tr>
          ))
          }
        </tbody>
      </table>

      <Modal isOpen={modalEditar}>
        <ModalHeader>
          <div>
            <h3>Editar Producto</h3>
          </div>
        </ModalHeader>
        <ModalBody>
          <div className="form-group">
           

            <label>IdProducto</label>
            <input
              className="form-control"
              readOnly
              type="text"
              name="idproducto"
              value={paisSeleccionado && paisSeleccionado.idproducto}
              onChange={handleChange}
            />
            <br />

            <label>Nombre</label>
            <input
              className="form-control"
              type="text"
              name="nombre"
              value={paisSeleccionado && paisSeleccionado.nombre}
              onChange={handleChange}
            />
            <br />
            
            <label>Cantidad</label>
            <input
              className="form-control"
              type="text"
              name="cantidad"
              value={paisSeleccionado && paisSeleccionado.cantidad}
              onChange={handleChange}
            />
            <br />
            
            <label>Fecha</label>
            <input
              className="form-control"
              type="text"
              name="fecha"
              value={paisSeleccionado && paisSeleccionado.fecha}
              onChange={handleChange}
            />
            <br />
            
            <label>Precio</label>
            <input
              className="form-control"
              type="text"
              name="precio"
              value={paisSeleccionado && paisSeleccionado.precio}
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
          Estás Seguro que deseas eliminar el Producto {paisSeleccionado && paisSeleccionado.nombre}
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
            <h3>Insertar Producto</h3>
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
            <label>IdProducto</label>
            <input
              className="form-control"
              type="text"
              name="idproducto"
              value={paisSeleccionado ? paisSeleccionado.idproducto: ''}
              onChange={handleChange}
            />
            <br />

            <label>Nombre</label>
            <input
              className="form-control"
              type="text"
              name="nombre"
              value={paisSeleccionado ? paisSeleccionado.nombre: ''}
              onChange={handleChange}
            />
            <br />

            
            <label>Cantidad</label>
            <input
              className="form-control"
              type="text"
              name="cantidad"
              value={paisSeleccionado ? paisSeleccionado.cantidad: ""}
              onChange={handleChange}
            />
            <br />
            
            <label>Fecha</label>
            <input
              className="form-control"
              type="text"
              name="fecha"
              value={paisSeleccionado ? paisSeleccionado.fecha: ""}
              onChange={handleChange}
            />
            <br />
            
            <label>Precio</label>
            <input
              className="form-control"
              type="text"
              name="precio"
              value={paisSeleccionado ? paisSeleccionado.precio: ""}
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

export default Producto;