import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import Header from './components/header';
import Add from './components/add';
import MyPins from './components/my-pins';
import All from './components/all';
import UserPin from './components/user-pin';

const App = props => {
  return (
    <div>
      <Header />
      <div className="root">
        <div className="container">
          { props.children }
        </div>
      </div>
    </div>
  );
};

const routes = (
  <Router history={hashHistory}>
    <Route component={App} path="/">
      <IndexRoute component={All} />
      <Route component={MyPins} path="/my-pins" />
      <Route component={UserPin} path="/user/:id" />
      <Route component={Add} path="/add" />
    </Route>
  </Router>
);


Meteor.startup(() => {
  ReactDOM.render(routes, document.querySelector('.app'));

  $('.root').click(()=> {
    Accounts._loginButtonsSession.set('dropdownVisible', false);
  });

  $(document).keyup(event => {
    if (event.which === 27) {
      Accounts._loginButtonsSession.set('dropdownVisible', false);
    }
  });
});
