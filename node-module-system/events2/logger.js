const EventEmitter = require("events")

class Order extends EventEmitter {
  process() {
    //console.log(message)

    this.emit("orderProcessed", { id: 1, course: "Object Oriented JS with Mosh"})
  }
}

module.exports = Order
