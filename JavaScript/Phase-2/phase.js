// Part A — Functions

// 1. Why Do We Need Functions?

/*

// Without functions:

let length1 = 5, breadth1 = 3;
let area1 = length1 * breadth1;
console.log(area1);

let length2 = 10, breadth2 = 4;
let area2 = length2 * breadth2;
console.log(area2);

let length3 = 7, breadth3 = 2;
let area3 = length3 * breadth3;
console.log(area3);


// With a function:

function calculateArea(length, breadth){
    return length*breadth;
}

// calculateArea(50,60);

console.log(calculateArea(50,60));

*/

// 2. Function Declaration

/*

function greet(name){
    console.log(`Hello, ${name}`);   
}

greet("Amit");
greet("Priya");

*/

// 3. Function Expression

/*

var greet1 = function(name){
    console.log(`Hello, ${name}`);   
};

greet1("Sumit");
greet1("Rocky");

*/

// 4. Anonymous Functions

/*
const sayHi = function(){
    console.log("Hi!");
};

sayHi();

*/

// 5. Arrow Functions (Modern, Preferred)

/*

// Regular function expression

const add = function(a,b){
    return a+b;
}

console.log(add(2,3));


// Arrow function — same thing

const addArrow = (a,b)=>{
    return a+b;
}

console.log(add(5,9));

// Shorthand rules:

// Single expression → implicit return (no braces, no return keyword)

const addition = (a,b) => a+b;

// Single parameter → parentheses optional

const square = x => x**2;

// No parameters → empty parentheses required

const greet = () => console.log("Hello");

// Multi-line body → braces and explicit return required

const adding = (a,b) =>{
    const sum = a+b;
    return sum;
};

*/

// 6. Parameters: Defaults, Rest, and Edge Cases

/*

// Default Parameters - If no argument is passed, use a default value

function greeting(name = "Guest"){
    console.log(`Hello,${name}`);
}

greeting("Amit");
greeting();

// Rest Parameters

function sum(...numbers){
    let total = 0;
    for(i of numbers){
        total+=i;
    }
    return total;
}

console.log(sum(1,2,3,4,5));
console.log(sum(982,28732,238723,982372));

// What If You Pass Too Many or Too Few?

function add(a,b){
    return a+b;
}

console.log(add(7)); // NaN
console.log(add(7,9)); // 16

*/

// 7. Return Values

/*

function multiply(a,b){
    return a*b;
}

let result = multiply(12,8);
console.log(result);


function checkAge(age){
    if(age<0) return "Invalid age";
    else if(age>=18) return "Adult";
    return "Minor"
}

console.log(checkAge(-5)); 
console.log(checkAge(20));
console.log(checkAge(15));

*/

// 8. Functions as First-Class Citizens

/*

// 1. Store in a variable

const sayHi = function(){ console.log("Hi");};

// 2. Pass as argument

function callTwice(fn){
    fn();
    fn();
}

callTwice(sayHi); // Hi Hi

// 3. Return from a function

function makeGreeting(greeting){
    return function(name){
        console.log(`${greeting}, ${name}`);
    };
}

const helloGreeter = makeGreeting("Hello");
helloGreeter("Amit");

*/

// 9. Callback Functions

/*
function processUser(name, callback){
    console.log(`Processing User: ${name}`);
    callback(name);
}

function welcome(name){
    console.log(`Welcome, ${name}`);
}

processUser("Amit",welcome);


setTimeout(function(){
    console.log("3 secs passed")
},3000);

*/

// 10. Higher-Order Functions

// Both `processUser` and `makeGreeter` above are higher-order functions.

// This isn't a new concept — it's just the *name* for the pattern you just learned.

// 11. 11. IIFE — Immediately Invoked Function Expression

/*

(function(){
    console.log("I run immediately");
})();

*/

// 12.  Pure vs Impure Functions

/*

// Pure Functions

function add(a, b) {
    return a + b;
}
// Pure: add(2, 3) is always 5. Nothing outside changes.


// Impure functions

let total = 0;
function addToTotal(n) {
    total += n;       // side effect — changes outer variable
    return total;
}

*/

