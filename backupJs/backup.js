//!!!!BACKUP!!!!//

"use strict";

/*
====================================
//Issues:
1. 
Klarte ikke å få dato og tid til å beholde
sin originale dato og tid ved refresh page.

2.
-

Oppsumering.
localStorage er fortsatt krevende. Jeg forstår 
formålet og nytten i det, men det er å bruke det
som gjør det litt utfordrende.
Føles som at jeg overkompliserte løsning av oppgaven
og koden kunne vært mer optimalisert. 
====================================
*/

////////////////////////////////////
//FETCH HTML ELEMENTS

const taskInput = document.querySelector("#inputType");
const addTaskBtn = document.querySelector("#inputSubmit");
const taskList = document.querySelector("#taskList");
const deleteButton = document.querySelector("#deleteButton");

////////////////////////
//DECLARE

const enter = 13;
const backspace = 8;
let myTasks = [];

////////////////////////
//FUNCTION : UPDATE LOCALSTORAGE FOR EACH TASK ADDED
//FEIL?
const updateLocalStorage = () => {
  localStorage.setItem(
    "todo",
    JSON.stringify(myTasks.map((task) => task.text))
  );
};

////////////////////////
//FUNCTION : ADD TASK

const addTask = (text) => {
  const taskItem = document.createElement("li");
  //Takes line breaks created with "enter" into account.
  taskItem.style.whiteSpace = "pre-line";
  //Related to styling of taskItem.
  taskItem.classList.add("taskItemStyling");

  ////////////////////////////////////
  //CREATE CHECKBOX

  const checkBox = document.createElement("input");
  checkBox.type = "checkbox";
  checkBox.name = "taskCheckBox";
  checkBox.id = "myCheckbox";
  checkBox.classList.add("custom-checkbox");

  ////////////////////////////////////
  //SPAN FOR EACH TASK

  const taskText = document.createElement("span");
  taskText.textContent = text;

  ////////////////////////////////////
  //DATE AND TIME
  /*
  let currentDate = new Date();
  const timeStamp = currentDate.toLocaleString([], {
    dateStyle: `medium`,
    timeStyle: `medium`,
  });
  //Sets origin date for item
  const taskDate = document.createElement("div");
  taskDate.style.fontSize = "12px";
  taskDate.style.marginTop = "0.5em";
  taskDate.style.fontWeight = "400";
  taskDate.textContent = timeStamp;
*/
  ////////////////////////////////////
  //DIRECTLY EDIT CREATED TASKTEXT

  taskText.addEventListener("click", () => {
    taskText.contentEditable = true;
    taskText.focus();
    updateLocalStorage();
  });

  ////////////////////////////////////
  //UPDATES WITH LATEST TEXT EDIT

  taskText.addEventListener("input", () => {
    myTasks.forEach((task) => {
      if (task.taskItem === taskItem) {
        task.text = taskText.textContent;
      }
    });
    updateLocalStorage();
  });

  ////////////////////////////////////
  //APPENDS

  taskItem.appendChild(checkBox);
  taskItem.appendChild(taskText);
  // taskItem.appendChild(taskDate);
  taskList.appendChild(taskItem);

  ////////////////////////////////////
  //CHECKBOX EVENTHANDLING w/STYLING

  checkBox.addEventListener("change", () => {
    if (checkBox.checked) {
      taskItem.style.backgroundColor = "#f4828c";
      taskItem.style.color = "white";
      taskItem.classList.add("shake-animation");
    } else {
      taskItem.style.backgroundColor = "";
      taskItem.style.color = "";
      taskItem.classList.remove("shake-animation");
    }
  });

  ////////////////////////////////////
  //CLEARS INPUT FIELD

  taskInput.value = "";

  ////////////////////////////////////
  //PUSH ITEMS TO myTask

  myTasks.push({
    taskItem,
    checkBox,
    text,
    // taskDate,
  });
};
////////////////////////
//FUNCTION : LOAD LOCALSTORAGE FOR EACH ITEM CREATED
//Located here because addTask = arrow function.

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
      } else {
        taskItem.style.backgroundColor = "";
        taskItem.style.color = "";
        taskItem.classList.remove("shake-animation");
      }
    });
  }
};
loadFromLocalStorage();

///////////////////////
//FUNCTION : DELETE TASK

const deleteTask = () => {
  for (const { checkBox, taskItem } of myTasks)
    if (checkBox.checked) {
      taskItem.remove();
    }
  myTasks = myTasks.filter((task) => !task.checkBox.checked);
};

///////////////////////
//EVENT HANDLERS

//
taskInput.addEventListener("input", () => {
  addTaskBtn.disabled = taskInput.value === "";
});

//
addTaskBtn.addEventListener("click", (event) => {
  if (taskInput.value === "") {
    event.preventDefault();
  } else {
    addTask(taskInput.value);
    updateLocalStorage();
    taskInput.value = "";
  }
});

//
deleteButton.addEventListener("click", () => {
  deleteTask();
  updateLocalStorage();
});

////////////////////////
//KEYDOWNS NOT USED BECAUSE IT DIDNT REALLY MAKE THAT MUCH SENSE.

////////////////////////////////////
//Enter keydown to add item

// taskInput.addEventListener("keydown", (event) => {
//   if (event.keyCode === enter) {
//     event.preventDefault();
//     addTask(taskInput.value);
//     updateLocalStorage();
//   }
// });

////////////////////////////////////
//Backspace keydown to delete item

// taskList.addEventListener("keydown", (event) => {
//   if (event.keyCode === backspace) {
//     event.preventDefault();
//     deleteTask();
//     updateLocalStorage();
//   }
// });
