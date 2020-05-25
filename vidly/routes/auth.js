const { User } = require('../models/user')
const _ = require('lodash')
const Joi = require('@hapi/joi')
const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const express = require('express')
const router = express.Router() 

router.post("/", async (req, res) => {
  //validation made by joi
  const {error} = validate(req.body)
  if (error) return res.status(400).send(error.details[0].message)

  //validation. Make sure the user is not registered.
  let user = await User.findOne({ email: req.body.email })
  if(!user) return res.status(400).send("Invalid email or password.")
  
  const validPassword = await bcrypt.compare(req.body.password, user.password)

  if(!validPassword) return res.status(400).send("Invalid email or password.")

  const token = user.generateAuthToken()
  return res.send( token )
})

function validate(req) {
  const schema = Joi.object({
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(255).required()
  })
  return schema.validate(user)
}

module.exports = router