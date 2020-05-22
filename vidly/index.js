const Joi = require("@hapi/joi")
Joi.objectId = require('joi-objectid')(Joi)
const mongoose = require('mongoose')
const genres = require("./routes/genres")
const customers = require("./routes/customers")
const movies = require("./routes/movies")
const rentals = require("./routes/rentals")
const users = require("./routes/users")
const auth = require("./routes/auth")
const config = require("config")
const express = require("express")
const server = express()

if(!config.get('jwtPrivateKey')) {
  console.error('FATAL ERROR: jwtPrivaKey is not defined')
  process.exit(1)
}

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
server.use('/api/movies', movies)
server.use('/api/rentals', rentals)
server.use('/api/users', users)
server.use('/api/auth', auth)

const port = process.env.PORT || 3000
server.listen(port, () => console.log(`Listening on port ${port}`)) 