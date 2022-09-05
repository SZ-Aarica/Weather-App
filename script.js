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
let temp = document.querySelector("#temperature");
let apiKey = "74e718c96dc64467c77303080c47c11d";
let humidity = document.querySelector("#humidity");
