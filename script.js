const taskList = document.getElementById("taskList");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskTitle = document.getElementById("taskTitle");
const taskDateTime = document.getElementById("taskDateTime");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function renderTasks() {
  taskList.innerHTML = "";
  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.className = task.completed ? "completed" : "";

    li.innerHTML = `
      <div>
        <span>${task.title}</span><br>
        <small>${task.dateTime ? new Date(task.dateTime).toLocaleString() : ""}</small>
      </div>
      <div class="task-actions">
        <button onclick="toggleTask(${index})">✔</button>
        <button onclick="editTask(${index})">✏️</button>
        <button onclick="deleteTask(${index})">🗑</button>
      </div>
    `;

    taskList.appendChild(li);
  });

  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function addTask() {
  const title = taskTitle.value.trim();
  const dateTime = taskDateTime.value;

  if (title === "") return alert("Please enter a task");

  tasks.push({
    title,
    dateTime,
    completed: false
  });

  taskTitle.value = "";
  taskDateTime.value = "";
  renderTasks();
}

function toggleTask(index) {
  tasks[index].completed = !tasks[index].completed;
  renderTasks();
}

function editTask(index) {
  const newTitle = prompt("Edit task:", tasks[index].title);
  if (newTitle !== null) {
    tasks[index].title = newTitle.trim();
    renderTasks();
  }
}

function deleteTask(index) {
  tasks.splice(index, 1);
  renderTasks();
}

addTaskBtn.addEventListener("click", addTask);
renderTasks();
