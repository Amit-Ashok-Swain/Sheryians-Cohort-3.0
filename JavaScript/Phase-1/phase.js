// 1. Your First Program — console.log

/*
console.log("Hello World!");
console.log(42);
console.log(true);
console.log("My name is","Amit","and I am ","28 years old");

// other console methods
console.warn("This is a warning");
console.error("This is an error");
console.table([1,2,3]);
console.info("User logged in");
console.time("test");

for(let i= 0; i<100000; i++){}
console.timeEnd("test");

console.count("click");
console.count("click");
console.count("click");

console.countReset("click");

console.count("click");
console.count("click");
console.count("click");

console.assert(5 > 10, "5 is not greater than 10");

function a() {
  b();
}

function b() {
  console.trace();
}

a();

console.log(
  "%cHello Amit",
  "color: blue; font-size: 20px;"
);


console.dirxml(document.body);

console.profile("test");
console.profileEnd("test");

console.log(console.memory);

console.debug("Debugging");


console.groupCollapsed("Hidden Logs");

console.log("Inside");

console.groupEnd();

console.clear();
*/

//Example
/*
console.group("User");
console.log("Login Started");
console.time("fetch");
console.table([
    {id:1,name:"Amit"},{id:2,name:"Rahul"}
]);
console.timeEnd("fetch");
console.groupEnd();
*/


// 2. Comments


// This is a single-line comment

/*
  This is a
  multi-line comment
*/

/*
console.log("Hello"); // You can also comment at the end of a line
*/


// 3. Variables — The Heart of Programming

/*

var age = 28;
let name = "Amit";
const PI = 3.14159;

let city;              // declared, value is undefined
console.log(city);     // undefined
city = "Mumbai";       // initialized now
console.log(city);     // Bhopal

const country = "India";
let score = 0;
score = score + 10;
// country = "USA";     // ❌ Error: Assignment to constant variable
console.log(score);

*/

// 4. Data Types

// Primitive Data types

/*

let name = "Amit"; // String
let age = 28; // Number
let isStudent = true; // Boolean
let car = null; // null  "no car right now, intentionally"
let job; // undefined - never assigned
let id = Symbol("uid"); // symbol
let bigNum = 12345678901234567890n; // bigint (note the 'n')


console.log(name);
console.log(age);
console.log(isStudent);
console.log(car);
console.log(job);
console.log(id);
console.log(bigNum);


console.log(typeof(name));
console.log(typeof(age));
console.log(typeof(isStudent));
console.log(typeof(car)); // "object"  ← famous bug in JS!
console.log(typeof(job));
console.log(typeof(id));
console.log(typeof(bigNum));
console.log(typeof {});           // "object"
console.log(typeof []);           // "object"  (arrays are objects)
console.log(typeof function(){}); // "function"

*/


// 5. Explicit Conversion (you do it on purpose)

/*

let str = "42";
let num = Number(str);     // converts "42" to 42
console.log(typeof num);   // "number"

let n = 100;
let s = String(n);         // converts 100 to "100"

let val = "hello";
let b = Boolean(val);      // true (non-empty string is truthy)

*/


// 6. Implicit Coercion (JS does it automatically — often surprisingly)

/*

console.log("5" + 3);  // "53" ← string concatenation
console.log("5"-2); // 3  ← number subtraction
console.log("5"*3); // 3  ← number multiplication
console.log("5"/3); // 1.6666666666666667 ← number division
console.log("5"%3); // 2 ← number modulus
console.log(true+1); // 2 ← (true becomes 1)
console.log(false+1); // 1 ← (false becomes 0) 
console.log(null + 1); // 1      (null becomes 0)
console.log(undefined + 1); // 1      (NaN becomes 0)
console.log(5+"3"); // "53"   ← string concatenation
console.log(5-"2"); // 3  ← number subtraction
console.log(5*"3"); // 3  ← number multiplication
console.log(5/"3"); // 1.6666666666666667 ← number division
console.log(5%"3"); // 2 ← number modulus


*/


// 7. Truthy and Falsy Values

