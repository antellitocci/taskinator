var formElem = document.querySelector("#task-form");
var tasksToDoElem = document.querySelector("#tasks-to-do");
var pageContentElem = document.querySelector("#page-content");
var tasksInProgressElem = document.querySelector("#tasks-in-progress");
var tasksCompleteElem = document.querySelector("#tasks-completed");
var tasks = [];

//Declare id counter for tasks
var taskIdCounter = 0;

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

    var isEdit = formElem.hasAttribute("data-task-id");

    //has data attribute, so get task id and call function to complete edit process
    if(isEdit)
    {
        var taskId = formElem.getAttribute("data-task-id");
        completeEditTask(taskNameInput, taskTypeInput, taskId);
    }
    else
    {
        //Package the data as an object
        var taskDataObj = {
            name: taskNameInput,
            type: taskTypeInput,
            status: "to do"
        };
        //Send it as an argument to createTaskElem()
        createTaskElem(taskDataObj);
    }

};

var createTaskElem = function(taskDataObj){
    //Create a list item
    var taskListItemElem = document.createElement('li');
    taskListItemElem.className = "task-item";

    //Add task id as custom attribute
    taskListItemElem.setAttribute("data-task-id", taskIdCounter);

    //Create a div to hold task info and add to list item
    var taskInfoElem = document.createElement('div');
    taskInfoElem.className = "task-info";

    //Add HTML content to div
    taskInfoElem.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span>";
    taskListItemElem.appendChild(taskInfoElem);

    var taskActionsElem = createTaskActions(taskIdCounter);
    taskListItemElem.appendChild(taskActionsElem);

    switch (taskDataObj.status) {
        case "to do":
          taskActionsElem.querySelector("select[name='status-change']").selectedIndex = 0;
          tasksToDoElem.append(taskListItemElem);
          break;
        case "in progress":
          taskActionsElem.querySelector("select[name='status-change']").selectedIndex = 1;
          tasksInProgressElem.append(taskListItemElem);
          break;
        case "completed":
          taskActionsElem.querySelector("select[name='status-change']").selectedIndex = 2;
          tasksCompleteElem.append(taskListItemElem);
          break;
        default:
          console.log("Something went wrong!");
      }
    
    taskDataObj.id = taskIdCounter;
    tasks.push(taskDataObj);

    saveTasks();

    //Increase task counter for next unique id
    taskIdCounter ++;
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

var completeEditTask = function(taskName, taskType, taskId)
{
    //find the matching task list item
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

    //set new values
    taskSelected.querySelector("h3.task-name").textContent = taskName;
    taskSelected.querySelector("span.task-type").textContent = taskType;

    //loop through tasks array and task object with new content
    for (var i =0; i < tasks.length; i++)
    {
        if(tasks[i].id === parseInt(taskId))
        {
            tasks[i].name = taskName;
            tasks[i].type = taskType;
        }
    };

    alert("Task Updated!");

    formElem.removeAttribute("data-task-id");
    document.querySelector("#save-task").textContent = "Add Task";

    saveTasks();
};



var taskButtonHandler = function(event)
{
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

    formElem.setAttribute("data-task-id", taskId);

    document.querySelector("#save-task").textContent = "Save Task";
};


var deleteTask = function(taskId)
{
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
    taskSelected.remove();

    //create new array to hold updated list of tasks
    var updatedTaskArr = [];

    //loop through current tasks
    for (var i =0; i < tasks.length; i ++)
    {
        //if tasks[i].id doesn't match the value of taskId, let's keep that task and push it into the new array
        if(tasks[i].id !== parseInt(taskId))
        {
            updatedTaskArr.push(tasks[i]);
        }
    }

    //reassign tasks array to be the same as updatedTaskArr
    tasks = updatedTaskArr;

    saveTasks();
};

var taskStatusChangeHandler = function(event) {

    //get the task item's id
    var taskId = event.target.getAttribute("data-task-id");

    //find the parent task item element based on the id
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
    
    //get the currently selected option's value and convert to lowercase
    var statusValue = event.target.value.toLowerCase();

    if(statusValue ==="to do")
    {
        tasksToDoElem.appendChild(taskSelected);
    }
    else if (statusValue === "in progress")
    {
        tasksInProgressElem.appendChild(taskSelected);
    }
    else if (statusValue === "completed")
    {
        tasksCompleteElem.appendChild(taskSelected);
    }

    //update task's in tasks array
    for (var i =0; i < tasks.length; i++)
    {
        if(tasks[i].id === parseInt(taskId))
        {
            tasks[i].status = statusValue;
        }
    }

    saveTasks();
};

var saveTasks = function (){
    localStorage.setItem("tasks", JSON.stringify(tasks));
};

var loadTasks = function(){
    //get tasks from localStorage
    var savedTasks = localStorage.getItem("tasks");
    console.log(savedTasks);

    if(!savedTasks)
    {
        return false;
    }
    //convert tasks to array from string
    savedTasks = JSON.parse(savedTasks);

    //loop through saved tasks array
    for (var i =0; i < savedTasks.length; i++)
    {
        //pass each task object into the 'createTaskElem()' function
        createTaskElem(savedTasks[i]);
    }
       
};

formElem.addEventListener("submit", taskFormHandler);

pageContentElem.addEventListener("click", taskButtonHandler);

pageContentElem.addEventListener("change", taskStatusChangeHandler);

loadTasks();