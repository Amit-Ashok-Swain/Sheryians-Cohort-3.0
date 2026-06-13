// Console & Basics

// const PromptSync = require("prompt-sync")

/*

// 1. Print "Hello JavaScript" in the console.

console.log("Hello JavaScript");

// 2. Print your name, age, and city using one console.log().

let name = "Amit";
let age = 28;
let city = "Mumbai";

console.log(`My name is ${name}. 
    I'm ${age} years old.
    I live in ${city}.`);

// 3. Print a warning message using console.warn().

console.warn("This is a warning message");

// 4. Print an error message using console.error().

console.error("This is an error message");

// 5. Use console.table() to display an array of 5 numbers.

console.table([1,2,3,4,5]);

*/

// letiables

/*

// 1. Create a letiable called studentName and store your name in it.

let studentName = "Amit";

// 2. Create a letiable age and print it.

let age = 28;

console.log(age);

// 3. Create two letiables and swap their values.

let num1 = 10

let num2 = 15

num1 = num1 + num2 // 25

num2 = num1 - num2 // 10

num1 = num1 - num2

console.log(`The first number is ${num1} and second number is ${num2}`);

// 4. Create a constant letiable for PI and print it.

const PI = 22/7

console.log(PI);

// 5. Declare a letiable without assigning a value and print it.

let declared;

console.log(declared);

// 6. Create a letiable score and increase it by 10.

let score = 0;

score+=10;

console.log(score);

// 7. Create three letiables for first name, last name, and full name.

let firstName = "Amit";

let lastName = "Swain";

let fullName = firstName + " " + lastName;

console.log(fullName);

*/

// Data Types

/*

// 1. Create letiables of type string, number, boolean, null, and undefined.

let str = "Jay Jagannath";

let num = 7

let float = 3.14

let bigNum = 12345678901234567890n

let negative = -99

let exponent = 18e2 // 18 X 10^2 = 1800

let check = true

let notTrue = false

let notExist = null;

let youAssign;

console.log(str);
console.log(num);
console.log(float);
console.log(bigNum);
console.log(negative);
console.log(exponent);
console.log(check);
console.log(notTrue);
console.log(notExist);
console.log(youAssign);

// 2. Check the type of different letiables using typeof.

console.log(typeof(str));
console.log(typeof(num));
console.log(typeof(float));
console.log(typeof(bigNum));
console.log(typeof(negative));
console.log(typeof(exponent));
console.log(typeof(check));
console.log(typeof(check));
console.log(typeof(notTrue));
console.log(typeof(notExist));
console.log(typeof(youAssign));

// 3. Store your mobile number in a letiable and check its type.

let mobileNumber = 8369083160

console.log(typeof(mobileNumber));

// 4. Create a letiable with value null and check its type.

let noValue = null;

console.log(typeof(noValue)); // object

// 5. Create a bigint number and print it.

let bigNumber = 982379827387489273847n

console.log(bigNumber);

*/

// Type Conversion & Coercion

/*

// 1. Convert the string "50" into a number.

let strNum = "50";

let num = Number(strNum);

console.log(num);

// 2. Convert the number 100 into a string.

let numeric = 100;

let stringValue = String(numeric);

console.log(stringValue);

// 3. Convert "true" into a boolean.

let booleanStr = "true";

let boolValue = Boolean(booleanStr);

console.log(boolValue);

// 4. Check the output of:
//      - `"5" + 2`
//      - `"5" - 2`
//      - `true + 1`

console.log("5" + 2); // "52"
console.log("5" - 2); // 3
console.log(true+1); // 2

// 1. Create a letiable with value `"123abc"` and convert it into a number.

let mix = "123abc"

let final = Number(mix);

console.log(final); // NaN

// 2. Use `parseInt()` on `"500px"`

let mix2 = "50px"

let final2 = parseInt(mix2);

console.log(final2);

*/

// Operators

