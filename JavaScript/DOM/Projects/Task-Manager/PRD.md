# Product Requirements Document (PRD)

# DOM Explorer: Interactive Task Manager

## Version

1.0

## Author

Amit Swain

## Project Type

Frontend Web Application (Vanilla JavaScript)

---

# 1. Product Overview

The Interactive Task Manager is a browser-based application built using HTML, CSS, and Vanilla JavaScript.

The application allows users to create, edit, complete, and delete tasks while demonstrating fundamental DOM concepts including DOM Manipulation, Event Handling, Event Delegation, Event Propagation, Attributes vs Properties, and Browser Rendering Pipeline concepts.

The project serves both as a productivity tool and an educational demonstration of core JavaScript DOM APIs.

---

# 2. Problem Statement

Most beginners understand JavaScript syntax but struggle to apply DOM concepts in real-world projects.

This project bridges that gap by providing practical implementation of:

* Dynamic DOM Creation
* Event Handling
* Event Delegation
* Event Bubbling
* Event Capturing
* Browser Rendering Pipeline Concepts

---

# 3. Goals

### Primary Goals

* Build a fully interactive task manager
* Demonstrate DOM API usage
* Practice event handling patterns
* Understand browser rendering concepts

### Learning Goals

* Understand DOM Tree creation
* Understand CSSOM generation
* Understand Render Tree generation
* Learn Event Propagation
* Learn Event Delegation

---

# 4. Target Users

### Primary Users

* JavaScript Beginners
* Frontend Development Students
* Sheryians Cohort Students

### User Persona

Name: Amit

Age: 28

Goal:
Learn DOM Manipulation and Event Handling through a real-world project.

Pain Points:

* Difficulty understanding DOM APIs
* Confusion around Event Bubbling
* Confusion around Attributes vs Properties

---

# 5. User Stories

### Task Creation

As a user,
I want to create a task,
So that I can manage my work.

### Task Editing

As a user,
I want to edit an existing task,
So that I can update incorrect information.

### Task Completion

As a user,
I want to mark a task complete,
So that I can track progress.

### Task Deletion

As a user,
I want to remove tasks,
So that I can keep my task list clean.

### Theme Switching

As a user,
I want to switch themes,
So that I can use the application comfortably.

---

# 6. Functional Requirements

## FR-1 Task Creation

### Inputs

* Task Title
* Task Category

### Action

User clicks Add Task.

### Expected Result

A new task card is dynamically generated and displayed.

### DOM APIs

```javascript
createElement()
createTextNode()
append()
appendChild()
```

---

## FR-2 Task Card Structure

Each task card must contain:

```html
<div class="task-card"
     data-id=""
     data-status="pending"
     data-category="">
</div>
```

### Required Attributes

* data-id
* data-status
* data-category

---

## FR-3 Edit Task

User clicks Edit button.

### Expected Result

Task title becomes editable.

User can save updated value.

---

## FR-4 Complete Task

User clicks Complete button.

### Expected Result

* Status changes to completed
* Visual styling changes
* data-status updates

Example:

```html
data-status="completed"
```

---

## FR-5 Delete Task

User clicks Delete button.

### Expected Result

Task card removed from DOM.

DOM API:

```javascript
remove()
```

---

## FR-6 Theme Toggle

User switches theme.

### Expected Result

Application changes between:

* Light Mode
* Dark Mode

### APIs Used

```javascript
classList
dataset
setAttribute()
```

Example:

```html
<body data-theme="dark">
```

---

## FR-7 Event Handling

Use event listeners for:

* Add Task
* Edit Task
* Complete Task
* Delete Task

API:

```javascript
addEventListener()
```

---

## FR-8 Event Delegation

Instead of multiple listeners:

```javascript
taskContainer.addEventListener()
```

Single listener handles:

* Edit
* Delete
* Complete

Using:

```javascript
event.target
```

---

## FR-9 Event Propagation Demo

Create:

```html
Grandparent
 └ Parent
    └ Child Button
```

### Demonstrate Bubbling

Output:

```text
Child
Parent
Grandparent
```

### Demonstrate Capturing

Output:

```text
Grandparent
Parent
Child
```

---

## FR-10 Browser Rendering Pipeline Section

Create visual representation for:

```text
HTML
 ↓
Parsing
 ↓
Tokenization
 ↓
DOM Tree

CSS
 ↓
CSSOM Tree

DOM + CSSOM
 ↓
Render Tree
```

---

## FR-11 Attributes vs Properties Demo

Demonstrate:

```javascript
input.value
```

vs

```javascript
input.getAttribute("value")
```

### Explanation

Property:

Reflects current value.

Attribute:

Reflects original HTML value.

---

# 7. Bonus Features

### Task Search

Search tasks by title.

### Category Filter

Filter tasks by category.

### Task Counters

* Completed Count
* Pending Count

### Clear All Tasks

Remove every task.

### Local Storage

Persist tasks after page refresh.

### Document Fragment

Optimize rendering while creating multiple tasks.

---

# 8. Non-Functional Requirements

### Performance

* UI updates within 100ms
* Smooth DOM manipulation

### Usability

* Beginner-friendly interface
* Responsive layout

### Maintainability

* Modular JavaScript
* Clean folder structure

### Accessibility

* Proper labels
* Semantic HTML
* Keyboard accessibility

---

# 9. Data Model

## Task Object

```javascript
{
  id: 1,
  title: "Complete Assignment",
  category: "Study",
  status: "pending"
}
```

---

# 10. Success Metrics

Project will be considered successful if:

✅ User can create tasks

✅ User can edit tasks

✅ User can delete tasks

✅ User can complete tasks

✅ Theme switching works

✅ Event Delegation implemented

✅ Bubbling and Capturing demonstrated

✅ Browser Rendering Pipeline visualized

✅ Attributes vs Properties demonstrated

---

# 11. Tech Stack

Frontend:

* HTML5
* CSS3
* Vanilla JavaScript

Deployment:

* GitHub Pages
* Netlify
* Vercel

Version Control:

* Git
* GitHub

---

# 12. Future Enhancements

* Due Dates
* Task Priority
* Drag and Drop Reordering
* Task Sorting
* User Authentication
* Cloud Storage
* Notifications
* Progressive Web App (PWA)

---

# Expected Deliverable

A production-ready Task Manager Application demonstrating advanced DOM concepts and Browser Rendering Pipeline understanding using only Vanilla JavaScript.
