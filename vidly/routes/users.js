const { User, validate } = require('../models/user')
const _ = require('lodash')
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
  if(user) return res.status(400).send("User already registered.")
  
  user = new User( _.pick(req.body, ['name', 'email', 'password'])
    //{ ** use the one above instead of the following one
    //name: req.body.name,
    //email: req.body.email,
    //password: req.body.password}
  )
  const salt = await bcrypt.genSalt(10) 
  user.password = await bcrypt.hash(user.password, salt)

  await user.save()
  return res.send( _.pick(user, ['_id', 'name', 'email']))
})

module.exports = router