/*

// Add two numbers and print the result.

let num1 = 23;

let num2 = 27;

console.log(num1+num2);

// Find the remainder when 25 is divided by 4.

console.log(25%4);

// Find the square of a number using exponent operator.

console.log(7**2);

// Increment a letiable using ++.

num1 ++;

console.log(num1); // 24

// Decrement a letiable using --.

num2 --;

console.log(num2); // 26

// Use += operator to increase a letiable by 20.

let num3 = 30;

num3+=20;

console.log(num3); // 50

// Compare two numbers using >, <, >=, <=.

let num4 = 12

let num5 = 12

console.log(num4>num5); // false

console.log(num4<num5); // true

console.log(num4>=num5); // true

console.log(num4<=num5); // true

// Check if two values are strictly equal using ===.

console.log(num4===num5);

// Compare "10" and 10 using both == and ===.

console.log("10" == 10); // true

console.log("10" === 10); // false

// Create two boolean letiables and test &&, ||, and !.

let bool1 = true

let bool2 = false

console.log(bool1 && bool2); // false

console.log(bool1 || bool2); // true

*/

// Strings

/*

// Create a string and print its length.

let word = "Lone King";

console.log(word.length); // 9

// Convert a string into uppercase.

console.log(word.toUpperCase());

// Convert a string into lowercase.

console.log(word.toLowerCase());

// Check if a string includes the word "JavaScript".

let word1 = "Hello! JavaScript";

console.log(word1.includes("JavaScript")); // true

// Extract the word "World" from "Hello World".

let word2 = "hello World";

console.log(word2.substring(6));

// Replace "apple" with "mango" in a sentence.

let word3 = "apple a day keeps doctor away!";

console.log(word3.replace("apple","mango"));

// Split "HTML,CSS,JS" into an array.

let word4 = "HTML,CSS,JS";

console.log(word4.split(","));

// Remove extra spaces from a string.

let word5 = "     hello     "

console.log(word5.trim());

// Repeat the word "Hi" 5 times.

console.log("Hi ".repeat(5));

// Print the first character of a string.

let word6 = "chocolate";

console.log(word6.charAt(0));

// Use template literals to print: "My name is Aman and I am 20 years old"

let name = "Aman";

let age = " 20";

console.log(`My name is ${name} and I am ${age} years old`);

*/

// Numbers & Math

/*

// Round 4.7 using Math.round().

console.log(Math.round(4.7)); // 5

// Find the square root of 81.

console.log(Math.sqrt(81)); // 9

// Find the maximum number from 10, 20, 5, 99.

console.log(Math.max(10,20,5,99));

// Generate a random number between 1 and 10.

let choice = Math.floor(Math.random() * ((Math.max(1,10) - Math.min(1,10) + 1)) + Math.min(1,10));

console.log(choice);

// Convert "99.99" into an integer.

console.log(Number("99.99"));

// Check whether 25 is an integer or not.

console.log(Number.isInteger(25));

// Use toFixed(2) on 3.141592.

console.log(3.141592.toFixed(2));

*/

// Conditionals

