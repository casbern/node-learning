console.log('Before');

//*Callback
// getUser(1, (user) => {
//   getRepositories(user.gitHubUsername, (repos) => {
//     getCommits(repos[0], (commits) => {
//       console.log(commits);
//     })
//   })
// });


//*Promise
// getUser(1)
//   .then(user => getRepositories(user.gitHubUsername))
//   .then(repos => getCommits(repos[0]))
//   .then(commits => console.log("Commits", commits))
//   .catch(err => console.log("Error", err.message))

//*Async
// everytime you are calling a function that returns a promise
// you can await the result of that function and store the result
// on a variabe object.

async function displayCommits() {

  try {
    const user = await getUser(1)
    const repos = await getRepositories(user.gitHubUsername)
    const commits = await getCommits(repos[0])
    console.log(commits) 
  }

  catch (err) {
    console.log('Error', err.message)
  }

}

displayCommits() // The type of this function is Promise<void>.
// That means a promise once fulfilled does not result in 
// a value, it is void. Async and await are build on top of promises.
// They are syntathical sugars in the language that allow us to write
// asynchronous code that looks synchronous.
// Internally when JS executes this code, it is going to convert this code
// in sth like this => .then(user => getRepositories(user.gitHubUsername))
// Even tough our code looks synchronous, it does not execute synchronously.
// When we are awaiting the result of this function, we re not really waiting or 
// blocking in a synchronous function.
// In terms of execution, when JS engine executes this line => await getUser(1),
// at this point, it is going to release our thread and make it available to do
// other work.  When the result of getUser is available then we come back to const user
// to store the result. And then call the second line.

// Async Await is just syntatic sugar, internally uses promises.
// Our code still runs async, but it looks and reads synchronously.


//! Using async Await we do not have the catch method. We use a try catch block to catch erros.
// Wrap your async code inside of a try block.

console.log('After');

function getUser(id) {
  return new Promise( (resolve, reject) => {

    setTimeout(() => {
      console.log('Reading a user from a database...');
      resolve({ id: id, gitHubUsername: 'mosh' });
    }, 2000);
  })
}

function getRepositories(username) {
  return new Promise( (resolve, reject) => {

    setTimeout(() => {
      console.log('Calling GitHub API...');
      resolve(['repo1', 'repo2', 'repo3']);
    }, 2000);
  })
}

function getCommits(repo) {
  return new Promise( (resolve, reject) => {

    setTimeout(() => {
      console.log('Calling GitHub API...');
      resolve(['commit', '2-commit']);
    }, 2000);
  })
}