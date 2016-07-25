import { Mongo } from 'meteor/mongo';

Meteor.methods({
  'pins.insert': function(pin) {
    if (!this.userId) { return; }
    return Pins.insert({
      createdAt: new Date(),
      description: pin.desc,
      likedBy: [],
      ownerId: this.userId,
      title: pin.title,
      url: pin.url
    });
  },

  'pin.remove': (pin) => {
    return Pins.remove(pin);
  },

  'pin.like': function(pin) {
    if (!this.userId) { throw new Meteor.Error("user unauthenticated"); }
    
    return Pins.update(pin, {$push: { likedBy: this.userId }});
  },

  'pin.unlike': function(pin) {
    return Pins.update(pin, {$pop: { likedBy: this.userId }});
  },

  'pin.retweet': function(pin) {
    if (!this.userId) { throw new Meteor.Error("user unauthenticated"); }

    return Pins.insert({
      createdAt: new Date(),
      description: pin.description,
      likedBy: [],
      ownerId: this.userId,
      title: pin.title,
      url: pin.url
    });
  }
});

export const Pins = new Mongo.Collection('pins');
