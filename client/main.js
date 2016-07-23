import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import Header from './components/header';

const App = props => {
  return (
    <div>
      <Header />
      { props.children }
    </div>
  );
};

const routes = (
  <Router history={hashHistory}>
    <Route component={App} path="/">
      {/*{...}*/}
    </Route>
  </Router>
);


Meteor.startup(() => {
  ReactDOM.render(routes, document.querySelector('.app'));
});
