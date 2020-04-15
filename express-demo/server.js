const express = require('express') 
//It is a function
const server = express()
//It is an object with many properties and methods.

server.use(express.json()) //*we add this to enable parsing up json objects in the body of the request.

const courses = [
  {id: 1, name: 'courses1'},
  {id: 2, name: 'courses2'},
  {id: 3, name: 'courses3'}
]

server.get('/', (req, res) => {
  res.send("hello world!")
})

server.get('/api/courses', (req, res) => {
  res.send(courses)
})

server.get('/api/courses/:id', (req,res) => {
  const course = courses.find(course => course.id === parseInt(req.params.id))
  if(!course) res.status(404).send('Course not found')
  res.send(course)
})

server.post('/api/courses', (req,res) => {
  const course = {
    id: courses.length + 1,
    name: req.body.name
  }
  
  courses.push(course)
  res.send(course)
})




server.get('/api/posts/:year/:month', (req, res) => {
  res.send(req.query) //Comes after question mark => ?sortBy=name
  res.send(req.params) //Set after the collon => /2018/5

  //* Route params is used for essential or required values.
  //* Query params is used for everything else that is optional.
})

const port = process.env.PORT || 3000
server.listen(port, () => console.log(`Listening to the port ${port}`))
