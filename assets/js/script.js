var formElem = document.querySelector("#task-form");
var tasksToDoElem = document.querySelector("#tasks-to-do");

var taskFormHandler = function(event){

    event.preventDefault();

    var taskNameInput = document.querySelector("input[name='task-name']").value;
    var taskTypeInput = document.querySelector("select[name='task-type']").value;

    //Package the data as an object
    var taskDataObj = {
        name: taskNameInput,
        type: taskTypeInput
    };

    //Send it as an argument to createTaskElem()
    createTaskElem(taskDataObj);
}

var createTaskElem = function(taskDataObj){
    //Create a list item
    var taskListItemElem = document.createElement('li');
    taskListItemElem.className = "task-item";

    //Create a div to hold task info and add to list item
    var taskInfoElem = document.createElement('div');
    taskInfoElem.className = "task-info";

    //Add HTML content to div
    taskInfoElem.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span>";
    taskListItemElem.appendChild(taskInfoElem);

    //Add entire list item to list
    tasksToDoElem.appendChild(taskListItemElem);
}

formElem.addEventListener("submit", taskFormHandler);

