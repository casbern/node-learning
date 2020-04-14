var url = 'http://mylogger.io/log'

function log(message) {
  //send an HTTP request
  console.log(message)
}

//! Export as an object
//module.exports.otherName = log //* you can export that with another name.

//! Export as a function
module.exports = log

//console.log(module)