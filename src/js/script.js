const form = document.querySelector(".form-inputs");
const taskInput = document.querySelector(".input");
const taskList = document.querySelector(".taskList"); // UL
const btnAdd = document.querySelector(".btnAdd");


form.addEventListener("submit", (e) => {
  e.preventDefault();
  const currentTask = {
    name: taskInput.value.toUpperCase(),
    done: false,
    edit: false,
    id: Math.floor(Math.random() * 10000), // get an id for current task
  };
  addTask(currentTask);
  showTask();
});

// add new tasw
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
    li.innerHTML = `<span>${task.name}</span> 
    <button class="button" onclick="btnDelete(${task.id})"><i class="fa-regular fa-trash-can"></i></button>
    <button class="button" onclick="btnEdit(${task.id})"><i class="fa-regular fa-pen-to-square"></i></button>`;
    taskList.appendChild(li);
  });
}

function btnEdit(id){
  const tasks = getTasks();
  const task = tasks.find((currentTask) => currentTask.id === id);
  console.log(task);

}

function createEditInput(task){
  const inputEdit = document.createElement('input');
  inputEdit.type = 'text';
  inputEdit.value = task.name;
  inputEdit.classList.add('input');

  return inputEdit;
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
