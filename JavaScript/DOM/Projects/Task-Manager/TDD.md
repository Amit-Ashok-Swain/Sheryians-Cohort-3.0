# Technical Design Document (TDD)

# DOM Explorer: Interactive Task Manager

Version: 1.0

Author: Amit Swain

---

# 1. System Architecture

```text
User Interface
      │
      ▼
Event Listeners
      │
      ▼
DOM Manipulation Layer
      │
      ▼
Task Data Layer
      │
      ▼
Local Storage (Optional)
```

---

# 2. Project Structure

```text
task-manager/

│
├── index.html
│
├── css/
│   └── style.css
│
├── js/
│   ├── app.js
│   ├── tasks.js
│   ├── theme.js
│   ├── events.js
│   └── storage.js
│
└── README.md
```

---

# 3. DOM Structure

```html
<body>

<header>
 Theme Toggle
</header>

<section class="task-form">

 Task Title Input

 Category Dropdown

 Add Task Button

</section>

<section class="task-container">

 Task Cards

</section>

<section class="event-demo">

 Bubbling Demo

 Capturing Demo

</section>

<section class="render-pipeline">

 Browser Rendering Flow

</section>

</body>
```

---

# 4. Component Design

## Component 1: Task Form

Responsibilities:

* Accept task data
* Validate input
* Submit task

Inputs:

* Task Title
* Category

Output:

* New Task Object

---

## Component 2: Task Container

Responsibilities:

* Render tasks
* Handle delegated events

Methods:

```javascript
renderTask()
updateTask()
deleteTask()
```

---

## Component 3: Theme Manager

Responsibilities:

* Toggle themes
* Persist theme state

Methods:

```javascript
toggleTheme()
applyTheme()
```

---

## Component 4: Event Propagation Module

Responsibilities:

* Demonstrate Bubbling
* Demonstrate Capturing

Methods:

```javascript
showBubbling()
showCapturing()
```

---

# 5. Data Flow

Task Creation

```text
User Input
    ↓
Form Submit
    ↓
Validation
    ↓
Create Task Object
    ↓
Create DOM Elements
    ↓
Append To Container
```

---

Task Deletion

```text
Click Delete
      ↓
Event Delegation
      ↓
Identify Target
      ↓
Remove DOM Node
```

---

Task Completion

```text
Click Complete
       ↓
Update Dataset
       ↓
Update Class
       ↓
Re-render UI
```

---

# 6. Event Delegation Design

Single listener:

```javascript
taskContainer.addEventListener("click", handleTaskActions);
```

Action Detection:

```javascript
if(target.matches(".delete-btn"))

if(target.matches(".edit-btn"))

if(target.matches(".complete-btn"))
```

Benefits:

* Better performance
* Less memory usage
* Easier maintenance

---

# 7. Theme Toggle Design

Initial State:

```html
<body data-theme="light">
```

Toggle:

```javascript
document.body.dataset.theme = "dark";
```

CSS:

```css
[data-theme="dark"] {
 /* dark theme styles */
}
```

---

# 8. Attributes vs Properties Demo

HTML:

```html
<input value="Default Value">
```

JavaScript:

```javascript
console.log(input.getAttribute("value"));
console.log(input.value);
```

Expected Result:

Attribute:

Original HTML value

Property:

Current user-modified value

---

# 9. Browser Rendering Pipeline Section

Flow Visualization:

```text
HTML
 ↓
Parser
 ↓
Tokenization
 ↓
DOM Tree

CSS
 ↓
CSS Parser
 ↓
CSSOM Tree

DOM + CSSOM
 ↓
Render Tree
 ↓
Layout
 ↓
Paint
```

Implementation:

```html
<div class="pipeline-card">
HTML
</div>

<div class="arrow">
↓
</div>

<div class="pipeline-card">
DOM Tree
</div>
```

---

# 10. Local Storage Design

Save:

```javascript
localStorage.setItem(
 "taskManagerData",
 JSON.stringify(tasks)
);
```

Load:

```javascript
JSON.parse(
 localStorage.getItem(
  "taskManagerData"
 )
);
```

---

# 11. Error Handling

Cases:

* Empty task title
* Invalid category
* Missing DOM elements
* Local storage unavailable

Handling:

```javascript
try {
 // logic
}
catch(error){
 console.error(error);
}
```

---

# 12. Future Scalability

Potential Enhancements:

* Due Dates
* Priority Levels
* Drag and Drop
* Sorting
* Backend Integration
* Authentication
* REST API
* Database Storage
