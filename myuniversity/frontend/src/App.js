import logo from './logo.svg';
import './App.css';
import  Header from './components/header.jsx';
import  Home from './components/home.jsx';
import Footer from './components/footer.jsx';
import { Provider } from 'react-redux';
import PrivateRoute  from './Pages/PrivateRoute';
import history  from './history';
import { BrowserRouter, Router, Switch, Route } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

import store from './store'
import DashboardUser from './Pages/DashboardUser';
import ResetPassword from './Pages/ResetPassword';
function App() {
  return (

    <Provider store={store}>

    <div id="main-wrapper">
      <Header/>

      
      
    <Router history={history}>
    <Switch>

      <Route                   
      path="/Home" name="Home"
       component ={Home
       }></Route>
        <Route                   
      path="/resetPassword" name="ressPassword"
       component ={ResetPassword
       }></Route>
       

<PrivateRoute                   
      path="/dashboardUser" name="dashboardUser"
       component ={DashboardUser
       }>
         
       </PrivateRoute>
       </Switch>


       </Router>


       <ToastContainer />



    </div>
    </Provider>
  );
}

export default App;
