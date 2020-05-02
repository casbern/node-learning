const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/mongo-exercises', {useNewUrlParser: true, useUnifiedTopology: true}) //returns a promise
  .then( () => { console.log("Connected to MongoDB") })
  .catch( err => { console.error("Could not connect to MongoDB", err)})

  const courseSchema = new mongoose.Schema({
    tags: [ String ],
    date: { type: Date, default: Date.now },
    name: String,
    author: String,
    isPublished: Boolean,
    price: Number
  })

  const Course = mongoose.model("Course", courseSchema)

  //Exercise 1
  // async function getCourses() {
  //   return await Course
  //     .find({ isPublished: true, tags: 'backend' })
  //     .sort({ name: 1 })
  //     .select({ name:1, author: 1 })
  // }

  //Exercise2
  // async function getCourses() {
  //   return await Course
  //     .find({ isPublished: true, tags: { $in: ['backend', 'frontend'] }})
  //     //.or([ {tags: 'frontend'}, {tags: 'backend'}]) //another way of taking backend and frontend
  //     .sort({ price: -1 }) // or '-price', no curly braces.
  //     .select({ name:1, author: 1, price: 1 })
  // }

  //Exercise3
  async function getCourses() {
    return await Course
      .find({ isPublished: true })
      .or([ 
        {price: { $gte: 15 } }, 
        {name: /.*by.*/i } 
      ])
      .sort({ price: -1 }) // or '-price', no curly braces.
      .select({ name:1, author: 1, price: 1 })
  }
 
  async function run() {
    const courses = await getCourses()

    console.log(courses)
  }

  run()

    // when we decore a function with async, JS engine automatically wraps
    // the result in a promise, so getCourses() returns a promise, that when
    // resolved will give us an array of objects.

    // everytime you use await you need to wrap that in a async function.