import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Login from './login';
import CreateAccount from './CreateAccount';

const Main = () => {
    return (
        <Switch>
            <Route exact path='/' component={Login}></Route>
            <Route exact path='/CeateAccount' component={CreateAccount}></Route>
        </Switch>
    );
}

export default Main;
