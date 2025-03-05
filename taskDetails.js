const taskDetails = JSON.parse(localStorage.getItem("selectedTask"));
const tasks = JSON.parse(localStorage.getItem("tasks"));

const formatDate = (date) => {
  date = new Date(date)

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let monthName = monthNames[date.getMonth()];
  newDate  = `${monthName} ${date.getDate()}, ${date.getFullYear()}`;
  return newDate
}


// Formatting to the date format to access each day
const formatDates = (date) => {
  day = String(date.getDate()).padStart(2, "0");
  month = String(date.getMonth() + 1).padStart(2, "0");
  year = String(date.getFullYear()).slice(-2);
  return `${day}${month}${year}`;
};


// console.log(taskDetails.setDateFormat)

const tasktitle = document.querySelector(".task-title");
const taskdescription = document.querySelector("#task-description");
const taskduedate = document.querySelector("#task-due-date");
const taskpriority = document.querySelector("#task-priority");
const taskstatus = document.querySelector("#task-status");
const startdate = document.querySelector("#start-date");
const editTaskBtn = document.querySelector(".editTaskBtn");
const inputTaskBox = document.querySelector(".inputTaskBox");

tasktitle.innerHTML = taskDetails.title;
taskdescription.innerHTML = taskDetails.description;
taskduedate.innerHTML = taskDetails.dueDate;
taskpriority.innerHTML = taskDetails.priority;
taskstatus.innerHTML = taskDetails.status;
startdate.innerHTML = formatDate(taskDetails.setDateFormat)
startdateOtherFormat = formatDates(new Date(startdate.innerHTML))
index = taskDetails.index;

// popup form
const taskTitleInput = document.querySelector("#taskTitle");
const taskDescriptionInput = document.querySelector("#taskDescription");
const dueDateInput = document.querySelector("#dueDate");
const priorityInput = document.querySelector("#priority");
const statusInput = document.querySelector("#status");


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

  tasks[startdateOtherFormat].task[index] = taskTitleValue;
  tasks[startdateOtherFormat].dueDate[index] = dueDateValue;
  tasks[startdateOtherFormat].priority[index] = priorityValue;
  tasks[startdateOtherFormat].status[index] = statusValue;
  tasks[startdateOtherFormat].taskDescription[index] = taskDescriptionValue;

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

  inputTaskBox.style.display = "none";
});

// TODO: Find way to make it go across differnet days
const prevBtn = document.querySelector(".prevBtn");
const nextBtn = document.querySelector(".nextBtn");

prevBtn.addEventListener("click", () => navigateTask(-1));
nextBtn.addEventListener("click", () => navigateTask(1));

const navigateTask = (amt) => {
  const currentTasks = tasks[taskDetails.setDate].task; // to check later if at the end of the tasks
  newIndex = taskDetails.index + amt;

  if (newIndex >= 0 && newIndex < currentTasks.length) {
    taskDetails.index = newIndex;
    taskDetails.title = tasks[taskDetails.setDate].task[newIndex];
    taskDetails.description = tasks[taskDetails.setDate].taskDescription[newIndex];
    taskDetails.dueDate = tasks[taskDetails.setDate].dueDate[newIndex];
    taskDetails.priority = tasks[taskDetails.setDate].priority[newIndex];
    taskDetails.status = tasks[taskDetails.setDate].status[newIndex];

    localStorage.setItem("selectedTask", JSON.stringify(taskDetails));
    location.reload()
  } else {
    newIndex = 0
    let date = new Date(taskDetails.setDateFormat)
    let date2 = new Date(taskDetails.setDateFormat) // date object format

    if (amt == 1) {
      date.setDate(date.getDate() + 1)
      date2.setDate(date2.getDate() + 1)
    } else {
      date.setDate(date.getDate() - 1)
      date2.setDate(date2.getDate() - 1)
    }
    
    date = formatDates(date)  // format for accessing
    console.log(taskDetails)


    // work on easier way but works for now
    taskDetails.title = tasks[date].task[0]
    taskDetails.description = tasks[date].taskDescription[0]
    taskDetails.dueDate = tasks[date].dueDate[0]
    taskDetails.priority = tasks[date].priority[0]
    taskDetails.status = tasks[date].status[0]
    taskDetails.setDate = date
    taskDetails.setDateFormat = date2
    taskDetails.index = 0

    localStorage.setItem("selectedTask", JSON.stringify(taskDetails))
    location.reload()

  }
};
