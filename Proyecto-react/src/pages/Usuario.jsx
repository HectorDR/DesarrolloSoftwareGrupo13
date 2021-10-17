import React, {useState, Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Modal, ModalBody, ModalHeader, ModalFooter} from 'reactstrap';




function Usuarios() {

  const dataUsuario = [
    {id: 1,
      identificacion:  '10287779'    , 
      nombre: 'Hcetor',
      apellido: "Delgado",
      usuario: 'Hector001',
      email: "hector83988112@gmail.com" ,
      rol: "administrador",
  
    },
    { id: 2,
        identificacion:  '1069714713'    , 
        nombre: 'Juan M',
        apellido: "Mendez",
        usuario: 'Mendez002',
        email: "juanmanuelmendez@gmail.com",
        rol: "administrador",
    },
    {id: 3,
        identificacion:  '10944248583'    , 
        nombre: 'Migeul',
        apellido: "Quiñonez",
        usuario: 'Miguel003',
        email: "miguelmantilla@gmail.com",
        rol: "administrador",
    },
    {id: 4,
        identificacion:  '1032473978'    , 
        nombre: 'Lisette',
        apellido: "Sierra",
        usuario: 'Sierra004',
        email: "lissettesierra@gmail.com",
        rol: "vendedor",
    },
    {id: 5,
        identificacion:  '1007259755'    , 
      nombre: 'Juan Fernando',
      apellido: "Perez",
      usuario: 'Perez005',
      email: "juanchoperez2009@hotmail.com",
      rol: "vendedor",
    }
    
  ];

  const [data, setData] = useState(dataUsuario);
  const [modalEditar, setModalEditar] = useState(false);
  const [modalEliminar, setModalEliminar] = useState(false);
  const [modalInsertar, setModalInsertar] = useState(false);
 

  const [paisSeleccionado, setPaisSeleccionado] = useState({
    id: '',
    identificacion: "",
      nombre: "",
      usuario: "",
      email: "",
      rol: "",
    
  });

  const seleccionarPais=(elemento, caso)=>{
setPaisSeleccionado(elemento);
(caso==='Editar')?setModalEditar(true):setModalEliminar(true)
  }

  const handleChange=e=>{
    const {name, value}=e.target;
    setPaisSeleccionado((prevState)=>({
      ...prevState,
      [name]: value
    }));
  }

  const editar=()=>{
    var dataNueva=data;
    dataNueva.map(usuario=>{
      if(usuario.id===paisSeleccionado.id){
        usuario.identificacion=paisSeleccionado.identificacion;
        usuario.nombre=paisSeleccionado.nombre;
        usuario.apellido=paisSeleccionado.apellido;
        usuario.usuario=paisSeleccionado.usuario;
        usuario.email=paisSeleccionado.email;
        usuario.rol=paisSeleccionado.rol;
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
  

  return (
    
    <div className="App">
      <h2>Usuarios de la Papeleria GsusSurvivors</h2>
      <br />
    <button className="btn btn-success" onClick={()=>abrirModalInsertar()}>Agregar Usuario</button>
    <br /><br />
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>Identificacion</th>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Usuario</th>
            <th>Email</th>
            <th>Rol</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {data.map(elemento=>(
            <tr>
              <td>{elemento.id}</td>
              <td>{elemento.identificacion}</td>
              <td>{elemento.nombre}</td>
              <td>{elemento.apellido}</td>
              <td>{elemento.usuario}</td>
              <td>{elemento.email}</td>
              <td>{elemento.rol}</td>
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
            <h3>Editar Usuario</h3>
          </div>
        </ModalHeader>
        <ModalBody>
          <div className="form-group">
           

            <label>Identificacion</label>
            <input
              className="form-control"
              readOnly
              type="text"
              name="identificacion"
              value={paisSeleccionado && paisSeleccionado.identificacion}
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
            
            <label>Apellido</label>
            <input
              className="form-control"
              type="text"
              name="apellido"
              value={paisSeleccionado && paisSeleccionado.apellido}
              onChange={handleChange}
            />
            <br />
            
            <label>Usuario</label>
            <input
              className="form-control"
              type="text"
              name="usuario"
              value={paisSeleccionado && paisSeleccionado.usuario}
              onChange={handleChange}
            />
            <br />
            
            <label>Email</label>
            <input
              className="form-control"
              type="text"
              name="email"
              value={paisSeleccionado && paisSeleccionado.email}
              onChange={handleChange}
            />
            <br />
            <label>Rol</label>
            <input
              className="form-control"
              type="text"
              name="rol"
              value={paisSeleccionado && paisSeleccionado.Rol}
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
          Estás Seguro que deseas eliminar el Usuario{paisSeleccionado && paisSeleccionado.nombre}
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
            <h3>Agregar Usuario</h3>
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
            <label>Identificacion</label>
            <input
              className="form-control"
              readOnly
              type="text"
              name="identificacion"
              value={paisSeleccionado ? paisSeleccionado.identificacion: ""}
              onChange={handleChange}
            />
            <br />

            <label>Nombre</label>
            <input
              className="form-control"
              type="text"
              name="nombre"
              value={paisSeleccionado ? paisSeleccionado.nombre: ""}
              onChange={handleChange}
            />
            <br />
            
            <label>Apellido</label>
            <input
              className="form-control"
              type="text"
              name="apellido"
              value={paisSeleccionado ? paisSeleccionado.apellido: ""}
              onChange={handleChange}
            />
            <br />
            
            <label>Usuario</label>
            <input
              className="form-control"
              type="text"
              name="usuario"
              value={paisSeleccionado ? paisSeleccionado.usuario: ""}
              onChange={handleChange}
            />
            <br />
            
            <label>Email</label>
            <input
              className="form-control"
              type="text"
              name="email"
              value={paisSeleccionado ?paisSeleccionado.email: ""}
              onChange={handleChange}
            />
            <br />
            <label>Rol</label>
            <input
              className="form-control"
              type="text"
              name="rol"
              value={paisSeleccionado ? paisSeleccionado.rol: ""}
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

export default Usuarios;