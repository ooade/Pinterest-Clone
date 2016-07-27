import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Pins } from '../../imports/collections/pins';
import Moment from 'moment';

class MyPins extends Component {
  imageBroken(e) {
    // e.target.src = 'https://placeholdit.imgix.net/~text?txtsize=30&txt=p1nit&w=200&h=200';
  }

  onDelete(pin, event) {
    event.preventDefault();

    Meteor.call('pin.remove', pin);
  }

  onLike(pin, event) {
    event.preventDefault();

    Meteor.call('pin.like', pin);
  }

  onRemoveLike(pin, event) {
    event.preventDefault();

    Meteor.call('pin.unlike', pin);
  }

  renderPins() {
    return this.props.myPins.map(pin => {
      let moment = Moment(pin.createdAt, 'X');
      let date = Moment(moment).fromNow();

      return (
        <div className="grid-item" key={pin._id}>
          <img src={pin.url} className="img-responsive" onError={this.imageBroken.bind(this)} style={{width: "100%"}}/>
          <div className="padded">
            <h4>{pin.title}</h4>
            <h6 className="text-muted">{pin.description}</h6>
            <h6 className="text-muted">{date}</h6>
            <div className="action-bar">
              { pin.likedBy.includes(this.props.userId) ? <i className="fa fa-heart green" onClick={this.onRemoveLike.bind(this, pin)}/>  : <i className="fa fa-heart" onClick={this.onLike.bind(this, pin)}/> }
              { pin.likedBy.length > 0 ? <sup>{pin.likedBy.length}</sup> : ""}
              <i className="fa fa-remove red" onClick={this.onDelete.bind(this, pin)} style={{float:"right"}}/>
            </div>
          </div>
        </div>
      )
    });
  }

  render() {
    if (!this.props.userId) {
      return <div className="alert alert-danger">Oops! You're not authenticated so you can't have a pin </div>
    }

    if (this.props.myPins.length == 0) {
      return <div className="alert alert-danger">Oops! You have no pin</div>;
    }

    return (
      <div className="my-pins">
        <div className="grids">
          { this.renderPins() }
        </div>
      </div>
    );
  }
}

export default createContainer(()=> {
  Meteor.subscribe('my-pins');
  Meteor.subscribe('userList');

  return { myPins: Pins.find().fetch(), userId: Meteor.userId() };
}, MyPins);
