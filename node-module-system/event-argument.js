
const EventEmitter = require("events") //It is a class
const emitter = new EventEmitter() //It is an object

//register a listener
//* listener is a function that will be called when that event is raised.
emitter.on("message logged", (arg) => {
  console.log('Listener was called', arg)
})

//raise an event
emitter.emit('message logged', { id: 1, url: 'http://' })






//* Raise: logging (data: message)
emitter.on("logging", (arg) => {
  console.log("Listener was called", arg)
})

emitter.emit("logging", {data: "we are logged"})
