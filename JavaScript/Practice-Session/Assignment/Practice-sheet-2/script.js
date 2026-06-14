// Phase 2 Practice Sheet

// Part 1: Arrays (20 Questions)

// 🟢 Easy Level (Q1 - Q7)
// These questions focus on understanding arrays, accessing values, basic methods, and simple iteration.

// Question 1 — Find Expensive Products
/*
let prices= [100,250,500,150,700];

Create a new array containing only prices greater than ₹300.

Scenario

You're building an e-commerce website.
Customers want to see premium products only.

What is this question asking?
Go through every price and keep only those greater than 300.

Expected Output:
[500,700]

Concepts Tested
Arrays
filter()

*/

let prices = [100, 250, 500, 150, 700];

let expensive = prices.filter((price) => price > 300);

console.log(expensive);

// Question 2 — Last Student in Class
/*
let students= ["Aman","Ritik","Priya","Rahul"];

Print the last student's name.

Scenario
The teacher wants to know who is sitting at the end of the attendance list.

What is this question asking?
Access the last element without manually writing the index.

Concepts Tested
Arrays
length property
*/

let students = ["Aman", "Ritik", "Priya", "Rahul"];

console.log(students[students.length - 1]);

// 3. Question 3 — Add New Product
/*
let products= ["Laptop","Mouse","Keyboard"];

Add "Monitor" to the end of the array.

Scenario
A new product arrives in inventory.

What is this question asking?
Insert an item at the end of an array.

Concepts Tested
push()
*/

let products = ["Laptop", "Mouse", "Keyboard"];

products.push("Monitor");

console.log(products);

// Question 4 — Remove Last Notification
/*
let notifications= [
"Order Placed",
"Order Shipped",
"Order Delivered"
];

Remove the latest notification.

Scenario
Notifications disappear after being viewed.

What is this question asking?
Remove the last element.

Concepts Tested
pop()
*/

let notifications = ["Order Placed", "Order Shipped", "Order Delivered"];

notifications.pop();

console.log(notifications);

// Question 5 — Check User Exists
/*
let users= ["Aman","Ritik","Priya"];

Check if "Ritik" exists.

Scenario
User tries to login.

What is this question asking?
Search for a value inside an array.

Concepts Tested
includes()

*/

let users = ["Aman", "Ritik", "Priya"];

let check = users.includes("Ritik");

console.log(check);

// Question 6 — Convert Marks to Percentage
/*
let marks= [80,90,70];
Create a new array where each mark is followed by % .

Expected:
["80%","90%","70%"]

What is this question asking?
Transform every value into something else.

Concepts Tested
map()
*/

let marks = [80, 90, 70];

let marksWithPercentage = marks.map((mark) => mark + "%");

console.log(marksWithPercentage);

// Question 7 — Count Products
/*
let cart= [
"Mouse",
"Keyboard",
"Monitor",
"Laptop"
];

Print total number of products.

Scenario
Shopping cart badge count.

Concepts Tested
length
*/

let cart = ["Mouse", "Keyboard", "Monitor", "Laptop"];

let cartLength = cart.length;

console.log(cartLength);

// 🟡 Moderate Level (Q8 - Q14)
// These questions require combining multiple concepts.

// Question 8 — Student Average
/*
let marks1= [80,90,70,85,95];

Find average marks.

Scenario
Teacher wants class average.

What is this question asking?
1. Calculate total.
2. Divide by total students.

Concepts Tested
reduce()
length
*/

let marks1 = [80, 90, 70, 85, 95];

let totalMarks1 = marks1.reduce((sum, mark) => sum + mark, 0);
let averageMarks1 = totalMarks1 / marks1.length;

console.log(averageMarks1);

// Question 9 — Even Numbers Finder
/*
let numbers= [1,2,3,4,5,6,7,8];

Return all even numbers.

Scenario
Filter numbers for a report.

What is this question asking?

Phase 2 Practice Sheet 5
Keep only values divisible by 2.

Concepts Tested
filter()
*/
let numbers = [1, 2, 3, 4, 5, 6, 7, 8];

let evenFinder = numbers.filter((number) => number % 2 == 0);

console.log(evenFinder);

// Question 10 — Product Search
/*
let products= [
"Laptop",
"Mouse",
"Keyboard",
"Monitor"
];

Find the index of "Keyboard" .

Scenario
You need the product position.

Concepts Tested
indexOf()
*/

let products1 = ["Laptop", "Mouse", "Keyboard", "Monitor"];

let indexOfKeyboard = products1.indexOf("Keyboard");

console.log(indexOfKeyboard);

// Question 11 — Total Revenue
/*
let sales= [500,700,1000,300];

Calculate total revenue.

Scenario
Store owner wants today's earnings.

What is this question asking?

Add all numbers together.

Concepts Tested
reduce()
*/

let sales = [500, 700, 1000, 300];

let totalRevenue = sales.reduce((total, earning) => total + earning, 0);

console.log(totalRevenue);

// Question 12 — Uppercase Usernames
/*
let users= ["ritik","aman","priya"];
Convert every username into uppercase.

Scenario
Preparing usernames for display.

Concepts Tested
map()
*/

let users1 = ["ritik", "aman", "priya"];

let usersToUppercase1 = users1.map((user) => user.toUpperCase());

console.log(usersToUppercase1);

// Question 13 — Find First Adult
/*
let ages= [12,15,17,19,22];

Find the first age greater than or equal to 18.

Scenario
Age verification system.

Concepts Tested
find()

*/

let ages = [12, 15, 17, 19, 22];

let firstAdult = ages.find((age) => age >= 18);

console.log(firstAdult);

// Question 14 — Positive Number Check
/*
let nums= [5,8,10,3];

Check if every number is positive.

Scenario
Validate data before processing.

Concepts Tested
every()
*/

let nums = [5, 8, 10, 3];

isEveryNumberPositive = nums.every((num) => num > 0);

console.log(isEveryNumberPositive);

// 🔴 Hard Level (Q15 - Q20)
// These require logic building and problem-solving.

// Question 15 — Most Frequent Number
/*
let numbers= [1,2,3,2,4,2,5,1,1,1];

Find the number that appears the most.

Scenario
Website wants to know the most searched category.

What is this question asking?
Count occurrences and find the highest.

Concepts Tested
Arrays
Loops
Counting logic
*/