/*

// Falsy Values - false, 0, "" (empty string), null, undefined, NaN

if(false) console.log("I'm Truthy Value");
else console.log("I'm Falsy Value");

if(0) console.log("I'm Truthy Value");
else console.log("I'm Falsy Value");

if("") console.log("I'm Truthy Value");
else console.log("I'm Falsy Value");

if(null) console.log("I'm Truthy Value");
else console.log("I'm Falsy Value");

if(undefined) console.log("I'm Truthy Value");
else console.log("I'm Falsy Value");

if(NaN) console.log("I'm Truthy Value");
else console.log("I'm Falsy Value");


// Truthy Values - Everything else is truthy — including "0", "false", [], {}

if("0") console.log("I'm Truthy Value");
else console.log("I'm Falsy Value");

if("false") console.log("I'm Truthy Value");
else console.log("I'm Falsy Value");

if([]) console.log("I'm Truthy Value");
else console.log("I'm Falsy Value");

if({}) console.log("I'm Truthy Value");
else console.log("I'm Falsy Value");

*/


// 8. Operators

// Arithmetic Operators

/*

let a = 10, b = 3;

console.log(a+b);
console.log(a-b);
console.log(a*b);
console.log(a/b);
console.log(a%b);
console.log(a**b);

*/

// Increment and Decrement Operators

/*

let x = 5;
console.log(x++); // 5 Post increment x becomes 6 after being logged.
console.log(++x);  // 7 Pre increment x becomes 7 from 6 before being logged.
x++; // 8 Post increment and value stored in x itself.
++x; // 9 Pre increment and value stored in x itself.
console.log(x); // 9 is logged.
console.log(x--); // 9 Post decrement x becomes 8 after being logged.
console.log(--x); // 7 Pre decrement x becomes 7 from 8 before being logged.
x--; // 6 Post decrement and value stored in x itself.
--x; // 5 Pre decrement and value stored in x itself.
console.log(x); // 5 is logged.

// Difference between pre and post:

let x = 5;
let y = x++ // 5  y is assigned first and then x is incremental. So y is 5 and x becomes 6.
let z =  ++x; // 7 x is incremented first to 7 and then assigned to z. So z is 7
console.log(y);
console.log(z);

*/


// Assignment Operators

/*

let x = 10;
x +=5; // 15
x -=3; // 12
x *=2; // 24
x /=4; // 6
x %= 4; // 2

console.log(x);

*/

// Comparison Operators

/*

console.log(5 == "5") // true   (loose equality — converts types)
console.log(5 === "5") // false (strict equality — checks type AND value)
console.log(5 != "5") // false
console.log(5 !== "5") // true


console.log(0 == false) // true
console.log(0 == "") // true
console.log(0 == null) // false
console.log(0 == undefined) // false
console.log("" == null) // false
console.log("" == undefined) // false
console.log(null == undefined) // true


console.log(0 === false) // false
console.log(0 === "") // false
console.log(0 === null) // false
console.log(0 === undefined) // false
console.log("" === null) // false
console.log("" === undefined) // false
console.log(null === undefined) // false

*/

// Logical Operators

/*

let a = true, b = false;

console.log(a && b);
console.log(a || b);
console.log(!a);

console.log("hello" && "world"); // world -> here && returns returns last value if all are truthy values
console.log("My" && "Name" && "is" && "Amit"); // Amit 
console.log("" && "hello"); // ""
console.log(" " && "hello"); // hello
console.log(0 && "default"); // 0
console.log("world" && 0); // 0
console.log(0 && false); // 0 -> here && returns returns first value if all are falsy values
console.log(false && 0); // 0
console.log(NaN && undefined); // NaN
console.log(null && undefined)// null

let userInput = prompt("Enter your username");

let username = userInput || "Guest";

console.log(username);

*/

// Ternary Operator (shorthand if-else)

  /*

  let age = 20;

  let check = age >= 18 ? "Adult" : "Minor";
  console.log(check); // Adult

  */


// 9. Strings

/*

let s1 = 'Single Quotes';
let s2 = "Double Quotes";

let s3 = `Backticks (Template Literals)`;

// String Concatenation

let firstName = "Amit"
let lastName = "Swain"

let fullName = firstName + " " + lastName;

console.log(fullName);

*/

