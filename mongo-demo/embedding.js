const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground')
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

const authorSchema = new mongoose.Schema({
  name: String,
  bio: String,
  website: String
});

const Author = mongoose.model('Author', authorSchema);

const Course = mongoose.model('Course', new mongoose.Schema({
  name: String, 
  author: {
    type: authorSchema, //so author will be mandatory
    required: true
  }
}));

async function createCourse(name, author) {
  const course = new Course({
    name, 
    author
  }); 
  
  const result = await course.save();
  console.log(result);
}

async function listCourses() { 
  const courses = await Course.find();
  console.log(courses);
}

async function updateAuthor(courseId) {
  //update directly to the dabase
  const course = await Course.update({_id: courseId}, {
    //to take that out use $unset
    $set: {
      'author.name': 'john smith'
    }
  })

  //or

  //const course = await Course.findById(courseId)
  //course.author.name = "mosh Ha"
  //course.save()
}

//createCourse('Node Course', new Author({ name: 'Mosh' }));
updateAuthor("pass the id here")
