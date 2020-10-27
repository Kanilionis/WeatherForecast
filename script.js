$(document).ready(function(){


  var history = JSON.parse(localStorage.getItem("city"))||[];  
  var city = $("#city-input").val().trim();
  
  $("#find-city").on("click", function(e){
      e.preventDefault();
      $(".fiveDayForecast").empty();
    todayWeather(city);
    fiveDayForecast(city);
  });
  
  function renderButtons(city){
    var li = $("<li>").addClass("list-group-item list-group-item-action").attr("value", city).text(city);
      $(".prev-search-buttons").append(li);
  }
  
  $(".prev-search-buttons").on("click", "li", function(){
      $(".fiveDayForecast").empty();
    todayWeather($(this).text());
    fiveDayForecast($(this).text());
  });
  
  if(history.length > 0){
    todayWeather(history[history.length - 1])
  }
  
  for (var i=0; i<history.length; i++){
    renderButtons(history[i])
  }
    
  function todayWeather(city){
    var todayURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=f14b6a45063b423ef9b28d528efca1a9&units=imperial";
    
    // get lat and lon to use to find UV Index
    $.ajax({
      url: todayURL,
      method: "GET"
    }).then(function(response) {
      $(".card-body-today").empty();
      if(history.indexOf(city) === -1){
        history.push(city);
        // only going to store the city searched for one time!!
        localStorage.setItem("city", JSON.stringify(history));
        renderButtons(city);
      }
      console.log(response);
      var dateTag = $("<h2>").text(response.name + ": " + new Date().toLocaleDateString());
      var tempTag = $("<p>").text("TEMP:  " + response.main.temp.toFixed(0));
      var humidityTag = $("<p>").text("HUMIDITY:  " + response.main.humidity);
      var windSpeedTag = $("<p>").text("WIND:  " + response.wind.speed);
      var imgTag = $("<img>").attr("src", "http://openweathermap.org/img/w/" + response.weather[0].icon + ".png");

      $(".card-body-today").append(dateTag, imgTag, tempTag, humidityTag, windSpeedTag);
  
      var lat = response.coord.lat;
      var lon = response.coord.lon;

    uvIndex(lat, lon);
      })
  };
  
  function uvIndex(lat, lon){
      var uvURL = "http://api.openweathermap.org/data/2.5/uvi?appid=166a433c57516f51dfab1f7edaed8413&lat=" + lat + "&lon=" + lon;
      $.ajax({
      url: uvURL,
      method: "GET"
    }).then(function(response) {
      console.log(response);
      var uvTag = $("<p>").text("UV INDEX:  ");
      var uvBtn = $("<span>").addClass("btn btn-sm").text(response.value);
          if(response.value < 3){
            uvBtn.addClass("btn-success");
          } else if(response.value < 7){
            uvBtn.addClass("btn-warning");
          } else {
            uvBtn.addClass("btn-danger");
          }
          $(".card-body-today").append(uvTag.append(uvBtn));

      fiveDayForecast(city);
    })
  };
  
    
  function fiveDayForecast(city){
    $(".card-body-forecast").empty();
    
    $.ajax({
      url: "https://api.openweathermap.org/data/2.5/forecast/daily?q=" + city + "&cnt=5&appid=166a433c57516f51dfab1f7edaed8413",
      method: "GET"
      }).then(function(response) {
      console.log(response);

      for(var i = 0; i<5; i++){
        var eachDay = response.list[i].dt;
          console.log(eachDay);
        var dateMil = eachDay * 1000;
        var dateObject = new Date(dateMil);
          console.log(dateObject);
        var date = dateObject.toJSON();
          console.log(date);
        var dateDis = $("<h3>").text(response.city.name + " " + date.slice(5, 7) + "/" + date.slice(8, 10));  
            var tempF = (response.list[i].temp.day - 273.15) * 1.80 + 32;
        var tempDis = $("<h4>").text("Temp: " + tempF.toFixed(0));
        var imgTag = $("<img>").attr("src", "http://openweathermap.org/img/w/" + response.list[i].weather[0].icon + ".png");
        
        response.list.forEach(function createCard(i){
          var createCard = ($("<div>"));
          $(".fiveDayForecast").append(dateDis).append(tempDis).append(imgTag);
        console.log("done")
        })
    // })
    }
  })
  }})
    // $(".fiveDayForecast").empty();
  
  
    // function recallSearch(){
    //   $("#recent-search-btns").empty();
    //   localStorage.clear()
    //   }
  
  