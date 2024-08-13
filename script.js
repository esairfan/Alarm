const hourMenu = document.getElementById("hourMenu");
const minuteMenu = document.getElementById("minuteMenu");
const situationMenu = document.getElementById("situationMenu");
const timeElement = document.getElementById("time");
const situation = document.getElementById("situation");
const hourElement = document.getElementById("hour");
const minuteElement = document.getElementById("minute");
const secondElement = document.getElementById("second");
const song = document.getElementById("song");
const setAlarmButton = document.querySelector("button");

let alarmHour = null;
let alarmMinute = null;
let alarmSituation = null;
 
for (let i = 12; i > 0; i--) {
  let value = i < 10 ? "0" + i : i;
  let option = `<option value="${value}">${value}</option>`;
  hourMenu.insertAdjacentHTML("beforeend", option);
}

for (let i = 0; i < 60; i++) {
  let value = i < 10 ? "0" + i : i;
  let minuteOption = `<option value="${value}">${value}</option>`;
  minuteMenu.insertAdjacentHTML("beforeend", minuteOption);
}
 
setInterval(() => {
  let presentTime = new Date();
  let presentHours = presentTime.getHours();
  let presentMinutes = presentTime.getMinutes();
  let presentSeconds = presentTime.getSeconds();
  let isPM = presentHours >= 12;

  if (isPM) {
    situation.textContent = "PM";
    if (presentHours > 12) presentHours -= 12;
  } else {
    situation.textContent = "AM";
    if (presentHours === 0) presentHours = 12;
  }

  let formattedHours = presentHours < 10 ? "0" + presentHours : presentHours;
  let formattedMinutes = presentMinutes < 10 ? "0" + presentMinutes : presentMinutes;
  let formattedSeconds = presentSeconds < 10 ? "0" + presentSeconds : presentSeconds;

  hourElement.textContent = formattedHours;
  minuteElement.textContent = formattedMinutes;
  secondElement.textContent = formattedSeconds;
 
  if (alarmHour !== null && alarmMinute !== null && alarmSituation !== null) {
    let currentHour = presentHours < 10 ? "0" + presentHours : presentHours;
    let currentMinute = presentMinutes < 10 ? "0" + presentMinutes : presentMinutes;
    let currentSituation = isPM ? "PM" : "AM";

    if (currentHour == alarmHour && currentMinute == alarmMinute && currentSituation == alarmSituation) {
      song.play();
      
      alarmHour = null;
      alarmMinute = null;
      alarmSituation = null;

      hourMenu.value = 'Hour';
      minuteMenu.value = 'Minute';
      situationMenu.value = 'AM/PM';
    }
  }
}, 1000);


setAlarmButton.addEventListener("click", () => {
  let selectedHour = hourMenu.value;
  let selectedMinute = minuteMenu.value;
  let selectedSituation = situationMenu.value;

  if (selectedHour == "Hour" || selectedMinute == "Minute" || selectedSituation == "AM/PM") {
    alert("Please select valid values for hour, minute, and AM/PM.");
    return;
  }

  alarmHour = selectedHour;
  alarmMinute = selectedMinute;
  alarmSituation = selectedSituation;

  alert(`Alarm set for ${alarmHour}:${alarmMinute} ${alarmSituation}`);
});
