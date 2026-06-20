// JavaScript Beginner Practice Questions (Phase - 2 ) Sheet  - 1

// Part 1 — Functions Basics (1–20)

// Beginner Level

/*

// 1. Create a function named greet that prints "Hello World".

function greet(){
    console.log("Hello World");
    
}

greet();

// 2. Create a function add(a, b) that returns the sum.

function add(a,b){
    return `Sum of ${a} and ${b} is ${a+b}`;
}

console.log(add(10,15));

// 3. Write a function to calculate the square of a number.

function square(x){
    return `Square of ${x} is ${x**2}`;
}

console.log(square(12));

// 4. Create a function that checks whether a number is even or odd.

function evenOdd(num){
    if(num%2==0) return `${num} is Even Number`;
    else return `${num} is Odd Number`;
}

console.log(evenOdd(25));

// 5. Write a function that converts Celsius to Fahrenheit.

function celsiusToFahrenheit(celsius){
    let fahrenheit = (celsius * (9/5)) + 32;
    return `${celsius}°C is equal to ${fahrenheit.toFixed(2)}°F`;
}

console.log(celsiusToFahrenheit(44));

// 6. Create a function with default parameter "Guest".

function greetWithParameter(name="Guest"){
    return `Hello! ${name}`;
}

console.log(greetWithParameter());
console.log(greetWithParameter("Amit"));

// 7. Write a function that returns the greater of two numbers.

function greaterOfTwoNumbers(num1,num2){
    if(num1>num2) return `${num1} is greater than ${num2}`;
    else return `${num2} is greater than ${num1}`;
}

console.log(greaterOfTwoNumbers(23,30));

// 8. Create a function to calculate area of rectangle.

function areaOfRectangle(length,breadth){
    let area = length * breadth;
    return `Area of rectangle with length ${length}m and breadth ${breadth}m is ${area}sq.m`
}

console.log(areaOfRectangle(55,75));

// 9. Write a function that returns "Adult" if age ≥ 18 else "Minor".

function ageCheck(age){
    if(age>=18) return "Adult";
    else return "Minor";
}

console.log(ageCheck(20));

// 10. Create a function to reverse a string.

function reverseString(str){
    let copy = str;
    let rev = "";
    let i = copy.length - 1;
    while(i>=0){
        rev = rev + copy.charAt(i);
        i--;
    }
    return `Reverse of String word ${str} is ${rev}`;
}

console.log(reverseString("chocolate"));

*/


// Intermediate Level

/*

// 1. Write a function expression for multiplication.

const multiplication = function(num1,num2) {return num1*num2};

console.log(multiplication(35,45));

// 2. Convert a normal function into an arrow function.

// normal function 
function normalGreeting(name){
    return `Hello! ${name}`;
}

console.log(normalGreeting("Amit"));

// arrow function
const arrowGreeting = (name) => {return `Hello! ${name}`}

console.log(arrowGreeting("Amit"));

// 3. Create a function that accepts unlimited numbers and returns their sum using rest operator.

const sumOfAll = (...numbers) => {
    let sum = 0;
    for(let number of numbers) sum += number;
    return sum;
};

console.log(sumOfAll(1,2,3,4,5));

// 4. Write a function that counts vowels in a string.

const findVowels = (str) =>{
    let i=0;
    let vowels = "aeiou";
    let count = 0;
    while(i<str.length){
        let char = str.charAt(i);
        if(vowels.includes(str.charAt(i))){
            count++;
        }
        i++;
    }
    return `The word ${str} has ${count} vowels`;
}

console.log(findVowels("chocolate"));

// 5. Create a function that checks if a string is palindrome.

const palindrome = (str) =>{
    let copy = str; // malayalam
    let rev = "";
    let i = copy.length-1; // 8
    while(i>=0){ // 
        rev = rev + copy.charAt(i);
        i--;
    }
    if(rev.toLowerCase() === str.toLowerCase()) return `${str} is a palindrome`;
    else return `${str} is not a palindrome`
}

console.log(palindrome("Malayalam"));

// 6. Write a callback function example using setTimeout.

setTimeout((name)=>console.log(`Hello! ${name}`),3000,"Amit Swain");

// 7. Create a higher-order function that executes another function twice.

function higherOrderFunction(greet,name){
    greet(name);
    greet(name);

}

const greet = (name)=>{console.log(`Hello! ${name}`);}


higherOrderFunction(greet,"Amit");

// 8. Write a function that returns another function.

function outerFunction(){
    console.log("This is the outer function");
    return function innerFunction(){
        console.log("This is the inner function");
    };
};

let result = outerFunction();
result();

// 9. Create a pure function for subtraction.

function subtraction(a,b){
    return a-b;
}

console.log(subtraction(10,7));

// 10. Create an impure function using global variable modification.

let total = 100;
function totalAmount(amount){
    total+=amount;
    return total;
};

console.log(totalAmount(50)); // 150
console.log(totalAmount(50)); // 200 because of global variable.

*/

// Part 2 — Advanced Functions (21–35)

