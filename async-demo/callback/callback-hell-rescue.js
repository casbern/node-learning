console.log("Before")

getUser(1, getRepositories)

console.log("After")


//You give these anonymous functions a name.

function getRepositories(user) {
  console.log("User", user)

  getRepositories(user.gitHubUsername, displayRepos)
}

function displayRepos(repos) {
  console.log("Repos", repos)
}

function getUser(id, callback) {
  setTimeout(() => {
    console.log("Reading a user from a database...")

    callback({ id: id, gitHubUsername: "mosh"}) 

  },3000)
}

function getRepositories(username, callback) {
  setTimeout(() => {
    console.log("Calling GitHub API...")

    callback(['repo1',  'repo2', 'repo3'])

  }, 2000)
}