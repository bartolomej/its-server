const db = require('./db/repository');
const { EventEmitter } = require('events');
const itsEventEmitter = new EventEmitter();
const Event = require('./Event');


module.exports = function () {

  itsEventEmitter.on(
    'itsEvent',
    async (type, uid, description) => {
      console.log('received event: ', type, description);
      try {
        await db.saveEvent(new Event(type, uid, description))
      } catch (e) {
        console.error('Failed to save an event');
        console.log(e);
      }
    }
  );

};

module.exports.emitEvent = function ({ type, creatorId, description }) {
  itsEventEmitter.emit('itsEvent', type, creatorId, description);
};