/*

// 1. Write a recursive function for factorial.

function recursiveFactorial(num){ // 5
    if(num===0){ 
        return 1;
    }else{
        return num * recursiveFactorial(num-1); //
    }
}

console.log(recursiveFactorial(5));


// 2. Write recursive Fibonacci function.

function recursiveFibonacci(num){ // 0 1 1 2 3 5 8 13 21 34 55
    if(num<=1){
        return num;
    }
    return recursiveFibonacci(num-2) + recursiveFibonacci(num-1); 
}

console.log(recursiveFibonacci(10));

// 3. Create a function that finds power using recursion.

function recursivePower(num,power){ // (2,3)
    if(power === 1) return num; 
    return num * recursivePower(num,power-1);
}

console.log(recursivePower(2,5));

// 4. Create an IIFE that prints "Executed".

(function iife(){
    console.log("Executed");
})();

// 5. Write a function that memoizes factorial calculation.

    let cacheObject = {};
    let cacheArray = [];
function memoizeFactorial(num){

    if(num in cacheObject){
        console.log("From Cache Object");
        return cacheObject[num];
    }

    if(cacheArray[num]!=undefined){
        console.log("From Cache Array");
        return cacheArray[num];
    }

    let memo = 1;

    if(num===0){
    cacheObject[num] = memo;
    cacheArray[num] = memo;
    return memo;
    }

    for(let i=1; i<=num; i++){
        memo*= i;
    }
    cacheObject[num] = memo;
    cacheArray[num] = memo;
    return memo;
}

console.log(memoizeFactorial(0));
console.log(memoizeFactorial(1));
console.log(memoizeFactorial(2));
console.log(memoizeFactorial(3));
console.log(memoizeFactorial(4));
console.log(memoizeFactorial(5));
console.log(memoizeFactorial(6));
console.log(memoizeFactorial(7));
console.log(memoizeFactorial(8));
console.log(memoizeFactorial(9));
console.log(memoizeFactorial(10));

console.log(memoizeFactorial(5));
console.log(memoizeFactorial(6));
console.log(memoizeFactorial(7));

console.log(cacheObject);
console.log(cacheArray);

// 6. Create a closure counter function.

function closureCounter(){
    let count = 0;
    return function innerCounter(){
        count++;
        return count;
    };
}

// console.log(closureCounter()()); // 1
// console.log(closureCounter()()); // 1
// console.log(closureCounter()()); // 1
// console.log(closureCounter()()); // 1 // every call creates a new count

const counter = closureCounter();
console.log(counter()); // 1
console.log(counter()); // 2
console.log(counter()); // 3
console.log(counter()); // 4

// 7. Write a function currying example for addition.

function curryingAddition(a){
    return function(b){
        return function(c){
            return a+b+c;
        }
    }
}

console.log(curryingAddition(3)(4)(5));

// 8. Create debounce function logic.

function debounce(callback,delay){
    let timer;
    return function(...args){
        clearTimeout(timer);
        timer = setTimeout(()=>{
            callback(...args)
        },delay)
    };
}

function search(query){
    console.log(`Searching for: ${query}`);
}

let debouncedSearch = debounce(search,1000);

debouncedSearch("A");
debouncedSearch("Am");
debouncedSearch("Ami");
debouncedSearch("Amit");

// 9. Create throttle function logic.

function throttle(callback,delay){
    let isThrottle = false
    return function(...args){
        if(isThrottle){
            return;
        }
        callback(...args);
        isThrottle = true;
        setTimeout(()=>{
            isThrottle = false;
        },delay);
    };
}


let throttledSearch = throttle(search,5000);

throttledSearch("A");
throttledSearch("Am");
throttledSearch("Ami");
throttledSearch("Amit");

// 10. Write a function that executes only once.

function once(callback){
    let isExecuted = false;
    return function(...args){
        if(isExecuted){
            console.log("Function already executed");
             return;
        };
        isExecuted = true;
        return callback(...args);
    };
}

function greetingOnce(name){
    console.log(`Hey! ${name}`);
};

let onceGreet = once(greetingOnce);

onceGreet("Amit");
onceGreet("Jack");

// 11. Create custom implementation of map

function customMap(arr,callback){
    let result = [];
    for(let i=0;i<arr.length;i++){
        result.push(callback(arr[i],i,arr));
    };
    return result;
}

const double = (num) => {return num*2};

let arr = [1,2,3,4,5]

let doubled = customMap(arr,double);

console.log(doubled);

// 12. Create custom implementation of filter.

function customFilter(arr,callback){
    let result = [];
    for(let i=0;i<arr.length;i++){
        if(callback(arr[i],i,arr)){
            result.push(arr[i])
        }
    };
    return result;
}

const even = (num) => {return num%2==0}

let evenFiltered = customFilter(arr,even);
console.log(evenFiltered);

// 13. Create custom implementation of reduce.

function customReduce(arr,callback,initialValue){
    let accumulator = initialValue;

    for(let i=0;i<arr.length;i++){
        accumulator = callback(accumulator,arr[i],i,arr);
    }
    return accumulator;
}

const sumReduce = (accumulator,current)=>{return accumulator+current};

let finalSum = customReduce(arr,sumReduce,0);

console.log(finalSum);

// 14. Create custom forEach.

function customForEach(arr,callback){
    for(let i=0;i<arr.length;i++){
        callback(arr[i],i,arr);
    };
}

customForEach(arr,(value,index)=>{
    console.log(`Index: ${index}, Value: ${value}`);
})

// 15. Explain output:

function test() {
    return;
    console.log("Hello");
}
console.log(test()); // undefined

*/

// Part 3 — Arrays Basics (36–55)

// Beginner

/*

// 1. Create an array of 5 fruits.

let arrayFruits = ["Apple","Banana","Papaya","Mango","Strawberry"];

// 2. Print first and last element of array.

let first = arrayFruits.at(0);

let last = arrayFruits.at(-1);

console.log(first);
console.log(last);

// 3. Find length of array.

let length = arrayFruits.length;

console.log(length);

// 4. Add element at end using push.

arrayFruits.push("Guava");

console.log(arrayFruits);

// 5. Remove last element using pop.

arrayFruits.pop();

console.log(arrayFruits);

// 6. Add element at beginning using unshift.

arrayFruits.unshift("Orange")

console.log(arrayFruits);

// 7. Remove first element using shift.

arrayFruits.shift();

console.log(arrayFruits);

// 8. Reverse an array

arrayFruits.reverse();

console.log(arrayFruits);

// 9. Sort numbers ascending

let arrayNumbers = [1,100,1001,1200,10,15];

let sortAscending = arrayNumbers.sort((a,b)=>(a-b));

console.log(sortAscending);

// 10. Sort numbers descending.

let sortDescending = arrayNumbers.sort((a,b)=>(b-a));

console.log(sortDescending);

*/

// Intermediate

