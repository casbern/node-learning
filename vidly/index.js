const mongoose = require('mongoose')
const genres = require("./routes/genres")
const customers = require("./routes/customers")
const express = require("express")
const server = express()

mongoose.connect('mongodb://localhost/vidly', {
  useNewUrlParser: true, 
  useUnifiedTopology: true,
  useFindAndModify: false
}) 
.then( () => { console.log("Connected to MongoDB") })
.catch( err => { console.error("Could not connect to MongoDB", err)})

server.use(express.json())
server.use('/api/genres', genres)
server.use('/api/customers', customers)

const port = process.env.PORT || 3000
server.listen(port, () => console.log(`Listening on port ${port}`)) 