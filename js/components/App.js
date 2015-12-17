import React from 'react';
import { Router, Route } from 'react-router';
import ListCreator from './ListCreator';
import ListManager from './ListManager';
import NotFound from './NotFound';

let routes = (
	<Router>
		<Route path="/" component={ ListCreator } />
		<Route path="/list/:listId" component={ ListManager } />
		<Route path="*" component={ NotFound } />
	</Router>
)

export default routes;