/*

// 1. Use splice to remove elements.

let chocolateArr = ["KitKat","Dairy Milk","Munch","Perk","Milky Bar"];

console.log(chocolateArr);

chocolateArr.splice(1,2)

console.log(chocolateArr); // removes "Dairy milk" and "Munch"

// 2. Use splice to insert elements.

chocolateArr.splice(3,0,"5 Star","Fuse","Silk","Gems","Temptations");

console.log(chocolateArr);

// 3. Use slice to copy array.

let copyChocolateArr = chocolateArr.slice(0,chocolateArr.length);

console.log(copyChocolateArr);

// 4. Find index of an element.

let indexOfSilk = chocolateArr.indexOf("Silk");

console.log(indexOfSilk);

// 5. Check if array contains a value.

let isGemsAvailable = chocolateArr.includes("Gems");

console.log(isGemsAvailable);

// 6. Join array elements with .

let elementJoined = chocolateArr.join(".");
console.log(elementJoined);

// 7. Merge two arrays using spread operator.

let pastriesArr = ["Croissant","Danish", "Éclair","Muffin","Cupcake"];

console.log(...pastriesArr); // Croissant Danish Éclair Muffin Cupcake // Breaks array and takes out values in array

let mergedSweetsArray = [...chocolateArr,...pastriesArr];

console.log(mergedSweetsArray);

// 8. Copy array using spread operator.

let copyPastriesArr = [...pastriesArr];

console.log(copyPastriesArr);

// 9. Find maximum value using Math.max.

let numberArr = [23,87,102,108,88,29,12,15,67];

let max = Math.max(...numberArr);

console.log(max);

// 10. Swap two variables using destructuring.

let a = 10;

let b = 20;

[a,b] = [b,a];

console.log(a);
console.log(b);


let swapArr = [10,20,50,40,30,60,70];

[swapArr[2],swapArr[4]] = [swapArr[4],swapArr[2]];

console.log(swapArr);

*/

// Part 4 — Array Iteration Methods (56–75)

/*

// 1. Use forEach to print all numbers doubled.

let numberArr = [1,2,3,4,5,6,7,8,9,10];

numberArr.forEach(num => {
    console.log(num*2);
});

// 2. Use map to square all numbers.

let squaredArr = numberArr.map((num)=>num**2);

console.log(squaredArr);

// 3. Use filter to get even numbers.

let evenArr = numberArr.filter((num)=>num%2==0)

console.log(evenArr);

// 4. Use reduce to calculate sum.

let sum = numberArr.reduce((accumulator,num)=>{return accumulator+num},0);

console.log(sum);

// 5. Use reduce to find maximum number.

let max = numberArr.reduce((accumulator,num)=>{return accumulator<num ? accumulator:num;},-Infinity);

console.log(max);

// 6. Use find to get first even number.

let firstEven = numberArr.find((num)=>{return num%2==0});

console.log(firstEven);

// 7. Use findIndex to locate number > 50.

let arrNum = [23,18,29,55,78,33,73,37,64];

let getIndex = arrNum.findIndex((num)=>num>50);

console.log((getIndex)); // return 3 -> only first index of the element which greater than 50 which 55

// 8. Use some to check if any number is negative.

let mixNumArr = [12,87,34,-92,65,98,22,-91,81,69,77,-99,0,82];

let checkSome = mixNumArr.some((num)=>num<0);

console.log(checkSome); // true

// 9. Use every to check if all numbers are positive.

let checkAllPositive = mixNumArr.every((num)=>num>=0);
console.log(checkAllPositive);

let checkAllForNumArr = numberArr.every((num)=>num>=0);
console.log(checkAllForNumArr);

// 10. Create array of names and convert all to uppercase.

let namesArr = ["Amit","Ashok","Ramesh","Kailash","Akash","Suresh"];

let upperCaseNamesArr = namesArr.map((name)=>{return name.toUpperCase()});

console.log(upperCaseNamesArr);

// 11. Filter all students with marks > 80.

let studentMarksArr = [
    {name: "Amit", marks: 90},
    {name: "Akash", marks:78}, 
    { name: "Rahul", marks: 72 }, 
    { name: "Priya", marks: 91 },
    { name: "Neha", marks: 78 }, 
    { name: "Rohit", marks: 88 }
];

let filteredStudents = studentMarksArr.filter((student)=> student.marks>80);

console.log(filteredStudents);

// 12. Calculate average using reduce.

let sumMarks = studentMarksArr.reduce((sum,student)=>{
    return (sum+student.marks);
},0);
let averageMarks = sumMarks/studentMarksArr.length;

console.log(averageMarks);

// 13. Count occurrences of numbers in array.

let mixedArray = ["Amit",99,"Cadbury","Modi","Rajan",98,11,"India",74,-3,2];

let occurrenceOfNumber = mixedArray.reduce((count,value)=>(typeof(value) === "number" ? ++count: count),0)
console.log(occurrenceOfNumber);

// 14. Flatten nested arrays using flat.

let nestedArr = [1,2,[3,4],5];

let nestedArray = [1,[2,[3,[4,[5]]]]];

let clearedArr = nestedArr.flat();

console.log(clearedArr);

let clearedArray = nestedArray.flat(4);

console.log(clearedArr);

// 15. Remove duplicates using Set.

let duplicateArr = [1,2,3,4,1,2,3,4,5];

let uniqueArr = [...new Set(duplicateArr)];

console.log(uniqueArr);

// 16. Sort array of objects by age.

let peopleAgeArray = [
    { name: "Amit", age: 28 },
    { name: "Siddharth", age: 13 },
    { name: "Rahul", age: 24 },
    { name: "Priya", age: 22 },
    { name: "Neha", age: 31 },
    { name: "Rohit", age: 19 },
    { name: "Anjali", age: 27 },
    { name: "Vikram", age: 35 },
    { name: "Pooja", age: 29 },
    { name: "Arjun", age: 17 },
    { name: "Sneha", age: 25 },
    { name: "Karan", age: 40 }
];

let sortedPeopleArray = peopleAgeArray.sort((a,b)=>a.age - b.age);

console.log(sortedPeopleArray);

// 17. Find total price of shopping cart.

let shoppingCart = [
    { item: "Milk", price: 50 },
    { item: "Bread", price: 30 },
    { item: "Cottage Cheese", price: 80 },
    { item: "Butter", price: 120 }
];

let totalCartAmount = shoppingCart.reduce((total,cart)=>{
    return total+cart.price;
},0);

console.log(totalCartAmount);

// 18. Group users by age.

let users = [
    { name: "Amit", age: 28 },
    { name: "Rahul", age: 24 },
    { name: "Priya", age: 28 },
    { name: "Neha", age: 24 },
    { name: "Rohit", age: 30 }
];

let groupedUsers = users.reduce((group,user)=>{
    if(!group[user.age]){
        group[user.age] = [];
    }
    group[user.age].push(user);

    return group;
},{})

console.log(groupedUsers);

// 19. Chain filter and map.

let studentMarksArray = [
    {name: "Amit", marks: 90},
    {name: "Akash", marks:78}, 
    { name: "Rahul", marks: 72 }, 
    { name: "Priya", marks: 91 },
    { name: "Neha", marks: 78 }, 
    { name: "Rohit", marks: 88 }
];

let topperName = studentMarksArr.filter((student)=>student.marks>=85).map((student)=> {return student.name});

console.log(topperName);

// 20. Explain difference between map and forEach.

let arrayOfNum = [1,2,3,4,5]

// Use map() when you want a new transformed array.
let doubled = arrayOfNum.map((num)=>{return num*2});

console.log(doubled);

// Use forEach() when you just want to iterate and perform an action (logging, updating a variable, making API calls, etc.).
arrayOfNum.forEach((num)=>{console.log(num*2);});

*/

