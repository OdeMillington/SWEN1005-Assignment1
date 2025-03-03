  rightBtn = document.querySelector("#moveRight");
  leftBtn = document.querySelector("#moveLeft");

  const calendarArea = document.querySelector(".calendarArea");
  const inputTaskBox = document.querySelector(".inputTaskBox");
  const addTask = document.querySelector("#addTask");

  tasks = {}
  tempDate = ''
  tempTaskList = []

  const formatDate = (date) => {
    day = String(date.getDate()).padStart(2, "0");
    month = String(date.getMonth() + 1).padStart(2, "0");
    year = String(date.getFullYear()).slice(-2);
    
    return `${day}${month}${year}`;
  };


  // CloseBtn for add task popup
  const closeBtn = document.querySelector("#closeBtn");
  closeBtn.addEventListener("click", () => {
    inputTaskBox.style.display = "none";
  });

  currentDate = new Date();

  const generateCalendar = () => {
    for (let i = 0; i < 7; i++) {
      const accordion = document.createElement("div");
      const dateContainer = document.createElement("div");
      const dateClass = document.createElement("div");
      const taskList = document.createElement("ul");

      dateClass.classList.add("date");
      accordion.classList.add("accordion");
      dateContainer.classList.add("dateContainer");
      taskList.classList.add("taskList");

      // Sets temporary date to update each date bar as the loop runs
      let tmpDate = new Date(currentDate);
      tmpDate.setDate(currentDate.getDate() + i);

      monthNum = tmpDate.getMonth()
      monthName = '';

      switch (monthNum+1) {
        case 1: monthName = "January"; break;
        case 2: monthName = "February"; break;
        case 3: monthName = "March"; break;
        case 4: monthName = "April"; break;
        case 5: monthName = "May"; break;
        case 6: monthName = "June"; break;
        case 7: monthName = "July"; break;
        case 8: monthName = "August"; break;
        case 9: monthName = "September"; break;
        case 10: monthName = "October"; break;
        case 11: monthName = "November"; break;
        case 12: monthName = "December"; break;
      }

      dateContainer.textContent = `${monthName} ${tmpDate.getDate()}, ${tmpDate.getFullYear()}`

      if (tasks[tempDate]) {
        tasks[tempDate].task.forEach((task, index) => {
          const taskItem = document.createElement("li");
          taskItem.textContent = `${task} - ${tasks[tempDate].priority[index]}`;
          taskList.appendChild(taskItem);
        });
      }
  
  
      // Handles closing/opening accordion
      dateContainer.onclick = () => {
        const allAccordions = document.querySelectorAll(".accordion");

        allAccordions.forEach((unclickedAccordion) => {
          if (unclickedAccordion != accordion) {
            unclickedAccordion.style.display = "none";
          }
        });

        if (accordion.style.display === "none") {
          accordion.style.display = "block";
          accordion.classList.add("accordionToggled")
          dateContainer.classList.add("accordionToggledDate")
        } else {
          accordion.style.display = "none";
          accordion.classList.remove("accordionToggled")
          dateContainer.classList.remove("accordionToggledDate")
        }
      };

      const addTaskBtn = document.createElement("button");
      addTaskBtn.classList.add("addTaskBtn");
      addTaskBtn.classList.add("addTaskBtn")
      addTaskBtn.innerHTML = "Add Task";
      addTaskBtn.addEventListener("click", () => {
        if (inputTaskBox.style.display == "none") {
          inputTaskBox.style.display = "block";
          tempDate = formatDate(tmpDate)
          tempTaskList = taskList;
        } else {
          inputTaskBox.style.display = "none";
        }
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
        status: []
      };
    }

    tasks[tempDate].task.push(taskTitleValue);
    tasks[tempDate].taskDescription.push(taskDescriptionValue);
    tasks[tempDate].priority.push(priorityValue);
    tasks[tempDate].dueDate.push(dueDateValue);
    tasks[tempDate].status.push(statusValue);

  const taskItem = document.createElement("div");
  taskItem.classList.add("taskItem")
  const priorityBuble = document.createElement("div")
  priorityBuble.classList.add("priorityBuble")

  if (priorityValue == '1') {
    priorityBuble.setAttribute("style", "background-color:#E63946")
  } else if (priorityValue == "2") {
    priorityBuble.setAttribute("style", "background-color:orange")
  } else {
    priorityBuble.setAttribute("style", "background-color:#008080")
  }

  taskItem.textContent = `${taskTitleValue}`;
  tempTaskList.appendChild(taskItem);
  taskItem.appendChild(priorityBuble)
    
  });

  // Handles switching date using buttons

  leftBtn.addEventListener("click", () => {
    dateController("left");
  });

  rightBtn.addEventListener("click", () => {
    dateController("right");
  });

  const dateController = (direction) => {
    calendarArea.textContent = "";

    if (direction == "left") {
      currentDate.setDate(currentDate.getDate() - 7);
    } else {
      currentDate.setDate(currentDate.getDate() + 7);
    }

    generateCalendar();
  };

  generateCalendar();
