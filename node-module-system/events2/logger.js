const EventEmitter = require("events")

class Order extends EventEmitter {
  process(course) {
    console.log("process(course) called with course")
    console.log(course)

    this.emit("orderProcessed", course)
  }
}

module.exports = Order
