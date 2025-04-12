// Did chart using chartjs
document.addEventListener("DOMContentLoaded", () => {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || {};
  let completedCount = 0;
  let pendingCount = 0;
  const priorityCounts = {
    Critical: 0,
    Urgent: 0,
    "High Priority": 0,
    "Medium Priority": 0,
    "Low Priority": 0,
  };

  const returnHomeBtn = document.querySelector("#returnHomeBtn");
  returnHomeBtn.addEventListener("click", () => {
    window.location.href = "index.html";
  });

  Object.values(tasks).forEach((dateEntry) => {
    dateEntry.task.forEach((_, index) => {
      if (dateEntry.status[index] === "Completed") {
        completedCount++;
      } else {
        pendingCount++;
      }

      let priority = getPriorityLabel(dateEntry.priority[index]);
      priorityCounts[priority]++;
    });
  });

  document.getElementById("completedCount").textContent = completedCount;
  document.getElementById("pendingCount").textContent = pendingCount;

  const ctxPriority = document.getElementById("priorityChart").getContext("2d");
  new Chart(ctxPriority, {
    type: "bar",
    data: {
      labels: Object.keys(priorityCounts),
      datasets: [
        {
          label: "Tasks by Priority",
          data: Object.values(priorityCounts),
          backgroundColor: [
            "#E63946",
            "#FF8C00",
            "#008080",
            "#6A0DAD",
            "#808080",
          ],
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
          ticks: { stepSize: 1 },
        },
      },
      plugins: {
        title: {
          display: true,
          text: "Task Count By Priority",
        },
      },
      barPercentage: 0.6,
      maxBarThickness: 50,
    },
  });
});

function getPriorityLabel(priority) {
  switch (priority) {
    case "1":
      return "Critical";
    case "2":
      return "Urgent";
    case "3":
      return "High Priority";
    case "4":
      return "Medium Priority";
    default:
      return "Low Priority";
  }
}
