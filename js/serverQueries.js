// Variable declarations
const dropdown = document.getElementById("dropdown-selector");
const dataText = document.getElementById("dataText");
const button = document.getElementById("refresh");
const explain = document.getElementById("forecastExplanation");
const pUpdate = document.getElementById("pUpdate");
const pUpdateApi = document.getElementById("pUpdateApi");
const pLatitude = document.getElementById("pLatitude");
const pLongitude = document.getElementById("pLongitude");
const pTemperature = document.getElementById("pTemperature");
const pPrecipitation = document.getElementById("pPrecipitation");
const pHumidity = document.getElementById("pHumidity");
const pWind = document.getElementById("pWind");
const options = {
    month: '2-digit',
    day: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
};
const optionsNoSec = {
    month: '2-digit',
    day: '2-digit',
    year: 'numeric',
};


let selectedValue = dropdown.value;
let city = "WEATHER";

// Sets the background for the first time
setBackgroundImage();

// Function that gets the city from the dropdown
function getCity() {
    selectedValue = dropdown.value;
    button.removeAttribute("disabled")
    console.log("Selected value: " + selectedValue);
    
}

// Function that manages the coordinates values to make the API request
function getData() {
    button.innerHTML = "Refresh"
    explain.innerHTML = "Select a city and press Refresh to show the weather forecast"
    if (selectedValue != "Select city") {
        switch (selectedValue) {
            case "40.7128 74.0060":
                city = "New York";
                console.log("Making request with city: " + city);
                setBackgroundImage() // Sets the background
                updateWeather(selectedValue.trim().split(/\s+/)[0], selectedValue.trim().split(/\s+/)[1]); // Updates the weather
                break;
            case "-34.6037 -58.3816":
                city = "Buenos Aires";
                console.log("Making request with city: " + city);
                setBackgroundImage() // Sets the background
                updateWeather(selectedValue.trim().split(/\s+/)[0], selectedValue.trim().split(/\s+/)[1]); // Updates the weather
                break;
            case "40.4168 -3.7038":
                city = "Madrid";
                console.log("Making request with city: " + city);
                setBackgroundImage() // Sets the background
                updateWeather(selectedValue.trim().split(/\s+/)[0], selectedValue.trim().split(/\s+/)[1]); // Updates the weather
                break;
            case "35.6895 139.6917":
                city = "Tokio";
                console.log("Making request with city: " + city);
                setBackgroundImage() // Sets the background
                updateWeather(selectedValue.trim().split(/\s+/)[0], selectedValue.trim().split(/\s+/)[1]); // Updates the weather
                break;
            case "-37.8136 144.9631":
                city = "Melbourne";
                console.log("Making request with city: " + city);
                setBackgroundImage() // Sets the background
                updateWeather(selectedValue.trim().split(/\s+/)[0], selectedValue.trim().split(/\s+/)[1]); // Updates the weather
                break;

            default:
                break;
        }
    }

}

// Function that makes the request
async function weatherData(latitude, longitude) {
    let response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,precipitation,wind_speed_10m&daily=temperature_2m_max,temperature_2m_min&timeformat=unixtime&forecast_days=3`);
    let data = await response.json();
    console.log(data);
    return data;
}

// Function that updates the weather in the html
function updateWeatherInfo(currentWeather, latitude, longitude) {
    let currentUpdateTime = new Date().toLocaleString("en-US", options);
    let lastUpdated = new Date(currentWeather.time * 1000).toLocaleString("en-US", options);

    pUpdate.innerHTML = `Last updated: ${currentUpdateTime}`;
    pUpdateApi.innerHTML = `Last updated (Server): ${lastUpdated}`;
    pTemperature.innerHTML = `Current temperature: ${currentWeather.temperature_2m} ºC`;
    pHumidity.innerHTML = `Current humidity: ${currentWeather.relative_humidity_2m}%`;
    pPrecipitation.innerHTML = `Precipitation intensity: ${currentWeather.precipitation} mm`;
    pLatitude.innerHTML = `Latitude: ${latitude}º`;
    pLongitude.innerHTML = `Longitude: ${longitude}º`;
    pWind.innerHTML = `Current wind speed: ${currentWeather.wind_speed_10m} km/h`;
}

// Function that updates the forecast in the html
function updateForecastInfo(dailyForecast) {
    const temperatureColors = {
        hot: 'rgba(240, 128, 128, 0.3)',
        moderate: 'rgba(173, 216, 230, 0.3)',
        cold: 'rgba(211, 211, 211, 0.3)'
    };

    for (let i = 0, len = dailyForecast.time.length; i < len; i++) {
        const maxTemperature = dailyForecast.temperature_2m_max[i];
        const minTemperature = dailyForecast.temperature_2m_min[i];
        const forecastDate = new Date(dailyForecast.time[i] * 1000);
        const meanTemp = (maxTemperature + minTemperature) / 2;

        const sectionForeDay = document.getElementById(`foreDay${i + 1}`);
        sectionForeDay.removeAttribute('hidden');
        sectionForeDay.style.backgroundColor =
            (meanTemp >= 15) ? temperatureColors.hot :
                (meanTemp >= 0 ? temperatureColors.moderate : temperatureColors.cold);

        const pForeDay = document.getElementById(`pForeDay${i + 1}`);
        pForeDay.innerHTML = `<b>${forecastDate.toLocaleDateString("en-US", optionsNoSec)}</b><br>`;

        const pForeDayb = document.getElementById(`pForeDay${i + 1}b`);
        pForeDayb.innerHTML = `Max Temperature: ${maxTemperature} ºC<br><br>`;
        pForeDayb.innerHTML += `Min Temperature: ${minTemperature} ºC`;
    }
}

// Function that retrieves the data from the server
async function updateWeather(latitude, longitude) {
    try {
        let data = await weatherData(latitude, longitude);

        console.log("Fetched Weather Data:", data);

        let currentWeather = data.current;
        let dailyForecast = data.daily;

        updateWeatherInfo(currentWeather, latitude, longitude);
        updateForecastInfo(dailyForecast);
    } catch (error) {
        console.error("Error fetching weather data:", error);
        showMessage("Failed to retrieve weather data. Please try again later.");
    }
}

