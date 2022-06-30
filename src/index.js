let now = new Date();
let h3 = document.querySelector("h3");

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

let currentDate = now.getDate();
let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let currentDay = days[now.getDay()];
let currentMonth = months[now.getMonth()];

h3.innerHTML = `Last updated: ${currentDay}, ${hours}:${minutes} `;

function showTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let icon = document.querySelector("#icon");
  document.querySelector("h1").innerHTML = `${temperature}°C`;
  document.querySelector("h2").innerHTML = response.data.name;

  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].description;

  icon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  icon.setAttribute("alt", response.data.weather[0].description);

  changeVideo(response.data.weather[0].main);
}

function searchCity(city) {
  let key = "3dce9b1c66837262a25b3f448d354a76";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}

function searchInput(event) {
  event.preventDefault();
  let city = document.querySelector("#search-city").value;
  searchCity(city);
}
function searchCurrentLocation(position) {
  let key = "3dce9b1c66837262a25b3f448d354a76";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${key}&units=metric`;

  axios.get(apiUrl).then(showTemperature);
}
function getLocation(event) {
  navigator.geolocation.getCurrentPosition(searchCurrentLocation);
}
function changeVideo(backgroundWeather) {
  let vid = document.querySelector("#my-video");
  if (backgroundWeather == "Clear") {
    vid.src = "Videos/Sun.mp4";
  }
  if (backgroundWeather == "Clouds") {
    vid.src = "Videos/Cloudy.mp4";
  }
  if (backgroundWeather == "Rain") {
    vid.src = "Videos/Rain.mp4";
  }
  if (backgroundWeather == "Snow") {
    vid.src = "Videos/Snow.mp4";
  }
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", searchInput);

let button = document.querySelector("button");
button.addEventListener("click", getLocation);

searchCity("Sydney");
