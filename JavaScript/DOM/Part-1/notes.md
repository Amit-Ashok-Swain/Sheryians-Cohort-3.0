# DOM Day 1: Browser, Window Object, DOM, BOM & Web APIs

Before learning JavaScript, you must understand **where JavaScript runs**.

---

# 1. Browser Architecture

When you open a website:

```text
Browser
│
├── Window Object (Global Object)
│
├── DOM (Document Object Model)
│
├── BOM (Browser Object Model)
│
└── Web APIs
```

Everything starts from the **Window Object**.

---

# 2. Window Object

The **Window Object** is the global object created by the browser.

Think of it as the **boss of everything inside the browser tab**.

```text
Window
│
├── document
├── location
├── history
├── navigator
├── localStorage
├── sessionStorage
├── alert()
├── prompt()
├── fetch()
├── setTimeout()
└── console
```

---

## Example

```js
console.log(window);
```

Output:

```js
Window {...}
```

---

## Why can we directly use alert()?

Because:

```js
window.alert("Hello");
```

and

```js
alert("Hello");
```

are exactly the same.

The browser automatically assumes `window`.

---

# 3. Global Scope

When you create variables using `var`:

```js
var name = "Amit";

console.log(window.name);
```

Output:

```js
Amit
```

Because `var` attaches to the window object.

---

# Browser Hierarchy

```text
Window
│
├── DOM
│
├── BOM
│
└── Web APIs
```

Let's understand each.

---

# 4. DOM (Document Object Model)

DOM represents your HTML page as JavaScript objects.

Example:

```html
<html>
<body>
    <h1>Hello</h1>
</body>
</html>
```

Browser converts it into:

```text
Document
│
└── html
     │
     └── body
           │
           └── h1
                │
                └── "Hello"
```

---

## DOM Hierarchy

```text
Window
│
└── Document
     │
     ├── html
     │
     ├── head
     │
     │   ├── title
     │   ├── meta
     │   └── link
     │
     └── body
          │
          ├── div
          ├── p
          ├── img
          ├── form
          └── button
```

---

## DOM Object

```js
console.log(document);
```

Output:

```js
#document
```

---

## Common DOM Methods

### Select Element

```js
document.getElementById()
document.getElementsByClassName()
document.getElementsByTagName()

document.querySelector()
document.querySelectorAll()
```

---

### Create Element

```js
document.createElement()
```

---

### Remove Element

```js
element.remove()
```

---

### Modify Content

```js
element.innerText
element.innerHTML
```

---

### Modify Style

```js
element.style.color
```

---

# 5. BOM (Browser Object Model)

BOM allows JavaScript to interact with browser features.

---

## BOM Hierarchy

```text
Window
│
├── navigator
├── location
├── history
├── screen
├── localStorage
├── sessionStorage
└── console
```

---

# Location Object

Current URL information.

```js
console.log(location.href);
```

Output:

```text
https://google.com
```

---

## Redirect

```js
location.href = "https://github.com";
```

---

# Navigator Object

Browser information.

```js
console.log(navigator.userAgent);
```

Output:

```text
Chrome...
```

---

# History Object

Browser history.

```js
history.back();
history.forward();
```

---

# Screen Object

User screen details.

```js
console.log(screen.width);
console.log(screen.height);
```

---

# Local Storage

Stores data permanently.

```js
localStorage.setItem("name", "Amit");
```

Get Data:

```js
localStorage.getItem("name");
```

Delete:

```js
localStorage.removeItem("name");
```

---

# Session Storage

Stores data until browser tab closes.

```js
sessionStorage.setItem("user","Amit");
```

---

# 6. Web APIs

Web APIs are provided by the browser.

They are **not part of JavaScript itself**.

JavaScript can use them through the browser.

---

## Web API Hierarchy

```text
Window
│
└── Web APIs
     │
     ├── setTimeout
     ├── setInterval
     ├── fetch
     ├── geolocation
     ├── WebSocket
     ├── Clipboard
     ├── Notification
     ├── Audio
     ├── Video
     ├── Canvas
     ├── Drag & Drop
     ├── MutationObserver
     ├── IntersectionObserver
     └── Event APIs
```

---

# Timer APIs

## setTimeout

```js
setTimeout(() => {
    console.log("Hello");
}, 2000);
```

Runs once after 2 seconds.

---

## setInterval

```js
setInterval(() => {
    console.log("Running");
}, 1000);
```

Runs repeatedly.

---

# Fetch API

Used for API calls.

```js
fetch("https://api.example.com/users")
    .then(res => res.json())
    .then(data => console.log(data));
```

---

# Geolocation API

Get user's location.

```js
navigator.geolocation.getCurrentPosition(
    (position) => {
        console.log(position.coords.latitude);
    }
);
```

---

# Clipboard API

Copy text.

```js
navigator.clipboard.writeText("Hello");
```

---

# Notification API

Browser notifications.

```js
Notification.requestPermission();
```

---

# Canvas API

Drawing on screen.

```html
<canvas id="canvas"></canvas>
```

```js
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
```

---

# WebSocket API

Real-time communication.

```js
const socket = new WebSocket("ws://localhost:3000");
```

Used in:

* WhatsApp
* Chat apps
* Stock market apps
* Gaming

---

# Event APIs

Handle user actions.

```js
button.addEventListener("click", () => {
    console.log("Clicked");
});
```

---

# Complete Browser Architecture

```text
Browser
│
└── Window (Global Object)
     │
     ├── DOM
     │    │
     │    ├── document
     │    ├── elements
     │    ├── nodes
     │    ├── attributes
     │    └── events
     │
     ├── BOM
     │    │
     │    ├── navigator
     │    ├── location
     │    ├── history
     │    ├── screen
     │    ├── localStorage
     │    └── sessionStorage
     │
     └── Web APIs
          │
          ├── fetch
          ├── setTimeout
          ├── setInterval
          ├── geolocation
          ├── WebSocket
          ├── clipboard
          ├── notification
          ├── canvas
          ├── audio/video
          └── events
```

### Interview Answer (2 Lines)

> The **Window Object** is the global object provided by the browser. It contains the **DOM (for HTML manipulation)**, **BOM (for browser interaction)**, and **Web APIs (like fetch, setTimeout, geolocation, WebSocket, etc.)**, which allow JavaScript to interact with the browser environment.

