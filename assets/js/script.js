var buttonElem = document.querySelector("#save-task");
var tasksToDoElem = document.querySelector("#tasks-to-do");

var createTaskHandler = function(){
    var taskListItemElem = document.createElement('li');
    taskListItemElem.className = "task-item";
    taskListItemText = window.prompt('Enter your task.', "");
    taskListItemElem.textContent = taskListItemText;
    tasksToDoElem.appendChild(taskListItemElem);
}

buttonElem.addEventListener("click", createTaskHandler);

