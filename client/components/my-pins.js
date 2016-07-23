import React, { Component } from 'react';
import { hashHistory } from 'react-router';
import { createContainer } from 'meteor/react-meteor-data';
import { Pins } from '../../imports/collections/pins';

class MyPins extends Component {
  renderPins() {
    return this.props.pins.map(pin => {
      return (
        <li className="list-group-item" key={pin._id}>
          <h2 style={{textAlign: "center"}}>{pin.title}</h2>
          <img src={pin.url} className="img-thumbnail" />
          <h5 className="text-muted">{pin.description}</h5>
        </li>
      )
    });
  }

  render() {
    if (!this.props.pins) {
      return <div class="alert alert-info">Oops! No Pins </div>
    }
    return (
      <div className="my-pins">
        <ul className="list-group">
          { this.renderPins() }
        </ul>
      </div>
    );
  }
}

export default createContainer( () => {
  Meteor.subscribe('my-pins');

  return { pins: Pins.find().fetch() };
}, MyPins);