// 13. Recursion

/*

function factorial(n) {
    if (n <= 1) return 1;          // base case
    return n * factorial(n - 1);   // recursive case
}

console.log(factorial(5));   // 120

*/


// Part B — Arrays

// 1. Creating Arrays

/*

let fruits = ["apple", "banana", "mango", "guava", "pineapple"];

let numbers = [1,2,3,4,5];

let mixed = ["Amit",27,true,null];

let empty = [];

*/

// 2. Accessing Elements (Zero-Indexed)

/*

let fruits = ["apple", "banana", "mango", "guava", "pineapple"];

console.log(fruits[0]);
console.log(fruits[1]);
console.log(fruits[2]);
console.log(fruits[3]);
console.log(fruits[4]);
console.log(fruits[-1]); // negative index don't work in JS

console.log(fruits.at(-1)); // pineapple
console.log(fruits.length-1);

*/


// 3. Array Length

/*

let arr = [10, 20, 30, 40];

console.log(arr.length); // 4;

arr.length = 2;

console.log(arr); // [10,20]

*/

// 4. Mutating Methods (Change the Original)

/*

let arr = [2,3,4];
console.log(arr);

arr.push(5); // [2,3,4,5]
console.log(arr);

arr.unshift(1); // [1,2,3,4,5]
console.log(arr);

let last = arr.pop() // last = 5 arr = [1,2,3,4]
console.log(arr);
console.log(last);

let first = arr.shift() // first = 1 arr = [2,3,4]
console.log(arr);
console.log(first);

arr.reverse(); // [4,3,2]
console.log(arr);

arr.sort(); // [2,3,4]
console.log(arr);

*/

// splice — the swiss army knife:

/*

let arr = [1,2,3,4,5];

console.log(arr);

arr.splice(1,2) // [1,4,5]

console.log(arr);

let arr2 = [1,2,5];

console.log(arr2);

arr2.splice(2,0,3,4); // [1,2,3,4,5] 

console.log(arr2);

let arr3 = [1,2,99,4];

console.log(arr3);

arr3.splice(2,1,3); // [1,2,3,4,5]

console.log(arr3);

*/

// Important gotcha with sort()

/*

arr4 = [10,1,5,100];
arr4.sort();
console.log(arr4); // [1,10,100,5]

arr4.sort((a,b)=>(a-b));
console.log(arr4);

arr4.sort((a,b)=>(b-a));
console.log(arr4);

*/

// 5. Non-Mutating Methods (Return New Array)

/*

arr = [1,2,3,4,5];

console.log(arr.slice(1,4)); // [2,3,4]
console.log(arr.concat([6,7,8])); // [1,2,3,4,5,6,7,8]
console.log(arr.includes(3)); // true
console.log(arr.indexOf(3)); // 2
console.log(arr.indexOf(99)); // -1
console.log(arr.join("-")); // "1-2-3-4-5"

*/

// 6. Iteration Methods (The Powerful Ones)

// forEach — just run a function on each element

/*

let nums = [1,2,3,4,5];


//normal function
nums.forEach(function(num){
    console.log(num*=2);
});

// arrow function

nums.forEach(num=>console.log(num*=2));

// The callback can also receive index and the whole array
nums.forEach((value, index, array) => {
    console.log(index, value);
    console.log(array);
    
});
// forEach does NOT return anything (it returns undefined). It's just for side effects.

*/

// map — transform each element into something new

/*

let nums = [1,2,3,4,5];

let double = nums.map(num=>num*2);
console.log(double); // [2, 4, 6, 8, 10]
console.log(nums); // [1, 2, 3, 4, 5]

// map returns a new array of the same length.

*/

// filter - keep only elements that pass a condition

/*

let nums = [1,2,3,4,5,6];

let evens = nums.filter(num=>num%2==0);
console.log(evens); // [2,4,6] 
console.log(nums); // [1, 2, 3, 4, 5, 6]

// filter returns a new array, possibly shorter.

*/

// reduce — boil the array down to a single value

