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

  const returnHomeBtn = document.querySelector("#returnHomeBtn")
  returnHomeBtn.addEventListener("click", () => {
    window.location.href = "index.html";
  });

  // Count tasks by status and priority
  Object.values(tasks).forEach((dateEntry) => {
    dateEntry.task.forEach((_, index) => {
      if (dateEntry.status[index] === "Completed") {
        completedCount++;
      } else {
        pendingCount++;
      }

      let priority;
      if (dateEntry.priority[index] === "1") {
        priority = "Critical";
      } else if (dateEntry.priority[index] === "2") {
        priority = "Urgent";
      } else if (dateEntry.priority[index] === "3") {
        priority = "High Priority";
      } else if (dateEntry.priority[index] === "4") {
        priority = "Medium Priority";
      } else {
        priority = "Low Priority";
      }
      priorityCounts[priority]++;
    });
  });

  // Update count displays
  document.getElementById("completedCount").textContent = completedCount;
  document.getElementById("pendingCount").textContent = pendingCount;

  // Create bar chart
  const ctx = document.getElementById("priorityChart").getContext("2d");
  new Chart(ctx, {
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
          ticks: {
            stepSize: 1,
          },
        },
      },
      plugins: {
        title: {
          display: true,
          text: "Task Count By Priority",
        },
      },
    },
  });
});
