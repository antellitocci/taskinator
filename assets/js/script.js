var formElem = document.querySelector("#task-form");
var tasksToDoElem = document.querySelector("#tasks-to-do");
var pageContentElem = document.querySelector("#page-content");

//Declare id counter for tasks
var taskIDCounter = 0;

var taskFormHandler = function(event){

    event.preventDefault();

    var taskNameInput = document.querySelector("input[name='task-name']").value;
    var taskTypeInput = document.querySelector("select[name='task-type']").value;

    //Ensure task has a value and a type is selected
    if(!taskNameInput || !taskTypeInput)
    {
        alert("You need to fill out the task form!");
        return false;
    }

    //Clear form fields
    formElem.reset();
    
    //Package the data as an object
    var taskDataObj = {
        name: taskNameInput,
        type: taskTypeInput
    };

    //Send it as an argument to createTaskElem()
    createTaskElem(taskDataObj);
};

var createTaskElem = function(taskDataObj){
    //Create a list item
    var taskListItemElem = document.createElement('li');
    taskListItemElem.className = "task-item";

    //Add task id as custom attribute
    taskListItemElem.setAttribute("data-task-id", taskIDCounter);

    //Create a div to hold task info and add to list item
    var taskInfoElem = document.createElement('div');
    taskInfoElem.className = "task-info";

    //Add HTML content to div
    taskInfoElem.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span>";
    taskListItemElem.appendChild(taskInfoElem);

    var taskActionsElem = createTaskActions(taskIDCounter);
    taskListItemElem.appendChild(taskActionsElem);
    
    tasksToDoElem.appendChild(taskListItemElem);


    //Add entire list item to list
    tasksToDoElem.appendChild(taskListItemElem);

    //Increase task counter for next unique id
    taskIDCounter ++;
};

var createTaskActions = function(taskId)
{
    var actionContainerElem = document.createElement("div");
    actionContainerElem.className = "task-actions";

    //Create Edit button
    var editButtonElem = document.createElement("button");
    editButtonElem.textContent = "Edit";
    editButtonElem.className = "btn edit-btn";
    editButtonElem.setAttribute("data-task-id", taskId);

    actionContainerElem.appendChild(editButtonElem);

    //Create delete button    
    var deleteButtonElem = document.createElement("button");
    deleteButtonElem.textContent = "Delete";
    deleteButtonElem.className = "btn delete-btn";
    deleteButtonElem.setAttribute("data-task-id", taskId);

    actionContainerElem.appendChild(deleteButtonElem);

    //Create task status dropdown
    var statusSelectElem = document.createElement('select');
    statusSelectElem.className = "select-status";
    statusSelectElem.setAttribute("name", "status-change");
    statusSelectElem.setAttribute("data-task-id", taskId);

    var statusChoices = ["To Do", "In Progress", "Completed"];
    for (var i=0; i < statusChoices.length; i++)
    {
        //create option element
        var statusOptionElem = document.createElement("option");
        statusOptionElem.textContent = statusChoices[i];
        statusOptionElem.setAttribute("value", statusChoices[i]);
        //append to select
        statusSelectElem.appendChild(statusOptionElem);
    }

    actionContainerElem.appendChild(statusSelectElem);

    return actionContainerElem;
};

formElem.addEventListener("submit", taskFormHandler);

var taskButtonHandler = function(event)
{
    console.log(event.target);

    //get target element from event
    var targetElem = event.target;

    //edit button clicked
    if(targetElem.matches(".edit-btn"))
    {
        //Get the element's task id
        var taskId = targetElem.getAttribute("data-task-id");
        editTask(taskId);
    }
    //delete button clicked
    else if(targetElem.matches(".delete-btn"))
    {
        var taskId = targetElem.getAttribute("data-task-id");
        deleteTask(taskId);
    }
};

var editTask = function(taskId)
{
    //get task list item element
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

    //get content from task name and type
    var taskName = taskSelected.querySelector("h3.task-name").textContent;
    var taskType = taskSelected.querySelector("span.task-type").textContent;

    document.querySelector("input[name='task-name']").value = taskName;
    document.querySelector("select[name='task-type']").value = taskType;

    document.querySelector("#save-task").textContent = "Save Task";

    formElem.setAttribute("data-task-id", taskId);

};


var deleteTask = function(taskId)
{
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
    taskSelected.remove();
};

pageContentElem.addEventListener("click", taskButtonHandler);

