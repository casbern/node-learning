const EventEmitter = require("events")

const Order = require("./logger")
const myOrder = new Order()


myOrder.on("orderProcessed", (arg) => {
  console.log("Your order was processed", arg)
})

myOrder.process({ course: "JS Basics", id: 1 })




