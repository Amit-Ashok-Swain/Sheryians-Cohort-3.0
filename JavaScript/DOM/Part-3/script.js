const subHeading = document.querySelector("#sub-head");
// getAttribute("attribute-name") -> gives the value of it's attributes
let getAttributeOfHead = subHeading.getAttribute("class");
console.log(getAttributeOfHead); // c1 c2 c3

// setAttribute("attribute-name","attribute-value") -> creates, adds and update the attribute with it's given value
subHeading.setAttribute("width","200px");
console.log(subHeading); // <h3 id="head" class="c1 c2 c3" width="200px">Hey I'm only for testing purpose</h3>

const getValueOfWidth = subHeading.getAttribute("width");
console.log(getValueOfWidth); // 200px

// Using setAttribute to update the class attributes value
subHeading.setAttribute("class","chocolate vanilla strawberry");
console.log(subHeading); // <h3 id="head" class="chocolate vanilla strawberry" width="200px">Hey I'm only for testing purpose</h3>

// removeAttribute("attribute-name"); -> removes attribute with it's value
subHeading.removeAttribute("class");
console.log(subHeading); // <h3 id="head" width="200px">Hey I'm only for testing purpose</h3>

console.log(subHeading.getAttribute("class")); // null

// hasAttribute("attribute-name"); -> checks attribute exists or not and return true or false
const checkAttribute = subHeading.hasAttribute("width");
console.log(checkAttribute); // true


// Add custom attributes to html using data-attribute-name="attribute-value" and accessing it using dataset

const customAttribute = document.querySelector("#head");

let customAttributeValue = customAttribute.getAttribute("data-custom-attribute");
console.log(customAttributeValue); // Jabhaisscript

console.log(customAttribute); // <h1 id="head" data-custom-attribute="Jabhaisscript">Welcome to DOM Class 3</h1>

// Update the value of custom attributes using dataset.attributeName = "Value"
customAttribute.dataset.customAttribute = "JavaScript";
console.log(customAttribute); // <h1 id="head" data-custom-attribute="JavaScript">Welcome to DOM Class 3</h1>

// difference between input.getAttribute and input.value

let input = document.querySelector("#input-box");
let btn = document.querySelector('#search-btn');

btn.addEventListener('click',()=>{
    console.log(`From Input Value(input.value)=>${input.value}`);
    console.log(`From Input Attribute(input.getAttribute("value")=>${input.getAttribute("value")})`);  
})
// script.js:47 From Input Value(input.value)=>Trending News --> provides the value as provided in HTML
// script.js:48 From Input Attribute(input.getAttribute("value")=>Trending News) ---> provides the value as provided in HTML
// script.js:47 From Input Value(input.value)=>Trending News ---> on second click event is noted and it provides the value as provided in HTML
// script.js:48 From Input Attribute(input.getAttribute("value")=>Trending News) ---> on second click event is noted and it provides the value as provided in HTML
// script.js:47 From Input Value(input.value)=>Chocolate.  ---> on third click value was dynamically changed on the page and return the dynamically update value
// script.js:48 From Input Attribute(input.getAttribute("value")=>Trending News) ---> on third click it still returns the static value which was provided to HTML


// create, add and remove element with DOM

// Creating element

const main = document.querySelector("main");

let div = document.createElement("div");

let span = document.createElement("span");

let p = document.createElement("p");

console.log(div);

// Adding element using appendChild()
main.appendChild(span);
main.appendChild(div);
main.appendChild(p);

div.innerHTML = "Hey I'm <i>Dynamic</i> in nature."
span.textContent = "Hey I'm span tag added dynamically."
p.innerText = "I'm temporary one and I will be removed soon."

console.log(main);

// Adding elements using append();

let section = document.createElement("section");
let footer = document.createElement("footer");

main.append(section,footer);

console.log(main);

let selectedSection = document.querySelector("section");

let divInSection = document.createElement("div");

let pInSection = document.createElement("p");

let spanInSection = document.createElement("span");

let subHeadingInSection = document.createElement("h3")

selectedSection.append(divInSection,pInSection,spanInSection,subHeadingInSection);

console.log(main);

// remove element using removeChild 

main.removeChild(p);
selectedSection.removeChild(spanInSection);
console.log(main);

// Old API's 
// - appendChild(), insertBefore(), removeChild()

// Modern API's
// - append() - Adds multiple nodes/elements + strings in one call.
// prepend(), before(), after(), replaceWith()

// Let's understand these API's in detail in UI tutorial folder with the UI-box representation








