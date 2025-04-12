document.addEventListener("DOMContentLoaded", () => {
  const taskTitle = document.querySelector(".task-title");
  const startDate = document.querySelector("#start-date");
  const description = document.querySelector("#task-description");
  const dueDate = document.querySelector("#task-due-date");
  const priority = document.querySelector("#task-priority");
  const status = document.querySelector("#task-status");
  const returnHomeBtn = document.querySelector("#returnHomeBtn");

  let tasks = JSON.parse(localStorage.getItem("upcomingHighPriorityTasks"));
  let taskList = [];
  let currentIndex = 0;

  const convertDate = (date) => {
    let day = date.substring(0, 2);
    let month = date.substring(2, 4);
    let year = "20" + date.substring(4, 6);

    let dateObj = new Date(year, month - 1, day);

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
    let monthName = monthNames[dateObj.getMonth()];
    newDate = `${monthName} ${dateObj.getDate()}, ${dateObj.getFullYear()}`;
    return newDate;
  };

  const formatDate = (date) => {
    const dateObj = new Date(date);
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
    return `${
      monthNames[dateObj.getMonth()]
    } ${dateObj.getDate()}, ${dateObj.getFullYear()}`;
  };

  for (let date in tasks) {
    tasks[date].task.forEach((task, index) => {
      const dueDate = new Date(tasks[date].dueDate[index]);
      if (
        tasks[date].priority[index] === "3" &&
        tasks[date].status[index] !== "Completed" &&
        dueDate > new Date()
      ) {
        taskList.push({
          title: task,
          startDate: date,
          description: tasks[date].taskDescription[index],
          dueDate: tasks[date].dueDate[index],
          priority: tasks[date].priority[index],
          status: tasks[date].status[index],
          completionDate: tasks[date].completionDate[index],
          category: tasks[date].category[index]
        });
      }
    });
  }

  const updateTaskDetails = () => {
    if (taskList.length === 0) {
      taskTitle.textContent = "No High Priority Tasks";
      startDate.textContent = "";
      description.textContent = "";
      dueDate.textContent = "";
      priority.textContent = "";
      status.textContent = "";
      return;
    }

    let task = taskList[currentIndex];
    taskTitle.textContent = task.title;
    startDate.textContent = convertDate(task.startDate);
    description.textContent = task.description;
    dueDate.textContent = formatDate(task.dueDate);
    status.textContent = task.status;

    if (task.priority == "1") {
      priority.textContent = "Critical";
      priority.style.color = "#E63946";
    } else if (task.priority == "2") {
      priority.textContent = "Urgent";
      priority.style.color = "orange";
    } else if (task.priority == "3") {
      priority.textContent = "High Priority";
      priority.style.color = "#008080";
    } else if (task.priority == "4") {
      priority.textContent = "Medium Priority";
      priority.style.color = "#6A0DAD";
    } else {
      priority.textContent = "Low Priority";
      priority.style.color = "grey";
    }

    const completionDateElement = document.querySelector(
      "#task-completion-date"
    );
    if (task.completionDate) {
      completionDateElement.textContent = formatDate(task.completionDate);
    } else {
      completionDateElement.textContent = "Not Completed";
    }

    const taskCategory = document.querySelector("#task-category");
    if (taskCategory && task.category) {
      taskCategory.textContent = task.category;
    }
  };

  returnHomeBtn.addEventListener("click", () => {
    window.location.href = "index.html";
  });

  const viewDetailsBtn = document.querySelector("#viewDetailsBtn");
  if (viewDetailsBtn) {
    viewDetailsBtn.addEventListener("click", () => {
      const selectedTask = {
        title: taskList[currentIndex].title,
        description: taskList[currentIndex].description,
        dueDate: taskList[currentIndex].dueDate,
        priority: taskList[currentIndex].priority,
        status: taskList[currentIndex].status,
        completionDate: taskList[currentIndex].completionDate,
        category: taskList[currentIndex].category,
        setDate: taskList[currentIndex].startDate,
        setDateFormat: new Date(
          "20" + taskList[currentIndex].startDate.slice(-2),
          parseInt(taskList[currentIndex].startDate.substring(2, 4)) - 1,
          parseInt(taskList[currentIndex].startDate.substring(0, 2))
        ),
        index: currentIndex,
      };
      localStorage.setItem("selectedTask", JSON.stringify(selectedTask));
      window.location.href = "taskDetails.html";
    });
  }

  updateTaskDetails();

  let startY = 0;

  document.addEventListener("touchstart", (e) => {
    startY = e.touches[0].clientY;
  });

  document.addEventListener("touchend", (e) => {
    const endY = e.changedTouches[0].clientY;
    const diffY = endY - startY;
    const minMove = 50;

    if (Math.abs(diffY) > minMove) {
      if (diffY > 0 && currentIndex > 0) {
        currentIndex--;
        updateTaskDetails();
      } else if (diffY < 0 && currentIndex < taskList.length - 1) {
        currentIndex++;
        updateTaskDetails();
      }
    }
  });
});
