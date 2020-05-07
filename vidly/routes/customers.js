const { Customer, validate } = require('../models/customer')
const mongoose = require('mongoose')
const express = require('express')
const router = express.Router() 

router.get("/", async (req, res) => {
  const customers = await Customer.find().sort('name')
  return res.send(customers)
})

router.get("/:id", async (req, res) => {
  const customer = await Customer.findById(req.params.id)

  if (!customer) return res.status(400).send("It seems we do not have this id you are looking for.")

  return res.send(customer)
})

router.post("/", async (req, res) => {
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
  } = validate(req.body)
  if (error) return res.status(400).send(error.details[0].message)

  let customer = new Customer ({ 
    isGold: req.body.isGold,
    name: req.body.name,
    phone: req.body.phone
   })

  customer = await customer.save()
  return res.send(customer)
})

router.put("/:id", async (req, res) => {
  const { error } = validate(req.body)
  if (error) return res.status(400).send(error.details[0].message)

  const customer = await Customer.findByIdAndUpdate(req.params.id, { 
    isGold: req.body.isGold,
    name: req.body.name,
    phone: req.body.phone
   }, {new: true})

  if (!customer) return res.status(404).send('This customer was not found')
  
  return res.send(customer)
})

router.delete("/:id", async (req, res) => {
  const customer = await Customer.findByIdAndRemove(req.params.id)

  if (!customer) return res.status(404).send('This customer was not found')

  return res.send(customer)
})

module.exports = router //After we attached all the routes to the router, we export it.