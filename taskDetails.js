const taskDetails = JSON.parse(localStorage.getItem("selectedTask"))

const tasktitle = document.querySelector(".task-title")
const taskdescription = document.querySelector("#task-description")
const taskduedate = document.querySelector("#task-due-date")
const taskpriority = document.querySelector("#task-priority")
const taskstatus = document.querySelector("#task-status")
const startdate = document.querySelector("#start-date")

tasktitle.innerHTML = " " + taskDetails.title
taskdescription.innerHTML = " " + taskDetails.description
taskduedate.innerHTML = " " + taskDetails.dueDate
taskpriority.innerHTML = " " + taskDetails.priority
taskstatus.innerHTML = " " + taskDetails.status
startdate.innerHTML = " " + taskDetails.setDate


const returnHomeBtn = document.querySelector("#returnHomeBtn")
returnHomeBtn.addEventListener("click", () => {
    window.location.href = 'index.html'
})