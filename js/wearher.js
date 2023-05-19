const api = "abf7b427dfdc1baa7fad1748e3aaf0e8";
const timezoneApi = "RGTDZ6WMYXXJ";
let url = "";
let timezone = "";

const temp = document.querySelector(".graduce");
const date = document.querySelector(".date");
const city = document.querySelector(".name_weather");

const success = function(position) {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;
  url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&lang=ru&units=metric&appid=${api}`;
  console.log(url); // отладочное сообщение
  weather();
  getTimezone(lat, lon);
};

navigator.geolocation.getCurrentPosition(success);

const weather = function() {
  $.ajax({
    method: "GET",
    url: url,
  }).done(function(ans) {
    console.log(ans); // отладочное сообщение
    temp.innerHTML = ans.main.temp.toFixed(1) + "°C";
    city.innerHTML = ans.name;
  });
};

const getTimezone = function(lat, lon) {
  $.ajax({
    method: "GET",
    url: `https://api.timezonedb.com/v2.1/get-time-zone?key=${timezoneApi}&format=json&by=position&lat=${lat}&lng=${lon}`,
  }).done(function(ans) {
    console.log(ans); // отладочное сообщение
    timezone = ans.gmtOffset;
    setInterval(()=>{date.innerHTML = ans.formatted}, 1000);
  });
};