// Part 5 — Objects Basics (76–90)

/*

// 1. Create object for a student.

let student = {
    name : "Amit",
    rollNo: 108,
    course: "Computer Engineering",
    cgpa: 8.5,
    elective_subjects: ["Web Development","Machine Learning","Artificial Intelligence"],
    isCommunityMember: true
}

// 2. Access properties using dot notation.

let course = student.course;

let electiveSubjects = student.elective_subjects;

console.log(course);
console.log(electiveSubjects);

// 3. Access properties using bracket notation.

let studentName = student["name"];

console.log(studentName);

// 4. Add new property dynamically.

student["compulsory_subjects"] = ["C++","Python","Java","JavaScript"];

student.city = "Mumbai"

student.email = "amit@student.com"

console.log(student.compulsory_subjects);
console.log(student.city);
console.log(student);


// 5. Update existing property.

student.city = "Navi Mumbai";

console.log(student.city);

student["compulsory_subjects"].push("Operating System", "Computer Networks", "DBMS", "Data Structures", "Algorithms")

console.log(student["compulsory_subjects"]);

// 6. Delete a property.

delete student.email;

console.log(student);

// 7. Create object method.

let carsMethod = {
    brand: "Toyota",
    model: "Fortuner",
    year: 2026,

    start(){
        console.log("Car started");
    },

    stop(){
        console.log("Car stopped");
    },

}

carsMethod.start();
carsMethod.stop();

// 8. Use this keyword inside method.

carsMethod.details = function(){
    console.log(`Brand : ${this.brand}`);
    console.log(`Model: ${this.model}`);
    console.log(`Year: ${this.year}`);
}

carsMethod.details();

// 9. Create nested object.

let employee = {
    employee_id : 108,
    employee_name : "Amit Swain",
    company : {
        company_name : "Google",
        location : {
            city : "Bangalore",
            state : "Karnataka",
            country : "India"
        },
    },
    skills : ["JavaScript", "React", "Node.js"],
};

// 10. Access deeply nested property.

console.log(employee.company.company_name);
console.log(employee.company.location.city);

// 11. Destructure object properties.

let {employee_id:employee_id,employee_name:employee_name} = employee

console.log(employee_id);
console.log(employee_name);

// 12. Rename variables while destructuring.

let {employee_id:id,employee_name:name} = employee;

console.log(id);
console.log(name);

let{
    company:{
        company_name:c_name,
        location:{
            city: c_city,
            state: c_state,
            country: c_country,
        }
    }
} = employee

console.log(c_name);
console.log(c_country);

// 13. Add default values during destructuring.

let {employee_name:candidate_name,employee_id:candidate_id,employee_designation="Software Engineer"} = employee;

console.log(employee_designation);

// 14. Copy object using spread operator.

// Shallow Copy
let copyEmployee = {...employee};

console.log(copyEmployee);

// Deep Copy
let deepCopyEmployee = JSON.parse(JSON.stringify(employee));
console.log(employee);

let deepCopyEmp = structuredClone(employee);
console.log(deepCopyEmp);

// 15. Merge two objects.

let mergedObject = {...student,...employee};

console.log(mergedObject);

*/

// Part 6 — Advanced Objects + Real Logic (91–100)