/*

// Check whether a number is positive or negative.

let num = 0;

if(num>0){
    console.log("Positive");
}else if(num<0){
    console.log("Negative");
}else{
    console.log("It's zero neither positive nor negative");
}

// Check whether a number is even or odd.

let num1 = 7

if(num1%2==0){
    console.log("Number is Even");
}else{
    console.log("Number is Odd");
}

// Check whether a person is eligible to vote.

let age = 17

hasVoterId = false;


if(age>=18){
    if(hasVoterId){
        console.log("Eligible to Vote");
    }else{
        console.log("Apply for Voter Id card");
    }
}else{
    console.log("Not eligible to vote");
}

// Find the largest among two numbers.

let a = 53

let b = 52

if(a>b){
    console.log(`${a} is larger than ${b}`);
}else if(a<b){
    console.log(`${b} is larger than ${a}`);
}else{
    console.log(`${a} is equal to ${b}`);
}

// Find the largest among three numbers.

let c = 51

if(a>b && a>c){
    console.log(`${a} is larger than ${b} and ${c}`);
}else if(b>a && b>c){
    console.log(`${b} is larger than ${a} and ${c}`);
}else{
    console.log(`${b} is larger than ${a} and ${c}`);
}

// Check whether a year is a leap year.

let year = 2004

if(year%400===0 || (year%4===0 && year%100!==0)){
    console.log("It's a leap year");
}else{
    console.log("It's not a leap year");   
}

// Check whether a number is divisible by both 3 and 5.

let num2 = 45

if(num2%3==0 && num2%5==0){
    console.log(`${num2} is divisible by both 3 and 5`);
}

// 8. Create a simple grading system:
//      - 90+ → A
//      - 75+ → B
//      - 50+ → C
//      - below 50 → Fail

let marks = 95

if(marks>=90){
    console.log(`Grade A`);
}else if(marks>=75){
    console.log(`Grade B`);
}else if(marks>=50){
    console.log(`Grade C`);
}else{
    console.log(`Fail`);
}

// Check whether a character is a vowel or consonant.

let char = "b"

let vowels = "aeiou"

if(vowels.includes(char)){
    console.log("It's a vowel");
}else{
    console.log("It's a consonant");
}

// Create a calculator using switch statement.

let operand1 = Number(prompt("Enter first number:"));
let operand2 = Number(prompt("Enter second number:"));
let operator = prompt("Enter operator (+, -, *, /):");

switch(operator){
    case "+":
        console.log(operand1+operand2);
        break;
    case "-":
        console.log(operand1-operand2);
        break;
    case "*":
        console.log(operand1*operand2);
        break;
    case "/":
        if(operand2!=0){
            console.log(operand1/operand2);
        }else{
            console.log("Cannot divide by zero");
        }
        break;
    default:
        console.log("Invalid operator");
    }

  // Print the day name based on a number (1–7).

let day = Number(prompt("Enter number based on day of week from 1 to 7."));

switch(day){
    case 1: console.log("Sunday");
    break;
    case 2: console.log("Monday");
    break;
    case 3: console.log("Tuesday");
    break;
    case 4: console.log("Wednesday");
    break;
    case 5: console.log("Thursday");
    break;
    case 6: console.log("Friday");
    break;
    case 7: console.log("Saturday");
    break;
    default:
        console.log("Invalid Input number"); 
}

// Check whether a username is "admin" and password is "1234".

let username = prompt("Enter your username");

let password = prompt("Enter your password");

if(username === "admin" && password == "1234"){
    console.log("Login Successful");
}else{
    console.log("Invalid Credentials");   
}

*/

// Truthy & Falsy

/*

// Check whether an empty string is truthy or falsy.

if(""){
    console.log("Truthy");   
}else{
    console.log("Falsy");   
}

// Check whether 0 is truthy or falsy.

if(0){
    console.log("Truthy");   
}else{
    console.log("Falsy");   
}

// Check whether [] is truthy or falsy.

if([]){
    console.log("Truthy");   
}else{
    console.log("Falsy");   
}

// Create a variable and print "Valid" if it has a value otherwise print "Invalid".

let check;

if(check){
    console.log("Valid");
}else{
    console.log("Invalid");
}

*/

// Ternary Operator

/*

// Check whether a number is even or odd using ternary operator.

let num1 = 45;

let check = (num1%2===0) ? "Even" : "Odd";

console.log(check);

// Check whether age is above 18 using ternary operator.

let age = 20;

let ageCheck = age>=18 ? "Adult" : "Not an Adult";

console.log(ageCheck);

// Find the greater number between two values using ternary operator.

let num2 = 35

let greatest = num1>num2 ? `${num1} is greater than ${num2}`: `${num2} is greater than ${num1}`

console.log(greatest);

*/

// Mixed Practice Questions

