// Selection of an element using querySelector.

// Only selects first tag
// const h1 = document.querySelector("h1");
// h1.textContent = "Hey! Amit";
// // console.dir(h1)
// console.log(h1); // <h1>Hey! Amit</h1>

// Select all the tags
// const h1 = document.querySelectorAll("h1");
// console.log(h1); // NodeList(5) [h1, h1.hey, h1#heading, h1, h1]

// Select by Tag name
// const h1 = document.getElementsByTagName("h1");
// console.log(h1); // HTMLCollection(5) [h1, h1.hey, h1#heading, h1, h1, heading: h1#heading]

// Select by Id
// const h1 = document.getElementById("heading");
// console.log(h1); // <h1 id="heading">Head1.3</h1>

// Select by Class name
// const h1 = document.getElementsByClassName("hey");
// console.log(h1);

// Changing of HTML

const h1 = document.querySelector(".hey");
const box = document.querySelector("#box");

h1.textContent = "Mercedes"

// box.innerHTML = "Jai Shree Ram"

// document.body.textContent = "Jai Shree Mahakal"

box.style.backgroundColor = "orange";

box.style.padding = "50px";

box.style.display = "flex";

box.style.alignItems = "center";

box.style.gap = "40px";



