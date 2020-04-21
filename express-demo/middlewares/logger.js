function logger (req, res, next) {
  console.log("logging...")
  //return res.send("hi")
  next()
}

module.exports = logger