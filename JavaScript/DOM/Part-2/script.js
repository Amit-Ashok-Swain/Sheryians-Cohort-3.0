const body = document.querySelector("body");

console.log(body.childNodes);
console.log(body.children);

const main = document.querySelector("main");

console.log(main.childNodes);
console.log(main.children);

const div1 = document.querySelector("#id-div");
console.log(div1.childNodes);
console.log(div1.children);

const div2 = document.querySelector(".class-div");
console.log(div2.childNodes);
console.log(div2.children);

// Changes in text and html content

div2.textContent = "Jackie-chan";
console.log(div2.textContent);
console.log(body.textContent);

div2.innerText =
  "<h3>Welcome to the <strong><i> DOM Starter Plan </i></strong> of JavaScript<h3>";
console.log(div2.innerText);
console.log(body.innerText);

div2.innerHTML =
  "<h3 class='sub-heading'>Welcome to the <strong><i> DOM Starter Plan </i></strong> of JavaScript<h3>";
console.log(div2.innerHTML);
console.log(body.innerHTML);

// Changes in styles

div1.style.backgroundColor = "orange";
div2.style.backgroundColor = "yellow";

const heading = document.querySelector("#heading");
console.log(heading);


heading.style.fontSize = "40px";

// classlist methods
// - classList.add() ->   Add class to an element
// - classList.remove() -> Remove class
// - classList.contains() -> exists or not ? returns true or false
// - classList.toggle() -> switch class if doesn't exist
// - classList.replace() -> replace existing class to new class.

const subHeading = document.querySelector(".sub-heading");

// classList.contains()
const checkClassExists  = subHeading.classList.contains("sub-heading");
console.log(checkClassExists);
console.log(subHeading);

// classList.replace()
// subHeading.classList.replace("sub-heading","new-sub-heading");
// console.log(subHeading);

// classList.toggle()
// subHeading.classList.toggle("sub-heading");

div1.classList.add("heading-classList")
console.log(div1);


main.style.display = "flex";
main.style.flexDirection = "column";
main.style.gap = "10px"

subHeading.style.fontSize = "25px";

heading.style.color = "purple"
subHeading.style.color = "blue"

div1.style.height = "100px"
div1.style.display = "flex"
div1.style.justifyContent = "center"

div2.style.height = "80px"
div2.style.display = "flex"
div2.style.justifyContent = "center"