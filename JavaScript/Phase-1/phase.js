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


// 8. 


















