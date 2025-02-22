rightBtn = document.querySelector("#moveRight");
leftBtn = document.querySelector("#moveLeft");

currentDate = new Date();

const generateCalendar = () => {
  for (let i = 0; i < 7; i++) {
    const calendarArea = document.querySelector(".calendarArea");

    const dateContainer = document.createElement("div");
    dateContainer.classList.add("dateContainer");

    // Sets temporary date to update each date bar as the loop runs
    let tmpDate = new Date();
    tmpDate.setDate(currentDate.getDate() + i);

    dateContainer.textContent = tmpDate.getDate();
    calendarArea.appendChild(dateContainer)

  }
};

generateCalendar()
