const {Rental, validate} = require("../models/rental")
const {Movie} = require("../models/movie")
const {Customer} = require("../models/customer")
const mongoose = require('mongoose')
const express = require('express')
const router = express.Router()

router.get("/", async (req, res) => {
  const rentals = await Rental.find().sort('-dateOut'); 
  //it is sorting by dateOut in a descend order that 
  //is why you have the minus(-) sign in front.
  res.send(rentals);
})

router.post("/", async (req, res) => {
  const { error } = validate(req.body)
  if (error) return res.status(400).send(error.details[0].message)

  const customer = await Customer.findById(req.body.customerId);
  if (!customer) return res.status(400).send('Invalid customer.');

  const movie = await Movie.findById(req.body.movieId)
  if(!movie) return res.status(400).send('Invalid movie.')

  if(movie.numberInStock === 0) return res.status(400).send('Movie not available')

  let rental = new Rental({
    customer: {
      _id: customer._id,
      name: customer.name,
      phone: customer.phone
    },
    movie: {
      _id: movie._id,
      title: movie.title,
      dailyRentalRate: movie.dailyRentalRate
    }
  })
  rental = await rental.save()

  movie.numberInStock--
  movie.save()

  res.send(rental)
})

module.exports = router

//PS: What if something goes wrong between the save on line 39
//and the save in line 42? To make sure that no problem will occur,
//we need something called "transactions". It will make sure both will be
//completed or none of them will apply. 
//In mongoDB we do not have transactions, there is a technique called
//to-phase-commit. Advanced topic related to mongo.