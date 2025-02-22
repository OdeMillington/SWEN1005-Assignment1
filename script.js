rightBtn = document.querySelector("#moveRight");
leftBtn = document.querySelector("#moveLeft");
const calendarArea = document.querySelector(".calendarArea");

currentDate = new Date();

const generateCalendar = () => {
  for (let i = 0; i < 7; i++) {
    const dateContainer = document.createElement("div");
    dateContainer.classList.add("dateContainer");

    // Sets temporary date to update each date bar as the loop runs
    let tmpDate = new Date(currentDate);
    tmpDate.setDate(currentDate.getDate() + i);

    console.log(tmpDate)

    dateContainer.textContent = tmpDate.toDateString();
    calendarArea.appendChild(dateContainer)

  }
};



// Handles switching date using buttons

rightBtn.addEventListener("click", () => {
    dateController("right")
})

leftBtn.addEventListener("click", () => {
    dateController("left")
})

const dateController = (direction) => {

    calendarArea.textContent = ''

    if (direction == "left") {
        currentDate.setDate(currentDate.getDate() - 7)
    } else {
        currentDate.setDate(currentDate.getDate() + 7)
    }

    generateCalendar()
}

generateCalendar()
