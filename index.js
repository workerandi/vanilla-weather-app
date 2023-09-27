function updatedPage(response) {
  let icon = document.querySelector("#icon").innerHTML;
  document.querySelector("#cityDisplayed").innerHTML = response.data.city;
  document.querySelector("#temperature").innerHTML =
    Math.round(response.data.temperature.current) + " °C";
  document.querySelector("#windSpeed").innerHTML =
    Math.round(response.data.wind.speed) + "km/h";
  document.querySelector("#description").innerHTML =
    response.data.condition.description;
}
function newCity(event) {
  event.preventDefault();
  let apiKey = "of4be206ff10d3a71a40t7bf74fdc933";
  let city = document.querySelector("#searchBar").value;
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(updatedPage);
}

let searchCity = document.querySelector("#inputForm");
searchCity.addEventListener("submit", newCity);
