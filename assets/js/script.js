var formElem = document.querySelector("#task-form");
var tasksToDoElem = document.querySelector("#tasks-to-do");

var createTaskHandler = function(event){

    event.preventDefault();

    var taskNameInput = document.querySelector("input[name='task-name']").value;
    var taskTypeInput = document.querySelector("select[name='task-type']").value;

    //Create a list item
    var taskListItemElem = document.createElement('li');
    taskListItemElem.className = "task-item";

    //Create a div to hold task info and add to list item
    var taskInfoElem = document.createElement('div');
    //Give it a class name
    taskInfoElem.className = "task-info";
    //Add HTML content to div
    taskInfoElem.innerHTML = "<h3 class='task-name'>" + taskNameInput + "</h3><span class='task-type'>" + taskTypeInput + "</span>";
    taskListItemElem.appendChild(taskInfoElem);

    //Add entire list item to list
    tasksToDoElem.appendChild(taskListItemElem);
}

formElem.addEventListener("submit", createTaskHandler);

