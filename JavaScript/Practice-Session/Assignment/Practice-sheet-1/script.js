// Arrays

/*
Question 1 (Easy) — Find Expensive Products

let prices= [100,250,500,150,700];

Create a new array containing only prices greater than 300.
What is this question asking?

Imagine you're building an e-commerce website. You only want to show premium products that cost more than ₹300.

Input:
[100,250,500,150,700]

Output:
[500,700]

Concepts Tested:
Arrays
filter()
*/

let prices = [100, 250, 500, 150, 700];

let expensive = prices.filter((price) => price > 300);

console.log(expensive);

/*
Question 2 (Moderate) — Student Average

let marks= [80,90,70,85,95];

Calculate the average marks of all students.

What is this question asking?
A teacher has marks of students stored inside an array.


You need to:
1. Find total marks.
2. Divide by number of students.

Output:
84

Concepts Tested
Arrays
reduce()
length property
*/

let marks = [80, 90, 70, 85, 95];

let totalMarks = marks.reduce((sum, marks) => sum + marks, 0);

let averageMarks = totalMarks / marks.length;

console.log(averageMarks);

/*
Question 3 (Hard) — Most Frequent Number

let numbers= [1,2,3,2,4,2,5,1,1,1];

Find the number that appears the most.

What is this question asking?
You're given an array containing repeated values.
You need to count how many times each number appears and find the highest one.
Output:

1

Because:
1 appears 4 times
2 appears 3 times


Concepts Tested
Arrays
Loops
Objects for counting
Problem solving
*/

let nums = [1, 2, 3, 2, 4, 2, 5, 1, 1, 1];
console.log(highestFrequency(nums));

function highestFrequency(numbers) {
  let count = {};
  let highest = 0;
  let highestFrequency;
  for (let i = 0; i < numbers.length; i++) {
    if (count[numbers[i]] === undefined || count[numbers[i]] === 0) {
      count[numbers[i]] = 1;
    } else {
      count[numbers[i]]++;
    }

    if (count[numbers[i]] > highest) {
      highest = count[numbers[i]];
      highestFrequency = numbers[i];
    }
  }
  return highestFrequency;
}

// Objects

/*
Question 4 (Easy) — Update User Age

let user= {
name:"Ritik",
age:20
};

Update age to 21.

What is this question asking?

You already have an object.
Just modify one property.

Expected result:
{
name:"Ritik",
age:21
}

Concepts Tested
Object property access
Object update
*/

let user = {
  name: "Ritik",
  age: 20,
};

user.age = 21;

console.log(user);

/*
Question 5 (Moderate) — Print User Information

let user = {
name:"Ritik",
age:20,
city:"Bhopal"
};

Print:

Name:Ritik
Age:20
City:Bhopal

using a loop.

What is this question asking?

Instead of manually writing:
console.log(user.name);
console.log(user.age);

Loop through the object dynamically.
Concepts Tested
Objects
Object.entries()
for...of
*/

for ([key, value] of Object.entries(user)) {
  console.log(`${key}: ${value}`);
}

/*
Question 6 (Hard) — Highest Paid Employee

let employees = {
aman:25000,
ritik:50000,
priya:45000
};

Find the employee with the highest salary.

What is this question asking?

Compare all salaries and return:

Ritik

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
let employeeName = "";

for (key in employees) {
  if (employees[key] > highestSalary) {
    highestSalary = employees[key];
    employeeName = key;
  }
}

console.log(employeeName);

// Functions

/*
// Question 7 (Easy) — Greeting Function

Question 7 (Easy) — Greeting Function
Create a function:
greet(name)

Output:
Hello Ritik

What is this question asking?

Learn:
Function declaration
Parameters

Arguments
*/

function greet(name) {
  console.log(`Hello ${name}`);
}

greet("Amit");

/*
Create a function:
calculateDiscount(price)

Rules:
10% discount

Input:
500
Output:
450

What is this question asking?

Take input.
Perform calculation.
Return result.

Concepts Tested
Functions
Parameters
Return
*/

function calculateDiscount(price) {
  let discount = price - price / 10;
  return discount;
}

console.log(calculateDiscount(500));

/*
Question 9 (Hard) — Dynamic Sum Function

Create a function: sum(...numbers)
that can add any amount of numbers.

Example:
sum(1,2,3)

Output:
6

Example:
sum(1,2,3,4,5)

Output:

15

What is this question asking?
The function should not depend on fixed parameters.
It should work for unlimited inputs.

Concepts Tested:
Functions
Rest Parameters
reduce()
*/

function sum(...numbers) {
  return numbers.reduce((sum, number) => sum + number, 0);
}

console.log(sum(1, 2, 3));

console.log(sum(1, 2, 3, 4, 5));