let numbers1 = [1, 2, 3, 2, 4, 2, 5, 1, 1, 1];

// Approach 1: Brute Force
let maxCount = -Infinity;
let maxCountElement = 0;
for (let i = 0; i < numbers1.length; i++) {
  let count = 0;
  for (let j = 0; j < numbers1.length; j++) {
    if (numbers1[i] === numbers1[j]) {
      count++;
    }
  }
  if (count > maxCount) {
    maxCount = count;
    maxCountElement = numbers1[i];
  }
}

console.log(maxCountElement);

// Approach 2 : Using Object Frequency Counter

let count = {};
let maxFrequency = 0;
let maxNumber = -Infinity;
for (let i = 0; i < numbers1.length; i++) {
  count[numbers1[i]] = (count[numbers1[i]] || 0) + 1;
  if (count[numbers1[i]] > maxFrequency) {
    maxFrequency = count[numbers1[i]];
    maxNumber = numbers1[i];
  }
}

console.log(`${maxNumber} : ${maxFrequency}`);

// Question 16 — Second Largest Number
/*
let nums= [10,50,20,80,40];

Find the second largest number.

Scenario
Leaderboard runner-up.

What is this question asking?
Largest is:
80

Find:
50

Concepts Tested
sort()
Logic
*/

let nums1 = [10, 50, 20, 80, 40];

let sortedNums1 = nums1.sort((a, b) => a - b);

console.log(sortedNums1[sortedNums1.length - 2]);

// Question 17 — Remove Duplicates
/*
let ids= [1,2,2,3,4,4,5,5];

Create a new array with unique values.

Expected:
[1,2,3,4,5]

Scenario
Duplicate user IDs should not exist.

Concepts Tested
Arrays
Problem Solving
*/

// Approach 1: Using includes and new array
let ids = [1, 2, 2, 3, 4, 4, 5, 5];

let newIds = [];

for (let i = 0; i < ids.length; i++) {
  if (!newIds.includes(ids[i])) {
    newIds.push(ids[i]);
  }
}
console.log(newIds);

// Approach 2: Using set

let newIdsWithSet = [...new Set(ids)];

console.log(newIdsWithSet);

// Approach 3: Using Object (Frequency Logic)

let seen = {};

let nonDuplicate = [];

for (let i = 0; i < ids.length; i++) {
  if (!seen[ids[i]]) {
    seen[ids[i]] = true;
    nonDuplicate.push(seen[ids[i]]);
  }
}
console.log(seen);
console.log(nonDuplicate);

// Question 18 — Longest Word
/*
let words= [
"JavaScript",
"HTML",
"CSS",
"Programming"
];

Find the longest word.

Scenario
Text analytics system.

What is this question asking?
Compare lengths of all strings.

Concepts Tested
Loops
String length
*/

let words = ["Java", "JavaScript", "HTML", "CSS", "Programming"];

let highestLength = 0;
let highestLengthWord = "";
for (let i = 0; i < words.length; i++) {
  if (words[i].length > highestLength) {
    highestLengthWord = words[i].length;
    highestLengthWord = words[i];
  }
}

console.log(highestLengthWord);

// Question 19 — Rotate Array Right
/*
Question 19 — Rotate Array Right

let nums= [1,2,3,4,5];

Output:
[5,1,2,3,4]

Scenario
Carousel slider rotates items.

What is this question asking?
Move last element to the beginning.

Concepts Tested
pop()
unshift()
*/

let nums2 = [1, 2, 3, 4, 5];

let lastElement = nums2.pop();

nums2.unshift(lastElement);

console.log(nums2);

// Question 20 — Best Selling Product
/*
let sales= [
"Mouse",
"Keyboard",
"Mouse",
"Laptop",
"Mouse",
"Keyboard"
];

Find the product sold the most.

Scenario
E-commerce analytics dashboard.

What is this question asking?
Count how many times each product appears and find the highest.


Expected:
"Mouse"

Concepts Tested
Arrays
Counting frequency
Objects for tracking counts
Problem Solving

*/

let sales1 = ["Mouse", "Keyboard", "Mouse", "Laptop", "Mouse", "Keyboard"];

let salesFrequency = {};
let highestSale = 0;
let highestSellingProduct = "";

for (let i = 0; i < sales1.length; i++) {
  salesFrequency[sales1[i]] = (salesFrequency[sales1[i]] || 0) + 1;

  if (salesFrequency[sales1[i]] > highestSale) {
    highestSale = salesFrequency[sales1[i]];
    highestSellingProduct = sales1[i];
  }
}

console.log(`${highestSellingProduct} : ${highestSale}`);

// Part 2: Objects (20 Questions)

// 🟢 Easy Level (Q1 - Q7)
// These questions focus on creating, accessing, updating, and deleting object properties.

// Question 1 — Access User Name

/*

let user = {
name:"Ritik",
age:21,
city:"Bhopal"
};

Task
Print the user's name.

Scenario
A profile page needs to display the logged-in user's name.

What is this question asking?
The data is already stored in an object.
Your task is to access one specific property.

Expected Output
Ritik

Concepts Tested
Objects
Dot Notation
*/

let user2 = {
  name: "Ritik",
  age: 21,
  city: "Bhopal",
};

console.log(user2.name);
console.log(user2);

// Question 2 — Update User Age

/*
let user = {
name:"Ritik",
age:21
};

Task
Update age to 22.

Scenario
Today is the user's birthday.

What is this question asking?
Update an existing property inside an object.

Expected Output

{
name:"Ritik",
age:22
}

Concepts Tested
Object Updates
*/

user2.age = 22;
console.log(user2);

// Question 3 — Add Country
/*

let user = {
name:"Ritik",
city:"Bhopal"
};

Task
Add a property:
country:"India"

Scenario
The registration form now requires country information.

What is this question asking?
Add a completely new property.

Concepts Tested
Adding Properties
*/

user2.country = "India";

console.log(user2);

// Question 4 — Delete Property
/*
let user= {
name:"Ritik",
age:21,
password:"12345"
};

Task
Delete the password property.

Scenario
Sensitive information should not be sent to the frontend.

What is this question asking?
Remove a property from an object.

Concepts Tested
delete keyword
*/

let user3 = {
  name: "Ritik",
  age: 21,
  password: "12345",
};

delete user3.password;

