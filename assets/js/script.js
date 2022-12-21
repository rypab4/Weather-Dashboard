var startBtn = $("#start-btn");
var citySearch = $("#city-search");
var searchCont = $("#search-card");
var searchHistory = $("#search-history");
var daCity = $("#daCity")
var iconEl = $('.icon')
var temp = $("#temp");
var wind = $("#wind");
var humidity = $("#humidity");
var forecast = $("#forecast");
var dateEl = $("#date");
var fiveDayEl = $("#five-day")
var iconFiveDayEl = $("#icon-5d")
var tempFiveDayEl = $("#temp-5d")
var windFiveDayEl = $("#wind-5d")
var humidityDayEl = $("#humidity-5d")
var weatherURL = "http://openweathermap.org/img/wn/"
var form = $(".form")
var fivedayForecast = $("#fiveday-forecast")
var currentDate = moment().format('M/DD/YYYY')
var fiveDayWeatherArray = []
var historyArray = [];
var storedHistory = JSON.parse(localStorage.getItem("searchHistory")) || [];
var weatherList = $('.weather-list');
var city = $.trim(citySearch.val()).toUpperCase();
dateEl.text(currentDate);


startBtn.on("click", function (event) {
    event.preventDefault();
    clearField();

    var city = $.trim(citySearch.val())
    if (storedHistory.includes(city.toUpperCase())) {
        alert("Already in weather history")
        return false;
    }

    else if (city === '') {
        "Please select or enter a city"
    }
    else {
        historyArray.push(city.toUpperCase())
        localStorage.setItem("searchHistory", JSON.stringify(historyArray));
        searchedButton = $('<button>')
        searchedButton.addClass('form-control align-item-start d-block bg-success searched-button')
        searchedButton.text(city.toUpperCase().trim())
        weatherList.append(searchedButton)
        getWeatherData(city);
    }
    storeHist()
    form[0].reset();  // resets the form

}

);

//get weather data
function getWeatherData(city) {
    daCity.text(city.toUpperCase().trim())

    var cityCoor = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=e4493ccf2e4a74ff8b3978f3fec5f980&units=imperial"
    fetch(cityCoor).then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
                var lat = data.coord.lat;
                var long = data.coord.lon;
                var windData = data.wind.speed;
                console.log(data)
                wind.text("Wind: " + windData + "MPH")
                var tempData = data.main.temp;
                console.log(tempData)
                temp.text("Temp: " + tempData + " F")
                var humidityData = data.main.humidity;
                humidity.text("Humidity: " + humidityData + " %")
                var weatherIcon = data.weather[0].icon;
                iconEl.attr("src", weatherURL + weatherIcon + ".png")
                var cityWeatherData = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + long + "&appid=e4493ccf2e4a74ff8b3978f3fec5f980&units=imperial"
                fivedayForecast.remove(".d-none")
                fetch(cityWeatherData).then(function (response) {
                    if (response.ok) {
                        response.json().then(function (data) {
                            console.log(data);

                            for (let i = 0; i < 5; i++) {
                                var weatherContainerEl = $(".weatherContainer");
                                var fiveWeatherEl = $('<div>')
                                fiveWeatherEl.addClass('card border-primary col-md-2 five-weather')
                                fiveWeatherEl.attr('style', "width: 18rem")
                                weatherContainerEl.append(fiveWeatherEl)

                                var tomorrowsDate = moment().add(i + 1, 'days').format('M/DD/YYYY')
                                var dayDate = $('<div>')
                                dayDate.addClass("card-title date")
                                dayDate.text(tomorrowsDate)

                                var tempEntry = data.list[i * 8].main.temp;
                                var windEntry = data.list[i * 8].wind.speed;
                                var humidityEntry = data.list[i * 8].main.humidity;
                                var iconEntry = data.list[i * 8].weather[0].icon;

                                fiveDayWeatherArray.push(tempEntry, windEntry, humidityEntry)


                                var picEl = $('<img>')
                                picEl.addClass("card-img-middle icon-5d")
                                picEl.attr("src", weatherURL + iconEntry + ".png")
                                picEl.attr("alt", "weather icon")
                                var tempCard = $('<div>')
                                tempCard.addClass("card-text temp-5d")
                                tempCard.text("Temp: " + fiveDayWeatherArray[0] + "F")

                                var windCard = $('<div>')
                                windCard.addClass("card-text wind-5d");
                                windCard.text("Wind: " + fiveDayWeatherArray[1] + "MPH")

                                var humidCard = $('<div>');
                                humidCard.addClass("card-text humidity-5d");
                                humidCard.text("Humidity: " + fiveDayWeatherArray[2] + "%");

                                fiveWeatherEl.append(dayDate)
                                fiveWeatherEl.append(picEl)
                                fiveWeatherEl.append(tempCard)
                                fiveWeatherEl.append(windCard)
                                fiveWeatherEl.append(humidCard)

                            }

                        })
                    }

                })

            })

        }

    })

}
//clear all data. needed before new search
function clearField() {
    fiveDayWeatherArray = [];
    $(".five-weather").remove();

}

//add search to local storage in historyArray = [];

function storeHist() {
    var city = citySearch.val();
    if (city === '') {
        alert("Please enter a city")
        return false;
    }

    if (historyArray.includes(city.toUpperCase().trim())) {
        // alert("City has already been searched")
    } else {
        historyArray.push(city.toUpperCase().trim())
        // getWeatherData();
        localStorage.setItem("searchHistory", JSON.stringify(historyArray));
    }

}


function init() {

    if (storedHistory !== null) {
        historyArray = storedHistory

    }
    createHistbtns();
}

function createHistbtns() {

    for (let i = 0; i < storedHistory.length; i++) {
        //create a button

        searchedButton = $('<button>')
        searchedButton.addClass('form-control align-item-start d-block bg-success searched-button')
        searchedButton.text(storedHistory[i])
        weatherList.append(searchedButton)
        var srchbtn = $('.searched-button')

    }
    if (srchbtn === undefined) {
        return false
    }
    else {
        srchbtn.on("click", function (event) {
            event.preventDefault();
            var city = event.target.innerText
            clearField()
            getWeatherData(city);
        })
    }


}


init();
