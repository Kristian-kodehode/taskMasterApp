"use strict";
/*
====================================
//Issues:
1. 
Klarte ikke å få dato og tid til å beholde
sin originale dato og tid ved refresh page.
!!FIXED!!

2.
-

Oppsumering.
localStorage er fortsatt krevende. Jeg forstår 
formålet og nytten i det, men det er å bruke det
som gjør det litt utfordrende.
Føles som at jeg overkompliserte løsning av oppgaven
og koden kunne vært mer optimalisert. 
Klarte til slutt å fikse time / date problemet, men
det var mer komplisert enn som så. Krevde endel hjelp
fra både google og chatGpt.
====================================
*/

////////////////////////////////////

// Fetch HTML elements
const taskInput = document.querySelector("#inputType");
const addTaskBtn = document.querySelector("#inputSubmit");
const taskList = document.querySelector("#taskList");
const deleteButton = document.querySelector("#deleteButton");

// Array to handle tasks
let myTasks = [];

// Update local storage for each task added
const updateLocalStorage = () => {
  localStorage.setItem("todo", JSON.stringify(myTasks));
};

////////////////////////////////////
// FUNCTIONS

// Add task
const addTask = (text, timeStamp) => {
  const taskItem = createTaskItem();
  const checkBox = createCheckBox();
  const taskText = createTaskText(text);
  const taskDate = createTaskDate(timeStamp);

  taskText.addEventListener("click", editTaskText);
  taskText.addEventListener("input", updateTaskText);

  taskItem.appendChild(checkBox);
  taskItem.appendChild(taskText);
  taskItem.appendChild(taskDate);
  taskList.appendChild(taskItem);

  checkBox.addEventListener("change", handleCheckBoxChange);

  taskInput.value = "";

  myTasks.push({
    taskItem,
    checkBox,
    text,
    timeStamp,
  });

  updateLocalStorage();
};

// Create task item
const createTaskItem = () => {
  const taskItem = document.createElement("li");
  //Can use enter to go to next line when writing
  taskItem.style.whiteSpace = "pre-line";
  taskItem.classList.add("taskItemStyling");
  return taskItem;
};

// Create checkbox
const createCheckBox = () => {
  const checkBox = document.createElement("input");
  checkBox.type = "checkbox";
  checkBox.name = "taskCheckBox";
  checkBox.id = "myCheckbox";
  checkBox.classList.add("custom-checkbox");
  return checkBox;
};

// Create task text
const createTaskText = (text) => {
  const taskText = document.createElement("span");
  taskText.textContent = text;
  return taskText;
};

// Create task date
const createTaskDate = (timeStamp) => {
  const taskDate = document.createElement("div");
  taskDate.style.fontSize = "12px";
  taskDate.style.marginTop = "0.5em";
  taskDate.style.fontWeight = "400";
  taskDate.textContent = timeStamp;
  return taskDate;
};

// Directly edit tasktext
const editTaskText = (event) => {
  const taskText = event.target;
  taskText.contentEditable = true;
  taskText.focus();
  updateLocalStorage();
};

// Updates task with latest text edit
const updateTaskText = (event) => {
  const taskText = event.target;
  myTasks.forEach((task) => {
    if (task.taskItem === taskText.parentNode) {
      task.text = taskText.textContent;
    }
  });
  updateLocalStorage();
};

// Changes the visual of the checkbox by state
const handleCheckBoxChange = (event) => {
  const checkBox = event.target;
  const taskItem = checkBox.parentNode;
  if (checkBox.checked) {
    taskItem.style.backgroundColor = "#f4828c";
    taskItem.style.color = "white";
    taskItem.classList.add("shake-animation");
  } else {
    taskItem.style.backgroundColor = "";
    taskItem.style.color = "";
    taskItem.classList.remove("shake-animation");
  }
};

// Delete task
const deleteTask = () => {
  for (const { checkBox, taskItem } of myTasks) {
    if (checkBox.checked) {
      taskItem.remove();
    }
  }
  myTasks = myTasks.filter((task) => !task.checkBox.checked);
  updateLocalStorage();
};

////////////////////////////////////
//EVENT HANDLERS

// Task input field
taskInput.addEventListener("input", () => {
  addTaskBtn.disabled = taskInput.value === "";
});

// Add task button
addTaskBtn.addEventListener("click", (event) => {
  if (taskInput.value === "") {
    event.preventDefault();
  } else {
    const timeStamp = new Date().toLocaleString([], {
      dateStyle: "medium",
      timeStyle: "medium",
    });
    addTask(taskInput.value, timeStamp);
    taskInput.value = "";
  }
});

// Delete task button
deleteButton.addEventListener("click", () => {
  deleteTask();
});

////////////////////////////////////
// Load tasks from local storage
const loadFromLocalStorage = () => {
  const storedTasks = JSON.parse(localStorage.getItem("todo")) || [];

  for (const storedTask of storedTasks) {
    addTask(storedTask.text, storedTask.timeStamp);
  }
};

loadFromLocalStorage();