/*

// 1. Use Object.keys() on object.

let employee = {
    employee_id: 108,
    employee_name: "Amit Swain",
    department: "Engineering",
    salary: 80000
};

let employee_keys = Object.keys(employee);

for (key of employee_keys) console.log(key);

// 2. Use Object.values().

let employees_values = Object.values(employee);

for(value of employees_values) console.log(value)

// 3. Use Object.entries().

let employee_entries = Object.entries(employee);

for(let [key,value] of employee_entries) console.log(`${key} : ${value}`);

// 4. Loop through object using for...in.

for(let key in employee){
    console.log(employee[key]);
}

// 5. Freeze an object and test modification.

// Object.freeze(employee);

// employee.employee_name = "Rahul";

// employee.salary = 70000;

// delete employee.department;

// console.log(employee); // values are unchanged

// 6. Seal an object and test modification.

Object.seal(employee);

employee.employee_name = "Akash";

employee.salary = 90000; // do modifies the property

delete employee.department // cannot delete property

employee.city = "Mumbai" // cannot update property

console.log(employee);

// 7. Create array of objects for users.

let users = [
    {
        id: 1,
        name: "Amit",
        age: 28,
        city: "Mumbai"
    },
    {
        id: 2,
        name: "Rahul",
        age: 25,
        city: "Pune"
    },
    {
        id: 3,
        name: "Priya",
        age: 23,
        city: "Delhi"
    },
    {
        id: 4,
        name: "Neha",
        age: 27,
        city: "Bangalore"
    },
    {
        id: 5,
        name: "Siddharth",
        age: 30,
        city: "Hyderabad"
    }
];

console.log(users);

// 8. Find user with highest age.

let highest_age = users.reduce((age,userData)=>{return(age<userData.age ? age = userData.age : age)},0)

console.log(highest_age);

// Build a mini TODO app using arrays + objects.

let todos = [];

function createTask(task_title,task_description){
    let task = todos.find((t)=>t.task_title === task_title);
    if(task) return `${task_title} already exists`;
    else return todos.push({task_id:todos.length+1,task_title,task_description,isCompleted:false})
}

function updateTask(task_id,updated_task_title,update_task_description){
    let task = todos.find((t)=>t.task_id === task_id);
    if(task){
        task.task_title = updated_task_title;
        task.task_description = update_task_description
    }
    return `Task title and description updated`
}

function removeTask(task_id){
    let task = todos.find((t)=>t.task_id === task_id);
    if(task){
        todos = todos.filter((task)=>task.task_id!=task_id)
    }
    return `Task removed`
}

function completeTask(task_id){
    let task = todos.find((t)=>t.task_id === task_id);
    if(task){
        task.isCompleted = true
    }
    return `Task marked as completed.`
}

function showTasks(){
    todos.forEach((task)=>{
        console.log(`${task.task_id}. [${task.isCompleted?"x":" "}] - ${task.task_title} : ${task.task_description}`);
    });
}


// Create Tasks
console.log(createTask("Learn HTML", "Learn basic tags"));
console.log(createTask("Learn CSS", "Learn Flexbox"));
console.log(createTask("Learn JavaScript", "Learn Arrays and Objects"));

// Duplicate Task
console.log(createTask("Learn JavaScript", "Duplicate task"));

// Show Initial Tasks
console.log("\n=== Initial Tasks ===");
showTasks();

// Update Task
console.log("\n=== Update Task 2 ===");
console.log(
    updateTask(
        2,
        "Learn Advanced CSS",
        "Learn Grid and Animations"
    )
);

// Complete Task
console.log("\n=== Complete Task 1 ===");
console.log(completeTask(1));

// Remove Task
console.log("\n=== Remove Task 3 ===");
console.log(removeTask(3));

// Final Task List
console.log("\n=== Final Tasks ===");
showTasks();

// 10. Build a shopping cart system with:
// - add item
// - remove item
// - calculate total
// - quantity update


let shoppingCart = [];

function addItem(product_name, price, quantity){
    if (quantity <= 0 || isNaN(quantity)) {
        quantity = 1;
    }
let existingProduct = shoppingCart.find((item)=>item.product_name === product_name);
    if(existingProduct){
        existingProduct.quantity += quantity;
        return `${product_name} quantity updated`;
    }else{
        shoppingCart.push({product_name,price,quantity});
        return `${product_name} added to cart.`;
    }
}

function removeItem(product_name){
    let doesProductExists = shoppingCart.find((item)=>item.product_name === product_name);
    if(doesProductExists){
        shoppingCart = shoppingCart.filter((item)=>item.product_name !== product_name);
    }else{
        return "Product not found";
    }
    return `${product_name} removed from cart`;
}


function updateQuantity(product_name,updatedQuantity){
    let doesProductExists = shoppingCart.find((item)=>item.product_name === product_name);
    if(!doesProductExists){
        return 'Product not found';
    }
    let oldQuantity = doesProductExists.quantity;
    if(doesProductExists && updatedQuantity>0){
        doesProductExists.quantity = updatedQuantity;
    }else{
        return `Quantity must be greater than 0`;
    }
    return `${product_name} quantity has been updated from ${oldQuantity} to ${updatedQuantity}`;
}

function calculateTotal(){
    return shoppingCart.reduce((sum,item)=>(sum+(item.price*item.quantity)),0);
}

function showShoppingCart(){

    console.log("\n=================================");
    console.log("Shopping Cart Bill");
    console.log("=================================");

    shoppingCart.forEach((item)=>{
        console.log(
            `${item.product_name} | Qty:${item.quantity} | Price:${item.price} | Total:${item.quantity * item.price}`
        );
    });

    console.log("=================================");
    console.log(`Total Bill - ${calculateTotal()}`);
}

// Add Products
console.log(addItem("Laptop", 50000, 1));
console.log(addItem("Mouse", 500, 2));
console.log(addItem("Keyboard", 1000, 1));

// Duplicate Product
console.log(addItem("Mouse", 500, 3));

// Invalid Quantities
console.log(addItem("Monitor", 15000, 0));
console.log(addItem("Speaker", 3000, -5));

// Update Quantity
console.log(updateQuantity("Laptop", 2));

// Invalid Update
console.log(updateQuantity("Laptop", 0));

// Product Not Found
console.log(updateQuantity("Phone", 5));

// Remove Existing Product
console.log(removeItem("Keyboard"));

// Remove Non-Existing Product
console.log(removeItem("Phone"));

// Show Final Cart
showShoppingCart();

*/

// Bonus Hard Questions

// Debugging Questions

/*

// 1. 

const arr = [1,2,3];
arr[10] = 5;
console.log(arr.length); // 11

// 2. 

console.log(typeof []); // object

// 3. 

console.log([] == false); // true

// 4. 

console.log([1,2] + [3,4]); // 1,23,4

// 5.

function x(a,b){
    return a+b;
}
console.log(x(2)); // NaN

*/

// Important note 

// What is new?

// New is an operator that tells JS : "Create a new object using this constructor function"

/*
function Person(name){
    this.name = name;
}

let p1 = new Person("Amit") // Here, new Person("Amit") -> creates a brand-new object
*/

// Why do we need new?

// Suppose you want multiple multiple people:

// Like below:

/*
{
    name: "Amit"
}

{
    name: "Rahul"
}

{
    name: "Priya"
}
*/

/*

// Instead of manually creating each object:

let per1 = {name:"Amit"};

let per2 = {name: "Rahul"};

let per3 = {name: "Priya"};

// you create a blueprint:

function Person(name){
    this.name = name;
}

// and use:

let p1 = new Person("Amit");

let p2 = new Person("Rahul");

let p3 = new Person("Priya")

*/

// Why is Person called a constructor?

// Because it constructs(builds) object.

/*
function Person(name){
    this.name = name;
}
*/

// The function itself don't create object over here.

// let p1 = new Person("Amit")


// The new operator here creates an new object and passes it into the constructor function.

// What exactly happens when JavaScript sees new?

// JavaScript performs 4 steps internally.

// Step 1 : Creates new empty object with new operator and store it in memory.

// let obj = {};

// Step 2: Connect the object to prototype,

// obj.__proto__ = Person.prototype;

// This is why the objects can access prototype methods later.

/*
    Now: 
                obj
                ↓
            Person.prototype
*/

// Step 3: Call the constructor with this = obj

// JavaScript does:

// Person.call(obj,"Amit");

// So inside the function :

/*
function Person(name){
    this.name = name;
}
*/

// this becomes obj

// Therefore, this.name = name
//  becomes obj.name = "Amit"

// Now obj

/*

obj = {
    name: "Amit"
}

*/

// Step 4: Return the object

// JavaScript automatically returns:

// return obj;

// So

// let p1 = obj;

// Final:

