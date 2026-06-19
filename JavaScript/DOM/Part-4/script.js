// Types of Events

// Mouse Events 🖱️
// - click → Fires when an element is clicked.
// - dblclick → Fires when an element is double-clicked.
// - mousedown → Fires when a mouse button is pressed.
// - mouseup → Fires when a mouse button is released.
// - mousemove → Fires when the mouse moves.
// - mouseenter → Fires when the mouse enters an element.
// - mouseleave → Fires when the mouse leaves an element.
// - mouseover → Fires when the mouse enters an element or its child.
// - mouseout → Fires when the mouse leaves an element or its child.
// - contextmenu → Fires on right-click.

// Keyboard Events ⌨️
// - keydown → Fires when a key is pressed.
// - keyup → Fires when a key is released.
// Form Events 📝
// - submit → Fires when a form is submitted.
// - change → Fires when an input value changes and loses focus.
// - input → Fires whenever the input value changes.
// - focus → Fires when an element gains focus.
// - blur → Fires when an element loses focus.
// - reset → Fires when a form is reset.

// Window/Document Events 🌐
// - load → Fires when the page and resources finish loading.
// - DOMContentLoaded → Fires when the HTML is fully loaded.
// - resize → Fires when the window size changes.
// - scroll → Fires when the page is scrolled.
// - beforeunload → Fires before the page is closed or refreshed.
// - unload → Fires when the page is unloaded.

// Clipboard Events 📋
// - copy → Fires when content is copied.
// - cut → Fires when content is cut.
// - paste → Fires when content is pasted.

// Drag & Drop Events 🎯
// - dragstart → Fires when dragging starts.
// - drag → Fires while dragging.
// - dragenter → Fires when a draggable enters a drop target.
// - dragover → Fires when dragging over a target.
// - dragleave → Fires when leaving a drop target.
// - drop → Fires when an item is dropped.
// - dragend → Fires when dragging ends.

// Touch Events 📱
// - touchstart → Fires when a finger touches the screen.
// - touchmove → Fires when a finger moves on the screen.
// - touchend → Fires when a finger is lifted.
// - touchcancel → Fires when touch is interrupted.

// Pointer Events ✏️
// - pointerdown → Fires when a mouse, touch, or pen is pressed.
// - pointerup → Fires when a mouse, touch, or pen is released.
// - pointermove → Fires when a pointer moves.
// - pointerenter → Fires when a pointer enters an element.
// - pointerleave → Fires when a pointer leaves an element.
// - pointerover → Fires when a pointer enters an element or child.
// - pointerout → Fires when a pointer leaves an element or child.
// - pointercancel → Fires when pointer interaction is cancelled.

// Focus Events 👀
// - focusin → Fires when an element or child gains focus.
// - focusout → Fires when an element or child loses focus.

// Media Events 🎵
// - play → Fires when media starts playing.
// - pause → Fires when media pauses.
// - ended → Fires when media finishes.
// - volumechange → Fires when volume changes.
// - timeupdate → Fires when playback position changes.
// - loadeddata → Fires when media data is loaded.

// Animation Events 🎨
// - animationstart → Fires when a CSS animation starts.
// - animationiteration → Fires after each animation cycle.
// - animationend → Fires when a CSS animation ends.

// Transition Events 🔄
// - transitionstart → Fires when a CSS transition starts.
// - transitionend → Fires when a CSS transition ends.
// - transitioncancel → Fires when a transition is cancelled.

