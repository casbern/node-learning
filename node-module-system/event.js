
const EventEmitter = require("events") //It is a class
const emitter = new EventEmitter() //It is an object

//register a listener
//* listener is a function that will be called when that event is raised.
emitter.on("message logged", function() {
  console.log('Listener called')
})

//raise an event
emitter.emit('message logged')