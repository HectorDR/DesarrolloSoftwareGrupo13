import NavbarComponent from "components/NavbarCoponent.jsx";
import { useAuth0 } from "@auth0/auth0-react";
import Layout from 'layouts/Layout';
import { BrowserRouter as Router, Switch, Route, } from 'react-router-dom';
import 'styles/styles.css';
import FormProducto from 'pages/FormProducto';
import React, {Fragment} from 'react';
import Usuario from 'pages/Usuario';
import Venta from 'pages/Ventas';


import ForbidenComponent from "forbiden/ForbidenComponent";



function App() {
  
  return (
      <Router>
        <Layout>
          <Switch>
            <Route path='/FormProducto'>
             <FormProducto />
            </Route>
            <Route path="/Usuario">
              <Usuario/>
            </Route>
            <Route path="/Venta">
              <Venta/>
            </Route>
              <Route patth="/forbiden">
                <ForbidenComponent/>
                </Route>
          </Switch>
        </Layout>
      </Router>
    
  );
}

export default App;
