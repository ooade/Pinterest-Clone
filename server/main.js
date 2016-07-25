import { Meteor } from 'meteor/meteor';
import { Pins } from '../imports/collections/pins';

Meteor.startup(() => {
  Meteor.publish('pins', function() {
    return Pins.find();
  });

  Meteor.publish('my-pins', function() {
    return Pins.find({ ownerId: this.userId });
  });

  Meteor.publish('userList', function() {
    return Meteor.users.find({}, {fields: {'services.password': 0 }});
  });
});
