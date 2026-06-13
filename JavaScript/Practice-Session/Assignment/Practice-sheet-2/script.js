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