console.log(user3);

// Question 5 — Check Property Exists
/*
let product= {
name:"Laptop",
price:60000
};

Task
Check if the object contains a property called "price" .

Scenario
Before displaying the product price, you want to make sure it exists.

Concepts Tested

Object Keys
Property Checking
*/

let product = {
  name: "Laptop",
  price: 60000,
};

// Approach 1:
if ("price" in product) console.log(true);
else console.log(false);

// Approach 2:
console.log(Object.keys(product).includes("price"));

// Approach 3:
console.log(product.hasOwnProperty("price"));

// Question 6 — Print All Keys
/*
let car= {
brand:"BMW",
model:"X5",
year:2025
};

Task
Print all values.

Expected Output
["BMW","X5",2025]

Concepts Tested
Object.values()
*/

let car = {
  brand: "BMW",
  model: "X5",
  year: 2025,
};

console.log(Object.values(car));

// 🟡 Moderate Level (Q8 - Q14)
// These questions combine multiple object concepts.

// Question 8 — Print User Information Dynamically
/*
let user = {
name:"Ritik",
age:21,
city:"Bhopal"
};

Task
Print:
name :Ritik
age :21
city :Bhopal
using a loop.

Scenario

A profile card should automatically display all information.

What is this question asking?
Instead of manually writing each property, loop through the object.

Concepts Tested
Object.entries()
for...of
*/

for ([key, value] of Object.entries(user2)) {
  console.log(`${key} : ${value}`);
}

// Question 9 — Employee Salary Increase
/*
let employee= {
name:"Aman",
salary:50000
};

Task
Increase salary by 10%.

Scenario
Company announces annual appraisal.

What is this question asking?
Read a property, calculate a new value, update the property.

Concepts Tested
Object Updates
Arithmetic Operations
*/

let employee = {
  name: "Aman",
  salary: 50000,
};

employee.salary = employee.salary / 10 + employee.salary;

console.log(employee);

// Question 10 — Nested Object Access

/*
let user= {
name:"Ritik",
address: {
city:"Bhopal",
state:"MP"
}
};

Task
Print:
Bhopal

Scenario
Delivery app needs city information.

What is this question asking?
Access a property inside another object.

Concepts Tested
Nested Objects
*/

let user4 = {
  name: "Ritik",
  address: {
    city: "Bhopal",
    state: "MP",
  },
};

console.log(user4.address.city);

// Question 11 — Object Destructuring

/*
let student= {
name:"Priya",
age:20,
course:"BCA"
};

Task

Extract:
name
age
into separate variables.

Scenario
You only need a few properties from a large object.

Concepts Tested
Object Destructuring
*/

let student2 = {
  name: "Priya",
  age: 20,
  course: "BCA",
};

let { name, age } = student2;

console.log(student2);

// Question 12 — Rename During Destructuring
/*
let student= {
name:"Priya",
age:20
};

Task

Create:
studentName
studentAge

Scenario
Variable names should be more meaningful.

Concepts Tested
Destructuring Renaming
*/

let student3 = {
  name: "Priya",
  age: 20,
};

let { name: studentName, age: studentAge } = student3;

console.log(studentName, studentAge);

// Question 13 — Merge User and Address
/*
let user = {
name:"Ritik",
age:21
};

let address= {
city:"Bhopal",
state:"MP"
};

Task
Combine both objects.

Scenario
Backend sends user and address separately.
Frontend needs one object.

Concepts Tested
Spread Operator
*/

let user5 = {
  name: "Ritik",
  age: 21,
};

let address = {
  city: "Bhopal",
  state: "MP",
};

let mergedObject = { ...user5, ...address };
console.log(mergedObject);

// Question 14 — Count Object Properties
/*
let user= {
name:"Ritik",
age:21,
city:"Bhopal",
country:"India"
};

Task
Find how many properties exist.

Scenario
Dynamic form validation.
What is this question asking?
Count total keys.

Concepts Tested
Object.keys()
length
*/

let user6 = {
  name: "Ritik",
  age: 21,
  city: "Bhopal",
  country: "India",
};

let objectLength = Object.keys(user6).length;
console.log(objectLength);

// 🔴 Hard Level (Q15 - Q20)
// These require real-world logic and object manipulation.

// Question 15 — Highest Paid Employee
/*

let
employees= {
aman:25000,
ritik:50000,
priya:45000
};

Task
Find the employee earning the highest salary.

Scenario
Company wants Employee of the Month based on salary.
What is this question asking?

Compare every salary and return the employee name.

Expected Output
"ritik"

Concepts Tested
Objects
Loops
Comparisons
*/

let employees = {
  aman: 25000,
  ritik: 50000,
  priya: 45000,
};

let highestSalary = 0;
let highestSalaryEmployee = 0;

for (key in employees) {
  if (employees[key] > highestSalary) {
    highestSalary = employees[key];
    highestSalaryEmployee = key;
  }
}

console.log(highestSalaryEmployee, highestSalary);

// Question 16 — Most Used Programming Language
/*

let votes= {
JavaScript:25,
Python:30,
Java:15,
Cpp:10
};

Task

Find the language with the highest votes.

Scenario
Survey results dashboard.
What is this question asking?
Find the largest value in an object.

Concepts Tested
Object.entries()
Comparisons
*/

let votes = {
  JavaScript: 25,
  Python: 30,
  Java: 15,
  Cpp: 10,
};

// Approach 1: Using Object.entries()
let highestVote = 0;
let highestVoteLanguage = "";

for ([language, voteCount] of Object.entries(votes)) {
  if (voteCount > highestVote) {
    highestVote = voteCount;
    highestVoteLanguage = language;
  }
}

console.log(highestVoteLanguage, highestVote);

// Approach 2: Using for...in

let highestVotes = 0;
let winner = "";

for (language in votes) {
  if (votes[language] > highestVotes) {
    highestVotes = votes[language];
    winner = language;
  }
}

console.log(winner, highestVotes);

// Question 17 — Reverse Key Value
/*
let countries = {
India:"Delhi",
Japan:"Tokyo",
France:"Paris"
};

Task

Convert into:
{
Delhi:"India",
Tokyo:"Japan",
Paris:"France"
}

Scenario
Search by capital city instead of country.

Concepts Tested
Objects
Loops
Transformation Logic
*/

let reversed = {};

