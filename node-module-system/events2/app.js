const EventEmitter = require("events")

const Order = require("./logger")
const myOrder = new Order()


myOrder.on("orderProcessed", (arg) => {
  console.log("Your order was processed", arg)
})

myOrder.process("Your result is:")


// Considerations:
// Why when I do not pass an argument to the method process() in the logger file
// when I execute this code, the message "Your order was processed" does not appear?

// Then after placing an argumet there and calling it here "myOrder.process("Your result is:")", the console.log appears?

//But the actually message "Your result is" will only appear if the console.log(message) is set in the logger file.



