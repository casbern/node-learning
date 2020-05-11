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
  authors: [authorSchema]
}));

async function createCourse(name, authors) {
  const course = new Course({
    name, 
    authors
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

async function addAuthor(courseId, author) {
  const course = await Course.findById(courseId)
  course.authors.push(author) //changes are only in memory that´s why we need to call
  course.save()
}
//addAuthor('courseid-goes-here', new Author({name: 'may'}))

// createCourse('Node Course', [
//   new Author({ name: 'Mosh' }),
//   new Author({ name: 'Johm' }),
// ]);
//updateAuthor("pass the id here")

async function removeAuthor(courseId, authorId) {
  const course = await Course.findById(courseId)
  const author = course.authors.id(authorId)
  author.remove()
  course.save()
}
//removeAuthor('courseid-goes-here')