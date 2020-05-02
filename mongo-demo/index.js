const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/playground') //returns a promise
  .then( () => { console.log("Connected to MongoDB") })
  .catch( err => { console.error("Could not connect to MongoDB", err)})

  const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [ String ],
    date: { type: Date, default: Date.now },
    isPublished: Boolean
  })

  const Course = mongoose.model("Course", courseSchema)

  async function createCourse() {

    const course = new Course({
      name: "Angular",
      author: "Mosh",
      tags: [ "angular", "frontend"],
      isPublished: true
    })

    const result = await course.save()
    console.log(result)
  }

  //Querying documents
  async function getCourses() {
    const courses = await Course
      .find({ author: "Mosh", isPublished: true })
      .limit(10)
      .sort({ name: 1 })
      .select({ name:1, tags: 1 })
    console.log(courses)
  }

  getCourses()

  //Update a Document
  async function updateCourse(id) {
    const course = await Course.findById(id)

    if(!course) return

    // course.isPublished = true
    // course.author = "another author"

    //or

    course.set({
      isPublished: true,
      author: 'another author'
    })

    const result = await course.save()
    console.log(result)
  }

  updateCourse('5eac51561ac4c3b3577aa42f')