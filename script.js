"use strict";

////////////////////////

//Fetching html elements
const taskInput = document.querySelector("#inputType");
const addTaskBtn = document.querySelector("#inputSubmit");
const taskList = document.querySelector("#taskList");
const deleteButton = document.querySelector("#deleteButton");

////////////////////////

//Declare variables and or Functions
const enter = 13;
const backspace = 8;
//Empty Array storage for multiple tasks
let myTasks = [];

//Update local storage to use for each task entered.
//Used in the event handler
const updateLocalStorage = () => {
  localStorage.setItem(
    "todo",
    JSON.stringify(myTasks.map((task) => task.text))
  );
};

////////////////////////

//Adding a task :
const addTask = (text) => {
  //Create new list item for task
  const taskItem = document.createElement("li");
  taskItem.classList.add("taskItemStyling");

  //Create checkbox for task
  const checkBox = document.createElement("input");
  checkBox.type = "checkbox";
  checkBox.name = "taskCheckBox";
  checkBox.id = "myCheckbox";
  checkBox.classList.add("custom-checkbox");

  //Create span element for task text
  const taskText = document.createElement("span");
  taskText.textContent = text;

  const currentDate = new Date();
  //Sets origin date for item
  const taskDate = document.createElement("div");
  taskDate.style.fontSize = "12px";
  taskDate.style.marginTop = "0.5em";
  taskDate.style.fontWeight = "400";
  taskDate.textContent = currentDate.toLocaleString([], {
    dateStyle: `medium`,
    timeStyle: `short`,
  });

  ////////////////////////////////////
  //Trying to make a deadline countdown:
  /*
  //Deadline countdown
  const deadlineDate = new Date(currentDate + 7).getTime();
  let x = setInterval(function () {
    //
    let distance = deadlineDate - currentDate;
    //
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    //
    deadlineDate.textContent = distance.toLocaleString();
  });
  */
  ////////////////////////////////////

  //Directly editing a task item text.
  taskText.addEventListener("click", () => {
    taskText.contentEditable = true;
    taskText.focus();
  });

  //Append the checkbox and task text to the task item
  taskItem.appendChild(checkBox);
  taskItem.appendChild(taskText);
  taskItem.appendChild(taskDate);

  //Add the new task to the task list
  taskList.appendChild(taskItem);

  //Changes taskItem backgroundcolor when checkbox is checked.
  checkBox.addEventListener("change", () => {
    if (checkBox.checked) {
      taskItem.style.backgroundColor = "#f4828c";
      taskItem.style.color = "white";
      taskItem.classList.add("shake-animation");
      //deleteButton.style.backgroundColor = "";
    } else {
      taskItem.style.backgroundColor = "";
      taskItem.style.color = "";
      taskItem.classList.remove("shake-animation");
      //deleteButton.style.backgroundColor = "#fdcfb7";
    }
  });

  //Clear the input field
  taskInput.value = "";

  //Pushing all items to myTasks
  myTasks.push({
    taskItem,
    checkBox,
    text,
    taskDate: taskDate.textContent,
    // deadlineDate: deadlineDate.textContent,
  });
};

////////////////////////

//Loading local storage for every list item.
//Needs to be located here because addTask is a arrow function.
const loadFromLocalStorage = () => {
  const todos = JSON.parse(localStorage.getItem("todo")) || [];

  for (const todo of todos) {
    addTask(todo);

    const { checkBox } = myTasks[myTasks.length - 1];

    checkBox.addEventListener("change", () => {
      if (checkBox.checked) {
        taskItem.style.backgroundColor = "#f4828c";
        taskItem.style.color = "white";
        taskItem.classList.add("shake-animation");
        //deleteButton.style.backgroundColor = "";
      } else {
        taskItem.style.backgroundColor = "";
        taskItem.style.color = "";
        taskItem.classList.remove("shake-animation");
        //deleteButton.style. = "#fdcfb7";
      }
    });
  }
};
loadFromLocalStorage();

///////////////////////

//Delete one or several task(s) :
const deleteTask = () => {
  //Remove tasks where checkbox is checked.
  for (const { checkBox, taskItem } of myTasks)
    if (checkBox.checked) {
      taskItem.remove();
    }
  //Look through myTasks with filter method for checked boxes to be removed.
  myTasks = myTasks.filter((task) => !task.checkBox.checked);
};

///////////////////////

//Event Handlers
addTaskBtn.addEventListener("click", () => {
  addTask(taskInput.value);
  updateLocalStorage();
});
//Enter keydown to add item
taskInput.addEventListener("keydown", (event) => {
  if (event.keyCode === enter) {
    event.preventDefault();
    addTask(taskInput.value);
    updateLocalStorage();
  }
});

deleteButton.addEventListener("click", () => {
  deleteTask();
  updateLocalStorage();
});
//Backspace keydown to delete item
taskList.addEventListener("keydown", (event) => {
  if (event.keyCode === backspace) {
    event.preventDefault();
    deleteTask();
    updateLocalStorage();
  }
});
