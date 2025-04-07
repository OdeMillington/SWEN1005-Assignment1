document.addEventListener("DOMContentLoaded", () => {
  const taskTitle = document.querySelector(".task-title");
  const startDate = document.querySelector("#start-date");
  const description = document.querySelector("#task-description");
  const dueDate = document.querySelector("#task-due-date");
  const priority = document.querySelector("#task-priority");
  const status = document.querySelector("#task-status");
  const prevBtn = document.querySelector(".prevBtn");
  const nextBtn = document.querySelector(".nextBtn");
  const returnHomeBtn = document.querySelector("#returnHomeBtn");

  let tasks = JSON.parse(localStorage.getItem("tasks")) || {};
  let taskList = [];
  let currentIndex = 0;

  const convertDate = (date) => {
    let day = date.substring(0, 2);
    let month = date.substring(2, 4);
    let year = "20" + date.substring(4, 6);

    let dateObj = new Date(year, month - 1, day);
    const monthNames = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    return `${monthNames[dateObj.getMonth()]} ${dateObj.getDate()}, ${dateObj.getFullYear()}`;
  };

  for (let date in tasks) {
    tasks[date].task.forEach((task, index) => {
      if (tasks[date].status[index] === "Completed") {
        taskList.push({
          title: task,
          startDate: date,
          description: tasks[date].taskDescription[index],
          dueDate: tasks[date].dueDate[index],
          priority: tasks[date].priority[index],
          status: tasks[date].status[index]
        });
      }
    });
  }

  const updateTaskDetails = () => {
    if (taskList.length === 0) {
      taskTitle.textContent = "No Completed Tasks";
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
    dueDate.textContent = task.dueDate;
    priority.textContent = task.priority;
    status.textContent = task.status;
  };

  prevBtn.addEventListener("click", () => {
    if (currentIndex > 0) {
      currentIndex--;
      updateTaskDetails();
    }
  });

  nextBtn.addEventListener("click", () => {
    if (currentIndex < taskList.length - 1) {
      currentIndex++;
      updateTaskDetails();
    }
  });

  returnHomeBtn.addEventListener("click", () => {
    window.location.href = "index.html";
  });

  updateTaskDetails();
});
