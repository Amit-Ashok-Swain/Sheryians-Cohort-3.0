import {num,sum} from "./main.js"

console.log("Real DOM",window);
console.log("Virtual DOM ->",React);

console.log("--------------------------------------------------");

const h1 = document.createElement('h1');
h1.textContent = "Hi! I'm H1 Element created by Real DOM";

const reactH1 = React.createElement("h1",{class:"react-h1"},"Hi! I'm H1 Element created by Virtual DOM");

const reactH12 = React.createElement("h1",null,React.createElement("span",{},"Hi! I'm child Span Element of H1 Element created by DOM without attributes"));

const reactH13 = React.createElement("div",{},React.createElement("h1",{},React.createElement("span",{},"I am span")));

const reactH14 = React.createElement("div",{class:"adding-two-elements"},
    [React.createElement("h1",{},"I'm H1 in React Div"),
        React.createElement("h2",{},"I'm H2 in React Div")
    ]);

console.log(reactH1);

console.log(reactH12);

console.log(reactH13);


document.body.append(h1);

// document.body.append(reactH1); // [object Object]

// const selectRootDiv = document.querySelector("#root");

// const reactRoot = ReactDOM.createRoot(selectRootDiv);

// reactRoot.render(reactH12);

const selectRootDiv = document.querySelector("#root");

const reactRoot = ReactDOM.createRoot(selectRootDiv);

reactRoot.render(reactH14);

// ES Module

console.log(num);

let sumResult = sum(35,45);

console.log(sumResult);


