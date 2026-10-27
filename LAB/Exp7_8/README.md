# Experiment 7 & 8: ES6, DOM and Event Handling

**Name:** Saksham Katiyar  
**SAP ID:** 590015169

The combined lab exercise is a simple browser To-Do list. Add using the button or Enter, click a title to toggle completion, and use Delete to remove a task. Tasks are stored in memory and reset when the page is refreshed, as in the lab exercise.

## Run

```bash
cd LAB/Exp7_8
python3 -m http.server 8007
```

Open http://localhost:8007/ . Use a local HTTP server so the module imports in `demo.js` work. Open the browser console for the ES6 demonstrations.

## Files

- `index.html`, `style.css`: page and styling.
- `app.js`: class, array state, spread, destructuring, DOM rendering and delegated events.
- `demo.js`, `math.mjs`: default parameters, rest, classes/inheritance, object literals, modules, promises and async/await.
- [Report](Report.md)

The form submit event handles Add and Enter; `preventDefault()` avoids reloading. Task titles use `textContent`. A single list listener handles dynamically created buttons.