// Arrays + Objects + Functions Together
// These are the most important because real projects use all three together.
/*
Question 10 (Easy) — Find Adult Users

let users= [
{ name:"Ritik", age:20 },
{ name:"Aman", age:16 },
{ name:"Priya", age:25 }
];

Create a function: getAdults(users)
Return only users whose age is 18 or above.
What is this question asking?

You have:
Array
Objects inside array
Function

Output:
[
{ name:"Ritik", age:20 },
{ name:"Priya", age:25 }
]

Concepts Tested:
Array of objects
filter()
Functions
*/

let users = [
  { name: "Ritik", age: 20 },
  { name: "Aman", age: 16 },
  { name: "Priya", age: 25 },
];

let adult = users.filter((user) => user.age > 18);

console.log(adult);

/*

Question 11 (Moderate) — Shopping Cart Total

let cart= [
{ name:"Mouse", price:500, qty:2 },
{ name:"Keyboard", price:1000, qty:1 },
{ name:"Monitor", price:10000, qty:1 }
];

Create a function:
getCartTotal(cart)

Output:
12000

What is this question asking?
Each item has:
price × quantity
Calculate total bill.

Concepts Tested:
Array of objects
Functions
reduce()
*/

let cart = [
  { name: "Mouse", price: 500, qty: 2 },
  { name: "Keyboard", price: 1000, qty: 1 },
  { name: "Monitor", price: 10000, qty: 1 },
];

function getCartTotal(cart) {
  let total = cart.reduce(
    (total, product) => total + product.price * product.qty,
    0,
  );
  return total;
}

console.log(getCartTotal(cart));

/*
Question 12 (Hard) — Student Grade Report
let students= [
{ name:"Ritik", marks: [80,90,85]},
{ name:"Aman", marks: [50,40,60]}
];

Create a function:
generateReport(students)

Return:
[
{name:"Ritik", average:85, grade:"A"},
{name:"Aman", average:50, grade:"C"}
]

What is this question asking?
For every student:
1. Calculate average.
2. Decide grade.
3. Create a new object.
4. Return a new array.
This is extremely close to real-world frontend interview questions.
Concepts Tested


Arrays
Nested Arrays
Objects
Functions
map()
reduce()
Conditional Logic

*/

let students = [
  { name: "Ritik", marks: [80, 90, 85] },
  { name: "Aman", marks: [50, 40, 60] },
];

function generateReport(students) {
  return students.map((student) => {
    let totalMarks = student.marks.reduce((sum, mark) => sum + mark, 0);
    let averageMarks = totalMarks / student.marks.length;

    let grade;

    if (averageMarks >= 90) {
      grade = "A+";
    } else if (averageMarks >= 80) {
      grade = "A";
    } else if (averageMarks >= 70) {
      grade = "B+";
    } else if (averageMarks >= 60) {
      grade = "B";
    } else if (averageMarks >= 50) {
      grade = "C";
    } else if (averageMarks >= 40) {
      grade = "D";
    } else {
      grade = "F";
    }

    return {
      name: student.name,
      average: averageMarks,
      grade: grade,
    };
  });
}

console.log(generateReport(students));


/*
🚀 Final Challenge (Very Hard)
Mini Library Management System
Create:

addBook(title,author)
borrowBook(id)
returnBook(id)
showAvailableBooks()

Books should be stored as:

{
id:1,
title:"Atomic Habits",
author:"James Clear",
borrowed:false
}

What is this question asking?
You need to manage a collection of books.

Tasks:
1. Add new books.
2. Borrow books.
3. Return books.
4. Display available books.
*/

class library{
    constructor(){
        this.books = [];
        this.nextId = 1;
    }

    addBook(title,author){
        let book = this.books.find((book)=>book.title === title);
        if(book){
            return `${book.title} has been already added.`;
        }
        this.books.push({id:this.nextId++,title,author,borrowed:false});
        return `${title} has been added successfully.`;
    }

    borrowBook(id){
        let book = this.books.find((book)=>book.id === id);

        if(!book){
            return `Book not found`;
        }
        if(book.borrowed){
            return `${book.title} has already been borrowed.`;
        }
        book.borrowed = true;
        return `${book.title} has been borrowed successfully.`;
    }

    returnBook(id){
        let book = this.books.find((book)=>book.id === id);
        if(!book){
            return `Book not found`;
        }
        if(!book.borrowed){
            return `${book.title} has not been borrowed.`;
        }
        book.borrowed = false;
        return `${book.title} has been returned successfully.`;
    }

    showAvailableBooks(){
        return this.books.filter((book)=>!book.borrowed)
    }
}

const lib = new library();

console.log(lib.addBook("Atomic Habits", "James Clear"));
console.log(lib.addBook("Deep Work", "Cal Newport"));

console.log(lib.borrowBook(1));

console.log(lib.showAvailableBooks());

console.log(lib.returnBook(1));

console.log(lib.showAvailableBooks());