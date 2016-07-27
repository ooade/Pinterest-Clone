import { Mongo } from 'meteor/mongo';

Meteor.methods({
  'pins.insert': function(pin) {
    if (!this.userId) { return; }
    return Pins.insert({
      createdAt: new Date(),
      description: pin.desc,
      likedBy: [],
      retweetedBy: [],
      retweeted: null,
      ownerId: this.userId,
      title: pin.title,
      url: pin.url
    });
  },

  'pin.remove': (pin) => {
    /** unretweet a pin whenever deleted **/
    if (pin.retweeted) {
      Pins.update({ _id: pin.retweeted }, { $pop: { retweetedBy: this.userId }});
    }

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

    Pins.update(pin, { $push: { retweetedBy: this.userId }});

    return Pins.insert({
      createdAt: new Date(),
      description: pin.description,
      likedBy: [],
      retweetedBy: [],
      retweeted: pin._id,
      ownerId: this.userId,
      title: pin.title,
      url: pin.url
    });
  }
});

export const Pins = new Mongo.Collection('pins');
