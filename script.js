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
let windSpeed = document.querySelector("#wind");

function getCoordination(coordinates) {
  let oneCallApi = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=5f472b7acba333cd8a035ea85a0d4d4c&units=metric`;
  axios.get(oneCallApi).then(function (response) {
    let forcastData = response.data.daily;
    let forcastElement = document.querySelector(".next-days");
    let forcast = "";

    function correctDay(dt) {
      let date = new Date(dt * 1000);
      let day = date.getDay();
      let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

      return days[day];
    }
    forcastData.forEach(function (data, index) {
      if (index < 5) {
        forcast =
          forcast +
          `     
                <li>
                  ${correctDay(data.dt)}
                  <img
                    class="forcast-image"
                    src="http://openweathermap.org/img/wn/${
                      data.weather[0].icon
                    }@2x.png"
                    alt=""
                  />
                  <br />
                  <span class="max-forcast-temp">${Math.round(
                    data.temp.min
                  )}</span>/
                  <span class="min-forcast-temp">${Math.round(
                    data.temp.max
                  )}</span>
                </li>
              `;
        forcastElement.innerHTML = forcast;
      }
    });
  });
}

function showWeather(city) {
  let Url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(Url).then(function (response) {
    celciusElement = Math.round(response.data.main.temp);
    temperature.innerHTML = celciusElement;
    description.innerHTML = response.data.weather[0].description;
    humidity.innerHTML = response.data.main.humidity;
    wind.innerHTML = response.data.wind.speed;

    if (response.data.weather[0].description.includes("cloud")) {
      document.getElementById("image").src = "img/cloudy.svg";
    } else if (response.data.weather[0].description.includes("rain")) {
      document.getElementById("image").src = "img/rain.svg";
    } else if (response.data.weather[0].description.includes("snow")) {
      document.getElementById("image").src = "img/snow.svg";
    } else {
      document.getElementById("image").src = "img/sunny.svg";
    }

    getCoordination(response.data.coord);
  });
}

function showCityName(e) {
  e.preventDefault();
  let input = document.querySelector("#search");
  farenheitLink.classList.add("active");
  let cityName = document.querySelector(".city-name");
  cityName.innerHTML = input.value;
  showWeather(input.value);
}

let form = document.querySelector(".search-bar");
form.addEventListener("submit", showCityName);
//GeoLocation-button-------------------------------------------------------

function getLocation(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let UrlTwo = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

  axios.get(UrlTwo).then(function (response) {
    description.innerHTML = response.data.weather[0].description;
    temperature.innerHTML = Math.round(response.data.main.temp);
    humidity.innerHTML = response.data.main.humidity;
    let cityName = document.querySelector(".city-name");
    cityName.innerHTML = response.data.name;
    if (response.data.weather[0].description.includes("cloud")) {
      document.getElementById("image").src = "img/cloudy.svg";
    } else if (response.data.weather[0].description.includes("rain")) {
      document.getElementById("image").src = "img/rain.svg";
    } else if (response.data.weather[0].description.includes("snow")) {
      document.getElementById("image").src = "img/snow.svg";
    } else if (response.data.weather[0].description.includes("mist")) {
      document.getElementById("image").src = "img/mist.svg";
    } else {
      document.getElementById("image").src = "img/sunny.svg";
    }
    getCoordination(response.data.coord);
  });
}
function displayCurrentTemp() {
  navigator.geolocation.getCurrentPosition(getLocation);
}

let button = document.querySelector("#button");
button.addEventListener("click", displayCurrentTemp);
//---------------------------------------------------

let celciusElement = null;
let celciusLink = document.querySelector("#celcius");
let farenheitLink = document.querySelector("#farenheit");
farenheitLink.addEventListener("click", function (event) {
  temperature.innerHTML = Math.round(celciusElement * 9.5 + 32);
  farenheitLink.classList.remove("active");
  celciusLink.classList.add("active");
});
celciusLink.addEventListener("click", function (event) {
  temperature.innerHTML = celciusElement;

  farenheitLink.classList.add("active");
  celciusLink.classList.remove("active");
});

//---------------------------------------------------------
