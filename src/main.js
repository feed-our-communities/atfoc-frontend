import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Login from './login';
import CreateAccount from './createAccount';

const Main = () => {
    return (
        <Switch>
            <Route exact path='/' component={Login}></Route>
            <Route exact path='/CreateAccount' component={CreateAccount}></Route>
        </Switch>
    );
}

export default Main;
