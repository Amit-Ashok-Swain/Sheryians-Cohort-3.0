const seven = document.querySelector("#seven");
const buttons = document.querySelector('.buttons')

/*
seven.addEventListener("click", (e) => {
  console.log(e);
});
*/
// Event Delegation comes from parent element where div of class name buttons has 10 buttons elements where click events are delegated to parent element of button
buttons.addEventListener("click",(event)=>{
    console.log(event.target);
})

/*
// set interval -> works infinitely based on the interval time set
setInterval(()=>{
    console.log("I'm Time Interval of 1 sec");
    
},1000)

// set timeout -> works only once
setTimeout(()=>{
    console.log("I'm Timeout who works only once after after 10 sec");
    
},10000)
*/

let randNumWithFloor = Math.floor(Math.random()*10); // Range from 0 to 9
console.log(randNumWithFloor);

let randNumWithCeil = Math.ceil(Math.random()*10);
console.log(randNumWithCeil); // Range from 1 to 10
