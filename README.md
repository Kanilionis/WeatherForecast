# WeatherForecast
homework 6


# 06 Server-Side APIs: Weather Dashboard

Developers are often tasked with retrieving data from another application's API and using it in the context of their own. Third-party APIs allow developers to access their data and functionality by making requests with specific parameters to a URL. Your challenge is to build a weather dashboard that will run in the browser and feature dynamically updated HTML and CSS.

Use the [OpenWeather API](https://openweathermap.org/api) to retrieve weather data for cities. The documentation includes a section called "How to start" that will provide basic setup and usage instructions. Use `localStorage` to store any persistent data.

## User Story

```
AS A traveler
I WANT to see the weather outlook for multiple cities
SO THAT I can plan a trip accordingly
-- create an array of cities
-- add eventListeners for each city

```

## Acceptance Criteria
*** reference 06 MovieJSOND
```
GIVEN a weather dashboard with form inputs
WHEN I search for a city
-- add input/submit form
THEN I am presented with current and future conditions for that city and that city is added to the search history
-- queryURL for current
-- queryURL for forecast
WHEN I view current weather conditions for that city
THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index
-- create new tags for each item we want to retrieve
WHEN I view the UV index
THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe
-- add a class for UV index style (favorable, moderate, sever)
 if/then/else - if uvIndex > 50, then add attribute to change styling
WHEN I view future weather conditions for that city
THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, and the humidity
-- create tags for each forecast item
WHEN I click on a city in the search history
THEN I am again presented with current and future conditions for that city
-- save recent input values to local storage so we can pull and show on the page
-- eventListener for each city in recent search bar
WHEN I open the weather dashboard
THEN I am presented with the last searched city forecast
-- preventDefault?
```

The following image demonstrates the application functionality:

![weather dashboard demo](./Assets/06-server-side-apis-homework-demo.png)

## Review

You are required to submit the following for review:

* The URL of the deployed application.

* The URL of the GitHub repository. Give the repository a unique name and include a README describing the project.

- - -
© 2019 Trilogy Education Services, a 2U, Inc. brand. All Rights Reserved.
