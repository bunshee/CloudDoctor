import P from "./components/authPages/inscriptP";
import M from "./components/authPages/inscriptM";
import Login from "./components/authPages/loginForm";
import Welcome from "./components/welcome";
import RV from "./components/pages/rendez-vous/rendez-vous";
import Home from "./components/pages/home/home";
import Profile from "./components/pages/profile/profile"
import RVForm from "./components/createrRV/rvForm"
import Details from "./components/details/details"
import ManagerRV from "./components/managerRV/managerRV"

import "./components/authPages/loginForm.scss";

import { Switch, Route } from "react-router-dom";
import axios from "axios";
import PrivateRoute from "./components/routing/PrivateRoutes"

axios.defaults.withCredentials = true;

function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={Welcome} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/inscriptionP" component={P} />
        <Route exact path="/inscriptionM" component={M} />
        <PrivateRoute exact path ="/managerv" component={ManagerRV}/>
        <PrivateRoute exact path ="/details" component={Details}/>
        <PrivateRoute exact path="/RVForm" component={RVForm} />
        <PrivateRoute exact path="/home" component={Home} />
        <PrivateRoute exact path="/RV" component={RV} />
        <PrivateRoute exact path="/profile" component={Profile} />
      </Switch>
      </div>

  );
}

export default App;
