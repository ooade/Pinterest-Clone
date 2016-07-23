import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import Header from './components/header';
import Add from './components/add';
import MyPins from './components/my-pins';

const App = props => {
  return (
    <div>
      <Header />
      <div className="container">
        { props.children }
      </div>
    </div>
  );
};

const routes = (
  <Router history={hashHistory}>
    <Route component={App} path="/">
      <Route component={MyPins} path="/my-pins" />
      <Route component={Add} path="/add" />
    </Route>
  </Router>
);


Meteor.startup(() => {
  ReactDOM.render(routes, document.querySelector('.app'));
});
