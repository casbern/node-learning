const mongoose = require('mongoose')

//* CONNECTING TO MONGOOSE
mongoose.connect('mongodb://localhost/playground', {useNewUrlParser: true, useUnifiedTopology: true}) //returns a promise
  .then( () => { console.log("Connected to MongoDB") })
  .catch( err => { console.error("Could not connect to MongoDB", err)})

//* CREATING A SCHEMA => like a blueprint  
  const courseSchema = new mongoose.Schema({
    name: { 
      type: String, 
      required: true,
      minlength: 5,
      maxlength: 255,
      //match: /pattern/
    },
    categories: {
      type: String,
      enum: ['web', 'network'],
      required: true
    },
    author: String,
    tags: {
      type: Array,
      validate: {
        // validator: function(value) {
        //   return value && value .length > 0
        // },
        isAsync: true, //deprecated
        validator: function( v, callback ) {
          setTimeout( () => {
            const result = v && v.length > 0
            callback(result)
          }, 5000)
        },
        message: "Course should have at least one tag"
      }
    },
    isPublished: {Boolean},
    price: { 
      type: Number,
      required: function() {
        return this.isPublished
      }
    },
    date: { 
      type: Date, 
      default: Date.now }
  })

//* CREATING A MODEL => like a class
  const Course = mongoose.model("Course", courseSchema)

//* CREATING AN INSTANCE OF THE COURSE MODEL
  async function createCourse() {
    const course = new Course({
      name: "Angular",
      categories: 'web',
      author: "Mosh",
      tags: [  ],
      isPublished: true,
      price: 10
    })

    try {
      const result = await course.save()
      console.log(result)
    }
    catch(exception) {
      console.log(exception.message)
    }

  }

  createCourse()

//* QUERYING DOCUMENTS 
  // async function getCourses() {
  //   const courses = await Course
  //     .find({ author: "Mosh", isPublished: true })
  //     .limit(10)
  //     .sort({ name: 1 })
  //     .select({ name:1, tags: 1 })
  //   console.log(courses)
  // }

  // getCourses()

//* Update a Document - QUERY FIRST
  // async function updateCourse(id) {
  //   const course = await Course.findById(id)

  //   if(!course) return

  //   // course.isPublished = true
  //   // course.author = "another author"

  //   //or

  //   course.set({
  //     isPublished: true,
  //     author: 'another author'
  //   })

  //   const result = await course.save()
  //   console.log(result)
  // }

  //* Update a Document - UPDATE FIRST  
  //* returns an object confirmation
  // async function updateCourse(id) {
  //   const result = await Course.update( {_id: id}, { $set: {
  //     author: "Paloma",
  //     isPublished: false
  //   }})
  //   console.log(result)
  // }
  
  //* Update a Document - Get the document that was updated
  //* returns the document before it was updated 
  // async function updateCourse(id) {
  //     const course = await Course.findByIdAndUpdate( id, {
  //       $set: {
  //       author: "New Course",
  //       isPublished: true
  //     }
  //   })
  //     console.log(course)
  //   }

  //* returns the updated object
    async function updateCourse(id) {
      const course = await Course.findByIdAndUpdate( id, {
        $set: {
        author: "New Course",
        isPublished: true
      }
    }, { new: true })
      console.log(course)
    }

//* DELETING A DOCUMENT
//* returns an object confirmation
async function deleteCourse(id) {
  const result = await Course.deleteOne( {_id: id } )
  console.log(result)
}

//* DELETE MORE THAN ONE DOCUMENT => Course.deleteMany() and it returns a result object confirmation.

//* RETURNING DOCUMENTS DELETED => Course.findByIdAndRemove(id) //deprecated


//deleteCourse('5eac52b55d975bb3850ff2b1')