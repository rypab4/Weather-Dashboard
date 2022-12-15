var startBtn = $("#start-btn");
var citySearch = $("#city-search");
var searchCont = $("#search-card");
var searchHistory = $("#search-history");
var daCity = $("#daCity")
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

// create Dates
let currentDate =moment().format('M/DD/YYYY')
// let cDay = currentDate.getDate();
// let cMonth = currentDate.getMonth() + 1;
// let cYear = currentDate.getFullYear();
// var viewedDate0 = ( cMonth + "/" + (cDay)  + "/" + cYear);
// var viewedDate1 = ( cMonth + "/" + (cDay + 1)  + "/" + cYear);
// var viewedDate2 = ( cMonth + "/" + (cDay + 2)  + "/" + cYear);
// var viewedDate3 = ( cMonth + "/" + (cDay + 3) + "/" + cYear);
// var viewedDate4 = ( cMonth + "/" + (cDay + 4) + "/" + cYear);
// var viewedDate5 = ( cMonth + "/" + (cDay + 5) + "/" + cYear);


console.log(currentDate)
// view date
dateEl.text (currentDate);

// view forecast dates
// day1El.innerText = viewedDate1;
// day2El.innerText = viewedDate2;
// day3El.innerText = viewedDate3;
// day4El.innerText = viewedDate4;
// day5El.innerText = viewedDate5;





// startBtn.addEventListener("click", function(event) {
//     event.preventDefault();
    
//     console.log(city);
//     getWeatherData(city)
// })

var city = "Vacaville"

function getWeatherData() {
    // get Current weather
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
                var icon = data.weather[0].icon;
                
                 
                var cityWeatherData = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + long + "&appid=e4493ccf2e4a74ff8b3978f3fec5f980&units=imperial"
                
                fetch(cityWeatherData).then(function (response) {
                    if (response.ok){
                        response.json().then(function (data) {
                           console.log(data); 
                           
                            
                           for (let i = 0; i < 5; i++) {
                            var weatherContainerEl = $(".weatherContainer");
                            var fiveWeatherEl = $('<div>')
                            fiveWeatherEl.addClass('col-md-2 five-weather')
                            weatherContainerEl.append(fiveWeatherEl)

                            var tomorrowsDate =moment().add(i +1, 'days').format('M/DD/YYYY')                            
                            var dayDate = $('<div>')
                            dayDate.addClass("date")
                            dayDate.text(tomorrowsDate)
                            fiveWeatherEl.append(dayDate)

                            
                            
                            var tempEntry = data.list[i * 8].main.temp;
                            var windEntry = data.list[i * 8].wind.speed
                            var humidityEntry = data.list[i * 8].main.humidity
                            var iconEntry = data.list[i * 8].weather[0].icon
                            
                            console.log(tomorrowsDate)
                            console.log(tempEntry)
                            console.log(windEntry)
                            console.log(humidityEntry)
                            console.log(iconEntry + ".png")
                            






                            var picEl = $('<img>')
                            picEl.addClass( "icon-5d")
                            picEl.attr("src", weatherURL + iconEntry + ".png")

                            var tempCard = $('<div>')
                            tempCard.addClass("temp-5d")
                            tempCard.text( "Temp: " + tempEntry + "F")
                            
                            var windCard = $('<div>')
                            windCard.addClass( "wind-5d");
                            windCard.text("Wind: " + windEntry + "MPH")

                            var humidCard = $('<div>');
                            humidCard.addClass( "humidity-5d");
                            humidCard.text( "Humidity: " + humidityEntry + "%");
                            
                            
                            
                            fiveWeatherEl.append(picEl)
                            fiveWeatherEl.append(tempCard)
                            fiveWeatherEl.append(windCard)
                            fiveWeatherEl.append(humidCard)




                           }
                                
                        //         var fiveDayDate = currentDate.getDate();
                        //         var fiveDayMonth = currentDate.getMonth() +1;
                        //         var fiveDayYear = currentDate.getFullYear();
                        //         var fiveDayDate = document.createElement("div");
                                

                        //     }
                            // var temp0 = weatherData.list[0].main.temp;
                            // var temp1 = weatherData.list[8].main.temp;
                            // var temp2 = weatherData.list[16].main.temp;
                            // var temp3 = weatherData.list[32].main.temp;
                            // var temp4 = weatherData.list[39].main.temp;
                            // temp1El.innerText = "Temp: "+ temp0 + "F";
                            // temp2El.innerText = "Temp: "+ temp1 + "F";
                            // temp3El.innerText = "Temp: "+ temp2 + "F";
                            // temp4El.innerText = "Temp: "+ temp3 + "F";
                            // temp5El.innerText = "Temp: "+ temp4 + "F";

                            // var humidity0 = weatherData.list[0].main.humidity;
                            // var humidity1 = weatherData.list[8].main.humidity;
                            // var humidity2 = weatherData.list[16].main.humidity;
                            // var humidity3 = weatherData.list[32].main.humidity;
                            // var humidity4 = weatherData.list[39].main.humidity;
                            
                            // var icon0 = weatherURL+ weatherData.list[0].weather.icon +"@2x.png";
                            // var icon1 = weatherData.list[8].weather.icon;
                            // var icon2 = weatherData.list[16].weather.icon;
                            // var icon3 = weatherData.list[32].weather.icon;
                            // var icon4 = weatherData.list[39].weather.icon;
                            
                            
                            // temp1El.innerText = "Temp: "+ icon0 + ".png";
                           })    
                    }

    })
    
            
            })

        }

    })
}


getWeatherData() 


