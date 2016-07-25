import React, { Component } from 'react';
import { Link, hashHistory } from 'react-router';
import { createContainer } from 'meteor/react-meteor-data';
import { Pins } from '../../imports/collections/pins';
import Moment from 'moment';

class All extends Component {
  imageBroken(e) {
    e.target.src = 'https://placeholdit.imgix.net/~text?txtsize=30&txt=p1nit&w=200&h=200';
  }

  onLike(pin, event) {
    event.preventDefault();

    Meteor.call('pin.like', pin, err => {
      if (err) {
        Bert.alert({
          title: 'Error, Couldn\'t perform this action',
          message: 'Pls login to like a post',
          type: 'danger',
          style: 'growl-top-right',
          icon: 'fa-gg-circle'
        });
      }
    });
  }

  onRemoveLike(pin, event) {
    event.preventDefault();

    Meteor.call('pin.unlike', pin);
  }

  onRetweet(pin, event) {
    event.preventDefault();

    Meteor.call('pin.retweet', pin, err => {
      if (err) {
        Bert.alert({
          title: 'Error, Couldn\'t perform this action',
          message: 'Pls login to repost',
          type: 'danger',
          style: 'growl-top-right',
          icon: 'fa-gg-circle'
        });
      }
    });
  }

  renderPins() {
    const user = (id) => {
      return this.props.users.map(user => {
        if (user._id === id) {
          if (user.services.twitter) {
            return user.services.twitter.screenName;
          }
          return user.emails[0].address.split('@')[0];
        }
      });
    }

    return this.props.pins.map(pin => {
      let moment = Moment(pin.createdAt, 'X');
      let date = Moment(moment).fromNow();

      return (
        <div className="grid-item" key={pin._id}>
          <img src={pin.url} className="img-responsive" onError={this.imageBroken.bind(this)} style={{width: "100%"}}/>
          <div className="padded">
            <h4>{pin.title}</h4>
            <h6 className="text-muted">{pin.description}</h6>
            <h6 className="text-muted"><Link to={`/user/${pin.ownerId}`}><i className="fa fa-user" /> {user(pin.ownerId)}</Link><span style={{float: "right"}}>{date}</span></h6>
            <div className="action-bar">
              { pin.likedBy.includes(this.props.userId) ? <i className="fa fa-heart green" onClick={this.onRemoveLike.bind(this, pin)}/>  : <i className="fa fa-heart" onClick={this.onLike.bind(this, pin)}/> }
              { pin.likedBy.length > 0 ? <sup>{pin.likedBy.length}</sup> : ""}
              { pin.ownerId !== this.props.userId ? <i className="fa fa-retweet" title="Repost this!" onClick={this.onRetweet.bind(this, pin)} style={{float:"right"}}/> : null }
            </div>
          </div>
        </div>
      )
    });
  }

  render() {
    if (this.props.pins.length == 0) {
      return <div style={{textAlign: "center", marginTop: 50}}> <img src="../images/ring.gif" /> </div>
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
  Meteor.subscribe('userList');

  return { pins: Pins.find().fetch(), userId: Meteor.userId(), users: Meteor.users.find().fetch() };
}, All);
