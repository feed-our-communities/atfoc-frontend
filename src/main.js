import React from 'react';
import { Router, Switch, Route } from 'react-router-dom';

import Login from './login';
import CreateAccount from './createAccount';
import history from './history';

const Main = () => {
    return (
        <Router history={history}>
            <Switch>
                <Route path='/'><Login /></Route>
                <Route path='/CreateAccount'><CreateAccount /></Route>
            </Switch>
        </Router>
    );
}

export default Main;
