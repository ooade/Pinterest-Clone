import React, { Component } from 'react';
import { hashHistory } from 'react-router';
import { createContainer } from 'meteor/react-meteor-data';
import { Pins } from '../../imports/collections/pins';

class All extends Component {
  imageBroken(e) {
    e.target.src = 'https://placeholdit.imgix.net/~text?txtsize=30&txt=p1nit&w=200&h=200';
  }

  renderPins() {
    return this.props.pins.map(pin => {
      return (
        <li className="grid-item" key={pin._id}>
          <h3 style={{textAlign: "center"}}>{pin.title}</h3>
          <img src={pin.url} onError={this.imageBroken.bind(this)} />
          <h5 className="text-muted">{pin.description}</h5>
          <div className="action-bar">
            {/*<i className="fa fa-heart" />*/}
            {/*<i className="fa fa-retweet" style={{float:"right"}}/>*/}
          </div>
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
        <ul className="grid">
          { this.renderPins() }
        </ul>
      </div>
    );
  }
}

export default createContainer( () => {
  Meteor.subscribe('pins');

  return { pins: Pins.find().fetch() };
}, All);
