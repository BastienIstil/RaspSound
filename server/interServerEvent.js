var EventEmitter = require('events').EventEmitter;

function InterServerEvent()
{

}

InterServerEvent.prototype.__proto__ = EventEmitter.prototype;

module.exports = new InterServerEvent();

