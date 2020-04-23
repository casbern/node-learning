console.log("Before")

const user = getUser(1)
console.log(user) 

let i = 0
while(i<900000000) {
  console.log(i)
  i++
}


function getUser(id) {
  setTimeout(() => {
    console.log("Reading a user from a database...")
  },3000)
}