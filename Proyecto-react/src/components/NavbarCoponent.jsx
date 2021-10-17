import React from "react";
import {Link} from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";


function NavbarComponent(props){

  const { loginWithRedirect } = useAuth0();
  const { logout } = useAuth0();
  const {user, isAuthenticated} = useAuth0();

  
  console.log(props.cosa);
    return (
      <header class>

      <nav id="nav" class="navbar navbar-expand-lg navbar-light" style={{ backgroundColor: '#8BC34A' }}>
        <div class="container-fluid">
          <a class="navbar-brand" href="#"><h1>Papeles Gsus Survivors</h1></a>
         
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
            <li>
        <Link to="/Usuario" className="nav-link" href = "#"><button className='botonGenerico mainButton'>Usuarios</button></Link>
          
        </li>
        
            <li>
        <Link to="/Venta" className="nav-link" href = "#"><button className='botonGenerico mainButton'>Ventas</button></Link>
          
        </li>

        <li>
        <Link to="/FormProducto" className="nav-link" href = "#"><button className='botonGenerico mainButton'>Productos</button></Link>

        </li>

        <li>
        {isAuthenticated ? null : <Link  className="nav-link" href = "#"><button onClick={()=> loginWithRedirect()} className='botonGenerico mainButton'>Ingresar</button></Link>}
      
          
        </li>
        <li>
        {isAuthenticated ?<Link className="nav-link"><button onClick={() => logout({ returnTo: window.location.origin })} className='botonGenerico mainButton'>Salir</button></Link> : null}
        </li>
            </ul>
          </div>
        </div>
        <form class="d-flex">
        <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
        <button class="btn btn-outline-success" type="submit">{isAuthenticated ? user.name : "User"}</button>
      </form>
      </nav>
    
    </header>


    );
}

export default NavbarComponent;