/*

let nums = [1,2,3,4,5];

let sum = nums.reduce((accumulator,num)=>accumulator+num,0);
console.log(sum);

let product = nums.reduce((accumulator,num)=>accumulator*num,1);
console.log(product);

// reduce is the most powerful — and the most confusing at first. Give students lots of practice.

*/

// find — return the first matching element

/*

let users = [{group:"A",age:25},{group:"B",age:30}];
let user = users.find(u=>u.group=="A");
console.log(user); // {group:"B",age:30}

*/

// findIndex — return the index of the first match

/*

let nums = [10,20,30,40,50];
let idx = nums.findIndex(num=>num>40)
console.log(idx); // 4

let invalidIdx = nums.findIndex(num=>num>50);
console.log(invalidIdx); // -1

*/

// some — does AT LEAST ONE match?

/*

let nums = [1,2,3,4,5];

match = nums.some(num=>num>=4);
console.log(match); // true

*/

// every — do ALL match?

/*

let nums = [1,2,3,4,5];

let allMatch = nums.every(num=>num>0);
console.log(allMatch); // true

let noneMatch = nums.every(num=>num>2);
console.log(noneMatch);

*/

// 7. Array Destructuring

// A clean way to extract values from arrays into variables.

/*

let arr = [10,20,30,40,50];

// Old way
let x = arr[0]; // 10
let y = arr[1]; // 20
let z = arr[2]; // 30
console.log(x);
console.log(y);
console.log(z);

// New way
let [a,b,c,d,e] = arr;
console.log(a,b,c,d,e);

*/

// Skip elements

/*

let [first,,third] = [1,2,3];
console.log(first,third); // 1,3

*/

// Default values

/*

let [a=5,b=10] = [25];
console.log(a,b); // 25 10

*/

// Swap variables

/*

let x = 250, y= 150;
[x,y] = [y,x];
console.log(x,y); // 150 250

*/

// 8. Spread and Rest with Arrays

// Both use ..., but they do opposite things.

/*

let nums = [1,2,3];
let more = [0,...nums,4,5];
console.log(more); // [0,1,2,3,4,5]

// Copy an array (shallow)
let copy = [...nums]; // [1,2,3,4,5]
console.log(copy);

// Combine arrays
let combined = [...[1,2],...[3,4,5,6],...[7,8,9]];
console.log(combined); // [1,2,3,4,5,6,7,8,9]

// Pass as function arguments

let max = Math.max(...[98,972,9273,2222,],...[99,34,234232,2323]);
console.log(max); // 234232


// Rest — collect into an array

function sum(...nums){
    return nums.reduce((accumulator,num)=>accumulator+num,0);
}
console.log(sum(1,2,3,4,5,6,7,8,9,10)); // 55

// `...` on the **right side** of `=` or in a function call → **spread** (expands).
// `...` on the **left side** of `=` or in a parameter list → **rest** (collects).

*/

// 9. Multi-Dimensional Arrays

/*

// An array can contain other arrays — useful for grids, matrices, etc.

let matrix = [[1,2,3],
              [4,5,6],
              [7,8,9]];

console.log(matrix[2][0]); // 7

// Loop through a 2D array
for(let row of matrix){
    for(values of row){
        console.log(values); // 1,2,3,4,5,6,7,8,9
    }
}

*/

// Part C — Objects

// An object is a collection of key-value pairs. Arrays store ordered data; objects store named data.

/*

// 1. Creating Objects

let person = {
    name:"Amit",
    age:"28",
    city:"Mumbai",
    isStudent: true
};

// - The text before `:` is the **key** (always a string under the hood).
// - The text after `:` is the **value** (any type, including other objects, arrays, functions).

// 2. Accessing Properties

// Dot notation (preferred)
console.log(person.name); // "Amit"

// Bracket notation
console.log(person["name"]); // "Amit"

// When to use brackets:
// - The key has spaces or special characters: `person["first name"]`
let person1 = {
    "first name": "Amit",
    "last name": "Swain",
};
console.log(person1["last name"]);
let fullName = person1["first name"] + " " + person1["last name"];
console.log(person1);


// - The key is in a variable: `let k = "name"; person[k]`
let person2 = {
    name:"Virat Kohli",
    age: 38,
    isCricketer: true
};

let fullname = "name";
console.log(person2[fullname]);

*/

