import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route } from 'react-router';

var createBrowserHistory = require('history/lib/createBrowserHistory');

import ListCreator from './components/ListCreator';
import ListManager from './components/ListManager';
import NotFound from './components/NotFound';

// export/expose our application routes
let routes = (
    <Router history={ createBrowserHistory() }>
        <Route path="/" component={ ListCreator }></Route>
        <Route path="/list/:listId" component={ ListManager }></Route>
        <Route path="*" component={ NotFound }></Route>
    </Router>
);


// render our routes
ReactDOM.render(routes, document.querySelector('#main'));
