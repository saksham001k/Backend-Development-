const taskInput = document.getElementById("taskInput");
const addButton = document.getElementById("addButton");
const taskList = document.getElementById("taskList");

function getTasks() {
    return JSON.parse(localStorage.getItem("simpleTasks")) || [];
}

function saveTasks(tasks) {
    localStorage.setItem("simpleTasks", JSON.stringify(tasks));
}

function showTasks() {
    const tasks = getTasks();
    taskList.innerHTML = "";

    tasks.forEach((task, index) => {
        const item = document.createElement("li");
        if (task.completed) item.classList.add("completed");

        const taskText = document.createElement("span");
        taskText.textContent = task.text;
        taskText.addEventListener("click", () => changeStatus(index));

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.className = "delete-button";
        deleteButton.addEventListener("click", () => deleteTask(index));

        item.appendChild(taskText);
        item.appendChild(deleteButton);
        taskList.appendChild(item);
    });
}

function addTask() {
    const text = taskInput.value.trim();

    if (text === "") {
        alert("Please enter a task.");
        return;
    }

    const tasks = getTasks();
    tasks.push({ text: text, completed: false });
    saveTasks(tasks);
    taskInput.value = "";
    showTasks();
}

function changeStatus(index) {
    const tasks = getTasks();
    tasks[index].completed = !tasks[index].completed;
    saveTasks(tasks);
    showTasks();
}

function deleteTask(index) {
    const tasks = getTasks();
    tasks.splice(index, 1);
    saveTasks(tasks);
    showTasks();
}

addButton.addEventListener("click", addTask);
showTasks();
