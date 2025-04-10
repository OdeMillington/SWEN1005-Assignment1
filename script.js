rightBtn = document.querySelector("#moveRight");
leftBtn = document.querySelector("#moveLeft");

const calendarArea = document.querySelector(".calendarArea");
const inputTaskBox = document.querySelector(".inputTaskBox");
const addTask = document.querySelector("#addTask");
const container = document.querySelector(".container");

tasks = JSON.parse(localStorage.getItem("tasks"));
selectedTask = {};

// Fixed error if localsoorage was empty
if (tasks == null) {
  tasks = {};
}

tempDate = "";

const formatDate = (date) => {
  day = String(date.getDate()).padStart(2, "0");
  month = String(date.getMonth() + 1).padStart(2, "0");
  year = String(date.getFullYear()).slice(-2);
  return `${day}${month}${year}`;
};

// Close button for add task popup
const closeBtn = document.querySelector("#closeBtn");
closeBtn.addEventListener("click", () => {
  inputTaskBox.style.display = "none";
});

currentDate = new Date();

const generateCalendar = () => {
  calendarArea.innerHTML = "";

  // Add stats button at the top
  const statsButton = document.createElement("button");
  statsButton.textContent = "View Statistics";
  statsButton.onclick = () => window.location.href = "taskStatistics.html";
  calendarArea.appendChild(statsButton);

  for (let i = 0; i < 7; i++) {
    const accordion = document.createElement("div");
    const dateContainer = document.createElement("div");
    const dateClass = document.createElement("div");
    const taskList = document.createElement("div");

    dateClass.classList.add("date");
    accordion.classList.add("accordion");
    dateContainer.classList.add("dateContainer");
    taskList.classList.add("taskList");

    let tmpDate = new Date(currentDate);
    tmpDate.setDate(currentDate.getDate() + i);
    let fmtDate = formatDate(tmpDate);

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
    let monthName = monthNames[tmpDate.getMonth()];
    dateContainer.textContent = `${monthName} ${tmpDate.getDate()}, ${tmpDate.getFullYear()}`;

    let hasOverdueTask = false;
    const today = new Date();

    if (tasks[fmtDate]) {
      tasks[fmtDate].task.forEach((task, index) => {
        const dueDate = new Date(tasks[fmtDate].dueDate[index]);

        if (dueDate < today && tasks[fmtDate].status[index] !== "Completed") {
          hasOverdueTask = true;
        }
      });
    }

    if (hasOverdueTask) {
      dateContainer.classList.add("overdueDay");
    }

    if (tasks[fmtDate]) {
      tasks[fmtDate].task.forEach((task, index) => {
        const taskItem = document.createElement("div");
        taskItem.classList.add("taskItem");
        taskItem.textContent = task;

        const priorityBuble = document.createElement("div");
        priorityBuble.classList.add("priorityBuble");

        if (tasks[fmtDate].priority[index] == "1") {
          // Set task bubble color based on priority
          priorityBuble.style.backgroundColor = "#E63946";
        } else if (tasks[fmtDate].priority[index] == "2") {
          priorityBuble.style.backgroundColor = "orange";
        } else if (tasks[fmtDate].priority[index] == "3") {
          priorityBuble.style.backgroundColor = "#008080";
        } else if (tasks[fmtDate].priority[index] == "4") {
          priorityBuble.style.backgroundColor = "#6A0DAD";
        } else {
          priorityBuble.style.backgroundColor = "grey";
        }

        taskItem.appendChild(priorityBuble);
        taskList.appendChild(taskItem);

        taskItem.addEventListener("click", () => {
          selectedTask = {
            title: tasks[fmtDate].task[index],
            description: tasks[fmtDate].taskDescription[index],
            dueDate: tasks[fmtDate].dueDate[index],
            priority: tasks[fmtDate].priority[index],
            status: tasks[fmtDate].status[index],
            completionDate: tasks[fmtDate].completionDate[index], // Added completionDate
            setDate: fmtDate,
            setDateFormat: tmpDate,
            index: index,
          };

          localStorage.setItem("selectedTask", JSON.stringify(selectedTask));
          window.location.href = "taskDetails.html";
        });
      });
    }

    dateContainer.onclick = () => {
      const allAccordions = document.querySelectorAll(".accordion");
      allAccordions.forEach((unclickedAccordion) => {
        if (unclickedAccordion != accordion) {
          unclickedAccordion.style.display = "none";
        }
      });

      if (accordion.style.display === "none") {
        accordion.style.display = "block";
        accordion.classList.add("accordionToggled");
        dateContainer.classList.add("accordionToggledDate");
      } else {
        accordion.style.display = "none";
        accordion.classList.remove("accordionToggled");
        dateContainer.classList.remove("accordionToggledDate");
      }
    };

    const addTaskBtn = document.createElement("button");
    addTaskBtn.classList.add("addTaskBtn");
    addTaskBtn.innerHTML = "Add Task";
    addTaskBtn.addEventListener("click", () => {
      inputTaskBox.style.display = "block";
      tempDate = fmtDate;
    });

    calendarArea.appendChild(dateClass);
    dateClass.appendChild(dateContainer);
    dateClass.appendChild(accordion);
    accordion.appendChild(addTaskBtn);
    accordion.appendChild(taskList);
  }
};

