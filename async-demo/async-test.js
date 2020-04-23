// function addNumbers(a,b) {
//   return a + b
// }

// const result = addNumbers(1,2)
// console.log(result)

// ============= //

// console.log("Start")

// const result = addNumbers(1,2)
// console.log(result)

// console.log("End")

// function addNumbers(a,b) {
//   return a + b
// }

// const result = addNumbers(1,2)
// console.log(result)

// ============== //

console.log("Start")

const result = addNumbers(1,2)
console.log(result)

console.log("End")

function addNumbers(a,b) {
  setTimeout(() => {

    console.log(a+b)

  },2000)

  //return "i am outside setTimeout"
  return a+b
}

