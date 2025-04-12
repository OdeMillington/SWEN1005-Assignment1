rightBtn = document.querySelector("#moveRight");
leftBtn = document.querySelector("#moveLeft");

const calendarArea = document.querySelector(".calendarArea");
const inputTaskBox = document.querySelector(".inputTaskBox");
const addTask = document.querySelector("#addTask");
const container = document.querySelector(".container");
const header = document.querySelector(".header");
const globalAddTaskBtn = document.querySelector(".globalAddTaskBtn");

globalAddTaskBtn.addEventListener("click", () => {
  inputTaskBox.style.display = "block";
  document.querySelector("#startDate").parentElement.style.display = "block";
  document.querySelector("#startDate").valueAsDate = new Date();
});

tasks = JSON.parse(localStorage.getItem("tasks"));
selectedTask = {};

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

  const statsButton = document.createElement("button");
  statsButton.textContent = "View Statistics";
  statsButton.onclick = () => (window.location.href = "taskStatistics.html");
  calendarArea.appendChild(statsButton);

  for (let i = 0; i < 7; i++) {
    const dateClass = document.createElement("div");
    const dateContainer = document.createElement("div");
    const accordion = document.createElement("div");
    const taskList = document.createElement("div");

    dateClass.classList.add("date");
    dateContainer.classList.add("dateContainer");
    accordion.classList.add("accordion");
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

        const priorityBuble = document.createElement("div");
        priorityBuble.classList.add("priorityBuble");

        if (tasks[fmtDate].priority[index] == "1") {
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

        const taskText = document.createElement("span");
        taskText.textContent = task;

        const categoryLabel = document.createElement("span");
        categoryLabel.classList.add("categoryLabel");
        categoryLabel.classList.add(
          tasks[fmtDate].category[index].replace(" ", "-")
        );
        categoryLabel.textContent = tasks[fmtDate].category[index];

        taskItem.appendChild(priorityBuble);
        taskItem.appendChild(taskText);
        taskItem.appendChild(categoryLabel);

        taskList.appendChild(taskItem);

        taskItem.addEventListener("click", () => {
          selectedTask = {
            title: tasks[fmtDate].task[index],
            description: tasks[fmtDate].taskDescription[index],
            dueDate: tasks[fmtDate].dueDate[index],
            priority: tasks[fmtDate].priority[index],
            status: tasks[fmtDate].status[index],
            completionDate: tasks[fmtDate].completionDate[index],
            category: tasks[fmtDate].category[index],
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
      const startDate = new Date(tmpDate);
      const day = String(startDate.getDate()).padStart(2, "0");
      const month = String(startDate.getMonth() + 1).padStart(2, "0");
      const year = String(startDate.getFullYear()).slice(-2);
      tempDate = `${day}${month}${year}`;

      document.querySelector("#startDate").parentElement.style.display = "none";
    });

    calendarArea.appendChild(dateClass);
    dateClass.appendChild(dateContainer);
    accordion.appendChild(addTaskBtn);
    accordion.appendChild(taskList);
    dateClass.appendChild(accordion);
  }
};

function showModal() {
  document.getElementById("validationModal").style.display = "block";
}

function closeModal() {
  document.getElementById("validationModal").style.display = "none";
}

addTask.addEventListener("click", () => {
  const taskTitleValue = document.querySelector("#taskTitle").value;
  const startDateField = document.querySelector("#startDate");
  const dueDateValue = document.querySelector("#dueDate").value;
  const priorityValue = document.querySelector("#priority").value;
  const statusValue = document.querySelector("#status").value;
  const taskDescriptionValue = document.querySelector("#taskDescription").value;
  const categoryValue = document.querySelector("#category").value;

  if (
    !taskTitleValue ||
    (!tempDate && !startDateField.value) ||
    !dueDateValue
  ) {
    showModal();
    return;
  }

  let formattedStartDate;
  if (tempDate) {
    formattedStartDate = tempDate;
  } else {
    const startDate = new Date(startDateField.value);
    startDate.setDate(startDate.getDate() + 1);
    const day = String(startDate.getDate()).padStart(2, "0");
    const month = String(startDate.getMonth() + 1).padStart(2, "0");
    const year = String(startDate.getFullYear()).slice(-2);
    formattedStartDate = `${day}${month}${year}`;
  }

  if (!tasks[formattedStartDate]) {
    tasks[formattedStartDate] = {
      task: [],
      taskDescription: [],
      priority: [],
      dueDate: [],
      status: [],
      completionDate: [],
      category: [],
    };
  }

  tasks[formattedStartDate].task.push(taskTitleValue);
  tasks[formattedStartDate].taskDescription.push(taskDescriptionValue);
  tasks[formattedStartDate].priority.push(priorityValue);
  tasks[formattedStartDate].dueDate.push(dueDateValue);
  tasks[formattedStartDate].status.push(statusValue);
  tasks[formattedStartDate].completionDate.push(
    statusValue === "Completed" ? new Date().toISOString() : null
  );
  tasks[formattedStartDate].category.push(categoryValue);

  localStorage.setItem("tasks", JSON.stringify(tasks));
  location.reload();
  inputTaskBox.style.display = "none";
});

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
                  completionDate: [],
                };
              }

              completedTasks[date].task.push(task);
              completedTasks[date].taskDescription.push(
                tasks[date].taskDescription[index]
              );
              completedTasks[date].priority.push(tasks[date].priority[index]);
              completedTasks[date].dueDate.push(tasks[date].dueDate[index]);
              completedTasks[date].status.push(tasks[date].status[index]);
              completedTasks[date].completionDate.push(
                tasks[date].completionDate
                  ? tasks[date].completionDate[index]
                  : null
              );
            }
          });
        }

        localStorage.setItem("completedTasks", JSON.stringify(completedTasks));
        window.location.href = "completedTask.html";
      } else {
        //Remove later
        console.log("Swipe right");
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
                  category: [],
                  setDate: [],
                  completionDate: [],
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
              upcomingHighPriorityTasks[date].category.push(
                tasks[date].category[index]
              );
              upcomingHighPriorityTasks[date].completionDate.push(
                tasks[date].completionDate
                  ? tasks[date].completionDate[index]
                  : null
              );
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

// fuzzy search using regular expressions (originally planned on using fuse js)
// Source for regex: https://stackoverflow.com/questions/44460201/regex-for-search-a-more-refined-fuzzy-search
function fuzzySearch(query, text) {
  if (!query || !text) return false;
  query = query.toLowerCase();
  text = text.toLowerCase();
  
  let pattern = '';
  for (let char of query) {
    pattern += char + '.*';
  }
  
  return new RegExp(pattern).test(text);
}

function displaySearchResults(query, priority = '', status = '') {
  searchResults.innerHTML = '';
  
  if (query === '' && !priority && !status) {
    searchResults.style.display = 'none';
    return;
  }

  searchResults.style.display = 'block';

  const searchHeader = document.createElement('div');
  searchHeader.classList.add('searchHeader');
  
  const closeBtn = document.createElement('div');
  closeBtn.textContent = 'X';
  closeBtn.classList.add('closeSearch');
  closeBtn.addEventListener('click', () => {
    searchResults.style.display = 'none';
    searchInput.value = '';
    priorityFilter.value = '';
    statusFilter.value = '';
  });
  
  searchHeader.appendChild(closeBtn);
  searchResults.appendChild(searchHeader);

  const filterControls = document.createElement('div');
  filterControls.classList.add('filterControls');
  
  const priorityFilter = document.createElement('select');
  priorityFilter.innerHTML = `
    <option value="">All Priorities</option>
    <option value="1">Critical</option>
    <option value="2">Urgent</option>
    <option value="3">High Priority</option>
    <option value="4">Medium Priority</option>
    <option value="5">Low Priority</option>
  `;
  priorityFilter.value = priority;

  const statusFilter = document.createElement('select');
  statusFilter.innerHTML = `
    <option value="">All Statuses</option>
    <option value="Pending">Pending</option>
    <option value="In-progress">In-Progress</option>
    <option value="Completed">Completed</option>
  `;
  statusFilter.value = status;

  filterControls.appendChild(priorityFilter);
  filterControls.appendChild(statusFilter);
  searchResults.appendChild(filterControls);

  priorityFilter.addEventListener('change', () => {
    displaySearchResults(query, priorityFilter.value, statusFilter.value);
  });

  statusFilter.addEventListener('change', () => {
    displaySearchResults(query, priorityFilter.value, statusFilter.value);
  });

  const results = [];
  for (let date in tasks) {
    tasks[date].task.forEach((task, index) => {
      const matchesSearch = query === '' || fuzzySearch(query, task);
      const matchesPriority = !priority || tasks[date].priority[index] === priority;
      const matchesStatus = !status || tasks[date].status[index] === status;

      if (matchesSearch && matchesPriority && matchesStatus) {
        results.push({ task, date, index });
      }
    });
  }

  results.forEach(({ task, date, index }) => {
    const resultItem = document.createElement('div');
    resultItem.classList.add('taskItem');
    
    const priorityBubble = document.createElement('div');
    priorityBubble.classList.add('priorityBuble');
    
    const taskPriority = tasks[date].priority[index];
    if (taskPriority === "1") {
      priorityBubble.style.backgroundColor = "#E63946";
    } else if (taskPriority === "2") {
      priorityBubble.style.backgroundColor = "orange";
    } else if (taskPriority === "3") {
      priorityBubble.style.backgroundColor = "#008080";
    } else if (taskPriority === "4") {
      priorityBubble.style.backgroundColor = "#6A0DAD";
    } else {
      priorityBubble.style.backgroundColor = "grey";
    }

    const taskText = document.createElement('span');
    taskText.textContent = task;

    resultItem.appendChild(priorityBubble);
    resultItem.appendChild(taskText);

    resultItem.addEventListener('click', () => {
      const formattedDate = new Date(
        "20" + date.slice(-2),
        parseInt(date.substring(2, 4)) - 1,
        parseInt(date.substring(0, 2))
      );

      selectedTask = {
        title: task,
        description: tasks[date].taskDescription[index],
        dueDate: tasks[date].dueDate[index],
        priority: tasks[date].priority[index],
        status: tasks[date].status[index],
        category: tasks[date].category[index],
        completionDate: tasks[date].completionDate ? tasks[date].completionDate[index] : null,
        setDate: date,
        setDateFormat: formattedDate,
        index: index,
      };

      localStorage.setItem("selectedTask", JSON.stringify(selectedTask));
      window.location.href = "taskDetails.html";
    });

    searchResults.appendChild(resultItem);
  });
}

searchInput.addEventListener('input', (e) => {
  displaySearchResults(e.target.value);
});

generateCalendar();
