// .on("click") function will trigger AJAX call
$(document).ready(function(){

    var cityArray = [""]
    
    $("#find-city").on("click", function(e){
      e.preventDefault();
      console.log("yes")
      var city = $("#city-input").val().trim();
      localStorage.setItem("city", city);
      cityArray.push(city);
      renderButtons();
      todayWeather(city);
      // fiveDay(city);
    });
    
    function renderButtons(){
      $(".list-group-item").empty();
      for(var i=0; i<cityArray.length; i++){
        var a = $("<button>");
          a.addClass("city");
          a.attr("find-city", cityArray[i]);
          a.text(cityArray[i]);
          $(".list-group").append(a);
      }
    };
      
    function todayWeather(city){
      var city = $("#city-input").val();
      // var apiKey = "166a433c57516f51dfab1f7edaed8413";
      var todayURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=f14b6a45063b423ef9b28d528efca1a9&units=imperial";
      // get lat and lon
      $.ajax({
        url: todayURL,
        method: "GET"
      }).then(function(response) {
        console.log(response);
        var tempTag = $("<p>").text(response.main.temp);
        var humidityTag = $("<p>").text(response.main.humidity);
          console.log(humidity);
        var windSpeedTag = $("<p>").text(response.wind.speed);
        var dateTag = $("<p>").text(response.name + new Date().toLocaleDateString());
        var imgTag = $("<img>").attr("src", "http://openweathermap.org/img/w/" + response.weather[0].icon + ".png");
    
        $(".card-body").append(tempTag, humidityTag, windSpeedTag, dateTag, imgTag);
    
        // $(".list-group-item").empty();  
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
      var uvTag = $("<p>").text("uvindex:");
      var uvBtn = $("<span>").addClass("btn btn-sm").text(response.value);
        if(response.value < 3){
          uvBtn.addClass("btn-success");
        } else if(response.value < 7){
          uvBtn.addClass("btn-warning");
        } else {
          uvBtn.addClass("btn-danger");
        }
        $(".card-text").append(uvTag.append(uvBtn));

        forecast(city);
      })
    };
    
      
      function forecast(city){
        var city = $("#city-input").val();
        console.log("yes");
        var fiveDayURL = "http://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=166a433c57516f51dfab1f7edaed8413c&units=imperial";
        $.ajax({
        url: fiveDayURL,
        method: "GET"
        }).then(function(response) {
        console.log(response);
      })}
    
      
    
    // function recallSearch(e){
    // e.preventDefault()
    // }
    // click on buttons of 
    
    
    })
    