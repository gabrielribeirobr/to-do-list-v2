const form = document.querySelector(".form-inputs");
const taskInput = document.querySelector(".input");
const taskList = document.querySelector(".taskList"); // UL
const btnAdd = document.querySelector(".btnAdd");

showTask();

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
    li.id = task.id;
    li.innerHTML = `<span>${task.name}</span>  
    <input type="text" class="input" name="input edit" value= "${task.name}">
    <div class="boxButtons"> 
    <button class="button edit" onclick="btnEdit(${task.id})"><i class="fa-regular fa-pen-to-square"></i></button> 
    <button class="button delete" onclick="btnDelete(${task.id})"><i class="fa-regular fa-trash-can"></i></button>   
    <button class="button save" onclick="btnSave(${task.id})"><i class="fa-regular fa-floppy-disk"></i></button>
    <button class="button cancel" onclick="btnCancel(${task.id})"><i class="fa-regular fa-rectangle-xmark"></i></button>
    </div>
    `;
    taskList.appendChild(li);
  });
}

function btnCancel(id){
  const currentLi = document.getElementById(id);
  currentLi.classList.remove('editing');

  // keep input edit with old value.
  const tasks = getTasks();
  const task = tasks.find((t) => t.id === id);

  const oldName = task.name;
  
  const input = currentLi.querySelector('.input');
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

  const input = currentLi.querySelector('.input');
  const taskEdited = input.value;
  
  const oldName = task.name;

  if (taskEdited) {
    task.name = taskEdited;
    setTasks(tasks);
    showTask();   
  }
   alert(`Você alterou: ${oldName} para: ${taskEdited}`); 
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
