// variables
var apiKey = 'e4493ccf2e4a74ff8b3978f3fec5f980';
var apiCall = 'api.openweathermap.org/data/2.5/forecast?lat=';
var apiCoord = 'https://api.openweathermap.org/data/2.5/weather?q=';
var citySearchEl = $('#city-search');
var searchForm = $('#search-city');
var currentCity = "#daCity"
var forecastEl = $("#forecast-container");
var searchHistoryEl = $('#search-history');
var currentDay = moment().format('M/DD/YYYY');
const weatherIconUrl = 'http://openweathermap.org/img/wn/';
// var searchHistoryArray = loadSearchHistory();
var cities = [];

//save search history
var searchHistory = function() {
    var searchedCities = localStorage.getItem("cities")
    if(!searchedCities) {
        return false;
    }
    searchedCities = JSON.parse(searchedCities);

    for (let i = 0; i < searchedCities.length; i++) {
        displayHistory(searchedCities[i])
        cities.push(citiesLoaded[i])
    }
}

var saveSearch = function(){
    localStorage.setItem("cities", JSON.stringify(cities));
}

//append history
var displayHistory = function(city) {
    var cityParent = $("<div>");
    cityParent.addClass("card");
    var cityChild = $("<button>");
    cityChild.addClass("list-group-item list-group-item-action btn1");
    cityChild.text(city);

    cityContainerEl.append(cityChild);

    cityCardEl.on("click", function(){
        getCityData(city)
    });

    searchHistoryEl.append(cityParent);
}


//get Current Weather
displayCurrentWeather = function(city, data){
    var tempCurrent = Math.round(data.current.temp);
    var humidity = Math.round(data.current.humidity);
    var windSpeed = data.current.wind_speed;
    var iconCurrent = data.current.weather[0].icon;

    daCity.text('')
    var cityHeaderParent = $("<div>")
    var cityHeaderChild = $("h2")
    var currentDate = moment().format("L");
    var imageEl = $("<img>")

    imageEl.attr("src", "");
    imageEl.attr("src", "https://openweathermap.org/img/wn/" + iconCurrent + "@2x.png")
    cityHeaderChild.text(city + " (" + currentDate+ ")");

    cityHeaderParent.append(cityHeaderChild)
    cityHeaderParent.append(imageEl);
    daCity.append(cityHeaderParent)

    var divCurrent = $("<div>")
    var temp = $("<p>");
    var humidity = $("<p>");
    var windSpeed = $("<p>");

    temp.text('Temperature' + tempCurrent + "°F");
    humidity.text("Humidity: " + humidity + "%");
    windSpeedEl.text("Wind Speed: " + windSpeed + " MPH");

    divCurrent.append(temp);
    divCurrent.append(humidity);
    divCurrent.append(windSpeed);
};

var displayForecastData = function(data) {
    console.log(data)
    forecastEl.textContent = "";
    var forecastHeaderEl = document.getElementById("five-day");
    forecastHeaderEl.textContent = "5-day Forecast:"

    for (let i = 1; i < 6; i++) {
        var tempForecast = Math.round(data.daily[i].temp.day);
        var humidityForecast = data.daily[i].humidity;
        var iconForecast = data.daily[i].weather[0].icon;
    
    var cardEl = $("<div>");
    cardEl.addClass("card col-xl-2 col-md-5 col-sm-10 mx-3 my-2 bg-primary text-white text-center");

    var cardBodyEl = $("<div>");
    cardBodyEl.addClass("card-body");

    var cardDateEl = $("<h6>");
    cardDateEl.text(moment().add(i, 'days').format("L"));

    var cardIconEl = $("<img>");
    cardIconEl.attr("src", "https://openweathermap.org/img/wn/" + iconForecast + "@2x.png")

    var cardTempEl = $("<p>");
    cardTempEl.addClass("card-text");
    cardTempEl.text("Temperature:  " + tempForecast + "°F");

    var cardHumidEl = document.createElement("p")
    cardHumidEl.addClass("card-text");
    cardHumidEl.text("Humidity:  " + humidityForecast + "%");
    
    cardBodyEl.appendChild(cardDateEl)
    cardBodyEl.appendChild(cardIconEl)
    cardBodyEl.appendChild(cardTempEl)
    cardBodyEl.appendChild(cardHumidEl)
    
    cardEl.appendChild(cardBodyEl);
    forecastEl.appendChild(cardEl);
    
    //reset form after data displays
    cityFormEl.reset()

    }
};
var getCityData = function(city) {
    event.preventDefault();
    //current conditions in user-entered city//using it to get long and latitude for One call weather API url
    var cityInfoUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey;

    //make a request to the url
    fetch(cityInfoUrl).then(function(response) {
        //if response is okay, no errors found
        if (response.ok) {
            response.json().then(function(data) {
            console.log(data);

    //variables set for data needed from this pull 
    var cityName = data.name;
    var latitude = data.coord.lat;
    var longitude = data.coord.lon;
    
    //check if city exists in storage/array -- update it if not
    var prevSearch = cities.includes(cityName)
    if (!prevSearch) {
        cities.push(cityName)
        saveCities()
        displaySearchedCities(cityName)
    }

    getWeatherData(cityName,latitude,longitude);

    });

    //if city name is invalid return error message
    } else { 
        alert("Error: Invalid city name")
        citySearchEl.reset()
     }
   });
};

var getWeatherData = function(city,latitude,longitude) { 
    ///5-day forecast API
    var forecastUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + latitude + "&lon=" + longitude + "&units=imperial&exclude=minutely,hourly&appid=" + APIkey;
        
    fetch(forecastUrl).then(function(response) {
        response.json().then(function(data) {
            console.log(data);

        displayCurrentData(city, data);
        displayForecastData(data);

        });
    });
};

//load previously searched cities on page load
searchHistory()

//form submit listener when user enters city
searchForm.on("click", function() {
    citySearch = citySearchEl.val().trim();
    getCityData(citySearch);
})


