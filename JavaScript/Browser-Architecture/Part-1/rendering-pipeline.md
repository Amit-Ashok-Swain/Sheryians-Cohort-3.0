# Browser Rendering Pipeline

Whenever you open a website, the browser doesn't directly display HTML on the screen.

It goes through a series of steps called the **Rendering Pipeline**.

```text
HTML
 ↓
DOM
 ↓
CSSOM
 ↓
Render Tree
 ↓
Layout (Reflow)
 ↓
Paint (Repaint)
 ↓
Compositing
 ↓
Screen
```

---

# Example HTML

```html
<!DOCTYPE html>
<html>
<head>
  <style>
    h1 {
      color: red;
      font-size: 40px;
    }
  </style>
</head>

<body>
  <h1>Hello Amit</h1>
</body>
</html>
```

Now let's see what the browser does.

---

# Step 1: Parse HTML → Create DOM

Browser receives HTML.

```html
<body>
  <h1>Hello Amit</h1>
</body>
```

Browser reads it character by character.

```text
<
body
>
<
h1
>
Hello Amit
</h1>
</body>
```

Then converts it into a tree.

---

## DOM (Document Object Model)

```text
Document
│
└── html
     │
     └── body
          │
          └── h1
               │
               └── "Hello Amit"
```

Every HTML tag becomes an object.

```js
document.body
document.querySelector("h1")
```

work because of this DOM tree.

---

## Important

DOM contains:

```text
Structure only
```

Not styling.

Browser knows:

```text
There is an h1
There is text inside it
```

But doesn't know:

```text
Color
Size
Position
```

yet.

---

# Step 2: Parse CSS → Create CSSOM

Browser now reads CSS.

```css
h1 {
  color: red;
  font-size: 40px;
}
```

Creates another tree.

---

## CSSOM (CSS Object Model)

```text
Stylesheet
│
└── h1
     │
     ├── color: red
     └── font-size: 40px
```

CSSOM stores all styling rules.

---

## Why CSSOM?

Browser needs answers like:

```text
What color should h1 be?
What font size?
What margin?
What display type?
```

All these are stored in CSSOM.

---

# DOM vs CSSOM

DOM

```text
What exists?
```

CSSOM

```text
How should it look?
```

---

# Step 3: Create Render Tree

Now browser combines:

```text
DOM
+
CSSOM
```

to create:

```text
Render Tree
```

---

## Example

DOM

```text
body
 │
 └── h1
```

CSSOM

```text
h1
 │
 ├── color:red
 └── font-size:40px
```

Render Tree

```text
body
 │
 └── h1
      │
      ├── text: Hello Amit
      ├── color:red
      └── font-size:40px
```

---

## Important Interview Question

### Does Render Tree include hidden elements?

```html
<div style="display:none">
   Hidden
</div>
```

No.

Because:

```text
display:none
```

doesn't participate in rendering.

So it exists in DOM.

But not in Render Tree.

---

## Example

DOM

```text
body
 ├── h1
 └── div(display:none)
```

Render Tree

```text
body
 └── h1
```

Hidden div removed.

---

# Step 4: Layout (Reflow)

Now browser knows:

```text
Element exists
Style exists
```

But doesn't know:

```text
Exact position
Exact width
Exact height
```

Layout calculates these.

---

## Layout Calculates

```text
x coordinate
y coordinate
width
height
margin
padding
border
```

---

Example:

```html
<h1>Hello</h1>
```

Browser calculates:

```text
x = 20px
y = 50px

width = 250px
height = 40px
```

Now browser knows where to draw it.

---

## Layout Tree

```text
h1
│
├── x:20
├── y:50
├── width:250
└── height:40
```

---

# Reflow

Whenever layout recalculates:

```text
Reflow
```

occurs.

---

Example:

```js
element.style.width = "500px";
```

Browser must recalculate:

```text
Width
Position
Neighbour positions
```

Again.

That's Reflow.

---

## Expensive Operations

```js
element.style.width = "500px";
element.style.height = "200px";

element.style.padding = "50px";
element.style.margin = "20px";
```

cause Layout/Reflow.

---

# Step 5: Paint (Repaint)

After positions are known:

Browser paints pixels.

---

Paint means:

```text
Color
Text
Background
Border
Shadow
Image
```

onto the screen.

---

Example:

```css
h1 {
 color:red;
 background:black;
}
```

Browser paints:

```text
Red Text
Black Background
```

on pixels.

---

# Repaint

If only appearance changes:

```js
element.style.color = "blue";
```

Browser doesn't recalculate position.

Only repaints.

---

## Repaint Example

```js
element.style.color = "red";
```

Changes:

```text
Color only
```

No layout.

Only repaint.

---

# Reflow vs Repaint

### Reflow

Position changes.

```js
element.style.width = "300px";
```

Browser recalculates:

```text
Width
Height
Position
```

Costly.

---

### Repaint

Only visual changes.

```js
element.style.color = "red";
```

Position unchanged.

Less costly.

---

# Step 6: Compositing

Modern browsers create layers.

Example:

```css
transform: translateX(100px);

opacity: 0.5;
```

Browser puts element on separate layer.

---

```text
Layer 1 → Background
Layer 2 → Header
Layer 3 → Modal
Layer 4 → Animation
```

---

GPU combines layers.

This process is:

```text
Compositing
```

---

# Why Compositing?

Without compositing:

```text
Entire page repaint
```

With compositing:

```text
Only affected layer updates
```

Much faster.

---

# Complete Flow

```text
HTML
 │
 ▼
DOM
 │
 ▼
CSS
 │
 ▼
CSSOM
 │
 ▼
DOM + CSSOM
 │
 ▼
Render Tree
 │
 ▼
Layout
 │
 ▼
Paint
 │
 ▼
Compositing
 │
 ▼
Screen
```

---

# Real Example

Suppose JS runs:

```js
box.style.color = "red";
```

Pipeline:

```text
Paint
↓
Composite
```

Only.

---

Suppose:

```js
box.style.width = "500px";
```

Pipeline:

```text
Layout
↓
Paint
↓
Composite
```

More expensive.

---

Suppose:

```js
document.body.innerHTML += "<div></div>";
```

Pipeline:

```text
DOM Update
↓
Render Tree
↓
Layout
↓
Paint
↓
Composite
```

Most expensive.

---

# Interview Summary

```text
1. HTML → DOM
2. CSS → CSSOM
3. DOM + CSSOM → Render Tree
4. Layout calculates size & position
5. Paint fills pixels
6. Compositing merges layers using GPU
7. Final output displayed on screen
```

### One-line definition

> The browser rendering pipeline is the process of converting HTML, CSS, and JavaScript into visible pixels on the screen through DOM creation, CSSOM creation, Render Tree generation, Layout calculation, Paint, and Compositing.
