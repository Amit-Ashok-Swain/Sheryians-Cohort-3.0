# Complete Browser Environment

```text
Browser
│
├── Rendering Engine
│
├── JavaScript Engine (V8, SpiderMonkey)
│
├── Web APIs
│
├── Event Loop
│
├── Callback Queue
│
├── Microtask Queue
│
└── Window Object
      │
      ├── DOM
      ├── BOM
      ├── Storage APIs
      ├── Network APIs
      ├── Timer APIs
      ├── Event APIs
      └── Browser APIs
```

---

# What Actually Happens When You Open a Website

```text
HTML
 ↓
Browser Downloads HTML
 ↓
DOM Tree Created
 ↓
CSS Downloaded
 ↓
CSSOM Created
 ↓
DOM + CSSOM
 ↓
Render Tree
 ↓
Layout
 ↓
Paint
 ↓
Screen
```

---

# Browser Components

```text
Browser
│
├── User Interface
├── Browser Engine
├── Rendering Engine
├── JavaScript Engine
├── Networking
├── Data Storage
└── Window Object
```

---

# JavaScript Engine

JavaScript itself provides:

```js
Number
String
Boolean
BigInt
Symbol
Object
Array
Map
Set
Date
Math
JSON
Promise
```

These are **ECMAScript features**.

Example:

```js
Array
Object
Map
Set
Promise
```

These DO NOT come from Browser.

They come from JavaScript Engine.

---

# Window Object Detailed Hierarchy

```text
Window
│
├── document
├── console
├── navigator
├── location
├── history
├── screen
├── frames
├── parent
├── top
├── self
├── localStorage
├── sessionStorage
├── indexedDB
├── caches
├── fetch
├── XMLHttpRequest
├── WebSocket
├── EventSource
├── setTimeout
├── setInterval
├── clearTimeout
├── clearInterval
├── alert
├── confirm
├── prompt
├── requestAnimationFrame
├── matchMedia
├── customElements
├── performance
├── crypto
├── Notification
├── MutationObserver
├── IntersectionObserver
├── ResizeObserver
└── navigator
```

---

# DOM Detailed Hierarchy

```text
document
│
├── documentElement(html)
│
├── head
│    ├── title
│    ├── meta
│    ├── script
│    ├── style
│    └── link
│
└── body
      ├── div
      ├── p
      ├── span
      ├── img
      ├── form
      ├── table
      ├── ul
      ├── li
      ├── input
      ├── button
      └── etc...
```

---

# DOM Objects

Everything in DOM is a Node.

```text
Node
│
├── Document
├── Element
├── Text
├── Comment
└── Attribute
```

Example:

```html
<div>Hello</div>
```

DOM:

```text
Element Node -> div
Text Node -> Hello
```

---

# BOM Complete

BOM = Browser Object Model

```text
Window
│
├── navigator
├── location
├── history
├── screen
├── frames
├── localStorage
├── sessionStorage
├── indexedDB
└── cookies
```

---

# Navigator Object

```js
navigator.userAgent
navigator.language
navigator.platform
navigator.onLine
navigator.geolocation
navigator.clipboard
navigator.mediaDevices
```

---

# Location Object

```js
location.href
location.hostname
location.pathname
location.protocol
location.search
location.hash
```

Example:

```text
https://google.com/search?q=js
```

```js
hostname -> google.com
pathname -> /search
search -> ?q=js
protocol -> https:
```

---

# Storage APIs

### Local Storage

```js
localStorage
```

Persistent storage.

---

### Session Storage

```js
sessionStorage
```

Until tab closes.

---

### IndexedDB

```js
indexedDB
```

Browser database.

Stores:

* Large data
* Offline apps
* Cached data

---

# Network APIs

### Fetch API

```js
fetch()
```

---

### XMLHttpRequest

Old API.

```js
const xhr = new XMLHttpRequest();
```

---

### WebSocket

```js
new WebSocket();
```

Real-time communication.

---

# Timer APIs

```js
setTimeout()
setInterval()
clearTimeout()
clearInterval()
requestAnimationFrame()
```

---

# Event APIs

```js
addEventListener()
removeEventListener()
dispatchEvent()
```

Events:

```text
click
submit
keydown
keyup
input
change
load
scroll
resize
mouseover
mouseout
```

---

# Observer APIs (Very Important)

