rightBtn = document.querySelector("#moveRight");
leftBtn = document.querySelector("#moveLeft");

const calendarArea = document.querySelector(".calendarArea");
const inputTaskBox = document.querySelector(".inputTaskBox")

// CloseBtn for add task popup
const closeBtn = document.querySelector("#closeBtn")
closeBtn.addEventListener("click", () => {
  inputTaskBox.style.display = "none"
})

currentDate = new Date();

const generateCalendar = () => {
  for (let i = 0; i < 7; i++) {
    const accordion = document.createElement("div");
    const dateContainer = document.createElement("div");
    const dateClass = document.createElement("div");

    dateClass.classList.add("date");
    accordion.classList.add("accordion");
    dateContainer.classList.add("dateContainer");

    // Sets temporary date to update each date bar as the loop runs
    let tmpDate = new Date(currentDate);
    tmpDate.setDate(currentDate.getDate() + i);

    dateContainer.textContent = tmpDate.toDateString();

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
      } else {
        accordion.style.display = "none";
      }
    };

    const addTaskBtn = document.createElement("button")
    addTaskBtn.classList.add("addTaskBtn")
    addTaskBtn.innerHTML = "Add Task";
    addTaskBtn.addEventListener("click", () => {
      if (inputTaskBox.style.display == "none") {
        inputTaskBox.style.display = "block";
      } else {
        inputTaskBox.style.display = "none";
      }
    })

    calendarArea.appendChild(dateClass);
    dateClass.appendChild(dateContainer);
    dateClass.appendChild(accordion);
    accordion.appendChild(addTaskBtn)
  }
};

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