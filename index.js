"use strict";

let textArea = document.querySelector(".textArea");
const search = $(".bi");
let temp = $("#temp");
let humidity = $("#humidity");
let pressure = $("#Pressure");
let windSpeed = $("#wind");
let Weather = $("#weather");
let maxTemp = $("#max");
let img = $(".icon");
let city = $("#SearchCity");


let thirdClass = $(".third");
thirdClass.addClass('hide');
city.text('Enter city to view details');

function set(data) {
  thirdClass.removeClass('hide');
  temp.text(data.main.temp + " ");
  humidity.text(data.main.humidity + " %");
  pressure.text(data.main.pressure);
  windSpeed.text(data.wind.speed + " km/h");
  Weather.text(data.weather[0].main);
  maxTemp.text(data.main.temp_max + " ");
  const icon = data.weather[0].icon;
  city.text("Weather of : " + data.name);
  console.log(icon);
  document.querySelector(".icon").src =
    "https://openweathermap.org/img/wn/" + icon + ".png";
    if(window.innerWidth >700){
    $('body').css('background-image',`linear-gradient(rgba(0, 0, 0, 0.466) , rgba(0, 0, 0, 0.493)), url('https://source.unsplash.com/1280x957/?${data.name}')`);
    }
    else{
      $('body').css('background-image',`linear-gradient(rgba(0, 0, 0, 0.466) , rgba(0, 0, 0, 0.493)), url('https://source.unsplash.com/1280x957/?${data.name}')`);
    }
}

function getdata(city) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=7362141d39702ff6d2807139ca1b37fa&units=metric`
  )
  .then((response) => {
    if (!response.ok) {
      alert("No weather found.");
      throw new Error("No weather found.");
    }
    return response.json();
  })
    .then((data) => set(data));
}

search.click(function () {
  const text = textArea.value;
  if (text === "") {
    alert("Please enter city name first...!");
  } else {
    getdata(text);
    textArea.value="";
  }
});

textArea.addEventListener("keypress",function(event){
  if (event.key == "Enter") {
    const text = textArea.value;

    if (text === "") {
      alert("Please enter city name first...!");
    } else {
      textArea.value="";
      getdata(text);
    }
  }
});
