const courses = require('./routes/courses')
const helmet = require('helmet')
const morgan = require('morgan')
const logger = require('./middlewares/logger')
const authentication = require('./middlewares/authentication')
const express = require('express') //it is a function
const app = express() //it is an object with many properties and methods.

app.use(express.json()) //*we add this to enable parsing up json objects in the body of the request.
app.use('/api/courses', courses)

app.use(express.urlencoded( {extended: true}))
app.use(express.static('public'))

app.use(logger)
app.use(authentication)

app.use(helmet())

console.log(`NODE_ENV: ${process.env.NODE_ENV}`)
console.log(`app.get: ${app.get('env')}`)
if (app.get('env') === 'development') {
  app.use(morgan('tiny'))
  console.log('Morgan is enabled...')
}

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Listening to the port ${port}`))
