import { Home } from './pages/home/home';
import { Login } from './pages/login/Login';
import { Register } from './pages/register/Register';
import { Profile } from './pages/profile/Profile';
import React, {useContext} from "react";
import { AuthContext } from './context/AuthContext';
import {
  BrowserRouter as Router,
  Switch,
  Route, Redirect
} from "react-router-dom";


function App() {

  const { user } = useContext(AuthContext);
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          {user ? < Home /> : <Register />}
        </Route>
        <Route exact path="/login">
          {user ? <Redirect to="/" /> : <Login />}
        </Route>
        <Route exact path="/register">
          {user ? <Redirect to="/" /> : <Register />}
        </Route>
        <Route exact path="/profile/:username">
          <Profile />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
