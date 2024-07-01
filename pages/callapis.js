var pixabayAPIKey = "5493635-8300921d011275a8906d2c6d3";
var bgImg = "";


var categories = ["roses", "mountains", "waterfalls", "landscapes", "autumn scenes"];

var selectedCategory = categories[0];
var apiCall =
    "https://pixabay.com/api/?key=" + pixabayAPIKey + "&q=" + selectedCategory + "&image_type=photo";

const bgCategoriesList = document.getElementById("bgCategoriesList");

bgCategoriesList.innerHTML = "";
// Fill out the list.
for (var i = 0; i < categories.length; i++) {
    const opt = document.createElement("option");
    opt.innerHTML = categories[i];
    bgCategoriesList.appendChild(opt);
}

// The $ is JQuery
$.getJSON(apiCall, loadBackgroundImage);

var globalData;
const chosenCity = document.getElementById("chosenCity");
// This may be stored on the machine somewhere.
var chosenCityName = 'London';
chosenCity.innerHTML = chosenCityName;
var chosenCityTemp = '';
var chosenCityLat;
var chosenCityLon;

//console.log('supposedly before')
//getListOfCitiesByCityName(chosenCityName);
//console.log('supposedly after')
showDefaultCityWeather(chosenCityName);

// --------------------------------- Settings panel ----------------------------------------
// This sets up the settings panel to hide/unhide on click.
var coll = document.getElementsByClassName("collapsible");

for (var i = 0; i < coll.length; i++) {
    coll[i].addEventListener("click", function () {
        this.classList.toggle("active");
        var content = this.nextElementSibling;
        if (content.style.display === "block") {
            content.style.display = "none";
        } else {
            content.style.display = "block";
        }
    });
}

// Force settings panel to be hidden when loading page. It takes twice to make it hidden?
settingsBtn.click();
settingsBtn.click();
// -------------------------------------------------------------------------------------------


//coll[0].toggleAttribute("active");

//var coll = document.getElementsByClassName("collapsible");

//for (var i = 0; i < coll.length; i++) {


//setWeather();

/*const citiesList = document.getElementById("citiesList");
function onChange() {
    var value = citiesList.value;
    var selectedIndex = citiesList.selectedIndex;
    var text = "test";
    console.log(value, text, selectedIndex);
}*/
//citiesList.onchange = onChange();
//onChange();

/*async function searchCity(cityName) {
    var weatherCall =
        "https://geocoding-api.open-meteo.com/v1/search?name=" + cityName + "&count=10&language=en&format=json";
    const response = await fetch(weatherCall);
    const data = await response.json();
    console.log('data = \n' + data);
  }*/

/*function getListOfCitiesByCityName(cityName)
{
    var weatherCall =
        "https://geocoding-api.open-meteo.com/v1/search?name=" + cityName + "&count=10&language=en&format=json";

    fetch(weatherCall)
        // We use the response variable to check the data.
        // Essentially, it's a lambda.
        .then(response => {
            console.log('response = \n' + response);
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            // We need to return the data to use for the else branch.
            return response.json();
        })
        .then(data => { // call it data now.
            console.log('data = \n' + data);
        })
        .catch(error => {
            console.error("Error:", error);
        });
}*/

function showDefaultCityWeather(cityName = "London") {
    var weatherCall =
        "https://geocoding-api.open-meteo.com/v1/search?name=" + cityName + "&count=10&language=en&format=json";

    fetch(weatherCall)
        // We use the response variable to check the data.
        // Essentially, it's a lambda.
        .then(response => {
            console.log('response = \n' + response);
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            // We need to return the data to use for the else branch.
            return response.json();
        })
        .then(data => { // call it data now.
            index = 0;
            console.log('data = \n' + data);
            var jsonStr = JSON.stringify(data, null, 2);
            console.log('jsonStr = \n' + jsonStr);
            const obj = JSON.parse(jsonStr);
            chosenCityLon = obj.results[index].longitude;
            chosenCityLat = obj.results[index].latitude;
            console.log('just set the global variables chosenCityLon and chosenCityLat', chosenCityLon, chosenCityLat)

            // First, we need to take the chosenCityName and look up coordinates.
            var weatherString =
                "https://api.open-meteo.com/v1/forecast?latitude=" +
                chosenCityLat +
                "&longitude=" +
                chosenCityLon +
                "&current=temperature_2m,precipitation,rain,wind_speed_10m&temperature_unit=fahrenheit&wind_speed_unit=ms&precipitation_unit=inch&forecast_days=1";

            // This handles when you have an exact coordinate
            fetch(weatherString)
                .then((response) => {
                    if (!response.ok) {
                        throw new Error("Network response was not ok");
                    }
                    return response.json();
                })
                .then((data) => {
                    var jsonStr = JSON.stringify(data, null, 2);
                    var obj = JSON.parse(jsonStr);
                    console.log(obj);
                    const temp = document.getElementById("temp");
                    temp.innerHTML = obj.current.temperature_2m + ' ' + obj.current_units.temperature_2m;
                })
                .catch((error) => {
                    console.error("Error:", error);
                });
        })
        .catch(error => {
            console.error("Error:", error);
        });
    console.log('end of searchCity func');
}