let countries = {
  India: "Delhi",
  Japan: "Tokyo",
  France: "Paris",
};

// Approach 1:
for ([countryKey, capitalValue] of Object.entries(countries)) {
  reversed[capitalValue] = countryKey;
}

console.log(reversed);

// Question 18 — Student Marks Summary
/*
let marks= {
math:90,
science:80,
english:85
};

Task
Calculate total marks.

Scenario
Generate report card.

What is this question asking?
Add all values inside the object.

Concepts Tested
Object.values()
reduce()
*/

let marks2 = {
  math: 90,
  science: 80,
  english: 85,
};

let totalMarks2 = Object.values(marks2).reduce((sum, mark) => sum + mark, 0);

console.log(totalMarks2);

// Question 19 — Find Missing Property
/*

let user = {
name:"Ritik",
age:21
};

Task
Check whether: email exists. If not, add: email:"Not Provided"

Scenario
Incomplete profile detection.

Concepts Tested
Property Checking
Conditional Logic
*/

let user7 = {
  name: "Ritik",
  age: 21,
};

// Approach 1:
if (!("email" in user7)) {
  user7.email = "Not provided";
}

console.log(user7);

// Approach 2:
if (!user7.hasOwnProperty("email")) user7.email = "Not provided";

console.log(user7);

// Question 20 — Product Inventory Analyzer
/*

let inventory = {
mouse:25,
keyboard:10,
monitor:5,
laptop:2
};

Task
Find:
1. Total items in stock.
2. Product with highest stock.
3. Product with lowest stock.

Scenario
Inventory management dashboard.
What is this question asking?
Analyze all values and generate useful information.

Concepts Tested

Object.values()
Object.entries()
Loops
Comparisons
Real-world Problem Solving

*/

let inventory = {
  mouse: 25,
  keyboard: 10,
  monitor: 5,
  laptop: 2,
};

let totalItemsInStock = 0;
let totalStock = "totalStock";
let highestStockProductCount = -Infinity;
let highestStockProduct = "";
let lowestStockProductCount = Infinity;
let lowestStockProduct = "";

let infoInventory = {};

for ([productName, stockCount] of Object.entries(inventory)) {
  totalItemsInStock += stockCount;
  if (stockCount > highestStockProductCount) {
    highestStockProductCount = stockCount;
    highestStockProduct = productName;
  }
  if (stockCount < lowestStockProductCount) {
    lowestStockProductCount = stockCount;
    lowestStockProduct = productName;
  }
}

infoInventory[totalStock] = totalItemsInStock;
infoInventory[highestStockProduct] = highestStockProductCount;
infoInventory[lowestStockProduct] = lowestStockProductCount;

console.log(infoInventory);

// Part 3: Functions (20 Questions)

// 🟢 Easy Level (Q1 - Q7)
// These questions focus on understanding function creation, parameters, arguments, and return values.

// Question 1 — Greeting Function
/*
Create a function:
greet(name)
that prints:
Hello Ritik

when called with:
greet("Ritik")

Scenario
A website wants to greet users after login.

What is this question asking?
Learn the most basic purpose of functions:
Accept input
Perform an action
Produce output

Concepts Tested
Function Declaration
Parameters
Arguments
*/

function greet(name) {
  console.log(`Hello ${name}`);
}

greet("Ritik");

// Question 2 — Add Two Numbers
/*
Create a function: add(a,b) that returns the sum.

Example:
add(10,20)
Output:
30

Scenario
Calculator application.
What is this question asking?
Receive two inputs and return a result.


Concepts Tested
Parameters
Return
*/

function add(a, b) {
  return a + b;
}

console.log(add(10, 20));

// Question 3 — Find Square
/*
Create a function: square(num) that returns the square of a number.
Example:
square(5)

Output:
25

Scenario
Math utility app.

Concepts Tested
Functions
Return Values
*/

function square(num) {
  return num ** 2;
}

console.log(square(5));

// Question 4 — Check Even Number
/*
Create a function: isEven(num)

Return:
true

if the number is even, otherwise:
false

Scenario
Number validation system.

What is this question asking?
Return a boolean based on a condition.

Concepts Tested
Functions
Conditionals
*/

function isEven(num) {
  if (num % 2 == 0) {
    return true;
  } else {
    return false;
  }
}

console.log(isEven(28));

// Question 5 — Default Username
/*
Create a function:
greet(name="Guest")

Example:
greet()

Output: Hello Guest

Scenario

User visits without logging in.

Concepts Tested
Default Parameters
*/

function greetWithDefaultParameter(name = "Guest") {
  return `Hello ${name}`;
}

console.log(greetWithDefaultParameter());
console.log(greetWithDefaultParameter("Amit"));

// Question 6 — Celsius to Fahrenheit
/*
Create a function: convertTemp(celsius)

Formula:
(celsius*9/5)+32

Scenario
Weather application.

Concepts Tested
Functions
Return Values
*/

function convertTemp(celsius) {
  let fahrenheit = celsius * (9 / 5) + 32;
  return fahrenheit;
}

console.log(convertTemp(44));

// Question 7 — Arrow Function Practice
/*
Convert this function: function multiply(a,b) {return a*b;} into an arrow function.

Scenario
Modern JavaScript codebase.

Concepts Tested
Arrow Functions
*/

const multiplyWithArrowFunction = (a, b) => a * b;

console.log(multiplyWithArrowFunction(5, 6));

// 🟡 Moderate Level (Q8 - Q14)
// These questions require combining multiple function concepts.

// Question 8 — Discount Calculator
/*
Create: calculateDiscount(price)
Apply: 10% discount.
Example:
calculateDiscount(500)
Output:
450

Scenario
E-commerce website.

What is this question asking?
Accept input.
Perform calculation.
Return result.

Concepts Tested
Functions
Return
*/

const calculateDiscount = (price) => price - price / 10;
console.log(calculateDiscount(1200));

// Question 9 — Largest of Three Numbers
/*
Create: findLargest(a,b,c) Return the largest number.

Example:
findLargest(10,50,20)

Output:
50

Scenario
Ranking system.

Concepts Tested
Functions
Comparisons
*/

const findLargest = (a, b, c) =>
  a >= b && a >= c ? a : b >= a && b >= c ? b : c;

console.log(findLargest(10, 50, 20));

