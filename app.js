// Define UI vars

const form = document.querySelector("form#task-form");
const taskList = document.querySelector('ul.collection')
const clearBtn = document.querySelector('a.clear-tasks')
const filter = document.querySelector('#filter')
const taskInput = document.querySelector('#task')

// Load all event listeners
loadEventListeners()

function loadEventListeners() {
    // DOM Load Event
    document.addEventListener('DOMContentLoaded', getTasks)
    // Add task event
    form.addEventListener('submit', addTask)
    // clear task event
    clearBtn.addEventListener('click', clearTasks)
    // remove task event
    taskList.addEventListener('click', removeTask)
    // filter task event
    filter.addEventListener('keyup', filterTasks)
}

// Get tasks from Ls
function getTasks() {
    let tasks;
    if (localStorage.getItem("tasks") === null) {
      tasks = [];
    } else {
      tasks = JSON.parse(localStorage.getItem("tasks"));
    }
    


    tasks.forEach((task) => {
      // Create li element
      const li = document.createElement("li");
      // adding class
      li.className = "collection-item";
      li.textContent = task;

      const link = document.createElement("a");
      link.className = "delete-item secondary-content";
      link.innerHTML = '<i class="fa fa-remove"></i>';
      li.appendChild(link);

      taskList.appendChild(li);

    })
}

// Add Task
function addTask(e) {
    if (taskInput.value === '') {
        alert('Add a task')
    }

    // Create li element    
    const li = document.createElement('li')
    // adding class
    li.className = 'collection-item'
    li.textContent = taskInput.value

    
    
    const link = document.createElement('a')
    link.className = 'delete-item secondary-content'
    link.innerHTML = '<i class="fa fa-remove"></i>'
    li.appendChild(link)
    
    taskList.appendChild(li)

    storeTaskInLocalHost(taskInput.value)
    taskInput.value = "";

    e.preventDefault()
}

// Store Task
function storeTaskInLocalHost(task) {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = []
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'))
    }
    tasks = tasks.concat(task)
    localStorage.setItem('tasks', JSON.stringify(tasks))
}

function clearTasks() {
    taskList.textContent = ''

    // clear from localStorage
    clearTasksFromLocalStorage()
}

function clearTasksFromLocalStorage() {
    window.localStorage.clear()
}

function removeTask(e) {
    if (e.target.parentElement.classList.contains("delete-item")) {
        if (confirm("are you sure")) {
            e.target.parentElement.parentElement.remove();

            // remove from LS
            removeTaskFromLocalStorage(
                e.target.parentElement.parentElement
            )
        }
        
    };
}

function removeTaskFromLocalStorage(taskItem) {
    let tasks;
    if (localStorage.getItem("tasks") === null) {
      tasks = [];
    } else {
      tasks = JSON.parse(localStorage.getItem("tasks"));
    }

    tasks.forEach(function(task, index) {
        if (taskItem.textContent === task) {
            tasks.splice(index, 1)
        }
    })

    localStorage.setItem('tasks', JSON.stringify(tasks))
}

function filterTasks(e) {
    const text = e.target.value.toLowerCase()
    document.querySelectorAll(".collection-item").forEach((task) => {
            if (task.textContent.includes(text)){
                task.style.display = 'block'
            } else {
                task.style.display = 'none'
            }
        })
}

