const form = document.querySelector(".form-inputs");
const taskInput = document.querySelector(".taskInput");
const taskList = document.querySelector(".taskList"); // UL
const btnAdd = document.querySelector(".btnAdd");

// let tasks = JSON.parse(localStorage.getItem("listTasks",)) || []; // recebendo valores armazenados no localstorage ou uma array

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const currentTask = {
    name: taskInput.value.toUpperCase(),
    done: false,
    edit: false,
    id: Math.floor(Math.random() * 10000),
  };
  addTask(currentTask);
  showTask();
});

function addTask(task) {
  let tasks = getTasks();
  tasks.push(task);
  localStorage.setItem("listTasks", JSON.stringify(tasks));
}

function showTask() {
  const tasks = getTasks();
  taskList.innerHTML = "";

  tasks.forEach((task) => {
    const li = document.createElement("li");
    li.className = "liTask";
    li.innerHTML = `<span>${task.name}</span> <button class="btnDelete" onclick="btnDelete(${task.id})">delete</button>`;
    taskList.appendChild(li);
  });
}

function btnDelete(id) {
  const tasks = getTasks();
  const newTasks = tasks.filter((task) => task.id !== id);
  setTasks(newTasks);
  showTask();
}

function setTasks(tasks) {
  localStorage.setItem("listTasks", JSON.stringify(tasks));
}

function getTasks() {
  return JSON.parse(localStorage.getItem("listTasks")) || [];
}
