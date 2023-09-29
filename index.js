function updateTime() {
  let now = new Date();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let currentDay = days[now.getDay()];
  let timeDisplay = document.querySelector("#currentTime");
  let hours = now.getHours().toString().padStart(2, "0");
  let minutes = now.getMinutes().toString().padStart(2, "0");
  let time = `${currentDay} ${hours}:${minutes}`;
  timeDisplay.textContent = time;
}
updateTime();
setInterval(updateTime, 60000);

function displayTemperature(response) {
  let temperatureElement = document.querySelector("#temperature");
  let icon = document.querySelector("#icon");
  let cityDisplayed = document.querySelector("#cityDisplayed");
  let windSpeed = document.querySelector("#windSpeed");
  let description = document.querySelector("#description");

  celsiusTemp = response.data.temperature.current;

  temperatureElement.innerHTML = Math.round(`${celsiusTemp} °C`);
  windSpeed.innerHTML = Math.round(response.data.wind.speed) + "km/h";
  description.innerHTML = response.data.condition.description;
  cityDisplayed.innerHTML = response.data.city;
  icon.setAttribute(
    "src",
    `https://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.icon}.png`
  );
}

function convertFTemperature(event) {
  event.preventDefault();
  let temperature = document.querySelector("#temperature");
  let farenheitTemp = Math.round((celsiusTemp * 9) / 5 + 32);
  temperature.innerHTML = farenheitTemp;
}
function convertCTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemp);
}

function search(event) {
  event.preventDefault();
  let apiKey = "of4be206ff10d3a71a40t7bf74fdc933";
  let city = document.querySelector("#searchBar").value;
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
}

let celsiusTemp = null;

let searchCity = document.querySelector("#inputForm");
searchCity.addEventListener("submit", search);

let fButton = document.querySelector("#fButton");
fButton.addEventListener("click", convertFTemperature);

let cButton = document.querySelector("#cButton");
cButton.addEventListener("click", convertCTemperature);
