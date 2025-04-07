tasks[date].task.forEach((task, index) => {
  const dueDate = new Date(tasks[date].dueDate[index]);
  if (tasks[date].priority[index] === "3" && tasks[date].status[index] !== "Completed" && dueDate > new Date()) {
    if (!tasks[date].completionDate) {
      tasks[date].completionDate = new Array(tasks[date].task.length).fill(null);
    }
    taskList.push({
      title: task,
      startDate: date,
      description: tasks[date].taskDescription[index],
      dueDate: tasks[date].dueDate[index],
      priority: tasks[date].priority[index],
      status: tasks[date].status[index],
      completionDate: tasks[date].completionDate[index]
    });
  }
});