/*

// 1. Create a mini biodata program using variables and template literals.

let name = "Amit Swain";
let age = 27;
let city = "Mumbai";
let profession = "Product Manager";
let hobby = "Coding";

let biodata = `

---------- BIO DATA ----------

Name        : ${name}
Age         : ${age}
City        : ${city}
Profession  : ${profession}
Hobby       : ${hobby}

-----------------------------
`

console.log(biodata);

// 2. Calculate the area of a rectangle.

let length = 30;
let breadth = 50;

let area = length * breadth;

console.log(`The area of rectangle is ${area}sq.m`);

// 3. Calculate the simple interest.

let principal = 450000;
let rateOfInterest = 12.5;
let time = 5;
let months = time*12;

let simpleInterest = (principal * rateOfInterest * time)/100;

console.log(`The Simple of Interest on Principal Amount of ₹${principal} with rate of interest of ${rateOfInterest}% for ${time} years is ₹${simpleInterest}.`);
console.log(`Total amount with Simple Interest is ₹${principal+simpleInterest}`);
console.log(`Monthly Emi comes to be ₹${(principal+simpleInterest)/months}`);

// 4. Convert temperature from Celsius to Fahrenheit.

let celsius = 44;

let fahrenheit = (celsius * (9/5)) + 32;

console.log(`${celsius}°C to Fahrenheit is ${fahrenheit.toFixed(2)}°F`);

// 5. Convert kilometers into meters.

let kilometers = 45.8

let metres = kilometers*1000;

console.log(`${kilometers} KMs is equal to ${metres} metres`);

// 6. Calculate total marks and percentage of 5 subjects.

let english = 89;
let maths = 99;
let physics = 95;
let chemistry = 91;
let electronics = 98;
let computer = 100;

let totalMarks = english + maths + physics + chemistry + electronics + computer;

let percentage = (totalMarks/600)*100;

console.log(`Total Marks secured is ${totalMarks} with percentage of ${percentage.toFixed(2)}%.`);

// 7. Calculate electricity bill based on units consumed.

// 0 – 50 units: ₹2.90 per unit
// 51 – 200 units: ₹4.70 per unit
// 201 – 400 units: ₹5.70 per unit
// Above 400 units: ₹6.10 per unit

let units = 580;

let copyUnit = unit;

let cost = 0;

    if(units === 0 || units<0){
        console.log("Units cannot be negative or zero");
    }else{
        if(units>400){
            let consumed = units - 400;  // 580 - 400 = 180
            cost = cost + (consumed * 6.10); // 180 * 6.10 = 1098
            units = units - consumed;  // 580 - 180 = 400;
            console.log(cost); // 1098
        }
        
        if(units>=201 && units <=400){  
            let consumed = units - 200; // 400 - 200 = 200
            cost = cost + (consumed * 5.70); // 1098 + (200*5.70) = 2238
            units = units - consumed; // 400 - 200 = 200
            console.log(cost); // 2238
        }
        
        if(units>=51 && units <=200){
            let consumed = units - 50; // 200 - 50 = 150
            cost = cost + (consumed * 4.70); // 2238 + (150*4.7) = 2943
            units = units - consumed; // 200 - 150 = 50
            console.log(cost); // 2943
        }
        
        if(units>0 && units<=50){
            cost = cost + (units * 2.90); // 2943 + (50*2.90) = 3088
        }
    }

console.log(`Final Bill of electricity for ${copyUnit} is ₹${cost}`); // 3088


// 8. Create a username generator using first name and birth year.

let firstName = "Amit";

let birthYear = 1998;

let username = `${firstName.toLowerCase()}${birthYear}`;

console.log(`Your username is ${username}`);

// 9. Check whether a string starts with a specific letter.

let string = "Chocolate";

let check = string.toLowerCase().startsWith("c");

console.log(check);


// 10. Count the total characters in a sentence excluding spaces.

let sentence = "Jack and Jill went up the hill";

let noSpaces = sentence.replaceAll(" ","");

let count = 0;

for(let i=1;i<=noSpaces.length;i++) count++;

console.log(`Total characters in sentence "${sentence}" (excluding spaces): ${count}`);

*/


// Logical Thinking Questions