/*
p1 = {
    name: "Amit"
}
*/

// Steps 

// let p1 = new Person("Amit")

// Step 1 : obj = {}

// Step 2 : obj.__proto = Person.prototype

// Step 3 : Person.call(obj,"Amit") =>  this.name = name => obj.name = "Amit" => obj = {name: "Amit"}

// Step 4: return obj => p1 = obj => p1 = {name: "Amit"}


// What if we don't use new?

/*

// "use strict";
function Person(name){
    this.name = name;
}

let p1 = Person("Amit");

console.log(p1); // undefined

*/

// Notice no new.

// Now JavaScript simply calls the function.

// No object is created.

// So:

// this.name = "Amit";

// tries to set name on the current this.

// In strict mode: this === undefined

// which causes: typeError


// Example with methods

/*
function Person(name){
    this.name = name;
    this.sayHello = function(){
        console.log("Hello");
    };
}
*/

// Create:

// let p1 = new Person("Amit");

// After Step 3:

// console.log(p1);

// Why is this bad?

// let p2 = new Person("Rahul")

// Now:

// console.log(p1.sayHello);

// and

// console.log(p1.sayHello);

// both are different function objects.

// Check:

// console.log(p1.sayHello === p2.sayHello); // false

// Output: false

// Two copies in memory


// Prototype solves this

function Person (name){
    this.name = name;

    Person.prototype.sayHello=function(){
        console.log("Hello");
        
    }
}

// Create objects:

let p1 = new Person("Amit");

let p2 = new Person("Rahul");

console.log(p1.sayHello === p2.sayHello);

/*

Structure:

    p1
    ↓
Person.prototype

    p2
    ↓
Person.prototype

*/

// How does JavaScript find sayHello?

// you write : p1.sayHello();

// JavaScript checks:

// Step 1: Does p1 contain sayHello? No

// Step 2: Look in prototype: Person.prototype => Find sayHello() => Execute it.


// Why does Array.prototype.map work?

// Array is also a constructor:

// let arr = [1,2,3,4];

// Internally similar to:

// let arr = new Array(1,2,3,4);

// The array object is linked to:

// Array.prototype which contains map(),filter(),reduce(),push(), pop()

// Therefore, arr.map() works


// Ultra Advanced Practice

// 1. Build custom Array.prototype.map.

Array.prototype.myMap=function(callback){
    let result = [];
    for(let i=0; i<this.length;i++){
       let mappedValue = callback(this[i],i,this);
       result.push(mappedValue);
    }
    return result;
}

let arr = [1,2,3,4,5];

let doubled = arr.myMap((num)=>{return num*2});

console.log(doubled);

// 2. Build custom Array.prototype.filter.

Array.prototype.myFilter = function(callback){
    let result = [];
    for(let i=0; i<this.length; i++){
        if(callback(this[i],i,this)){
            result.push(this[i])
        }
        
    }
    return result;
}

let even = arr.myFilter((num)=>{return num%2==0});

console.log(even);

// 3. Build custom Array.prototype.reduce.

Array.prototype.myReduce = function(callback,initialValue){
    let accumulator = 0;
    for(let i=0;i<this.length; i++){
        accumulator = callback(accumulator,this[i],i,this,initialValue)
    }
    return accumulator;
};

let sum = arr.myReduce((sum,value)=>{return sum+value},0);

console.log(sum);

// 4. Implement deep clone function.

function deepClone(value){
    if(value === null || typeof value !== "object"){ // 1: user -> false || false -> false 1RC: false || true -> true 2RC : false || true -> true 
                                                    // 3RC: false || false -> false 3.1RC: false || true -> true 3.2RC: false || true -> true
        return value;  // 1RR: "Amit" // 2RR: 28 // 3.1RR: "Bhubaneswar" // 3.2RR: "Odisha"
    }
    let clone = Array.isArray(value) ? [] : {}; // clone = {} 1RC: clone = {name : "Amit"} 2RC: clone = {name : "Amit", age : 28}  
                                                // 3RC: clone =  {name : "Amit", age : 28, address: {}}  
                                                // 3.1 RC: clone = {name : "Amit", age : 28, address: {city: "Bhubaneswar"}}
                                                // 3.2 RC : clone = {name : "Amit", age : 28, address: {city: "Bhubaneswar", state: "Odisha"}}

    for(key in value){ // 1: name
        clone[key] = deepClone(value[key]); // 1: clone[name] = deepClone(user[name]) -> clone[name] = deepClone("Amit") -> clone[name] = "Amit"
    }                                       // 2 : clone[age] = deepClone(user[age]) -> clone[age] = deepClone(28) -> clone[age] = 28
                                        // 3 : clone[address] = deepClone(user[address]) -> clone[address] = deepClone({city:"Bhubaneswar, state: "Odisha"})
                                        // -> 3.1: clone[city] = deepClone(address[city]) -> clone[city] = deepClone("Bhubaneswar") -> clone[city] = "Bhubaneswar"
                                        // -> 3.2: clone[state] = deepClone(address[state]) -> clone[state] = deepClone("Odisha") -> clone[state] = "Odisha"
                                        // returns clone[address] // then breaks the loop and outer loop and return the final clone
    return clone; // return clone
}


let user = {
    name: "Amit",
    age: 28,
    address: {
        city: "Bhubaneswar",
        state: "Odisha"
    }
};

let copy1 = deepClone(user);

copy1.address.city = "Mumbai";

console.log(user.address.city); // Bhubaneswar
console.log(copy1.address.city); // Mumbai

let data = {
    numbers: [1, 2, [3, 4]]
};

let copy2 = deepClone(data);

copy2.numbers[2][0] = 99;

console.log(data.numbers[2][0]); // 3
console.log(copy2.numbers[2][0]); // 99

// 5. Create student management system.

/*

Problem Statement: Engineering College Student Management System

Build a Student Management System for an engineering college that can manage student records, academics, attendance, and placement eligibility.

A. Requirements:

Student Details

Each student should have:
    - Student ID
    - Name
    - Branch
    - Year
    - CGPA
    - Attendance Percentage

B. Functional Requirements

1. Add Student - Add a new student to the system -> addStudent(101, "Amit", "CSE", 4, 8.5, 85);
2. View All Students - Display all students ->  viewStudents();
3. Find Student by ID - Search and return a student -> findStudent(101);
4. Update Student CGPA -> updateCGPA(101, 9.1);
5. Update Attendance -> updateAttendance(101, 90);
6. Delete Student -> deleteStudent(101);
7. Get Average CGPA -> getAverageCGPA();
8. Get Topper - Return the student with highest CGPA -> getTopper();
9. Placement Eligibility - Criteria: CGPA ≥ 7 and Attendance ≥ 75% -> getPlacementEligibleStudents();
10. Branch Wise Student Count -> getBranchWiseCount();
    Expected:
    {
        CSE: 10,
        IT: 8,
        Mechanical: 5
    }

*/