// 3. Adding, Updating, Deleting Properties

/*

let person = {name:"Amit",age:27, city:"Mumbai"};

person["skills"] = "Programming";

person["isProficient"] = true;

person["greet"] = function(){
    console.log(`Hello, ${name}`);
    
}

person.age = 28;

delete person.city;

console.log(person);

*/

// 4. Methods — Functions Inside Objects

/*

// When a property's value is a function, we call it a method.

let calculator = {add:function(a,b){return a+b;},
                subtract:function(a,b){return a-b;},
                multiply:function(a,b){return a*b;},
                divide:function(a,b){
                    if(b!=0){
                        return a/b;
                    }else{
                        return "Cannot divide by zero";
                    }
                }
}

console.log(calculator.add(3,5));
console.log(calculator.subtract(25,10));
console.log(calculator.multiply(50,6.98));
console.log(calculator.divide(22,0));

// Shorthand method syntax (ES6):

let calc = {add(a,b){return a+b;},
            subtract(a,b){return a-b;},
        }

console.log(calc.add(3,5));
console.log(calc.subtract(10,7));

*/

// The this Keyword (brief intro)

/*

// Inside a method, this refers to the object itself.

// Calling using the object using dot operator
let person = {name: "Amit",
    greet(){
        console.log(`Hello, ${person.name}`);
    }
}

person.greet();

// Calling using `this` keyword
let person1 = {name:"Virat",
    greet(){
        console.log(`Hello, ${this.name} `);
    }
}

person1.greet();

// Calling with object value `na,e`
let person2 = {name:"Rohit",
    greet(){
        console.log(`Hello, ${name} `); // cannot access name
    }
}

person2.greet();

*/

// 5. Nested Objects

/*

// Objects can contain other objects.

let user = {
    name:"Amit",
    age: 27,
    address:{
        city:"Mumbai",
        state:"Maharashtra",
        pin_code:400001
    },
    hobbies:["reading","coding","batting"]
}

console.log(user.address.city);
console.log(user.hobbies[1]);

*/

// 6. Object Destructuring

/*

// Extract properties into variables, cleanly.

let person = {name:"Amit", age:27, city:"Mumbai", course:"Computer Science",food:"Pav-Bhaji"};

let {name,city} = person;

console.log(name,city); // Amit Mumbai

// Rename while destructuring

let {course:specialization, age:years} = person;

console.log(specialization,years); // Amit 27

// Default values

let {food,country="India"} = person;

console.log(`My name is ${name} and I'm ${years} old from ${city},${country}. My specialization is ${specialization} and my favorite food is ${food}.`);

// Nested destructuring

let user ={name:"Amit",address:{town:"Andheri",pin_code:4000059}};

let {address:{town,pin_code}} = user;

console.log(`${user.name} is from ${town} and his pin-code is ${pin_code}.`);

*/

// 7. Spread with Objects

/*

let person = {name:"Amit", age:27};

// Copy
let copy = {...person};
console.log(copy);

// Combine
let extra = {city:"Mumbai", country:"India"};
let combined = {...person, ...extra};
console.log(combined);

// Override
let updated = {...person,age:28};
console.log(updated);

// When keys overlap, the last one wins.

*/

// 8. Useful Object Methods

