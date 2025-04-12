const taskDetails = JSON.parse(localStorage.getItem("selectedTask"));
const tasks = JSON.parse(localStorage.getItem("tasks"));

const formatDate = (date) => {
  date = new Date(date);

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
  newDate = `${monthName} ${date.getDate()}, ${date.getFullYear()}`;
  return newDate;
};

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
taskduedate.innerHTML = formatDate(taskDetails.dueDate);
taskpriority.innerHTML = taskDetails.priority;

const taskcompletion = document.querySelector("#task-completion-date");
if (taskDetails.completionDate) {
  taskcompletion.innerHTML = formatDate(taskDetails.completionDate);
} else {
  taskcompletion.innerHTML = "Not Completed";
}

if (taskDetails.priority == "1") {
  taskpriority.innerHTML = "Critical";
} else if (taskDetails.priority == "2") {
  taskpriority.innerHTML = "Urgent";
} else if (taskDetails.priority == "3") {
  taskpriority.innerHTML = "High Priority";
} else if (taskDetails.priority == "4") {
  taskpriority.innerHTML = "Medium Priority";
} else {
  taskpriority.innerHTML = "Low Priority";
}

taskstatus.innerHTML = taskDetails.status;
startdate.innerHTML = formatDate(taskDetails.setDateFormat);
startdateOtherFormat = formatDates(new Date(startdate.innerHTML));
index = taskDetails.index;

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
document.querySelector("#editCategory").value = taskDetails.category;

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

function showModal() {
  document.getElementById("validationModal").style.display = "block";
}

function closeModal() {
  document.getElementById("validationModal").style.display = "none";
}

const addTask = document.querySelector("#addTask");

addTask.addEventListener("click", () => {
  const taskTitleValue = document.querySelector("#taskTitle").value;
  const dueDateValue = document.querySelector("#dueDate").value;
  const priorityValue = document.querySelector("#priority").value;
  const statusValue = document.querySelector("#status").value;
  const taskDescriptionValue = document.querySelector("#taskDescription").value;
  const newCategory = document.querySelector("#editCategory").value;

  if (!taskTitleValue || !dueDateValue) {
    showModal();
    return;
  }

  tasks[startdateOtherFormat].task[index] = taskTitleValue;
  tasks[startdateOtherFormat].dueDate[index] = dueDateValue;
  tasks[startdateOtherFormat].priority[index] = priorityValue;
  tasks[startdateOtherFormat].status[index] = statusValue;
  tasks[startdateOtherFormat].taskDescription[index] = taskDescriptionValue;
  tasks[startdateOtherFormat].category[index] = newCategory;

  if (!tasks[startdateOtherFormat].completionDate) {
    tasks[startdateOtherFormat].completionDate = new Array(
      tasks[startdateOtherFormat].task.length
    ).fill(null);
  }

  if (statusValue === "Completed") {
    const today = new Date().toISOString();
    tasks[startdateOtherFormat].completionDate[index] = today;
    taskDetails.completionDate = today;

    const taskcompletionElement = document.querySelector(
      "#task-completion-date"
    );
    if (taskcompletionElement) {
      taskcompletionElement.innerHTML = formatDate(today);
    }
  } else {
    tasks[startdateOtherFormat].completionDate[index] = null;
    taskDetails.completionDate = null;

    const taskcompletionElement = document.querySelector(
      "#task-completion-date"
    );
    if (taskcompletionElement) {
      taskcompletionElement.innerHTML = "Not Completed";
    }
  }

  localStorage.setItem("tasks", JSON.stringify(tasks));
  localStorage.setItem("selectedTask", JSON.stringify(taskDetails));

  taskDetails.title = taskTitleValue;
  taskDetails.description = taskDescriptionValue;
  taskDetails.dueDate = dueDateValue;
  taskDetails.priority = priorityValue;
  taskDetails.status = statusValue;
  taskDetails.completionDate =
    tasks[startdateOtherFormat].completionDate[index];
  taskDetails.category = newCategory;
  document.querySelector("#task-category").textContent = newCategory;

  localStorage.setItem("selectedTask", JSON.stringify(taskDetails));

  tasktitle.innerHTML = taskTitleValue;
  taskdescription.innerHTML = taskDescriptionValue;
  taskduedate.innerHTML = formatDate(dueDateValue);
  taskpriority.innerHTML = priorityValue;
  taskstatus.innerHTML = statusValue;

  if (tasks[startdateOtherFormat].completionDate[index]) {
    taskcompletion.innerHTML = formatDate(
      tasks[startdateOtherFormat].completionDate[index]
    );
  } else {
    taskcompletion.innerHTML = "Not Completed";
  }

  inputTaskBox.style.display = "none";
});

const navigateTask = (direction) => {
  const allTasks = [];
  for (let date in tasks) {
    tasks[date].task.forEach((task, idx) => {
      allTasks.push({
        title: task,
        description: tasks[date].taskDescription[idx],
        dueDate: tasks[date].dueDate[idx],
        priority: tasks[date].priority[idx],
        status: tasks[date].status[idx],
        completionDate: tasks[date].completionDate
          ? tasks[date].completionDate[idx]
          : null,
        category: tasks[date].category[idx],
        setDate: date,
        setDateFormat: new Date(
          "20" + date.slice(-2),
          parseInt(date.substring(2, 4)) - 1,
          date.substring(0, 2)
        ),
        index: idx,
      });
    });
  }

  const currentTaskIndex = allTasks.findIndex(
    (task) =>
      task.setDate === taskDetails.setDate && task.index === taskDetails.index
  );

  if (currentTaskIndex !== -1) {
    const newIndex = currentTaskIndex + direction;
    if (newIndex >= 0 && newIndex < allTasks.length) {
      localStorage.setItem("selectedTask", JSON.stringify(allTasks[newIndex]));
      location.reload();
    }
  }
};

let startY = 0;

document.addEventListener("touchstart", (e) => {
  startY = e.touches[0].clientY;
});

document.addEventListener("touchend", (e) => {
  const endY = e.changedTouches[0].clientY;
  const diffY = endY - startY;
  const minMove = 50;

  if (Math.abs(diffY) > minMove) {
    if (diffY > 0) {
      navigateTask(-1);
    } else {
      navigateTask(1);
    }
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const taskCategory = document.querySelector("#task-category");
  if (taskDetails.category) {
    taskCategory.textContent = taskDetails.category;
  }

  const editCategorySelect = document.querySelector("#editCategory");
  if (taskDetails.category) {
    editCategorySelect.value = taskDetails.category;
  }
});
