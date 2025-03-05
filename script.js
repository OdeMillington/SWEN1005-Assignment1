rightBtn = document.querySelector("#moveRight");
leftBtn = document.querySelector("#moveLeft");

const calendarArea = document.querySelector(".calendarArea");
const inputTaskBox = document.querySelector(".inputTaskBox");
const addTask = document.querySelector("#addTask");

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

    if (tasks[fmtDate]) {
      tasks[fmtDate].task.forEach((task, index) => {
        const taskItem = document.createElement("div");
        taskItem.classList.add("taskItem");
        taskItem.textContent = task;

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

        taskItem.appendChild(priorityBuble);
        taskList.appendChild(taskItem);

        taskItem.addEventListener("click", () => {
          selectedTask = {
            title: tasks[fmtDate].task[index],
            description: tasks[fmtDate].taskDescription[index],
            dueDate: tasks[fmtDate].dueDate[index],
            priority: tasks[fmtDate].priority[index],
            status: tasks[fmtDate].status[index],
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
  const fileUpload = document.querySelector("#fileUpload").value

  console.log(fileUpload)

  if (!tasks[tempDate]) {
    tasks[tempDate] = {
      task: [],
      taskDescription: [],
      priority: [],
      dueDate: [],
      status: [],
    };
  }

  tasks[tempDate].task.push(taskTitleValue);
  tasks[tempDate].taskDescription.push(taskDescriptionValue);
  tasks[tempDate].priority.push(priorityValue);
  tasks[tempDate].dueDate.push(dueDateValue);
  tasks[tempDate].status.push(statusValue);

  localStorage.setItem("tasks", JSON.stringify(tasks));

  const taskItem = document.createElement("div");
  taskItem.classList.add("taskItem");
  const priorityBuble = document.createElement("div");
  priorityBuble.classList.add("priorityBuble");

  if (priorityValue == "1") {
    priorityBuble.style.backgroundColor = "#E63946";
  } else if (priorityValue == "2") {
    priorityBuble.style.backgroundColor = "orange";
  } else if (priorityValue == "3") {
    priorityBuble.style.backgroundColor = "#008080";
  } else if (priorityValue == "4") {
    priorityBuble.style.backgroundColor = "#6A0DAD";
  } else {
    priorityBuble.style.backgroundColor = "grey";
  }

  taskItem.textContent = taskTitleValue;
  taskItem.appendChild(priorityBuble);

  // location.reload();
  inputTaskBox.style.display = "none";
});

leftBtn.addEventListener("click", () => {
  dateController("left");
});

rightBtn.addEventListener("click", () => {
  dateController("right");
});

const dateController = (direction) => {
  if (direction == "left") {
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
