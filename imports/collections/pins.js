import { Mongo } from 'meteor/mongo';

Meteor.methods({
  'pins.insert': function(data) {
    return Pins.insert({
      createdAt: new Date(),
      description: data.desc,
      likedBy: [],
      ownerId: this.userId,
      title: data.title,
      url: data.url
    });
  },

  'pin.remove': (pin) => {
    return Pins.remove(pin);
  },

  'pin.like': function(pin) {
    return Pins.update(pin, {$push: { likedBy: this.userId }});
  },

  'pin.unlike': function(pin) {
    return Pins.update(pin, {$pop: { likedBy: this.userId }});
  }
});

export const Pins = new Mongo.Collection('pins');
