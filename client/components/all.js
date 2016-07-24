import React, { Component } from 'react';
import { hashHistory } from 'react-router';
import { createContainer } from 'meteor/react-meteor-data';
import { Pins } from '../../imports/collections/pins';

class All extends Component {
  imageBroken(e) {
    e.target.src = 'https://placeholdit.imgix.net/~text?txtsize=30&txt=p1nit&w=200&h=200';
  }

  onLike(pin, event) {
    event.preventDefault();

    Meteor.call('pin.like', pin);
  }

  onRemoveLike(pin, event) {
    event.preventDefault();

    Meteor.call('pin.unlike', pin);
  }

  onRetweet(pin, event) {
    event.preventDefault();

    Meteor.call('pin.retweet', pin);
  }

  renderPins() {
    return this.props.pins.map(pin => {
      return (
        <div className="grid-item" key={pin._id}>
          <img src={pin.url} className="img-responsive" onError={this.imageBroken.bind(this)} style={{width: "100%"}}/>
          <div className="padded">
            <h4>{pin.title}</h4>
            <h5 className="text-muted" style={{fontSize: 12}}>{pin.description}</h5>
            <div className="action-bar">
              { pin.likedBy.includes(this.props.userId) ? <i className="fa fa-heart green" onClick={this.onRemoveLike.bind(this, pin)}/>  : <i className="fa fa-heart" onClick={this.onLike.bind(this, pin)}/> }
              { pin.likedBy.length > 0 ? <sup>{pin.likedBy.length}</sup> : ""}
              { pin.ownerId !== this.props.userId ? <i className="fa fa-retweet" onClick={this.onRetweet.bind(this, pin)} style={{float:"right"}}/> : null }
            </div>
          </div>
        </div>
      )
    });
  }

  render() {
    if (!this.props.pins) {
      return <div class="alert alert-info">Oops! No Pins </div>
    }
    return (
      <div className="all-pins">
        <div className="grid">
          { this.renderPins() }
        </div>
      </div>
    );
  }
}

export default createContainer( () => {
  Meteor.subscribe('pins');

  return { pins: Pins.find().fetch(), userId: Meteor.userId() };
}, All);