/*

let prompt = require("prompt-sync")();


// 1. Take two numbers and print which one is greater.


let number1 = Number(prompt("Enter the number 1: "));
let number2 = Number(prompt("Enter the number 2: "));

if(number1>number2){
    console.log(`${number1} is greater than ${number2}`);
}else{
    console.log(`${number2} is greater than ${number1}`);
    
}

// 2. Check whether a number lies between 10 and 50.

let number = Number(prompt("Enter the number: "))

if(number>=10 && number<=50){
    console.log(`${number} lies between 10 and 50`);
}else if(number>50){
    console.log(`${number} exceeds the range between 10 and 50`);   
}else{
    console.log(`${number} is too smaller than range`);
}

// 3. Check whether a password length is greater than 8.

let password = prompt("Enter the password: ");

if(password.length>8){
    console.log(`Length of the password is greater than 8`);
}else{
    console.log(`Length of the password is less than 8`);
}

// 4. Check if a person can drive:
    // - age > 18
    // - has license = true

let age = Number(prompt("Enter your age: "));
let hasLicense = prompt("Do you have license? (yes/no): ").toLowerCase();

if(age>=18){
    if(hasLicense == "yes"){
        console.log(`Can drive`);
    }else{
        console.log(`Get the license first`);
    }
}else{
    console.log(`You're underaged`);
}

// 5. Check whether a number is divisible by 2, 3, or both.

let num = Number(prompt("Enter the number: "));

if(num%2===0 && num%3===0){
    console.log(`${num} is divisible by both 2 and 3.`);
}else if(num%2==0){
    console.log(`${num} is divisible by 2`);
}else{
    console.log(`${num} is divisible by 3`);   
}

// 6. Print "Good Morning", "Good Afternoon", or "Good Evening" based on time.

let name = prompt("Enter your name: ")
let hour = new Date().getHours();
console.log(` Hello! ${name}, ${hour<12 ? "Good Morning!" : hour<18 ? "Good Afternoon" : "Good Evening"}`);

// 7. Find whether a number is a multiple of 10.

let n = ("Enter the number: ");
if(n%10==0) console.log(`${n} is the multiple of 10`);
else console.log(`${n} is not the multiple of 10`);


// 8. Create a simple discount calculator.

let price = Number(prompt("Enter the product price: "));
let discount = Number(prompt("Enter the discount (in percentage %): "));

let discountAmount = (price * discount)/100;
let finalAmount = price - discountAmount;

console.log(`Original Price: ₹${price}`);
console.log(`Discounted Price: ₹${discountAmount}`);
console.log(`Final Amount: ₹${finalAmount}`);

// 9. Check whether a product is in stock.

let stock = Number(prompt("Enter the quantity of product in stock: "));

if(stock<=0) console.log(`Product out of stock`);
else if(stock<=5) console.log(`Products are limited in stock! Kindly restock `);
else console.log(`Products are in stock`);

// 10. Calculate final bill after GST.

let amount = Number(prompt("Enter the amount of the bill: "));
let gstPercentage = Number(prompt("Enter the percentage of GST applied to the bill (in %): "));

let gstAmount = (amount * gstPercentage)/100;
let finalBill = amount + gstAmount;

console.log(`
    Bill Amount: ${amount}
    GST Amount: ${gstAmount}
    Final Bill: ${finalBill}
    `);

*/

// Challenge Questions for Beginners

