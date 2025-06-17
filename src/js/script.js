const form = document.querySelector(".form-inputs");
const taskInput = document.querySelector(".input");
const taskList = document.querySelector(".taskList"); // UL
const btnAdd = document.querySelector(".btnAdd");

showTask();

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const currentTask = {
    name: taskInput.value.trim(),
    done: false,
    id: Math.floor(Math.random() * 10000), // get an id for current task
  };

  const textIsValid = validationTask(currentTask.name);
  if (textIsValid) {
    addTask(currentTask);
    showTask();
  } else {
    alert("Nome de tarefa inválido.");
  }
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

    li.classList.add("liTask");
    // verifica se a tarefa foi marcada como Done
    if (task.done) {
      li.classList.add("taskDone");
    }
    li.id = task.id;
    li.innerHTML = `<span>${task.name}</span>  
    <input type="text" class="input" name="input edit" value= "${task.name}">
    <div class="boxButtons">   
    <button class="button edit" onclick="btnEdit(${task.id})"><i class="fa-regular fa-pen-to-square"></i></button>
    <button class="button done" onclick="btnDone(${task.id})"><i class="fa-regular fa-square-check"></i></button> 
    <button class="button delete" onclick="btnDelete(${task.id})"><i class="fa-regular fa-trash-can"></i></button>   
    <button class="button save" onclick="btnSave(${task.id})"><i class="fa-regular fa-floppy-disk"></i></button>
    <button class="button cancel" onclick="btnCancel(${task.id})"><i class="fa-regular fa-rectangle-xmark"></i></button>
    </div>
    `;
    taskList.appendChild(li);
  });
}

function btnDone(id) {
  const currentLi = document.getElementById(id);
  const span = currentLi.querySelector("span");
  span.classList.toggle("taskDone");

  const tasks = getTasks();
  const currentTask = tasks.find((t) => t.id === id);
  currentTask.done = true;
  setTasks(tasks);
  console.log("currentask: ", currentTask);
}

function btnCancel(id) {
  const currentLi = document.getElementById(id);
  currentLi.classList.remove("editing");

  // keep input edit with old value.
  const tasks = getTasks();
  const task = tasks.find((t) => t.id === id);
  const oldName = task.name;
  const input = currentLi.querySelector(".input");
  input.value = oldName;
}

function btnEdit(id) {
  const currentLi = document.getElementById(id);
  currentLi.classList.add("editing");
}

function btnSave(id) {
  const tasks = getTasks();
  const task = tasks.find((t) => t.id === id); // finding id for currentTask

  const currentLi = document.getElementById(id);
  currentLi.classList.remove("editing");

  const input = currentLi.querySelector(".input");
  const taskEdited = input.value.trim();

  const oldName = task.name;
  const textIsValid = validationTask(taskEdited, oldName);
  console.log("textisvalid: ", textIsValid);

  if (textIsValid) {
    task.name = taskEdited;
    setTasks(tasks);
    showTask();

    alert(`Você alterou: ${oldName} para: ${taskEdited}`);
  } else {
    alert("Nome de tarefa inválido.");
  }
}

function btnDelete(id) {
  const tasks = getTasks();
  const newTasks = tasks.filter((task) => task.id !== id);
  setTasks(newTasks);
  showTask();
}

function validationTask(value, oldValue) {
  if (value === "" || value === oldValue) {
    return false;
  } else return true;
}

function setTasks(tasks) {
  localStorage.setItem("listTasks", JSON.stringify(tasks));
}

function getTasks() {
  return JSON.parse(localStorage.getItem("listTasks")) || [];
}
