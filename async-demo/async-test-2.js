function pausecomp(millis) {
    var date = new Date();
    var curDate = null;
    do { curDate = new Date(); }
    while(curDate-date < millis);
}

console.log("Before")

setTimeout(() => {
  console.log("Reading a user from a database...")
},3000);

for (i=0; i<15; i++) {
    console.log(i)
    pausecomp(1000)
};

console.log("After")