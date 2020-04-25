const EventEmitter = require("events")

const catcher = new EventEmitter()


catcher.on("courseSold", (arg) => {
  console.log("The course has been sold.", arg)
})

catcher.emit("courseSold", { id: 1, title: "Object Oriented JS with Mosh"})