// Question 10 — Reverse String
/*
Create: reverseString(str)

Example:
reverseString("hello")
Output:
"olleh"

Scenario
Text processing application.

What is this question asking?
Manipulate text and return the reversed version.

Concepts Tested
Functions
Strings
Loops
*/

// Approach 1:
const reverseString = (str) => {
  let rev = "";
  let i = str.length;
  while (i > 0) {
    rev += str.charAt(i - 1);
    i--;
  }
  return rev;
};

console.log(reverseString("hello"));

// Approach 2:
const reverseString1 = (str) => [...str].reverse().join("");

console.log(reverseString1("hello"));

// Question 11 — Count Vowels
/*
Create: countVowels(str)

Example:
countVowels("javascript")

Output: 3

Scenario
Text analysis tool.

Concepts Tested
Functions
Loops
Conditions
*/

const countVowels = (str) => {
  let vowels = "aeiou";
  let count = 0;
  for (let char of str.toLowerCase()) {
    if (vowels.includes(char)) count++;
  }
  return count;
};

console.log(countVowels("javascript"));

// Question 12 — Generate Username
/*
Create: generateUsername(name)
Input:
"Ritik Rajput"
Output:
"ritik_rajput"

Scenario
Registration system.

Concepts Tested
Functions
String Method
*/

// Approach 1:
const generateUsername = (name) => {
  let username = "";
  if (name.includes(" ")) username += name.replaceAll(" ", "_").toLowerCase();
  else username += name.toLowerCase();
  return username;
};

// Approach 2:
const generateUsername1 = (name) => {
  return name.toLowerCase().replaceAll(" ", "_");
};

// Approach 3:
const generateUsername2 = (name) => {
  return name.toLowerCase().split(" ").join("_");
};

console.log(generateUsername("Ritik Rajput"));
console.log(generateUsername1("Ritik Rajput"));
console.log(generateUsername2("Ritik Rajput"));

// Question 13 — Dynamic Sum Function
/*
Create: sum(...numbers)
Example:
sum(1,2,3,4)
Output:
10

Scenario
Calculator app.

What is this question asking?
Accept unlimited numbers.

Concepts Tested
Rest Parameters
reduce()
*/

const sumOfNumbers = (...numbers) => {
  return numbers.reduce((sum, number) => sum + number, 0);
};

console.log(sumOfNumbers(1, 2, 3, 4));

// Question 14 — Login Validation
/*
Create: login(username,password)

Rules: username==="admin" password==="1234"

Return:
"Login Successful" or "Invalid Credentials"

Scenario
Authentication system.

Concepts Tested
Functions
Conditional Logic
*/

const login = (username, password) =>
  username === "admin" && password === "1234"
    ? "Login Successful"
    : "Invalid Credentials";

console.log(login("admin", "1234"));
console.log(login("amit", 1234));

// 🔴 Hard Level (Q15 - Q20)
// These questions require problem-solving and function composition.

// Question 15 — Factorial Function
/*
Create: factorial(n)
Example:
factorial(5)

Output: 120

Because:
5×4×3×2×1

Scenario
Math engine.

Concepts Tested
Loops
Functions
*/

const factorial = (num) => {
  let ans = 1;
  while (num > 0) {
    ans *= num;
    num--;
  }
  return ans;
};
console.log(factorial(5));

// Question 16 — Palindrome Checker
/*
Create: isPalindrome(str)
Example: isPalindrome("madam")

Output:
true

Scenario
Text validation tool.

What is this question asking?
Check if a word reads the same forward and backward.

Concepts Tested
Functions
Strings
Logic Building
*/

// Approach 1:
const isPalindrome = (str) => {
  let copy = str;
  let i = copy.length - 1;
  let reverse = "";
  while (i >= 0) {
    reverse += str.charAt(i);
    i--;
  }
  if (str.toLowerCase() === reverse.toLowerCase()) return true;
  else return false;
};

console.log(isPalindrome("madam"));

// Question 17 — Password Strength Checker
/*
Create: checkPassword(password)

Rules:
Password should contain:
At least 8 characters
At least 1 number

Return:
"Strong" or "Weak"

Scenario
Registration page.

Concepts Tested
Functions
Conditions
String Analysis
*/

const checkPassword = (password) => {
  let hasNumber = false;
  for (character of password) {
    if (character >= "0" && character <= "9") {
      hasNumber = true;
      break;
    }
  }
  return password.length >= 8 && hasNumber ? "Strong" : "Weak";
};

console.log(checkPassword("Amit@1234"));
console.log(checkPassword("Amit@12"));
console.log(checkPassword("Amit@swain"));

// Question 18 — Function Returning Function
/*
Create: makeMultiplier(multiplier)
Example: let double = makeMultiplier(2);
double(10);
Output:
20

Scenario
Reusable calculation system.
What is this question asking?

A function should return another function.

Concepts Tested
Higher Order Functions
Closures (intro)
*/

const makeMultiplier = (multiplier) => {
  return function (num) {
    return multiplier * num;
  };
};

let doubled = makeMultiplier(10);
console.log(doubled(2));

let tripled = makeMultiplier(25);
console.log(tripled(3));

// Question 19 — Callback Function
/*
Create: processUser(name,callback)
Example: processUser("Ritik",welcomeUser);
Output:
Processing User...
Welcome Ritik

Scenario
Backend processing.

What is this question asking?
Pass a function as an argument to another function.

Concepts Tested
Callbacks
Higher Order Functions
*/

function processUser(name, callback) {
  console.log("Processing User...");
  return callback(name);
}

function welcomeUser(name) {
  return `Welcome ${name}`;
}

let welcomeMessage = processUser("Ritik", welcomeUser);

console.log(welcomeMessage);

// Question 20 — Shopping Bill Generator
/*
Create:
generateBill(items)
Example Input:
[
{ name:"Mouse", price:500 },
{ name:"Keyboard", price:1000 },
{ name:"Monitor", price:10000 }
]
Output:

Total:11500

Scenario
E-commerce checkout page.

What is this question asking?
Create a reusable function that can calculate the total cost of any shopping cart.

Concepts Tested
Functions
Arrays
Objects
Real-world Problem Solving
*/

let items = [
  { name: "Mouse", price: 500 },
  { name: "Keyboard", price: 1000 },
  { name: "Monitor", price: 10000 },
];

