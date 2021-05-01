var formElem = document.querySelector("#task-form");
var tasksToDoElem = document.querySelector("#tasks-to-do");

var createTaskHandler = function(event){

    event.preventDefault();

    var taskListItemElem = document.createElement('li');
    taskListItemElem.className = "task-item";
    taskListItemElem.textContent = "I wish I could submit my own task.";
    tasksToDoElem.appendChild(taskListItemElem);
}

formElem.addEventListener("submit", createTaskHandler);

