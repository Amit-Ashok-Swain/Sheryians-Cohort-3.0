let main = document.querySelector("main");

let boxDiv = document.createElement("div");

boxDiv.classList.add("box-div")

let box1 = document.createElement("div");

box1.classList.add("box","box1");

box1.innerHTML = "<h1>Box 1</h1>"

let box2 = document.createElement("div");

box2.classList.add("box","box2");

box2.innerHTML = "<h1>Box 2</h1>"

let box3 = document.createElement("div");

box3.classList.add("box","box3");

box3.innerHTML = "<h1>Box 3</h1>"

let box4 = document.createElement("div");

box4.classList.add("box","box4");

box4.innerHTML = "<h1>Box 4</h1>"

main.appendChild(boxDiv);

// boxDiv.append(box1,box2,box3);

boxDiv.append(box1,box2);

console.log(main);

// Old API's 
// - appendChild(), insertBefore(), removeChild(), replaceChild()

// Modern API's
// - append() - Adds multiple nodes/elements + strings in one call.
// prepend(), before(), after(), replaceWith()

// Old API's

// insertBefore() -> parentElement.insertBefore("to be inserted before",to be inserted before whom)
boxDiv.insertBefore(box2,box1);


// Modern API's

// prepend() -> parentElement.prepend("elements to be added on top/start inside the parent element ")
boxDiv.prepend(box3)

// before() -> parentElement.before("elements to be added on top/start outside the parent element ")
// boxDiv.before(box1);

// before() -> innerElement.before("elements to be added on before the innerElement inside the parent element ")
box3.before(box1)

// after() -> innerElement.before("elements to be added on top/start after the innerElement inside the parent element ")
box2.after(box1)

// replace()
box1.replaceWith(box4);

// replaceChild();
boxDiv.replaceChild(box1,box4)


