#To-Do-List

#To-Do List Web App

A simple and interactive to-do list built with HTML, CSS, and JavaScript. This project showcases dynamic DOM manipulation, event handling, and local data management.

##Features

- Add and delete to-do items
- Mark tasks as complete or incomplete
- Visual indicators using icons and line-through styles
- Persist data with local storage (optional upgrade)
- Clean UI using semantic HTML and modular JavaScript


##Tech Stack

- **HTML5** for structure
- **CSS3** for layout and styles
- **Vanilla JavaScript** for app logic and interactivity


##How It Works

- Users can add a new task via an input box and button.
- Each task item includes interactive icons to mark as complete or delete.
- Uses `.classList.toggle()` to dynamically apply CSS classes like `CHECK`, `UNCHECK`, and `LINE_THROUGH`.
- Appends new items using `insertAdjacentHTML()` for smooth DOM updates.
- Task state is tracked in a JavaScript array and synced with the DOM.