// Approach 1:
const generateBill = (items) =>
  items.reduce((sum, item) => sum + item.price, 0);

console.log(generateBill(items));

// Approach 2:
const generateBill1 = (items) => {
  let total = 0;
  for (eachItem of items) {
    total += eachItem.price;
  }
  return total;
};

console.log(generateBill1(items));

// Part 4: Arrays + Objects + Functions (20 Questions)

/*
This section is the most important.
In real-world applications:
Data is usually stored in arrays
Each item is usually an object
Logic is usually written inside functions
So almost every frontend/backend interview problem looks like this:

[
{
name:"Ritik",
age:21
},
{
name:"Aman",
age:20
}
]
and you're asked to write functions to manipulate that data.
*/

// 🟢 Easy Level (Q1 - Q7)
// Question 1 — Find Adult Users
/*
let users= [
{ name:"Ritik", age:20 },
{ name:"Aman", age:16 },
{ name:"Priya", age:25 }
];
Create:
getAdults(users)
Return only users whose age is 18 or above.
Scenario
A website only allows adults to register.
What is this question asking?
You need to:
1. Loop through users.
2. Check age.
3. Return qualifying users.

Expected Output:
[
{ name:"Ritik", age:20 },
{ name:"Priya", age:25 }
]

Concepts Tested

Array of Objects
Functions
filter()
*/

let users2= [
{ name:"Ritik", age:20 },
{ name:"Aman", age:16 },
{ name:"Priya", age:25 }
];


function getAdults(users){
  return users.filter((user)=>{return user.age>=18});
}

console.log(getAdults(users2));

// Question 2 — Product Names Extractor
/*
let products= [
{ name:"Laptop", price:50000 },
{ name:"Mouse", price:500 }
];
Create:
getProductNames(products)
Return:
["Laptop","Mouse"]

Scenario
A dropdown only needs product names.

What is this question asking?
Extract a single property from every object.

Concepts Tested
Arrays
Objects
Functions
map()
*/

let products2= [
{ name:"Laptop", price:50000 },
{ name:"Mouse", price:500 }
];

function getProductNames(products){
  return products.map((product)=>product.name);
}

console.log(getProductNames(products2));

// Question 3 — Find User By Name
/*
let users= [
{ name:"Ritik" },
{ name:"Aman" },
{ name:"Priya" }
];

Create:
findUser(users,username)

Scenario
Search bar functionality.
What is this question asking?
Find a specific object based on a property value.

Concepts Tested
find()
Functions
*/

let users3 = [
{ name:"Ritik" },
{ name:"Aman" },
{ name:"Priya" }
];

function findUser(users,username){
  let checkUser = users.find((user)=>user.name === username);
  if(checkUser) return ("User Exists");
  else return ("User doesn't Exists");
}

console.log(findUser(users3,"Aman"));

// Question 4 — Total Marks
/*
let students= [
{ name:"Ritik", marks:80 },
{ name:"Aman", marks:90 },
{ name:"Priya", marks:70 }
];
Create:
getTotalMarks(students)
Return:
240

Concepts Tested
reduce()
Functions
*/
let students1= [
{ name:"Ritik", marks:80 },
{ name:"Aman", marks:90 },
{ name:"Priya", marks:70 }
];

function getTotalMarks(students){
  return students.reduce((sum,student)=>sum+student.marks,0);
}

console.log((getTotalMarks(students1)));

// Question 5 — Available Products
/*
Question 5 — Available Products
let products= [
{ name:"Mouse", stock:10 },
{ name:"Keyboard", stock:0 },
{ name:"Monitor", stock:5 }
];
Return only products whose stock is greater than zero.

Scenario
Show only available products.

Concepts Tested
filter()
Array of Objects
*/

let products3= [
{ name:"Mouse", stock:10 },
{ name:"Keyboard", stock:0 },
{ name:"Monitor", stock:5 }
];

function availableProducts(products){
  return products.filter((product)=>product.stock>0)
}

console.log(availableProducts(products3));

// Question 6 — Add New Student
/*
Create:
addStudent(students,student)
which adds a student to the array.

Scenario
Student admission system.

What is this question asking?

Create a reusable function that updates data.

Concepts Tested
Arrays
Objects
push()
*/

let students2 = [
{ name:"Ritik", marks:80 },
{ name:"Aman", marks:90 },
{ name:"Priya", marks:70 }
]

function addStudent(students,student){
  return students.push(student);
}

console.log(addStudent(students2,{name:"Amit",marks:99}));
console.log(students2);

// Question 7 — Count Premium Products
/*
let products= [
{ name:"Laptop", price:50000 },
{ name:"Phone", price:30000 },
{ name:"Mouse", price:500 }
];

Count products costing more than ₹10,000.

Scenario
Analytics dashboard.

Concepts Tested
filter()
length
*/

let products4= [
{ name:"Laptop", price:50000 },
{ name:"Phone", price:30000 },
{ name:"Mouse", price:500 }
];

function premiumProductsCount(products){
  let premiumProducts =  products.filter((product)=>(product.price>10000));
  return premiumProducts.length;
}

console.log(premiumProductsCount(products4));

// 🟡 Moderate Level (Q8 - Q14)
// Question 8 — Shopping Cart Total
/*
let cart= [
{ name:"Mouse", price:500, qty:2 },
{ name:"Keyboard", price:1000, qty:1 },
{ name:"Monitor", price:10000, qty:1 }
];

Create:
getCartTotal(cart)

Scenario
Checkout page.

What is this question asking?

For each item:
price*qty
Add everything.

Expected:
12000

Concepts Tested
Arrays
Objects
Functions
reduce()
*/

let cart1= [
{ name:"Mouse", price:500, qty:2 },
{ name:"Keyboard", price:1000, qty:1 },
{ name:"Monitor", price:10000, qty:1 }
];

function getCartTotal(cart){
  return cart.reduce((total,product)=>total+(product.price * product.qty),0)
}

console.log(getCartTotal(cart1));

// Question 9 — Student Average Generator
/*
let students= [
{ name:"Ritik", marks: [80,90,85] },
{ name:"Aman", marks: [70,75,80] }
];

Create:
getAverageMarks(students)
Return average for each student.

Scenario
School Report Card.

Concepts Tested
Nested Arrays
Objects
map()
reduce()
*/