/*

let person = {name:"Amit",age:27,city:"Mumbai"};

console.log(Object.keys(person)); // ['name', 'age', 'city']
console.log(Object.values(person)); // ['Amit', 27, 'Mumbai']
console.log(Object.entries(person)); // [["name", "Aman"], ["age", 25], ["city", "Bhopal"]]

// Object.entries is especially useful with array iteration methods
Object.entries(person).forEach(([key,value])=>{
    console.log(`${key}: ${value}`);  
})

// Object.assign — Merge objects (older syntax)

let merged = Object.assign({},person,{age:28,country:"India"});
console.log(merged);
// Modern code prefers { ...person, ... } spread syntax, but you'll see Object.assign in older codebases.

// Object.freeze and Object.seal

let frozen = Object.freeze({name:"Amit"});
frozen.name = "Raj"; // silently fails (or throws in strict mode)
frozen.age = 28 // ❌ cannot add new properties
console.log(frozen.name); // "Amit"
console.log(frozen.age); // undefined


let sealed = Object.seal({name:"Amit"});
sealed.name = "Raj";
console.log(sealed.name); // Raj // ✅ can modify existing
sealed.age = 28; 
console.log(sealed.age); // undefined //  ❌ cannot add new properties

//- `freeze` — fully immutable.
// - `seal` — can modify existing properties, but can't add or delete.

*/

// 9. Looping Through Objects

/*

let person = {name:"Amit", age:27, city:"Mumbai"};

// for...in loop

for(let key in person){
    console.log(`${key}: ${person[key]}`);
}

//`Object.keys` with `forEach`

Object.keys(person).forEach(key => {
    console.log(`${key}: ${person[key]}`);
});

// 10. Object.entries with destructuring (cleanest)

for(let [key,value] of Object.entries(person)){
    console.log(`${key}: ${value}`);
    
}

*/

// 10. Objects vs Arrays — When to Use Which?

/*

// Use an array when...	
// - Order matters
// - Items are similar (a list)
// - You'll loop through all items

// Use an object when...
// - You're describing a single thing
// - Each property has a different meaning
// - You'll access specific named values

// Examples:
// - A list of usernames → array
// - A single user's profile → object
// - A list of users (each user is an object) → array of objects (very common!)

let users = [
    {name:"Amit", age:27},
    {name:"Chandu", age:30},
    {name:"Raj",age:25}
];

// Get all names
let user_names = users.map(user=>user.name);
console.log(user_names); // ['Amit', 'Chandu', 'Raj']

// Filter adults
let adults = users.filter(user=>user.age>=18);
console.log(adults);

// Average age
let average = users.reduce((sum,user)=>(sum+user.age),0)/users.length;
console.log(average);

// This pattern — array of objects — is the backbone of almost every real application. Master it.

*/

// Part D — Mini Projects


// Project 1: To-Do List (in-memory)

/*

let todos = [];

function addTodo(task){
    todos.push({id:todos.length+1,task,done:false});
}

function completeTodo(id){
    let todo = todos.find((task)=>task.id === id);
    if(todo) todo.done = true;
}

function removeTask(id){
    todos = todos.filter((task)=>task.id!=id)
}

function showTodos(){
    todos.forEach((task)=> console.log(`${task.id}. [${task.done ? "x":" "}] ${task.task}` ));
}

addTodo("Learn HTML");
addTodo("Learn CSS");
addTodo("Learn JavaScript");
addTodo("Learn React");
addTodo("Learn Node.js");

completeTodo(1);
completeTodo(2);

removeTask(4);

showTodos();

*/

// Project 2: Student Grade Tracker

/*

let students = [
    {name:"Rohit", marks:[91,86,82]},
    {name:"Sam", marks:[95,99,81]},
    {name:"Zack", marks:[87,99,95]}
];

function getAverageMarks(marks){
    return (marks.reduce((sum,mark)=>sum+mark,0))/marks.length;
};

function getAverage(average){
    if(average>=90) return "A";
    else if(average>=75) return "B";
    else if(average>=60) return "C";
    else return "F";
};


students.forEach(student=>{
    let averageMarks = getAverageMarks(student.marks);
    console.log(`${student.name}: Average = ${averageMarks.toFixed(2)}, Grade = ${getAverage(averageMarks)} `);
    
});

*/

// Project 3: Shopping Cart Logic

