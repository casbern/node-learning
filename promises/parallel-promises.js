const p1 = new Promise( (resolve) => {
  setTimeout(() => {
    console.log('Async operation 1...')
    resolve(1)
  }, 2000);
})

// const p1 = new Promise( (resolve,reject) => {
//   setTimeout(() => {
//     console.log('Async operation 1...')
//     resolve(new Error('because something failed.'))
//   }, 2000);
// })

const p2 = new Promise( (resolve) => {
  setTimeout(() => {
    console.log('Async operation 2...')
    resolve(2)
  }, 2000);
})

//* they are call almost the same time. It does not
//* wait the result of the first one to kick off the
//* the second one.


//promise.all solves all async codes and then return the 
//value.

Promise.all([p1,p2]) 
 .then(result => console.log(result))
 .catch(err => console.log('Error', err.message))

//promise.race returns the value as soon as the first async 
//is solved.

 Promise.race([p1,p2]) 
 .then(result => console.log(result))
 .catch(err => console.log('Error', err.message))