let students3= [
{ name:"Ritik", marks: [80,90,85] },
{ name:"Aman", marks: [70,75,80] }
];

function getAverageMarks(students){
  return students.map((student)=>({
    name : student.name,
    average : student.marks.reduce((total,mark)=>(total+mark)) / student.marks.length,
  }));
}

console.log(getAverageMarks(students3));

// Question 10 — Inventory Search
/*
let
inventory= [
{ id:1, name:"Laptop" },
{ id:2, name:"Mouse" },
{ id:3, name:"Monitor" }
];

Create:
findProductById(id)

Scenario
Product detail page.

Concepts Tested
find()
Functions
*/

let inventory1= [
{ id:1, name:"Laptop" },
{ id:2, name:"Mouse" },
{ id:3, name:"Monitor" }
];

function findProductById(id){
  return inventory1.find(product=>product.id === id) ||`Product not found`;
}
console.log(findProductById(2));
console.log(findProductById(4));

// Question 11 — Usernames Generator
/*
let users= [
{ name:"Ritik Rajput" },
{ name:"Aman Gupta" }
];

Return:
[
"ritik_rajput",
"aman_gupta"
]

Scenario
Registration system.

Concepts Tested
map()
String Methods
Functions
*/

let users4 = [
{ name:"Ritik Rajput" },
{ name:"Aman Gupta" }
];

function usernameGenerator(users){
  return users.map(user=> user.name.toLowerCase().replaceAll(" ","_"));
}

console.log(usernameGenerator(users4));

// Question 12 — Highest Scoring Student
/*
let students= [
{ name:"Ritik", marks:85 },
{ name:"Aman", marks:95 },
{ name:"Priya", marks:75 }
];

Find the highest scorer.
Scenario
School Topper List.

Concepts Tested
Comparisons
Loops
Objects
*/

let students4= [
{ name:"Ritik", marks:85 },
{ name:"Aman", marks:95 },
{ name:"Priya", marks:75 }
];


function highestScoringStudent(students){
    let highestScorer = students[0];
    students.forEach(student => {
    if(student.marks>highestScorer){
      highestScorer = student;
    }           
  });
  return highestScorer;
}

console.log(highestScoringStudent(students4));

// Question 13 — Update Product Stock
/*
Create:
updateStock(id,quantity)
that updates stock of a specific product.

Scenario
Warehouse management.
What is this question asking?
Locate the object.
Update one property.

Concepts Tested
find()
Object Updates
*/

let products5= [
{ id:1, name:"Mouse", stock:10 },
{ id:2, name:"Keyboard", stock:0 },
{ id:3, name:"Monitor", stock:5 }
];

function updateStock(id,stock){
  let product = products5.find((product)=>product.id === id);
  if(product){
    product.stock = stock;
  }
  return product;
}

console.log(updateStock(2,20));

// Question 14 — Sort Students by Marks
/*
Sort:
[
{name:"A", marks:70},
{name:"B", marks:95},
{name:"C", marks:80}
]
from highest to lowest.
Scenario
Leaderboard.

Concepts Tested
sort()
Array of Objects
*/

let students5 = [
{name:"A", marks:70},
{name:"B", marks:95},
{name:"C", marks:80}
]

function studentsSortedByMarks(students){
  return students.sort((a,b)=>b.marks-a.marks);
}

console.log(studentsSortedByMarks(students5));

// 🔴 Hard Level (Q15 - Q20)
// These are close to actual frontend interview questions.

// Question 15 — Student Grade Report
/*
let students= [
{
name:"Ritik",
marks: [80,90,85]
},
{
name:"Aman",
marks: [50,40,60]
}
];

Create:
generateReport(students)
Return:
[
{
name:"Ritik",
average:85,
grade:"A"
},
{
name:"Aman",
average:50,
grade:"C"
}
]

Scenario
School Report System.

What is this question asking?
For every student:
1. Calculate average.
2. Decide grade.
3. Create a new object.
4. Return a new array.

Concepts Tested
Arrays
Nested Arrays
Objects
Functions
map()
reduce()
*/

let students6= [
{
name:"Ritik",
marks: [80,90,85]
},
{
name:"Aman",
marks: [50,40,60]
}
];


function generateReport(students){
  return students.map(student=>{
    const average = student.marks.reduce((total,mark)=>(total+mark),0)/student.marks.length;
    return {
    name : student.name,
    average : average,
    grade : average>=95 ? "A+" : 
            average >=85 ? "A" : 
            average >=75 ? "B+" : 
            average >=65 ? "B" :
            average >=55 ? "C+" :
            average >=45 ? "C" :
            average >= 35 ? "D" : "F",
    }
  });
}

console.log(generateReport(students6));

// Question 16 — Product Revenue Analyzer
/*
let products= [
{
name:"Mouse",
price:500,
sold:20
},
{
name:"Keyboard",
price:1000,
sold:10
}
];

Find:
1. Revenue per product
2. Total Revenue
3. Best Selling Product

Scenario
Business Analytics Dashboard.
Concepts Tested

Arrays
Objects
reduce()
Comparisons
*/

let products6= [
{
name:"Mouse",
price:500,
sold:20
},
{
name:"Keyboard",
price:1000,
sold:15
}
];


function productAnalyzer(products){
  const revenuePerProduct = products.map((product)=>product.price * product.sold);
  const totalRevenue = products.reduce((total,product)=>total + (product.price * product.sold),0);
  const bestSellingProduct = products.reduce((best,product)=>best.sold<product.sold ? product : best);

  return {
    revenue_per_product : revenuePerProduct,
    total_revenue : totalRevenue,
    best_selling_product : bestSellingProduct,
  }
}

console.log(productAnalyzer(products6));

// Question 17 — Attendance System
/*
let
students= [
{ name:"Ritik", present:true },
{ name:"Aman", present:false },
{ name:"Priya", present:true }
];

Create functions:
countPresent()
countAbsent()
getPresentStudents()

Scenario
School Attendance Portal.

Concepts Tested
Arrays
Objects
Functions
filter()
*/

let
students7= [
{ name:"Ritik", present:true },
{ name:"Aman", present:false },
{ name:"Priya", present:true }
]
function countPresent(students){
  return students.filter((student)=>student.present).length
}

function countAbsent(students){
  return students.filter((student)=>!student.present).length
}