// Code Implementation

let students = [];

function addStudent(studentName, branch, year, cgpa, attendance){
    let student = students.find((classroom)=>{return classroom.studentName === studentName});
    if(student){
        return `${studentName} already exists`;
    }else{
        students.push({id:students.length+100,studentName,branch,year,cgpa,attendance});
        return `${studentName} added as a Student`;
    }
}



function findStudent(id){
    let student = students.find((classroom)=>{return classroom.id === id});
    if(!student){
        return `Student not found`;
    }else{
            return `
            Student's Details
            =============================================
            Name        : ${student.studentName}
            ID          : ${student.id}
            Branch      : ${student.branch}
            Year        : ${student.year}
            CGPA        : ${student.cgpa}
            Attendance  : ${student.attendance}
            =============================================
            `
    }
}

function updateCGPA(id,updated_cgpa){
    let student = students.find((classroom)=>{return classroom.id === id});
    if(!student){
        return `Student not found`;
    }else{
        let old_cgpa = student.cgpa;
        student.cgpa = updated_cgpa;
        return `${student.studentName} CGPA has been updated from ${old_cgpa} to ${updated_cgpa}`;
    }
}

function updateAttendance(id,updated_attendance){
    let student = students.find((classroom)=>{return classroom.id === id});
    if(!student){
        return `Student not found`;
    }
    let old_attendance = student.attendance;
    student.attendance = updated_attendance;
    return `${student.studentName} attendance has been updated from ${old_attendance} to ${updated_attendance}`;
    
}

function deleteStudent(id){
    let student = students.find((classroom)=>{return classroom.id === id});
    if(!student){
        return `Student not found`;
    }else{
        students = students.filter((classroom)=>{return classroom.id !== id});
        return `${student.studentName} deleted successfully`
    }
}

function getAverageCGPA(){
    if(students.length===0){
        return `No Students Found`
    }
    let sum = students.reduce((sum,pointer)=>{return sum+pointer.cgpa},0);
    let average = sum/students.length;
    return `Average CGPA of students is ${average.toFixed(2)}`;
}

function getTopper(){
    if(students.length===0){
    return `No Students Found`
    }
    let topper =  students.reduce((topper,student)=>(topper.cgpa > student.cgpa) ? topper : student);
    
    return `${topper.studentName} is the topper with highest CGPA of ${topper.cgpa}` 
}

function getPlacementEligibleStudents(){
console.log(`        
    Eligible for Placement Students
    ===============================
    `);

let eligible =  students.filter((student)=>student.cgpa >= 7 && student.attendance >=75);
   return eligible.map((shortlist)=>{
        return `
        ${shortlist.id}. ${shortlist.studentName} - ${shortlist.cgpa}
        `
    }).join("\n")
}

function getBranchWiseCount(){
    return students.reduce((count,students)=>{
        count[students.branch] = (count[students.branch] || 0) + 1;
        return count;
    },{});
}

function viewStudents(){
    console.log(students);
    
}

addStudent("Amit Swain", "CSE", 4, 8.7, 85);
addStudent("Rahul Sharma", "Mechanical", 3, 7.2, 78);
addStudent("Priya Patel", "IT", 4, 9.1, 92);
addStudent("Neha Verma", "Civil", 2, 8.0, 80);
addStudent("Arjun Singh", "ECE", 4, 6.9, 74);

addStudent("Sneha Das", "CSE", 3, 8.5, 88);
addStudent("Rohan Mishra", "Mechanical", 2, 7.8, 82);
addStudent("Pooja Gupta", "IT", 1, 9.3, 95);
addStudent("Vikram Nair", "ECE", 4, 7.0, 76);
addStudent("Anjali Roy", "Civil", 3, 8.2, 84);

addStudent("Karan Yadav", "CSE", 2, 6.5, 70);
addStudent("Meera Joshi", "IT", 4, 9.0, 91);
addStudent("Siddharth Jain", "Mechanical", 4, 7.6, 79);
addStudent("Nikita Sahu", "ECE", 1, 8.4, 87);
addStudent("Abhishek Kumar", "Civil", 2, 6.8, 72);

addStudent("Shreya Mohanty", "CSE", 3, 9.4, 96);
addStudent("Aditya Rao", "IT", 4, 8.1, 83);
addStudent("Tanya Kapoor", "ECE", 2, 7.7, 81);
addStudent("Manish Tiwari", "Mechanical", 1, 6.2, 68);
addStudent("Ritika Bose", "Civil", 4, 8.8, 90);

addStudent("Deepak Reddy", "CSE", 2, 7.3, 77);
addStudent("Ishita Sen", "IT", 3, 9.5, 97);
addStudent("Harsh Vardhan", "ECE", 4, 8.6, 86);
addStudent("Komal Agarwal", "Mechanical", 3, 7.1, 75);
addStudent("Yash Patil", "Civil", 1, 6.9, 73);

console.log(getBranchWiseCount());

console.log(findStudent(100));
console.log(findStudent(105));
console.log(findStudent(124));

console.log(updateCGPA(100, 9.6));
console.log(updateCGPA(110, 7.2));

console.log(updateAttendance(103, 88));
console.log(updateAttendance(120, 82));

console.log(deleteStudent(124));
console.log(deleteStudent(110));

console.log(getAverageCGPA());

console.log(getTopper());

console.log(getPlacementEligibleStudents());


// 6. Create library management system.

/*
A Library Management System is a very common JavaScript OOP interview question because it tests:

    - Objects
    - Arrays
    - Methods
    - Classes
    - CRUD operations
    - Business logic

Requirements
    - Add Book
    - Remove Book
    - Issue Book
    - Return Book
    - View Books
*/

class library {
    constructor(){
        this.books = [];
        this.nexId = 1;
    }

