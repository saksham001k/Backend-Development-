let tasks = [];
let nextId = 1;
const form = document.getElementById('taskForm');
const input = document.getElementById('taskInput');
const list = document.getElementById('taskList');
const count = document.getElementById('taskCount');

class Task {
  constructor(title) {
    this.id = nextId++;
    this.title = title;
    this.completed = false;
  }
}

const renderTasks = () => {
  list.replaceChildren();
  count.textContent = `${tasks.length} task${tasks.length === 1 ? '' : 's'}`;
  tasks.forEach(({ id, title, completed }) => {
    const item = document.createElement('li');
    item.dataset.id = id;
    const titleButton = document.createElement('button');
    titleButton.type = 'button';
    titleButton.className = 'task-title';
    titleButton.textContent = title;
    titleButton.setAttribute('aria-pressed', String(completed));
    titleButton.classList.toggle('done', completed);
    const deleteButton = document.createElement('button');
    deleteButton.type = 'button';
    deleteButton.textContent = 'Delete';
    deleteButton.className = 'delete-btn';
    item.append(titleButton, deleteButton);
    list.appendChild(item);
  });
};

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const title = input.value.trim();
  if (!title) return;
  tasks = [...tasks, new Task(title)];
  input.value = '';
  renderTasks();
  input.focus();
});

// One listener handles buttons in all current and future task rows.
list.addEventListener('click', (event) => {
  const button = event.target.closest('button');
  if (!button) return;
  const item = button.closest('li');
  const id = Number(item.dataset.id);
  if (button.classList.contains('delete-btn')) {
    tasks = tasks.filter(task => task.id !== id);
  } else {
    tasks = tasks.map(task => task.id === id
      ? { ...task, completed: !task.completed } : task);
  }
  renderTasks();
});

renderTasks();