function getPresentStudents(students){
  return students.filter((student)=>student.present).map(student=>student.name);
}


console.log(countPresent(students7));
console.log(countAbsent(students7));
console.log(getPresentStudents(students7));

// Question 18 — Library Management System
/*
Question 18 — Library Management System
Store books like:
{
id:1,
title:"Atomic Habits",
borrowed:false
}

Create:
addBook()
borrowBook()
returnBook()
showAvailableBooks()

Scenario
Library Software.
What is this question asking?
Manage a collection of books using functions.

Concepts Tested
Arrays
Objects
Functions
find()
filter()
*/




  let books = [];
  function addBook(title){
    books.push({id:books.length+1,title,isBorrowed:false});
    return `${title} added successfully`;
  }

  function borrowBook(id){
    let book = books.find((b)=>b.id === id);
    if(!book){
      return `Book not found`;
    }
    if(book.isBorrowed){
      return `${book.title} is already borrowed`;
}
    book.isBorrowed = true;
    return `${book.title} is borrowed successfully`;
  }

  function returnBook(id){
    let book = books.find((b)=>b.id===id);
    if(!book){
      return `Book not found`;
    }
    book.isBorrowed = false;
    return `${book.title} has been returned successfully`;
  }

  function showAvailableBooks(){
    return books.filter((book)=>!book.isBorrowed);
  }
  function showAllBooks(){
    books.forEach((book)=>{
      console.log(`${book.id} - ${book.title}`);
    });
  }

console.log(addBook("Atomic Habits"));
console.log(addBook("Deep Work"));
console.log(addBook("The Psychology of Money"));

console.log(showAvailableBooks());

console.log(borrowBook(2));

console.log(showAvailableBooks());

console.log(returnBook(2));

console.log(showAvailableBooks());

showAllBooks();

// Question 19 — Order Management System
/*
Store orders like:
{
id:1,
customer:"Ritik",
amount:5000,
status:"Pending"
}
Create:
createOrder()
updateStatus()
getPendingOrders()
getCompletedOrders()

Scenario
E-commerce Backend.

Concepts Tested
Arrays
Objects
Functions
Business Logic
*/

let orders = [];
function createOrder(customerName,amount){
  const order = {id:orders.length+1,customer:customerName,amount:amount,status:"pending"};
  orders.push(order);
  return `${customerName}'s order of worth ₹${amount} added successfully with Order ID as ${order.id}.`
}

function updateStatus(id){
  let order = orders.find((order)=>order.id===id);
  if(!order){
    return `Order not found`;
  }
  order.status = "completed";
  return `Order ID ${id} of worth ₹${order.amount} has been completed successfully.`
}

function getPendingOrders(){
  return orders.filter((order)=>order.status === "pending");
}

function getCompletedOrders(){
  return orders.filter((order)=>order.status === "completed");  
}

console.log(createOrder("Ritik", 5000));
console.log(createOrder("Amit", 2500));
console.log(createOrder("Sneha", 7800));
console.log(createOrder("Priya", 1200));
console.log(createOrder("Rahul", 999));

console.log("All Orders:", orders);

console.log(updateStatus(2));
console.log(updateStatus(4));

console.log("Pending Orders:", getPendingOrders());
console.log("Completed Orders:", getCompletedOrders());

console.log(updateStatus(10)); // Order not found

// Question 20 — Mini E-Commerce System (Interview Level)
/*
addProduct()
removeProduct()
updateStock()
purchaseProduct()
getInventoryValue()
Store products like:
{
id:1,
name:"Laptop",
price:50000,
stock:10
}

Scenario
You are building the backend logic of Amazon/Flipkart inventory.
What is this question asking?
This is not one function.
This is an entire mini project.

You need to:
1. Store products.
2. Add products.
3. Remove products.
4. Update stock.
5. Handle purchases.
6. Calculate inventory value.
*/

let inventoryProducts = [];
let nextId = 1;
function addProduct(productName,productPrice,productStock){
  const product = {
    id: nextId++,
    name: productName,
    price: productPrice,
    stock : productStock
  }
    inventoryProducts.push(product);
    return `Product ID #${product.id} as ${productName} with amount of  ₹${productPrice} has been added successfully.`;
}

function removeProduct(id){
  let product = inventoryProducts.find((p)=>p.id===id);
  if(!product) return `Product not found`;
  inventoryProducts = inventoryProducts.filter((p)=>p.id!==product.id);
  return `Product ID #${product.id} as ${product.name} with amount of ₹${product.price} has been removed successfully.`;
}

function updateStocks(id,updatedStock){
  let product = inventoryProducts.find((p)=>p.id===id);
  if(!product) return `Product not found`;
  let oldStock = product.stock;
  product.stock = updatedStock;
  return `Product ID #${product.id} as ${product.name} stock has been updated from ${oldStock} to ${updatedStock}.`
}

function purchaseProduct(id,quantity){
  if(quantity <= 0){
  return "Invalid quantity";
}
  let product = inventoryProducts.find((p)=>p.id===id);
  if(!product) return `Product not found`;
  if(product.stock===0){
    return `${product.name} is out of stock.`
  }

  if(product.stock<quantity){
    return `Currently only ${product.stock} items are available in stock.`
  }

  product.stock-=quantity;

  let bill = product.price * quantity;

  return `Order ID #${product.id} as ${product.name} has been purchased in ${quantity} quantity with bill of ₹${bill} and currently ${product.stock} products are in stock.`
}

function getInventoryValue(){
  let inventoryValue =  inventoryProducts.reduce((totalValue,product)=>(totalValue + (product.price * product.stock)),0);
  return `Total Inventory Value is ₹${inventoryValue}`;
}

console.log(addProduct("Laptop", 50000, 10));
console.log(addProduct("Mouse", 500, 20));
console.log(addProduct("Keyboard", 1000, 15));

console.log(getInventoryValue());
console.log(purchaseProduct(1, 2));
console.log(purchaseProduct(2, 50));
console.log(purchaseProduct(1, 0));
console.log(purchaseProduct(1, -5));
console.log(purchaseProduct(99, 1));
console.log(updateStocks(2, 100));
console.log(removeProduct(3));
console.log(removeProduct(99));
purchaseProduct(1, 2);
updateStocks(2, 100);
removeProduct(3);
console.log(getInventoryValue());
console.log(inventoryProducts);