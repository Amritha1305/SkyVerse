const API_KEY = "7c0a85c971123b52614441c1607c755a"; 
function getWeather() {
    let city = document.getElementById("cityInput").value.trim();
    let weatherResult = document.getElementById("weatherResult");

    if (city === "") {
        alert("Please enter a city name");
        return;
    }

    let urlCurrent = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${"7c0a85c971123b52614441c1607c755a"}&units=metric`;
    let urlForecast = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${"7c0a85c971123b52614441c1607c755a"}&units=metric`;

    weatherResult.innerHTML = `<div class="loader"></div>`;

    // Fetch current weather
    fetch(urlCurrent)
        .then(response => {
            if (!response.ok) throw new Error("City not found!");
            return response.json();
        })
        .then(data => {
            let iconCode = data.weather[0].icon;
            let iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

            weatherResult.innerHTML = `
                <h2>${data.name}, ${data.sys.country}</h2>
                <img src="${iconUrl}" alt="Weather Icon">
                <p><strong>Temperature:</strong> ${data.main.temp}°C</p>
                <p><strong>Humidity:</strong> ${data.main.humidity}%</p>
                <p><strong>Weather:</strong> ${data.weather[0].description}</p>
                <h3>5-Day Forecast</h3>
                <div id="forecast"></div>
            `;

            // Fetch 5-day forecast
            return fetch(urlForecast);
        })
        .then(response => {
            if (!response.ok) throw new Error("Failed to load forecast!");
            return response.json();
        })
        .then(data => {
            let forecastHTML = "";
            for (let i = 0; i < data.list.length; i += 8) {  // Get daily data
                let forecast = data.list[i];
                let date = new Date(forecast.dt_txt).toDateString();
                let iconUrl = `https://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png`;

                forecastHTML += `
                    <div class="forecast-item">
                        <p><strong>${date}</strong></p>
                        <img src="${iconUrl}" alt="Weather Icon">
                        <p>Temp: ${forecast.main.temp}°C</p>
                        <p>${forecast.weather[0].description}</p>
                    </div>
                `;
            }
            document.getElementById("forecast").innerHTML = forecastHTML;
        })
        .catch(error => {
            weatherResult.innerHTML = `<p style="color: red;">${error.message}</p>`;
        });
}
