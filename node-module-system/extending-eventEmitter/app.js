const EventEmitter = require("events")

const Logger = require("./logger")
const logger = new Logger()

//Register a listener
logger.on("messageLogged", (arg) => {
  console.log("Listener called", arg)
})

//logger.log("message")
logger.log("This is my message")

// if you want to raise events in your applicatin to signal
// that something has happened, you need to create
// a class that extends EventEmitter.
// So this class will have all the functionality defined in EventEmitter.
// You can also add additional functionality, like in this case we have
// the ability to log a message.
// And inside that class whenever you want to raise an event you use
// "this.emit" because "this" references this logger class itself, which
// extends EventEmitter. So the methods defined in EventEmitter will also
// be part of this class.

// In app modules, instead of using an instance of EventEmitter, you will
// use and instance of the custom class that you have defined that extends
// EventEmitter.