import React, { Component } from 'react';
import { Link, browserHistory } from 'react-router';
import { createContainer } from 'meteor/react-meteor-data';
import Accounts from './accounts';

class Header extends Component {
  render() {
    const isAuth = () => {
      if (this.props.userId) {
        return (
          <ul className="nav navbar-nav navbar-right">
            <li className="nav-item">
              <Link to="/myPins">
                My Pins
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/add">
                Add
              </Link>
            </li>
          </ul>
        );
      }
    }

    return (
      <nav className="navbar navbar-fixed-top navbar-default">
        <div className="container">
          <div className="navbar-header">
            <Link to="/" className="navbar-brand"> p1nit </Link>
          </div>
          <ul className="nav navbar-nav">
            <li>
              <Accounts />
            </li>
          </ul>
          { isAuth() }
        </div>
      </nav>
    );
  }
};

export default createContainer(() => {
  return { userId: Meteor.userId() }
}, Header);
