const taskDetails = JSON.parse(localStorage.getItem("selectedTask"));
const tasks = JSON.parse(localStorage.getItem("tasks"));

const tasktitle = document.querySelector(".task-title");
const taskdescription = document.querySelector("#task-description");
const taskduedate = document.querySelector("#task-due-date");
const taskpriority = document.querySelector("#task-priority");
const taskstatus = document.querySelector("#task-status");
const startdate = document.querySelector("#start-date");
const editTaskBtn = document.querySelector(".editTaskBtn");
const inputTaskBox = document.querySelector(".inputTaskBox");

// popup form
const taskTitleInput = document.querySelector("#taskTitle");
const taskDescriptionInput = document.querySelector("#taskDescription");
const dueDateInput = document.querySelector("#dueDate");
const priorityInput = document.querySelector("#priority");
const statusInput = document.querySelector("#status");

tasktitle.innerHTML = taskDetails.title;
taskdescription.innerHTML = taskDetails.description;
taskduedate.innerHTML = taskDetails.dueDate;
taskpriority.innerHTML = taskDetails.priority;
taskstatus.innerHTML = taskDetails.status;
startdate.innerHTML = taskDetails.setDate;
index = taskDetails.index;

// Sets all the form to the existing info so it makes editing easier
taskTitleInput.value = taskDetails.title;
taskDescriptionInput.value = taskDetails.description;
dueDateInput.value = taskDetails.dueDate;
priorityInput.value = taskDetails.priority;
statusInput.value = taskDetails.status;

const returnHomeBtn = document.querySelector("#returnHomeBtn");
returnHomeBtn.addEventListener("click", () => {
  window.location.href = "index.html";
});

editTaskBtn.addEventListener("click", () => {
  inputTaskBox.style.display = "block";
});

// Close button for add task popup
const closeBtn = document.querySelector("#closeBtn");
closeBtn.addEventListener("click", () => {
  inputTaskBox.style.display = "none";
});

const addTask = document.querySelector("#addTask");

addTask.addEventListener("click", () => {
  const taskTitleValue = document.querySelector("#taskTitle").value;
  const dueDateValue = document.querySelector("#dueDate").value;
  const priorityValue = document.querySelector("#priority").value;
  const statusValue = document.querySelector("#status").value;
  const taskDescriptionValue = document.querySelector("#taskDescription").value;

  tasks[startdate.innerHTML].task[index] = taskTitleValue;
  tasks[startdate.innerHTML].dueDate[index] = dueDateValue;
  tasks[startdate.innerHTML].priority[index] = priorityValue;
  tasks[startdate.innerHTML].status[index] = statusValue;
  tasks[startdate.innerHTML].taskDescription[index] = taskDescriptionValue;

  localStorage.setItem("tasks", JSON.stringify(tasks));

  taskDetails.title = taskTitleValue;
  taskDetails.description = taskDescriptionValue;
  taskDetails.dueDate = dueDateValue;
  taskDetails.priority = priorityValue;
  taskDetails.status = statusValue;

  localStorage.setItem("selectedTask", JSON.stringify(taskDetails));

  tasktitle.innerHTML = taskTitleValue;
  taskdescription.innerHTML = taskDescriptionValue;
  taskduedate.innerHTML = dueDateValue;
  taskpriority.innerHTML = priorityValue;
  taskstatus.innerHTML = statusValue;

  inputTaskBox.style.display = "none"

});
