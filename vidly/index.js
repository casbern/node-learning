const genres = require("./routes/genres")
const express = require("express")
const server = express()

server.use(express.json())
server.use('/api/genres', genres)

const port = process.env.PORT || 3000
server.listen(port, () => console.log(`Listening on port ${port}`))