/*

// 1. Generate a random OTP of 4 digits.

let otp = Math.floor(Math.random() * (Math.max(1000,9999) - Math.min(1000,9999)+1)) + Math.min(1000,9999);

console.log(otp);

// 2. Reverse a 3-letter string manually.

let word = "cat";

let reverseWord = "";

let i = word.length;

while(i>0){
    reverseWord = reverseWord + word.charAt(i-1);
    i--;
}

console.log(`Word "${word}" when reverse is "${reverseWord}"`);

// 3. Find the last character of a string.

let str = "Chocolate";

let lastChar = str.charAt(str.length-1)

console.log(`The last character of "${str}" is "${lastChar}`);

// 4. Find the last character of a string.

let fullName = "Amit Ashok Swain";

let uppercaseName = fullName.toUpperCase()

console.log(`String: ${fullName} to Uppercase: ${uppercaseName}`);

// 5. Check whether two strings are equal ignoring case sensitivity.

let string1 = "AMIT";

let string2 = "amit";

if(string1.toLowerCase() === string2.toLowerCase()){
    console.log(`String 1 : ${string1} is equal to String 2 : ${string2}`);
}else{
    console.log(`String 1 : ${string1} is not equal to String 2 : ${string2}`);
}

// 6. Create a simple login validation system.

let prompt = require("prompt-sync")();

let username = prompt("Enter your username: ");
let password = prompt("Enter your password: ");

let storedUsername = "admin";
let storedPassword = "password@123"

if(username === storedUsername && password === storedPassword) console.log("Login Successful!");
else console.log("Invalid Credentials!");

// 7. Find whether a number is a 2-digit or 3-digit number.

let number = Number(prompt("Enter a 2-digit or a 3-digit number: "));

let copyNumber = Math.abs(number);

let count = 0;

while(copyNumber>0){
    count++;
    copyNumber = Math.floor(copyNumber/10);
}

if(count===2) console.log(`${number} is a 2-digit number.`);
else if(count === 3) console.log(`${number} is a 3-digit number.`);
else console.log(`Kindly enter a 2-digit or a 3-digit number only`);

// 8. Create a mini ATM balance checker.

let balance = 557840;

let setPin = 1010;

let pin = Number(prompt("Enter your ATM PIN: "));

if(pin === setPin){
    console.log(`Your account balance is ₹${balance}`);
}else{
    console.log(`Invalid PIN`);
}

// 9. Simulate a traffic light system using switch

let signal = prompt("Enter the traffic light color 🚦 (red,yellow,green): ");

switch(signal.toLowerCase()){
    case "red":
        console.log("Stop 🔴");
        break;
    case "yellow":
        console.log("Get Ready 🟡");
        break;
    case "green":
        console.log("Go 🟢");
        break;
    default:
        console.log("Invalid Traffic Light Color. Kindly enter the 🚥 traffic light color");
}

// 10. Build a small marksheet generator using variables and conditionals.

let studentName = prompt("Enter the student's Name: ");

let english = Number(prompt("Enter the English Subject's marks: "));
let maths = Number(prompt("Enter the Maths Subject's marks: "));
let physics = Number(prompt("Enter the Physics Subject's marks: "));
let chemistry = Number(prompt("Enter the Chemistry Subject's Marks: "));
let computer = Number(prompt("Enter the Computer Subject's Marks: "));
let electronics = Number(prompt("Enter the Electronic Subject's Marks: "));

let totalMarks = english + maths + physics + chemistry + computer + electronics;
let percentage = (totalMarks/600) * 100;
let grade;
let resultStatus;

if(percentage>=90) grade = "A+";
else if(percentage>=80) grade = "A";
else if(percentage>=70) grade = "B+";
else if(percentage>=60) grade = "B";
else if(percentage>=50) grade = "C+";
else if(percentage>=40) grade = "C";
else if(percentage>=35) grade = "D";
else grade = "F";

if(percentage>=35) resultStatus = "Passed";
else resultStatus = "Failed";

console.log(`
========== MARKSHEET ==========
-------------------------------
NAME : ${studentName}
-------------------------------
SCORECARD
-------------------------------
ENGLISH      :    ${english}
MATHS        :    ${maths}
PHYSICS      :    ${physics}
CHEMISTRY    :    ${chemistry}
COMPUTER     :    ${computer}
ELECTRONICS  :    ${electronics}
--------------------------------
TOTAL        :    ${totalMarks}
PERCENTAGE   :    ${percentage.toFixed(2)}
GRADE        :    ${grade}
RESULT       :    ${resultStatus}
---------------------------------
    `);

*/



























































































