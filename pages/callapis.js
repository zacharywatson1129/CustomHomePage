var owmKey = '53368451312c1b1b9a9d66b407d066be';

var weatherItems;

var hourlyForecast = "https://pro.openweathermap.org/data/2.5/forecast/hourly?q=Gustine,TX&appid=" + owmKey;

var bgImg = "";
var apiCall = 'https://pixabay.com/api/?key=5493635-8300921d011275a8906d2c6d3&q=roses&image_type=photo';
$.getJSON(apiCall, loadBackgroundImage);

var weatherApiCall = 'http://api.openweathermap.org/data/2.5/weather?zip=76455&appid=53368451312c1b1b9a9d66b407d066be';
$.getJSON(weatherApiCall, weatherFunc);

var d = new Date();
var n = d.getHours();

function loadBackgroundImage(picData) {
    bgImg = picData.hits[0].largeImageURL;
    var bgElements = document.getElementsByClassName('hero-image');
    var author = picData.hits[0].user;
    bgElements[0].style.backgroundImage = "url(" + bgImg + ")";
    document.getElementById("author").innerHTML = author;
}

function weatherFunc(weatherData) {
    var k = weatherData.main.temp;
    k = parseFloat(k);
    var f = kToF(k);
    weatherItems = document.getElementsByClassName("weather2");
    document.getElementById("location").innerHTML = weatherData.name;
    document.getElementById("temperature").innerHTML = Math.round(f) + "&#176F";
    document.getElementById("condition").innerHTML = weatherData.weather[0].main;
}

function kToF(k) {
    return (k - 273.15) * 1.8 + 32;
}
