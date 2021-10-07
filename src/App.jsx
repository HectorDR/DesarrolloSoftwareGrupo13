

import Layout from 'layouts/Layout';
import Index from 'pages';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import 'styles/styles.css';
import FormProducto from 'pages/FormProducto';



function App() {
  return (
    <div className='App'>
      <Router>
        <Layout>
          <Switch>
            <Route path='/FormProducto'>
              <FormProducto />
            </Route>
            <Route path='/'>
              <Index />
            </Route>
          </Switch>
        </Layout>
      </Router>
    </div>
  );
}

export default App;
