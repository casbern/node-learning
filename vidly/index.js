const Joi = require("@hapi/joi")
const express = require("express")
const server = express()

server.use(express.json())

const genres = [{
    id: 1,
    name: "comedy"
  },
  {
    id: 2,
    name: "romance"
  },
  {
    id: 3,
    name: "terror"
  }
]

server.get("/", (req, res) => {
  return res.send("Hello World! This is your home page!")
})

server.get("/api/genres", (req, res) => {
  return res.send(genres)
})

server.get("/api/genres/:id", (req, res) => {
  const genre = genres.find(genre => genre.id === parseInt(req.params.id))

  if (!genre) return res.status(400).send("It seems we do not have this id you are looking for.")

  return res.send(genre)
})

server.post("/api/genres", (req, res) => {
  //INPUT VALIDATION WITH JOI
  const schema = Joi.object({
    name: Joi.string().min(3).required()
  })

  const result = schema.validate(req.body)

  if (result.error) {
    console.log(result.error)
    return res.status(400).send(result.error.details[0].message)
  }

  const genre = {
    id: genres.length + 1,
    name: req.body.name
  }

  genres.push(genre)
  return res.send(genre)
})

server.put("/api/genres/:id", (req, res) => {
  const genre = genres.find(genre => genre.id === parseInt(req.params.id))
  if(!genre) return res.status(404).send('This genre was not found')

   //INPUT VALIDATION WITH JOI
   const schema = Joi.object({
    name: Joi.string().min(3).required()
  })

  const result = schema.validate(req.body)

  if(result.error) {
    console.log(result.error)
    return res.status(400).send(result.error.details[0].message)
  }

  genre.name = req.body.name
  return res.send(genre)
})

server.delete("/api/genres/:id", (req, res) => {
  const genre = genres.find(genre => genre.id === parseInt(req.params.id))
  if(!genre) return res.status(404).send('This genre was not found')

  const index = genres.indexOf(genre) //return the position (index) of that object in the array.
  
  genres.splice(index,1) 
  
  return res.send(genre)
})




const port = process.env.PORT || 3000
server.listen(port, () => console.log(`Listening to the port ${port}`))