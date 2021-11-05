import React from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import Login from './components/Login/Login';
import CreateAccount from './components/CreateAccount/CreateAccount';
import Home from './Home.js';
import history from './history';

const Main = () => {
    return (
        <Router history={history}>
            <Switch>
                <Route exact path='/' component={Home}></Route>
                <Route exact path='/CreateAccount' component={CreateAccount}></Route>
                <Route exact path='/login' component={Login}></Route>
            </Switch>
        </Router>
    );
}

export default Main;
