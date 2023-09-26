function updatedPage(response) {}

function newCity() {
  let city = document.querySelector("#searchBar").value;
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  let apiKey = "of4be206ff10d3a71a40t7bf74fdc933";
  axios.get(apiUrl).then(updatedPage);
}
