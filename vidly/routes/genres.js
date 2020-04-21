const Joi = require("@hapi/joi")
const express = require('express')
const router = express.Router() 

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

router.get("/", (req, res) => {
  return res.send(genres)
})

router.get("/:id", (req, res) => {
  const genre = genres.find(genre => genre.id === parseInt(req.params.id))

  if (!genre) return res.status(400).send("It seems we do not have this id you are looking for.")

  return res.send(genre)
})

router.post("/", (req, res) => {
  //INPUT VALIDATION WITH JOI
  // const schema = Joi.object({
  //   name: Joi.string().min(3).required()
  // })

  // const result = schema.validate(req.body)

  // if (result.error) {
  //   console.log(result.error)
  //   return res.status(400).send(result.error.details[0].message)
  // }

  const {
    error
  } = validateGenre(req.body)
  if (error) return res.status(400).send(error.details[0].message)

  const genre = {
    id: genres.length + 1,
    name: req.body.name
  }

  genres.push(genre)
  return res.send(genre)
})

router.put("/:id", (req, res) => {
  const genre = genres.find(genre => genre.id === parseInt(req.params.id))
  if (!genre) return res.status(404).send('This genre was not found')

  //INPUT VALIDATION
  const {
    error
  } = validateGenre(req.body)
  if (error) return res.status(400).send(error.details[0].message)

  genre.name = req.body.name
  return res.send(genre)
})

router.delete("/:id", (req, res) => {
  const genre = genres.find(genre => genre.id === parseInt(req.params.id))
  if (!genre) return res.status(404).send('This genre was not found')

  const index = genres.indexOf(genre) //return the position (index) of that object in the array.

  genres.splice(index, 1)

  return res.send(genre)
})

function validateGenre(genre) {
  const schema = Joi.object({
    name: Joi.string().min(3).required()
  })
  return schema.validate(genre)
}

module.exports = router //After we attached all the routes to the router, we export it.