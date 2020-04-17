//const Joi = require('@hapi/joi') //what is returned is a class. Helps with input validation.
const express = require('express') //it is a function
const server = express() //it is an object with many properties and methods.


server.use(express.json()) //*we add this to enable parsing up json objects in the body of the request.

const courses = [
  {id: 1, name: 'courses1'},
  {id: 2, name: 'courses2'},
  {id: 3, name: 'courses3'}
]

server.get('/', (req, res) => {
  return res.send("Hello World! Smile you are in the index page!")
})

server.get('/api/courses', (req, res) => {
  return res.send(courses) //* It sends all the courses I have registered so far.
})

server.get('/api/courses/:id', (req,res) => {
  const course = courses.find(course => course.id === parseInt(req.params.id))
  // courses are an array. 
  // find method takes one object (course) of this array per time.
  // you access this object (course) that find took by dot notation.
  // and compare it with id typed on the url. 
  // because this id is a string, you need to transform it to number first.
  // then the comparation will succeed.

  if(!course) return res.status(404).send('It seems we do not have this course.')

  return res.send(course)
})

server.post('/api/courses', (req,res) => {
  if(!req.body.name || req.body.length < 3) {
  return res.status(400).send("name is required and should be minimum of 3 characters")
}

  const course = {
    id: courses.length + 1,
    name: req.body.name
  }
  
  courses.push(course)
  return res.send(course)
})

server.put('/api/courses/:id', (req, res) => {
  const course = courses.find(course => course.id === parseInt(req.params.id))
  if(!course) return res.status(404).send('Course not found')

  if(!req.body.name || req.body.length < 3) {
    return res.status(400).send("name is required and should be minimum of 3 characters")
  }

  course.name = req.body.name
  return res.send(course)
})

server.delete('/api/courses/:id', (req,res) => {
  const course = courses.find(course => course.id === parseInt(req.params.id))
  if(!course) return res.status(404).send('Course not found')

  const index = courses.indexOf(course)
  courses.splice(index,1)

  return res.send(course)
})




server.get('/api/posts/:year/:month', (req, res) => {
  res.send(req.query) //Comes after question mark => ?sortBy=name
  res.send(req.params) //Set after the collon => /2018/5

  //* Route params is used for essential or required values.
  //* Query params is used for everything else that is optional.
})

const port = process.env.PORT || 3000
server.listen(port, () => console.log(`Listening to the port ${port}`))
