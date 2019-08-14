import React from 'react';
import { Router, Switch, Route } from 'react-router-dom';

import history from '../history';
import Navigation from './Navigation';
import WizardForm from './WizardForm/WizardForm';
import Users from './Users/Users';
import UserEdit from './Users/UserEdit';
import UserDelete from './Users/UserDelete';

const App = () => {
    return (
        <div className="app">
            <Router history={history}>
                <header className="header container">
                    <Navigation/>
                </header>
                <main>
                    <Switch>
                        <Route path="/users/:id/delete" component={UserDelete}/>
                        <Route path="/users/:id" component={UserEdit}/>
                        <Route path="/users" component={Users}/>
                        <Route path="/" component={WizardForm}/>
                    </Switch>
                </main>
            </Router>
        </div>
    )
};

export default App;