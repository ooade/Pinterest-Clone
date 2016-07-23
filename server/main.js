import { Meteor } from 'meteor/meteor';
import { Pins } from '../imports/collections/pins';

Meteor.startup(() => {
  Meteor.publish('pins', function() {
    return Pins.find();
  });

  Meteor.publish('my-pins', function() {
    return Pins.find({ ownerId: this.userId });
  });
});
