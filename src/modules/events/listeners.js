const db = require('./db/repository');
const { EventEmitter } = require('events');
const emitter = new EventEmitter();


module.exports.register = function () {

  emitter.on('stateChange', event => {
    console.log(event);
  });

};