import { Mongo } from 'meteor/mongo';

Meteor.methods({
  'pins.insert': function(data) {
    return Pins.insert({
      createdAt: new Date(),
      description: data.desc,
      likes: 0,
      ownerId: this.userId,
      title: data.title,
      url: data.url
    });
  }
});

export const Pins = new Mongo.Collection('pins');