addTask.addEventListener("click", () => {
  const taskTitleValue = document.querySelector("#taskTitle").value;
  const dueDateValue = document.querySelector("#dueDate").value;
  const priorityValue = document.querySelector("#priority").value;
  const statusValue = document.querySelector("#status").value;
  const taskDescriptionValue = document.querySelector("#taskDescription").value;

  if (!tasks[tempDate]) {
    tasks[tempDate] = {
      task: [],
      taskDescription: [],
      priority: [],
      dueDate: [],
      status: [],
      completionDate: []
    };
  }

  tasks[tempDate].task.push(taskTitleValue);
  tasks[tempDate].taskDescription.push(taskDescriptionValue);
  tasks[tempDate].priority.push(priorityValue);
  tasks[tempDate].dueDate.push(dueDateValue);
  tasks[tempDate].status.push(statusValue);

  // Initialize completion date based on status
  if (statusValue === "Completed") {
    tasks[tempDate].completionDate.push(new Date().toISOString());
  } else {
    tasks[tempDate].completionDate.push(null);
  }

  localStorage.setItem("tasks", JSON.stringify(tasks));

  location.reload();
  inputTaskBox.style.display = "none";
});

// Update completion date when task is marked as completed
const markTaskAsCompleted = (date, index) => {
  const today = new Date().toISOString();
  tasks[date].completionDate[index] = today;
  tasks[date].status[index] = "Completed";
  localStorage.setItem("tasks", JSON.stringify(tasks));
};

// Source for Swipe functionality: https://www.youtube.com/watch?v=vChlyMwp4ek
let startX = 0;
let startY = 0;

container.addEventListener("touchstart", (e) => {
  startX = e.touches[0].clientX;
  startY = e.touches[0].clientY;
});

