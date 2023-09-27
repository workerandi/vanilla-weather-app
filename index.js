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

function updatedPage(response) {
  let icon = document.querySelector("#icon");
  let cityDisplayed = document.querySelector("#cityDisplayed");
  let temperature = document.querySelector("#temperature");
  let windSpeed = document.querySelector("#windSpeed");
  let description = document.querySelector("#description");

  cityDisplayed.innerHTML = response.data.city;
  let celsiusTemperature = Math.round(response.data.temperature.current);
  temperature.innerHTML = `${celsiusTemperature} °C`;
  windSpeed.innerHTML = Math.round(response.data.wind.speed) + "km/h";
  description.innerHTML = response.data.condition.description;
  icon.setAttribute(
    "src",
    `https://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.icon}.png`
  );
}

function newCity(event) {
  event.preventDefault();
  let apiKey = "of4be206ff10d3a71a40t7bf74fdc933";
  let city = document.querySelector("#searchBar").value;
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(updatedPage);
}

function getDefaultLocation() {
  navigator.geolocation.getCurrentPosition(function getCoords(position) {
    let apiKey = "of4be206ff10d3a71a40t7bf74fdc933";
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    let reverseGeocodeUrl = `https://api.shecodes.io/weather/v1/reverse?lat=${latitude}&lon=${longitude}&key=${apiKey}`;

    axios.get(reverseGeocodeUrl).then(function (response) {
      let city = response.data.city;
      document.querySelector("#searchBar").value = city;
      newCity({ preventDefault: function () {} });
    });
  });
}

let searchCity = document.querySelector("#inputForm");
searchCity.addEventListener("submit", newCity);
getDefaultLocation();
let unitButton = document.querySelector("#unitButton");
unitButton.addEventListener("click", convertTemperature);
