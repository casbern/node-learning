const express = require('express') 
//It is a function
const server = express()
//It is an object with many properties and methods.

server.get('/', (req, res) => {
  res.send("hello world!")
})

server.apply('/api/courses', (req, res) => {
  res.send([1,2,3])
})

server.listen(3000, () => console.log("listening on the port 3000"))