/*

let cart = [];

function addItem(name,price,quantity=1){
    let existing = cart.find((item)=>item.name === name);
    if(existing){
        quantity+=1;
    }else{
        cart.push({name,price,quantity});
    }
};

function removeItem(name){
    cart = cart.filter((item)=>item.name!==name)
}

function updateQuantity(name,quantity){
    let update = cart.find((item) => item.name === name);
    if(update && quantity!=0){
        cart.map((item)=>item.quantity = quantity);
    }
}

function getTotal(){
    return cart.reduce((total,item)=>total+(item.price*item.quantity),0);
}


function showCart(){
    cart.forEach(item=>{
        console.log(`${item.name} - ${item.price} x ${item.quantity} = $${item.price*item.quantity}`);
    });
    console.log(`Total Bill - $${getTotal()}`);
}

addItem("Kit-Kat",30,4);
addItem("Kinder-Joy",50,2);
addItem("Hide & Seek Cookies",45,2);
addItem("Dark Fantasy Cookies",150);
addItem("Peanut Butter",240,2);
addItem("Whipped Cream",225);

removeItem("Peanut Butter");
updateQuantity("Kinder-Joy",5);

showCart();

*/

// Project 4: Word Frequency Counter

/*

function wordFrequency (){
    let words = text.toLowerCase().split(/\s+/); // "["the" "quick" "brown" "fox" "jumps" "over" "the" "lazy" "dog" "the" "fox" "is" "quick"]"
    let frequency = {};

    words.forEach(word=>{
        console.log(frequency[word]); // ud ud ud ud ud ud(6) 1 ud ud(2) 2 1 ud 1
        frequency[word] = (frequency[word] || 0) + 1;  // the:(ud||0)+1 =1, quick:(ud||0)+1=1, brown:(ud||0)+1=1, fox:(ud||0)+1=1, 
                                                       // jumps:(ud||0)+1=1, over:(ud||0)+1=1,  the:(1||0)+1 = 2, lazy:(ud||0)+1=1, 
                                                       // dog:(ud||0)+1=1, the:(2||0)+1=3, fox:(1||0)+1=2, is:(ud||0)+1=0, quick:(1||0)+1 = 2
    });                         

    return frequency; // {the: 3, quick: 2, brown: 1, fox: 2, jumps: 1, …}
}


let text = "the quick brown fox jumps over the lazy dog the fox is quick";

console.log(wordFrequency(text));

*/

// Project 5: Library Management System

/*

let library = {
    
    books: [],

    addBook(title,author){
        this.books.push({
            id: this.books.length + 1,
            title,
            author,
            borrowed: false
        });
    },

    borrowBook(id){
      let book = this.books.find(b=>b.id===id);
      if(!book) return "Book not found"
      if(book.borrowed) return "Already borrowed";
      book.borrowed = true;
      return `You borrowed ${book.title}.`
    },

    returnBook(id){
        let book = this.books.find(b=>b.id===id);
        if(!book) return "Book not found";
        this.borrowed = false;
        return `You return ${book.title}`
    },

    availableBook(){
        return this.books.filter(book=>!book.borrowed)
    }
    
};

library.addBook("Atomic Habits", "James Clear");
library.addBook("Deep Work", "Cal Newport");
library.addBook("The Psychology of Money", "Morgan Housel");
library.addBook("The Pragmatic Programmer", "Andrew Hunt");
library.addBook("Clean Code", "Robert C. Martin");
library.addBook("Think and Grow Rich", "Napoleon Hill");
library.addBook("Rich Dad Poor Dad", "Robert Kiyosaki");
library.addBook("The Alchemist", "Paulo Coelho");
library.addBook("The 7 Habits of Highly Effective People", "Stephen R. Covey");
library.addBook("Ikigai", "Héctor García");
library.addBook("Zero to One", "Peter Thiel");
library.addBook("Can't Hurt Me", "David Goggins");
library.addBook("Start With Why", "Simon Sinek");
library.addBook("Eloquent JavaScript", "Marijn Haverbeke");
library.addBook("You Don't Know JS", "Kyle Simpson");


console.log(library.borrowBook(3));
console.log(library.borrowBook(7));
console.log(library.borrowBook(3));
console.log(library.borrowBook(2));
console.log(library.borrowBook(10));
console.log(library.borrowBook(12));
console.log(library.returnBook(2));
console.log(library.returnBook(3));

console.log(library.availableBook());

*/



















































































































