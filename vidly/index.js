const mongoose = require('mongoose')
const genres = require("./routes/genres")
const express = require("express")
const server = express()

mongoose.connect('mongodb://localhost/vidly', {useNewUrlParser: true, useUnifiedTopology: true}) 
.then( () => { console.log("Connected to MongoDB") })
.catch( err => { console.error("Could not connect to MongoDB", err)})

server.use(express.json())
server.use('/api/genres', genres)

const port = process.env.PORT || 3000
server.listen(port, () => console.log(`Listening on port ${port}`)) 