const EventEmitter = require("events")

class Order extends EventEmitter {
  process(message) {
    console.log(message)

    this.emit("orderProcessed", { id: 1, course: "Object Oriented JS with Mosh"})
  }
}

module.exports = Order
