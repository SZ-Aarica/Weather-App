let now = new Date();
let time = document.querySelector("#time");
let min = now.getMinutes();

if (min < 10) {
  min = "0" + min;
}
time.innerHTML = now.getHours() + ":" + min;

let days = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
];

let day = now.getDay();
let today = document.querySelector("#today");
today.innerHTML = days[day - 1];

let date = document.querySelector("#date");
date.innerHTML =
  now.getMonth() + 1 + "/" + now.getDate() + "/" + now.getFullYear();
//-----------------------------------------------------------------
let description = document.querySelector("#weather");
let temperature = document.querySelector("#temperature");
let apiKey = "74e718c96dc64467c77303080c47c11d";
let humidity = document.querySelector("#humidity");

function showWeather(city) {
  let Url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(Url).then(function (response) {
    temperature.innerHTML = Math.round(response.data.main.temp);
    description.innerHTML = response.data.weather[0].description;
    humidity.innerHTML = response.data.main.humidity;

    if (response.data.weather[0].description.includes("cloud")) {
      document.getElementById("image").src = "img/cloudy.svg";
    } else if (response.data.weather[0].description.includes("rain")) {
      document.getElementById("image").src = "img/rain.svg";
    } else if (response.data.weather[0].description.includes("snow")) {
      document.getElementById("image").src = "img/snow.svg";
    } else {
      document.getElementById("image").src = "img/sunny.svg";
    }
  });
}

function showCityName(e) {
  e.preventDefault();
  let input = document.querySelector("#search");
  let cityName = document.querySelector(".city-name");
  cityName.innerHTML = input.value;
  showWeather(input.value);
}

let form = document.querySelector(".search-bar");
form.addEventListener("submit", showCityName);
