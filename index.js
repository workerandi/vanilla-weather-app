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

function search(event) {
  event.preventDefault();
  let apiKey = "of4be206ff10d3a71a40t7bf74fdc933";
  let city = document.querySelector("#searchBar").value;
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
}

function convertFTemperature(event) {
  event.preventDefault();
  let temperature = document.querySelector("#temperature");
  let farenheitTemp = Math.round((celsiusTemp * 9) / 5 + 32);
  //let highLow = document.querySelector("#highLow");
  //highLow.innerHTML = "working";
  temperature.innerHTML = farenheitTemp;
}
function convertCTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemp);
}

function displayForecast(response) {
  console.log(response);
  let forecastTemp = document.querySelector("#forecastTemp");
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  let days = ["Sat", "Sun", "Mon", "Tues", "Wed", "Thurs"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `<div class="col forecast ">
            <p>${day}</p>
            <img class="forecastIcons" src="src/sun-regular.svg" />
        <div class="row">
          <p class="forcastTemp">${forecastTemp} </P>
        </div>
          </div>`;
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "of4be206ff10d3a71a40t7bf74fdc933";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?lon=${coordinates.lon}&lat=${coordinates.lat}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}
function displayTemperature(response) {
  let temperatureElement = document.querySelector("#temperature");
  let cityDisplayed = document.querySelector("#cityDisplayed");
  let description = document.querySelector("#description");
  let icon = document.querySelector("#icon");
  let windSpeed = document.querySelector("#windSpeed");
  let humidity = document.querySelector("#humidity");

  celsiusTemp = response.data.temperature.current;

  temperatureElement.innerHTML = Math.round(celsiusTemp);
  cityDisplayed.innerHTML = response.data.city;
  description.innerHTML = response.data.condition.description;
  icon.setAttribute("src", response.data.condition.icon_url);
  windSpeed.innerHTML = Math.round(response.data.wind.speed) + " km/h";
  humidity.innerHTML = response.data.temperature.humidity + " %";
  getForecast(response.data.coordinates);
}
let celsiusTemp = null;

let searchCity = document.querySelector("#inputForm");
searchCity.addEventListener("submit", search);

let fButton = document.querySelector("#fButton");
fButton.addEventListener("click", convertFTemperature);

let cButton = document.querySelector("#cButton");
cButton.addEventListener("click", convertCTemperature);
