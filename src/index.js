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

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        ` 
            <div class="col-2">
              <div class="date">${formatDay(forecastDay.dt)}</div>
              <img src="http://openweathermap.org/img/wn/${
                forecastDay.weather[0].icon
              }@2x.png" 
              alt="" 
              width="70px"/>
              <div class="weather-forecast-temperature">
               <span class= "weather-forecast-temperature-max">
              ${Math.round(forecastDay.temp.max)}°|</span>
              <span class ="weather-forecast-temperature-min">
              ${Math.round(forecastDay.temp.min)}°
              </span>
              </div>
            </div>
    `;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "3dce9b1c66837262a25b3f448d354a76";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric  `;
  axios.get(apiUrl).then(displayForecast);
}

function showTemperature(response) {
  celciusTemperature = Math.round(response.data.main.temp);
  let icon = document.querySelector("#icon");

  document.querySelector(
    "#city-temperature"
  ).innerHTML = `${celciusTemperature}`;
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

  getForecast(response.data.coord);
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

function showFahrenheitTemperature(event) {
  event.preventDefault();
  let fahrenheitTemperature = (celciusTemperature * 9) / 5 + 32;
  let temperatureElement = document.querySelector("#city-temperature");
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function showCelciusTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#city-temperature");
  temperatureElement.innerHTML = celciusTemperature;
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", searchInput);

let button = document.querySelector("button");
button.addEventListener("click", getLocation);

let celciusTemperature = null;

let celciusLink = document.querySelector("#celcius-link");
celciusLink.addEventListener("click", showCelciusTemperature);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", showFahrenheitTemperature);

searchCity("Sydney");