// Template Literals

/*

let name = "Amit";

let age = 28;

console.log(`Hello, my name is ${name} and I'm ${age} years old`);

let poem = `Roses are red,
Violets are blue,
JS is awesome,
And so you are.`;

console.log(poem);

*/

// Useful String Methods

/*

let str = "Hello, World!";

console.log(str.length); //13
console.log(str.toUpperCase()); //"HELLO, WORLD!"
console.log(str.toLowerCase()); //"hello, world!"
console.log(str.indexOf("World")); // 7
console.log(str.includes("Hello")); // true
console.log(str.slice(0,5)); // "Hello"
console.log(str.substring(7,12)); // "World"
console.log(str.replace("World", "JavaScript")); // "Hello, JavaScript!"
console.log(str.split(" ")); //  ['Hello,', 'World!']
console.log(str.split(",")) // ['Hello', ' World!']
console.log(str.split("l")); // ['He', '', 'o, Wor', 'd!']
console.log("     hi      ".trim()); // "hi"
console.log(str.repeat(3)); // "Hello, World!Hello, World!Hello, World!"
console.log(str.startsWith("Hello")); // true
console.log(str.endsWith("!")); // true
console.log(str.charAt(0)); // "H"
console.log(str[0]); // "H"


let x = "hello";
x.toUpperCase(); // Methods don't change the original but they return a new string.
console.log(x); // "hello"
console.log(x.toUpperCase()); // HELLO;
let a = x.toUpperCase();
console.log(a); //  // HELLO;

*/

// 10. Numbers

/*

let int = 42;
let float = 3.14;
let negative = -100;
let exponent = 5e3; // 5 x 10^3 = 5000


// Useful Number Methods

let n = 3.14159;

console.log(n.toFixed(2)); // 3.14
console.log(Number("42")); // 42
console.log(Number("42abc")); // NaN
console.log(parseInt("42abc")); // 42
console.log(parseInt("The42abc")); // NaN
console.log(parseFloat("9.873KG")); // 9.873
console.log(parseFloat("JKING9.873KG")); // NaN
console.log(isNaN("hello")); // true
console.log(Number.isInteger(5)); // true
console.log(Number.isInteger(5.5)); // false


// The Math Object

console.log(Math.PI); // 3.141592653589793
console.log(Math.E); // 2.718281828459045
console.log(Math.round(4.5)); // 5
console.log(Math.round(3.4)); // 3
console.log(Math.ceil(4.2)); // 5 (always rounds up)
console.log(Math.floor(5.6)); // 5 (always rounds down)
console.log(Math.abs(-7)); // 7
console.log(Math.max(2,56,1)); // 56
console.log(Math.min(-99,98,1,0)) // -99
console.log(Math.pow(2,9)); // 512
console.log(Math.pow(-2,9)); // -512
console.log(Math.pow(2,-9)); // 0.001953125
console.log(Math.sqrt(49)); // 7
console.log(Math.random()); // random number between 0 to 1

// random integer between min and max

let random = Math.floor(Math.random() * ((Math.max(999999))-(Math.min(100000))+1)) + Math.min(100000)

console.log(random);

*/


// 11. Conditionals



// if/ else if/ else

/*

let marks = 75;

if(marks>=90){
  console.log("A grade");
}else if(marks>=75){
  console.log("B grade"); 
}else if(marks>=50){
  console.log("C grade");
}else{
  console.log("Fail");
}

*/


// Nested if

/*

let age = 20;

let hasLicense = true;

if(age>=18){
  if(hasLicense){
    console.log("Can drive");
  }else{
    console.log("Get a license first"); 
  }
}else{
  console.log("Too young to drive");
}

*/


// Switch Statement

/*

let day = "Monday"

switch(day){
  case "Monday":
    console.log("Start of the week");
    break;
  case "Friday":
    console.log("Weekend coming");
    break;
  case "Saturday":
  case "Sunday":
    console.log("It's the weekend");
    break;
  default:
    console.log("Midweek day");
}

*/

// 12. Loops

// For loop

/*

for(let i=0; i<5; i++){
  console.log("Iteration",i);
}

*/

