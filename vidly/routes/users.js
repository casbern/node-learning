const { User, validate } = require('../models/user')
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
  
  user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  })

  await user.save()
  
  return res.send(user)
})

module.exports = router