const form = document.querySelector('.form-inputs');
const taskInput = document.querySelector('.taskInput');
const taskList = document.querySelector('.taskList'); // UL
const btnAdd = document.querySelector('.btnAdd');

let tasks = JSON.parse(localStorage.getItem("listTasks",)) || []; // recebendo valores armazenados no localstorage ou uma array

btnAdd.addEventListener('click', ()=>{
    addTask();
    setArrayLocalStorage();
});

function addTask(){
    const atualTask = taskInput.value.toUpperCase();
    tasks.push(atualTask); 
    taskInput.value = "";
}

function setArrayLocalStorage(){
    const newTasks = JSON.stringify(tasks);
    localStorage.setItem("listTasks", newTasks);
}