    addBook(bookTitle,bookDescription, bookAuthour){
        let book = this.books.find((lib)=>lib.bookTitle == bookTitle);
        if(book){
            return `${book.bookTitle} has been already added.`;
        }
        this.books.push({id:this.nexId++,bookTitle,bookDescription,bookAuthour,isIssuedBook:false});
        return `${bookTitle} added successfully.`;
    }

    removeBook(id){
        let book = this.books.find((lib)=>lib.id===id);
        if(!book){
            return `Book not found`;
        }
        this.books = this.books.filter((lib)=>lib.id!==id);
        return `${book.bookTitle} has been removed successfully.`;
    }

    issueBook(id){
        let book = this.books.find((lib)=>lib.id===id);
        if(!book){
            return `Book not found`;
        }
        if(book.isIssuedBook){
            return `${book.bookTitle} has already been issued.`;
        }
        book.isIssuedBook = true;
        return `${book.bookTitle} has been issued successfully.`;
    }

    returnBook(id){
        let book = this.books.find((lib)=>lib.id===id);
        if(!book){
            return `Book not found`;
        }
        if(!book.isIssuedBook){
            return `${book.bookTitle} was not issued.`;
        }
        book.isIssuedBook = false;
        return `${book.bookTitle} has been returned successfully.`
    }

    showBooks(){
        this.books.forEach(book=>{
            console.log(`${book.id}. ${book.bookTitle} - ${book.bookAuthour} : ${book.bookDescription}`);
            
        })
    }
}

const lib = new library();

// Test Case 1: Add First Book
console.log(
    lib.addBook(
        "Atomic Habits",
        "Self Help",
        "James Clear"
    )
);

// Test Case 2: Add Multiple Books
console.log(
    lib.addBook(
        "Rich Dad Poor Dad",
        "Finance",
        "Robert Kiyosaki"
    )
);

console.log(
    lib.addBook(
        "The Alchemist",
        "Novel",
        "Paulo Coelho"
    )
);

// Test Case 3: Duplicate Book
console.log(
    lib.addBook(
        "Atomic Habits",
        "Self Help",
        "James Clear"
    )
);

// Test Case 4: Show Books
lib.showBooks();

// Test Case 5: Issue Existing Book
console.log(
    lib.issueBook(1)
);

// Test Case 6: Issue Same Book Again
console.log(
    lib.issueBook(1)
);

// Test Case 7: Issue Non Existing Book
console.log(
    lib.issueBook(100)
);

// Test Case 8: Return Issued Book
console.log(
    lib.returnBook(1)
);

// Test Case 9: Return Same Book Again
console.log(
    lib.returnBook(1)
);

// Test Case 10: Return Non Existing Book
console.log(
    lib.returnBook(100)
);

// Test Case 11: Remove Existing Book
console.log(
    lib.removeBook(2)
);

// Test Case 12: Remove Same Book Again
console.log(
    lib.removeBook(2)
);

// Test Case 13: Remove Non Existing Book
console.log(
    lib.removeBook(999)
);

// Test Case 14: Verify Books After Removal &
lib.showBooks();

// Test Case 15: Verify Unique IDs After Deletion
console.log(
    lib.addBook(
        "Deep Work",
        "Productivity",
        "Cal Newport"
    )
);

lib.showBooks();

// Test Case 16: Empty Library
const emptyLib = new library();

console.log(emptyLib.removeBook(1));
console.log(emptyLib.issueBook(1));
console.log(emptyLib.returnBook(1));

// Test Case 17: Invalid IDs
console.log(lib.issueBook(-1));
console.log(lib.returnBook(-1));
console.log(lib.removeBook(-1));

// Test Case 18: Full Flow
const testLib = new library();

console.log(testLib.addBook("Book A", "Desc", "Author"));
console.log(testLib.issueBook(1));
console.log(testLib.returnBook(1));
console.log(testLib.removeBook(1));
console.log(testLib.issueBook(1));

// Other Edge cases to be handled
testLib.addBook("", "", "");
testLib.addBook(null, null, null);
testLib.addBook(undefined, undefined, undefined);

testLib.issueBook(null);
testLib.returnBook(undefined);
testLib.removeBook("abc");

testLib.showBooks()

// 7. Create expense tracker logic.

let expenses = [];
let currentId = 1;

function addExpense(title,amount,category){
    expenses.push({id:(Date.now() + currentId++),title,amount,category});
}

function getTotalExpense(){
    return expenses.reduce((total,expense)=>total+expense.amount,0);
}

function getExpenseByCategory(category){
    return expenses.filter((expense) => expense.category === category);
}

function deleteExpense(id){
    const index = expenses.findIndex((expense)=>expense.id === id);
    if(index!==-1) return expenses.splice(index,1);
}


addExpense(
  "Pizza",
  500,
  "Food"
);

addExpense(
  "Movie",
  300,
  "Entertainment"
);

addExpense(
  "Burger",
  200,
  "Food"
);

console.log(expenses);

console.log(
  getTotalExpense()
);

console.log(
  getExpenseByCategory(
    "Food"
  )
);

const deleteExpenseFromExpenses = expenses[0].id;
deleteExpense(deleteExpenseFromExpenses);
console.log(deleteExpenseFromExpenses);


// 8. Build inventory management system.

let inventory = [];

let nextInventoryId = 1;

function addProducts(name,quantity,price){
    inventory.push({
        id:Date.now() + nextInventoryId++,
        name,
        quantity,
        price
    })
}


function getAllProducts(){
  inventory.forEach(product => {
        console.log(` 
            ----------------------------------
            Product Name:     ${product.name}
            Product Price:    ₹${product.price}
            Product Quantity: ${product.quantity}
            `);
    });
}


function updateQuantity(id,quantity){
    let product = inventory.find((product)=>product.id === id);

    if(!product) return `Product not found`;
    
    product.quantity = quantity;
}

function deleteProduct(id){
    let productIndex = inventory.findIndex((product)=>product.id === id);

    if(productIndex!==-1) return inventory.splice(productIndex,1);
}


function getTotalValue(){
   return inventory.reduce((total,product)=>total + (product.price * product.quantity),0);
}



addProducts(
  "Laptop",
  2,
  50000
);

addProducts(
  "Mouse",
  10,
  500
);

addProducts(
  "Keyboard",
  5,
  1500
);

getAllProducts();

console.log(
  getTotalValue()
);