### MutationObserver

Watch DOM changes.

```js
new MutationObserver()
```

---

### IntersectionObserver

Detect visibility.

```js
new IntersectionObserver()
```

Used in:

* Lazy loading
* Infinite scrolling

---

### ResizeObserver

Detect size changes.

```js
new ResizeObserver()
```

---

# Multimedia APIs

```js
Audio
Video
MediaRecorder
MediaDevices
getUserMedia()
```

Used for:

* Camera
* Microphone
* Screen recording

---

# Graphics APIs

```js
Canvas API
SVG
WebGL
```

Canvas:

```js
canvas.getContext("2d")
```

WebGL:

```js
canvas.getContext("webgl")
```

---

# Security APIs

```js
crypto
```

Example:

```js
crypto.randomUUID()
```

```js
crypto.getRandomValues()
```

---

# Performance APIs

```js
performance.now()
performance.mark()
performance.measure()
```

Used for measuring execution time.

---

# Browser Async Architecture (Most Interviewed)

```text
Call Stack
    │
    ▼
Web APIs
    │
    ▼
Callback Queue
    │
    ▼
Event Loop
    │
    ▼
Call Stack
```

For Promises:

```text
Call Stack
    │
    ▼
Microtask Queue
    │
    ▼
Event Loop
    │
    ▼
Call Stack
```

---

# Ultimate Hierarchy to Remember

```text
Browser
│
├── Rendering Engine
├── JavaScript Engine
├── Web APIs
├── Event Loop
├── Task Queue
├── Microtask Queue
│
└── Window
      │
      ├── DOM
      │     ├── document
      │     ├── nodes
      │     ├── elements
      │     └── events
      │
      ├── BOM
      │     ├── navigator
      │     ├── location
      │     ├── history
      │     ├── screen
      │     └── storage
      │
      ├── Network APIs
      │     ├── fetch
      │     ├── XHR
      │     └── WebSocket
      │
      ├── Timer APIs
      │     ├── setTimeout
      │     └── setInterval
      │
      ├── Observer APIs
      │     ├── MutationObserver
      │     ├── IntersectionObserver
      │     └── ResizeObserver
      │
      ├── Multimedia APIs
      ├── Graphics APIs
      ├── Security APIs
      └── Performance APIs
```

This is essentially the complete mental model of the browser environment that a JavaScript developer should understand before moving on to variables, scopes, execution context, and the event loop.

Yes. For a **true complete Day 1 Browser + JavaScript Environment**, a few important things are still missing.

The biggest missing piece is that **Web APIs are not just fetch and setTimeout**. There are 100+ browser APIs, and interviewers often ask which category a particular API belongs to.

---

# Complete Browser Architecture

```text
Browser
│
├── Rendering Engine
├── JavaScript Engine
├── Event Loop
├── Task Queue
├── Microtask Queue
├── Web APIs
│
└── Window
     │
     ├── DOM
     ├── BOM
     └── ECMAScript Globals
```

---

# What belongs to JavaScript (ECMAScript)?

These come from the JS Engine:

```js
Object
Array
String
Number
Boolean
Map
Set
WeakMap
WeakSet
Date
Math
JSON
Promise
RegExp
Error
BigInt
Symbol
Reflect
Proxy
```

Not Browser APIs.

---

# Complete Web APIs Hierarchy

```text
Web APIs
│
├── Timer APIs
├── Network APIs
├── Storage APIs
├── Event APIs
├── Observer APIs
├── Multimedia APIs
├── Device APIs
├── Graphics APIs
├── Worker APIs
├── Security APIs
├── Performance APIs
├── File APIs
├── Drag & Drop APIs
├── Sensor APIs
├── Communication APIs
├── Payment APIs
└── PWA APIs
```

---

# 1. Timer APIs

```js
setTimeout()
clearTimeout()

setInterval()
clearInterval()

requestAnimationFrame()
cancelAnimationFrame()

requestIdleCallback()
cancelIdleCallback()
```

---

# 2. Network APIs

```js
fetch()

XMLHttpRequest()

WebSocket()

EventSource()

Beacon API
```

Used for:

```text
API Calls
Realtime Chats
Live Scores
Notifications
Streaming Data
```

---

# 3. Storage APIs

```js
localStorage

sessionStorage

indexedDB

Cache API

Cookies
```