container.addEventListener("touchend", (e) => {
  const endX = e.changedTouches[0].clientX;
  const endY = e.changedTouches[0].clientY;
  const diffX = endX - startX;
  const diffY = endY - startY;
  const minMove = 50;

  if (Math.abs(diffX) > Math.abs(diffY)) {
    const tasks = JSON.parse(localStorage.getItem("tasks"));
    if (Math.abs(diffX) > minMove) {
      if (diffX > 0) {
        let completedTasks = {};

        for (let date in tasks) {
          tasks[date].task.forEach((task, index) => {
            if (tasks[date].status[index] === "Completed") {
              if (!completedTasks[date]) {
                completedTasks[date] = {
                  task: [],
                  taskDescription: [],
                  priority: [],
                  dueDate: [],
                  status: [],
                  completionDate: []
                };
              }

              completedTasks[date].task.push(task);
              completedTasks[date].taskDescription.push(tasks[date].taskDescription[index]);
              completedTasks[date].priority.push(tasks[date].priority[index]);
              completedTasks[date].dueDate.push(tasks[date].dueDate[index]);
              completedTasks[date].status.push(tasks[date].status[index]);
              completedTasks[date].completionDate.push(tasks[date].completionDate ? tasks[date].completionDate[index] : null);
            }
          });
        }

        localStorage.setItem("completedTasks", JSON.stringify(completedTasks));
        window.location.href = "completedTask.html";
      } else {
        console.log("Swiped right - Showing High Priority Tasks");
        upcomingHighPriorityTasks = {};

        for (let date in tasks) {
          tasks[date].task.forEach((task, index) => {
            const dueDate = new Date(tasks[date].dueDate[index]);

            if (tasks[date].priority[index] === "3" && dueDate > currentDate) {
              if (!upcomingHighPriorityTasks[date]) {
                upcomingHighPriorityTasks[date] = {
                  task: [],
                  taskDescription: [],
                  priority: [],
                  dueDate: [],
                  status: [],
                  setDate: [],
                  completionDate: []
                };
              }

              upcomingHighPriorityTasks[date].task.push(task);
              upcomingHighPriorityTasks[date].taskDescription.push(
                tasks[date].taskDescription[index]
              );
              upcomingHighPriorityTasks[date].priority.push(
                tasks[date].priority[index]
              );
              upcomingHighPriorityTasks[date].dueDate.push(
                tasks[date].dueDate[index]
              );
              upcomingHighPriorityTasks[date].status.push(
                tasks[date].status[index]
              );
              upcomingHighPriorityTasks[date].completionDate.push(tasks[date].completionDate ? tasks[date].completionDate[index] : null);
            }
          });
        }

        localStorage.setItem(
          "upcomingHighPriorityTasks",
          JSON.stringify(upcomingHighPriorityTasks)
        );
        window.location.href = "highPriorityTasks.html";
      }
    }
  } else {
    if (Math.abs(diffY) > minMove) {
      if (diffY > 0) {
        dateController("up");
      } else {
        dateController("down");
      }
    }
  }
});

const dateController = (direction) => {
  if (direction == "up") {
    currentDate.setDate(currentDate.getDate() - 7);
  } else {
    currentDate.setDate(currentDate.getDate() + 7);
  }
  generateCalendar();
};

const searchInput = document.querySelector("#searchTask");
const searchResults = document.querySelector(".search");

// Event listener for search input
searchInput.addEventListener("input", () => {
  const query = searchInput.value.toLowerCase();
  searchResults.innerHTML = "";

  if (query == "") {
    searchResults.style.display = "none";
    return;
  }

  const closeBtn = document.createElement("div");
  closeBtn.textContent = "X";
  closeBtn.style.color = "red";
  closeBtn.classList.add("closeSearch");
  closeBtn.addEventListener("click", () => {
    searchResults.style.display = "none";
    searchInput.value = "";
  });
  searchResults.append(closeBtn);
  searchResults.style.display = "block";

  for (let date in tasks) {
    tasks[date].task.forEach((task, index) => {
      if (task.toLowerCase().includes(query)) {
        const resultItem = document.createElement("div");
        resultItem.textContent = task;

        // console.log(date) 040325

        dateYear = "20" + date.slice(-2);
        dateDay = date.substring(0, 2);
        dateMonth = date.substring(2, 4);

        formattedDate = new Date(dateYear, dateMonth - 1, dateDay);

        resultItem.addEventListener("click", () => {
          selectedTask = {
            title: task,
            description: tasks[date].taskDescription[index],
            dueDate: tasks[date].dueDate[index],
            priority: tasks[date].priority[index],
            status: tasks[date].status[index],
            completionDate: tasks[date].completionDate ? tasks[date].completionDate[index] : null,
            setDate: date,
            setDateFormat: formattedDate,
            index: index,
          };

          localStorage.setItem("selectedTask", JSON.stringify(selectedTask));
          window.location.href = "taskDetails.html";
        });

        searchResults.appendChild(resultItem);
      }
    });
  }
});

generateCalendar();