// while loop

/*

let count = 0;

while(count<5){
  console.log("count",count);
  count++;
}

*/

// do...while loop

/*

let x = 10;

do{
  console.log(x); // Prints 10 once, even though condition is false
  x++;
}while(x<5)

*/

// for...of Loop (for arrays and strings)

/*

let fruits = ["apple","banana","papaya","mango"];

for(let fruit of fruits){
  console.log(fruit);
}

let word = "Hello";

for(let letter of word){
  console.log(letter);
}

*/

// for...in loop (for objects — brief intro)

/*

let person = {"name": "Amit", "age" : 28}

for(let key in person){
  console.log(key,":",person[key]);
}

*/

// 13. break and continue

// break - exit the loop immediately

/*

for(let i=1 ; i<=10; i++){
  if(i==5){
    break;
  }
  console.log(i); // Prints: 1, 2, 3, 4
}

*/

// continue — skip the current iteration, go to the next

/*

for(let i=1 ; i<=5 ; i++){
  if(i==3){
    continue;
  }
  console.log(i); // Prints: 1, 2, 4, 5  (3 is skipped)
}

*/


// 14. Taking User Input

// In the browser — prompt()

/*

let name = prompt("What is your name?");
console.log("Hello,",name);

let age = Number(prompt("Enter your age:"));

if(age>=18){
  console.log("Adult");
}else{
  console.log("Not Eligible");
}

*/

// 15. Putting It All Together — Mini Projects


// Project 1: Simple Calculator

/*

let num1 = Number(prompt("Enter first number:"));

let operator = prompt("Enter the operator (+,-,*,/)");

let num2 = Number(prompt("Enter second number"));

let result;


if(operator === "+") result = num1 + num2 ;
else if(operator === "-") result = num1 - num2;
else if(operator === "*") result = num1 * num2;
else if(operator === "/") result = num2!==0 ? num1/num2 : "Cannot divide by zero";
else result = "Invalid Operator";

console.log("Result:", result);

*/


//  Project 2: FizzBuzz (the classic interview question)

// Print numbers 1 to 50. But:

// - For multiples of 3, print "Fizz"
// - For multiples of 5, print "Buzz"
// - For multiples of both, print "FizzBuzz"

/*

for(let i=1 ; i<=50; i++){

  if(i%3===0 && i%5===0) console.log("FizzBuzz");
  else if(i%3===0)console.log("Fizz");
  else if(i%5===0)console.log("Buzz");
  else console.log(i);
  
}

console.log("------------------");


for (let i = 1; i <= 50; i++) {
    if (i % 15 === 0) console.log("FizzBuzz");
    else if (i % 3 === 0) console.log("Fizz");
    else if (i % 5 === 0) console.log("Buzz");
    else console.log(i);
}

*/

// Project 3: Number Guessing Game

/*

const prompt = require('prompt-sync')();

let secretNumber = Math.floor(Math.random()*(Math.max(1,100)-Math.min(1,100)+1))+1;

let guess;

let attempts = 0;

do{
  guess = Number(prompt("Guess a Number between 1 and 100: "));
  attempts++;
  if(guess>secretNumber) console.log("Too high!");
  else if(guess<secretNumber) console.log("Too low");
}while(guess!=secretNumber)

console.log(`Congratulations! You guessed the correct number in ${attempts} attempts`);

*/

// Project 4: Temperature Converter

// Take a temperature and a unit (C or F), convert to the other.

/*

let temp = Number(prompt("Enter the temperature: "))

let unit = prompt("It is in C or F?").toUpperCase();

if(unit === "C"){
  console.log(`${temp}°C = ${(temp * 9/5)+32}°F`);
}else if(unit === "F"){
  console.log(`${temp}°F = ${((temp - 32)*5/9)}°C`);
}else{
  console.log("Invalid Unit");
}

*/


// Project 5: Count Vowels in a String

/*

let str = prompt("Enter a string: ").toLowerCase();
let vowels = "aeiou"

let count = 0;

for (let vowel of vowels){
  if(str.includes(vowel)) count++;
}

console.log(`The word ${str} has ${count} vowels in it.`);

*/




































































