---

# 4. Event APIs

```js
addEventListener()

removeEventListener()

dispatchEvent()

CustomEvent()
```

Events:

```text
click
submit
keydown
keyup
change
input
scroll
resize
load
unload
focus
blur
```

---

# 5. Observer APIs

```js
MutationObserver

IntersectionObserver

ResizeObserver

PerformanceObserver
```

Used heavily in React applications.

---

# 6. Multimedia APIs

```js
Audio

Video

MediaRecorder

MediaDevices

getUserMedia()

Picture-in-Picture API
```

Examples:

```text
Zoom
Google Meet
Teams
WhatsApp Web
```

---

# 7. Device APIs

Access hardware.

```js
Geolocation API

Battery API

Vibration API

Device Orientation API

Device Motion API
```

Examples:

```js
navigator.geolocation
```

---

# 8. Graphics APIs

```js
Canvas API

SVG

WebGL

WebGPU
```

Used in:

```text
Games
Charts
Animations
3D Models
```

---

# 9. Worker APIs

Run JavaScript in background threads.

```js
Web Workers

Shared Workers

Service Workers
```

Examples:

```text
Offline Support
Push Notifications
Background Processing
```

---

# 10. Security APIs

```js
Crypto API

Credential Management API

Permissions API
```

Example:

```js
crypto.randomUUID()
```

---

# 11. Performance APIs

```js
performance.now()

performance.mark()

performance.measure()

PerformanceObserver
```

---

# 12. File APIs

```js
File API

FileReader

Blob

Streams API
```

Used when uploading files.

```html
<input type="file">
```

---

# 13. Drag and Drop APIs

```js
dragstart

dragover

drop
```

Examples:

```text
Trello
Jira
Notion
```

---

# 14. Communication APIs

Communication between tabs/windows.

```js
BroadcastChannel

MessageChannel

postMessage()
```

Examples:

```text
Iframe communication
Tab communication
```

---

# 15. Sensor APIs

```js
Accelerometer

Gyroscope

Magnetometer
```

Mobile devices mostly.

---

# 16. Notification APIs

```js
Notification API

Push API
```

Examples:

```text
Facebook notifications
Gmail notifications
```

---

# 17. Payment APIs

```js
Payment Request API
```

Used by:

```text
Google Pay
Apple Pay
Stripe
```

---

# 18. PWA APIs

Progressive Web Apps.

```js
Service Worker

Cache API

Background Sync

Push API
```

---

# Missing Window Object Members

Many people forget these:

```js
window.console

window.crypto

window.performance

window.customElements

window.caches

window.indexedDB

window.navigator

window.history

window.location

window.screen

window.frames

window.parent

window.top

window.self
```

---

# Missing DOM Concepts

Besides Elements, you should know:

```text
Document
│
├── Node
│
├── Element
│
├── Text Node
│
├── Comment Node
│
├── Attribute Node
│
└── DocumentFragment
```

---

# Missing Browser Internals (Important)

```text
Browser
│
├── JavaScript Engine
│     ├── Memory Heap
│     └── Call Stack
│
├── Web APIs
│
├── Event Loop
│
├── Callback Queue
│
└── Microtask Queue
```

This architecture is asked very frequently.

---

# Ultimate Day 1 Mind Map

```text
Browser
│
├── Rendering Engine
├── JS Engine
│     ├── Heap
│     └── Call Stack
│
├── Event Loop
├── Task Queue
├── Microtask Queue
│
├── Window
│     │
│     ├── DOM
│     ├── BOM
│     ├── Web APIs
│     └── Storage
│
├── Network Layer
└── Rendering Pipeline
      │
      ├── DOM
      ├── CSSOM
      ├── Render Tree
      ├── Layout
      └── Paint
```

If you're preparing a **JavaScript from scratch roadmap**, then after this Day 1, the correct sequence is:

**Day 2:** Execution Context → Call Stack → Memory Creation Phase → Execution Phase
**Day 3:** Scope → Lexical Environment → Scope Chain
**Day 4:** Hoisting → Temporal Dead Zone
**Day 5:** Functions → First Class Functions → Higher Order Functions
**Day 6:** Event Loop → Callback Queue → Microtask Queue
**Day 7:** Objects → Prototypes → Prototype Chain

This order builds the exact mental model interviewers expect.