function setWeather(index = 0, data) {
    console.log('data = \n' + data);
    var jsonStr = JSON.stringify(data, null, 2);
    console.log('jsonStr = \n' + jsonStr);
    const obj = JSON.parse(jsonStr);
    chosenCityLon = obj.results[index].longitude;
    chosenCityLat = obj.results[index].latitude;
    console.log('just set the global variables chosenCityLon and chosenCityLat', chosenCityLon, chosenCityLat)

    // First, we need to take the chosenCityName and look up coordinates.
    var weatherString =
        "https://api.open-meteo.com/v1/forecast?latitude=" +
        chosenCityLat +
        "&longitude=" +
        chosenCityLon +
        "&current=temperature_2m,precipitation,rain,wind_speed_10m&temperature_unit=fahrenheit&wind_speed_unit=ms&precipitation_unit=inch&forecast_days=1";

    // This handles when you have an exact coordinate
    fetch(weatherString)
        .then((response) => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then((data) => {
            var jsonStr = JSON.stringify(data, null, 2);
            var obj = JSON.parse(jsonStr);
            console.log(obj);
            const temp = document.getElementById("temp");
            temp.innerHTML = obj.current.temperature_2m + ' ' + obj.current_units.temperature_2m;
        })
        .catch((error) => {
            console.error("Error:", error);
        });
}

// This one handles the call using a city name.
/*fetch(weatherCall)
    .then((response) => {
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        return response.json();
    })
    .then((data) => {
        parseData(data);
    })
    .catch((error) => {
        console.error("Error:", error);
    });
var jsonStr = JSON.stringify(data, null, 2);
const obj = JSON.parse(jsonStr);
var myCity = 
    data.results[i].name +
    ", " +
    data.results[i].admin1 +
    ", " +
    data.results[i].country;
chosenCity.innerHTML = myCity;
console.log('made it');


var weatherString =
    "https://api.open-meteo.com/v1/forecast?latitude=" +
    latitude +
    "&longitude=" +
    longitude +
    "&current=temperature_2m,precipitation,rain,wind_speed_10m&temperature_unit=fahrenheit&wind_speed_unit=ms&precipitation_unit=inch&forecast_days=1";

// This handles when you have an exact coordinate
fetch(weatherString)
    .then((response) => {
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        return response.json();
    })
    .then((data) => {
        console.log("things were okay, parsingData");
        showWeather(data);
        // parseData(data);
    })
    .catch((error) => {
        console.error("Error:", error);
    });*/

function parseData(data) {
    globalData = data;

    // Display data in an HTML element
    var jsonStr = JSON.stringify(data, null, 2);
    const obj = JSON.parse(jsonStr);

    console.log(obj);
    console.log(obj.length);
    // Clear out the list.
    citiesList.innerHTML = "";
    // Fill out the list.
    for (var i = 0; i < obj.results.length; i++) {
        var opt = document.createElement("option");
        opt.innerHTML =
            data.results[i].name +
            ", " +
            data.results[i].admin1 //+
        //", " +
        //data.results[i].country;
        citiesList.appendChild(opt);
    }
}

var d = new Date();
var n = d.getHours();

function loadBackgroundImage(picData) {
    // Get a random picture index.
    i = Math.floor(Math.random() * picData.hits.length);
    // Debug info.
    // console.log("-----------------------------------------------\n");
    //console.log("number of pictures found count = " + picData.hits.length);
    //console.log("-----------------------------------------------");
    console.log(picData);
    bgImg = picData.hits[i].largeImageURL;
    var bgElements = document.getElementsByClassName("hero-image");
    var author = picData.hits[i].user;
    bgElements[0].style.backgroundImage = "url(" + bgImg + ")";
    document.getElementById("author").innerHTML = author;
}

// Shows just the weather, assumes we already retrieved it.
// Has nothing to do with picking a city.
function showWeather(data) {
    //globalData = data;
    console.log("showing the weather....");

    // Display data in an HTML element
    var jsonStr = JSON.stringify(data, null, 2);
    //console.log(jsonStr);
    var obj = JSON.parse(jsonStr);
    console.log(obj);
    //console.log(obj.length);
    const temp = document.getElementById("temp");
    temp.innerHTML = obj.current.temperature_2m + ' ' + obj.current_units.temperature_2m;
}

// When you are searching for a city and click the lookup button.
function lookupCityBtnClick() {
    console.log("inside the function");
    city = document.getElementById("cityInput").value;

    var weatherCall =
        "https://geocoding-api.open-meteo.com/v1/search?name=" +
        city +
        "&count=10&language=en&format=json";
    fetch(weatherCall)
        .then((response) => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then((data) => {
            console.log("things were okay, parsingData");
            parseData(data);
        })
        .catch((error) => {
            console.error("Error:", error);
        });
}

// Changes the city label and changes the actual weather too
function changeCityBtnClick() {
    var i = citiesList.selectedIndex;
    city =
        globalData.results[i].name +
        ", " +
        globalData.results[i].admin1 //+
    //", " +
    //globalData.results[i].country;
    chosenCity.innerHTML = city;

    var longitude = globalData.results[i].longitude;
    var latitude = globalData.results[i].latitude;

    var weatherString =
        "https://api.open-meteo.com/v1/forecast?latitude=" +
        latitude +
        "&longitude=" +
        longitude +
        "&current=temperature_2m,precipitation,rain,wind_speed_10m&temperature_unit=fahrenheit&wind_speed_unit=ms&precipitation_unit=inch&forecast_days=1";

    fetch(weatherString)
        .then((response) => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then((data) => {
            console.log("things were okay, parsingData");
            showWeather(data);
            // parseData(data);
        })
        .catch((error) => {
            console.error("Error:", error);
        });
}

function changeBgCategoryBtnClick() {
    selectedCategory = bgCategoriesList.value;
    apiCall =
        "https://pixabay.com/api/?key=" + pixabayAPIKey + "&q=" + selectedCategory + "&image_type=photo";
    $.getJSON(apiCall, loadBackgroundImage);
}

function refreshBtnClick() {
    $.getJSON(apiCall, loadBackgroundImage);
}