const p = new Promise( (resolve, reject) => {
  //Kick off some async work

  setTimeout( () => {
    resolve(1) //pendind => resolved, fullfield

    reject(new Error("message")) // pending => rejected
  }, 2000)
})

p
.then(result => console.log("result", result))
.catch(err => console.log("error", err.message))