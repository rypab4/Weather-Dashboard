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

// create Date
let currentDate = moment().format('M/DD/YYYY')



console.log(currentDate)
// view date
dateEl.text(currentDate);



// startBtn.on("click", function(event) {
//     event.preventDefault();
//     var city = citySearch.val();
//     console.log(city)
//     getWeatherData(city);
//     var historyText = city.value.trim();

//     if (historyText === ""){
//         return;
//     }
//     historyArray.push(city);
//     city.valuye =""

//     storedHist();
//     renderWeather();
//     }
// );
var weatherList = $('#weather-list');
var historyArray = [];
// function renderWeather(){
//     weatherList.innerHTML = "";
//     if(!historyArray){
//         historyArray = {
//             searchedCity: [],
//         }

//     }else{
//     for (let i = 0; i < historyArray.length; i++) {
//         var history = historyArray[i];
//         var btnHist = $("<button>")
//         btnHist.text(history) 
//         btnHist.attr("data-index",i)

//         weatherList.append(btnHist);

//     }}
// }

// function init(){
//     var storedHist = JSON.parse(localStorage.getItem("history"));
//     if (storedHist !== null){
//         historyArray = storedHist;
//     }
//     renderWeather();
// }


// function storedHist(){
//     localStorage.setItem("historyArray", JSON.stringify(historyArray));
// }

startBtn.on("click", function () {
    dateEl.empty();
    fiveDayEl.empty();
    iconFiveDayEl.empty();
    tempFiveDayEl.empty();
    windFiveDayEl.empty();
    humidity.empty();
})

form.on("click", function (event) {
    event.preventDefault();


    var city = $.trim(citySearch.val());
    console.log(city)


    // if (city === ""){
    //     return;
    // }

    // historyArray.push(city.toUpperCase());


    getWeatherData(city);
    // storedHist();
    // renderWeather();

}
);

// weatherList.on("click", function(event){
//     event.preventDefault();
//     var element = event.target;
//     if (element.matches("button") === true){
//         var index = element.parent.attr("data-index");
//         historyArray.splice(index, 1);
//         storedHist();
//         renderWeather();
//     }
// })

function getWeatherData(city) {
    // get Current weather
    console.log(city);
    daCity.text(city.toUpperCase());

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

                fetch(cityWeatherData).then(function (response) {
                    if (response.ok) {
                        response.json().then(function (data) {
                            console.log(data);

                            for (let i = 0; i < 5; i++) {
                                var weatherContainerEl = $(".weatherContainer");
                                var fiveWeatherEl = $('<div>')
                                fiveWeatherEl.addClass('col-md-2 five-weather')
                                weatherContainerEl.append(fiveWeatherEl)

                                var tomorrowsDate = moment().add(i + 1, 'days').format('M/DD/YYYY')
                                var dayDate = $('<div>')
                                dayDate.addClass("date")
                                dayDate.text(tomorrowsDate)
                                fiveWeatherEl.append(dayDate)



                                var tempEntry = data.list[i * 8].main.temp;
                                var windEntry = data.list[i * 8].wind.speed;
                                var humidityEntry = data.list[i * 8].main.humidity;
                                var iconEntry = data.list[i * 8].weather[0].icon;




                                var picEl = $('<img>')
                                picEl.addClass("icon-5d")
                                picEl.attr("src", weatherURL + iconEntry + ".png")

                                var tempCard = $('<div>')
                                tempCard.addClass("temp-5d")
                                tempCard.text("Temp: " + tempEntry + "F")

                                var windCard = $('<div>')
                                windCard.addClass("wind-5d");
                                windCard.text("Wind: " + windEntry + "MPH")

                                var humidCard = $('<div>');
                                humidCard.addClass("humidity-5d");
                                humidCard.text("Humidity: " + humidityEntry + "%");



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

// init()


