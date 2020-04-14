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

const port = process.env.PORT || 3000
server.listen(port, () => console.log(`Listening to the port ${port}`))
