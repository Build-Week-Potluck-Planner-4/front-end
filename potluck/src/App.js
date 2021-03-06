import React, { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import NavBar from './components/NavBar';
import Home from './components/Home';
import Signup from './components/Signup';
import Login from './components/Login';
import Logout from './components/Logout';
import AddPotluck from './components/AddPotluck';
import AddGuests from './components/AddGuests';
import AddFoods from './components/AddFoods';
import Potlucks from './components/Potlucks';
import PotluckDetails from './components/PotluckDetails';
import { loginStatus } from './actions';
import PrivateRoute from './components/PrivateRoute';

import './styles/App.css';

function App(props) {
  useEffect(() => {
    if(localStorage.getItem('token')) {
      props.loginStatus(true)
    } else {
      props.loginStatus(false);
    }
  }, []);

  return (
    <div className="App">
      <NavBar />

      <Switch>

        <Route path='/login'>
          <Login />
        </Route>

        <Route path='/logout'>
          <Logout />
        </Route>

        <Route path='/signup'>
          <Signup />
        </Route>

        <PrivateRoute path='/add' component={AddPotluck}/>

        <PrivateRoute path='/add_guests' component={AddGuests}/>

        <PrivateRoute path='/add_foods' component={AddFoods}/>

        <PrivateRoute path='/potlucks/:potluck_id' component={PotluckDetails}/>

        <Route path='/potlucks'>
          <Potlucks />
        </Route>

        <Route path='/'>
          <Home />
        </Route>

      </Switch>

      {/* Footer??? */}

    </div>
  );
}

const mapStateToProps = state => {
  return ({
    isLogin: state.login.isLogin
  })
}

export default connect(mapStateToProps, {loginStatus})(App);