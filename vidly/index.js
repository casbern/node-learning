const Joi = require("@hapi/joi")
const express = require("express")
const server = express()

server.use(express.json())

const genres = [
  {id: 1, name: "comedy"},
  {id: 2, name: "romance"},
  {id: 3, name: "terror"}
]

server.get("/", (req, res) => {
  return res.send("Hello World! This is your home page!")
})

server.get("/api/genres", (req, res) => {
  return res.send(genres)
})

server.get("/api/genres/:id", (req, res) => {
  const genre = genres.find(genre => genre.id === parseInt(req.params.id))

  if(!genre) return res.status(400).send("It seems we do not have this id you are looking for.")

  return res.senæd(genre)
})





const port = process.env.PORT || 3000
server.listen(port, () => console.log(`Listening to the port ${port}`))