/*
const start = document.querySelector("button");

// logs event when start button is clicked once or every single time.
start.addEventListener("click",(event)=>{
    console.log(event); // PointerEvent {isTrusted: true, pointerId: 1, width: 1, height: 1, pressure: 0, …}
})

// logs event when keyboard keys are pressed
document.addEventListener("keypress",(event)=>{
    console.log(event); // KeyboardEvent {isTrusted: true, key: '1', code: 'Digit1', location: 0, ctrlKey: false, …}
})

// logs event when start button is triggered or clicked twice
start.addEventListener("dblclick",(event)=>{
    console.log(event); // MouseEvent {isTrusted: true, screenX: 23, screenY: 142, clientX: 23, clientY: 20, …}
})

// logs event when the mouse pointer hovers over the button
start.addEventListener("mouseover",(event)=>{
    console.log(event); // MouseEvent {isTrusted: true, screenX: 14, screenY: 146, clientX: 14, clientY: 24, …}
})

// logs event when the mouse pointer leaves the button when pointed on button.
start.addEventListener("mouseleave",(event)=>{
    console.log(event); // MouseEvent {isTrusted: true, screenX: 43, screenY: 174, clientX: 43, clientY: 52, …}
})

// logs event when the keyboard keys are pressed
document.addEventListener("keydown",(event)=>{
    console.log(event);
})

// logs event when the keyboard keys are released after pressing
document.addEventListener("keyup",(event)=>{
    console.log(event);
})

*/

// Event Propagation

/*

DOCUMENT
│
└── HTML
    │
    └── BODY
        │
        └── DIV (Parent)
            │
            └── BUTTON (Target)


CAPTURING PHASE (Top → Bottom)
──────────────────────────────

DOCUMENT
   ↓
  HTML
   ↓
  BODY
   ↓
  DIV
   ↓
BUTTON (Target)


TARGET PHASE
────────────

BUTTON receives the event


BUBBLING PHASE (Bottom → Top)
─────────────────────────────

BUTTON
   ↑
  DIV
   ↑
  BODY
   ↑
  HTML
   ↑
DOCUMENT  

                    EVENT OCCURS
                          │
                          ▼
                 ┌────────────────┐
                 │  CAPTURING     │
                 │  (Top → Down)  │
                 └────────────────┘
                          │
                          ▼
                       DOCUMENT
                          ↓
                         HTML
                          ↓
                         BODY
                          ↓
                         DIV
                          ↓
                       BUTTON
                          │
                          ▼
                 ┌────────────────┐
                 │ TARGET PHASE   │
                 └────────────────┘
                          │
                          ▼
                        BUTTON
                          │
                          ▼
                 ┌────────────────┐
                 │  BUBBLING      │
                 │ (Bottom → Up)  │
                 └────────────────┘
                          │
                          ▼
                        BUTTON
                          ↑
                         DIV
                          ↑
                         BODY
                          ↑
                         HTML
                          ↑
                       DOCUMENT

Capturing = Going DOWN the family tree 🌳
Target    = Actual clicked element 🎯
Bubbling  = Going UP the family tree 🌳

Capture ↓ → Target 🎯 → Bubble ↑
*/

/*
const btn = document.querySelector("button");
const div = document.querySelector("div");
const main = document.querySelector("main");
const body = document.querySelector("body");

// Prints by default by event bubbling
body.addEventListener("click",(event)=>{
    // console.log(event);
    console.log("body triggered..... ");
})

btn.addEventListener("click",(event)=>{
    // console.log(event);
    console.log("button triggered..... ");
})

main.addEventListener("click",(event)=>{
    // console.log(event);
    console.log("main triggered..... ");
})

div.addEventListener("click",(event)=>{
    // console.log(event);
    console.log("div triggered..... ");
})

// Capturing Mode

body.addEventListener("click",(event)=>{
    // console.log(event);
    console.log("body triggered..... ");
},{capture:true})

btn.addEventListener("click",(event)=>{
    // console.log(event);
    console.log("button triggered..... ");
},{capture:true})

main.addEventListener("click",(event)=>{
    // console.log(event);
    console.log("main triggered..... ");
},{capture:true})

div.addEventListener("click",(event)=>{
    // console.log(event);
    console.log("div triggered..... ");
},{capture:true})

*/

/*
const form = document.querySelector("form");
const inputName = document.querySelector("#name");
const inputEmail = document.querySelector("#email");

form.addEventListener("submit",(event)=>{
    event.preventDefault();
    // console.log(event);
    // console.log("form event");
    console.log(inputName.value, inputEmail.value);
    console.log(event.target[0].value,event.target[1].value);

    // inputName.value = "";
    // inputEmail.value = "";

    form.reset();
    
})

*/
