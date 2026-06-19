# Technical Requirements Document (TRD)

# DOM Explorer: Interactive Task Manager

Version: 1.0

Author: Amit Swain

---

# 1. Purpose

This document defines the technical requirements necessary to build the Interactive Task Manager application using HTML, CSS, and Vanilla JavaScript.

The application demonstrates DOM Manipulation, Event Handling, Event Delegation, Event Propagation, and Browser Rendering Pipeline concepts.

---

# 2. Technology Stack

## Frontend

* HTML5
* CSS3
* JavaScript ES6+

## Browser Support

* Chrome (Latest)
* Edge (Latest)
* Firefox (Latest)
* Safari (Latest)

## Deployment

* GitHub Pages

---

# 3. Functional Requirements

## Task Creation

System shall:

* Accept task title
* Accept category selection
* Validate input
* Create task dynamically
* Append task card without page refresh

Required APIs:

```javascript
createElement()
createTextNode()
append()
appendChild()
```

---

## Task Editing

System shall:

* Allow modification of task title
* Update DOM immediately
* Preserve task metadata

Required APIs:

```javascript
replaceWith()
textContent
```

---

## Task Completion

System shall:

* Mark task as completed
* Update task status
* Apply completed styling

Required APIs:

```javascript
classList.add()
dataset
setAttribute()
```

---

## Task Deletion

System shall:

* Remove selected task
* Update UI instantly

Required APIs:

```javascript
remove()
```

---

## Theme Toggle

System shall:

* Support Light Mode
* Support Dark Mode
* Store active theme using dataset

Example:

```html
<body data-theme="dark">
```

Required APIs:

```javascript
classList
dataset
setAttribute()
```

---

## Event Delegation

System shall:

* Attach only one listener to task container
* Handle edit action
* Handle delete action
* Handle complete action

Required APIs:

```javascript
event.target
closest()
matches()
```

---

## Event Propagation

System shall:

* Demonstrate Event Bubbling
* Demonstrate Event Capturing

Expected Outputs:

Bubbling:

Child → Parent → Grandparent

Capturing:

Grandparent → Parent → Child

---

## Browser Rendering Section

System shall display:

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

---

# 4. Data Requirements

## Task Object

```javascript
{
 id: Number,
 title: String,
 category: String,
 status: String
}
```

---

# 5. Local Storage Requirements

(Optional)

Storage Key:

```javascript
"taskManagerData"
```

Data Format:

```javascript
[
 {
  id: 1,
  title: "Learn DOM",
  category: "Study",
  status: "pending"
 }
]
```

---

# 6. Performance Requirements

* Page load under 2 seconds
* DOM updates under 100ms
* No unnecessary event listeners

---

# 7. Security Requirements

* Prevent empty task creation
* Sanitize user input
* Avoid innerHTML for user-generated content

Use:

```javascript
textContent
```

instead of:

```javascript
innerHTML
```

---

# 8. Accessibility Requirements

* Semantic HTML
* Proper form labels
* Keyboard navigation
* Accessible buttons

---

# 9. Code Quality Requirements

* Modular functions
* Meaningful variable names
* Comments for learning concepts
* Consistent formatting

---

# 10. Success Criteria

✓ Task Creation Works

✓ Task Editing Works

✓ Task Deletion Works

✓ Task Completion Works

✓ Event Delegation Implemented

✓ Event Propagation Demonstrated

✓ Theme Toggle Works

✓ Browser Rendering Pipeline Visualized
