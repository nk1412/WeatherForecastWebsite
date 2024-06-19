const apiKey = '71f6779186cc32448b4c412eea65b982';
const weatherContainer = document.getElementById('weather-container');
const cityElement = document.getElementById('cityx');
const temperatureElement = document.getElementById('temperature');
const descriptionElement = document.getElementById('description');
const humidityElement = document.getElementById('humidity');
const windSpeedElement = document.getElementById('wind-speed');
const errorx = document.getElementById('error');
let chart = null;

const h20Element = document.createElement('h2');
const h21Element = document.createElement('h2');
const parentElement1 = document.getElementById('hourlyForecastx');
const parentElement2 = document.getElementById('dailyForecastx');
const forecast = document.getElementById('dailyForecast');
const forecastElement = document.getElementById('daily-container');
const allele = document.querySelectorAll('.ele');


document.getElementById('search').addEventListener('click', () => {
    var city = document.getElementById('city').value;
    fetchWeatherData(city);
    search(city);
});

document.getElementById('city').addEventListener('keyup', (event) => {
    if (event.key === 'Enter') {
        event.preventDefault();
        var city = document.getElementById('city').value;
        fetchWeatherData(city);
        search(city);
    }
});

function search(city) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`)
        .then(response => response.json())
        .then(data => {
            errorx.style.marginTop = '';
            cityElement.textContent = data.name;
            temperatureElement.textContent = `${data.main.temp}°C`;
            humidityElement.textContent = `Humidity: ${data.main.humidity}%`;
            windSpeedElement.textContent = `Wind Speed: ${data.wind.speed} m/s`;
            var dis = data.weather[0].description;
            updateWeather(dis);
            descriptionElement.textContent = capitalizeFirstLetter(dis);
            weatherContainer.style.display = 'block';
            errorx.textContent = null;
        })
        .catch(error => {
            errorx.textContent = "Sorry, Place not available";
            errorx.style.marginTop = '10%';
            cityElement.textContent = null;
            temperatureElement.textContent = null;
            humidityElement.textContent = null;
            windSpeedElement.textContent = null;
            descriptionElement.textContent = null;
            parentElement1.removeChild(h20Element);
            parentElement2.removeChild(h21Element);
            chart.destroy();
            allele.forEach((Ele) => {
                Ele.remove();
            });
            while (forecastElement.firstChild) {
                forecastElement.removeChild(forecastElement.firstChild);
            }
            updateWeather("not");
        });
}


function capitalizeFirstLetter(dis) {
    return (dis.charAt(0).toUpperCase() + dis.slice(1));
}

async function fetchWeatherData(location) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}`);
        const data = await response.json();

        if (data && data.coord && data.coord.lat && data.coord.lon) {
            const latitude = data.coord.lat;
            const longitude = data.coord.lon;

            fetchWeatherForecast(latitude, longitude);
        } else {
            console.error('Error fetching coordinates for the city.');
        }
    } catch (error) {
        console.error('Error fetching coordinates:', error);
    }
}

async function fetchWeatherForecast(latitude, longitude) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=current,minutely,alerts&appid=${apiKey}&units=metric`);
        const data = await response.json();

        const hourlyForecast = data.hourly;
        displayHourlyChart(hourlyForecast);

        const dailyForecast = data.daily;
        displayForecast(dailyForecast, 'daily-container');
    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
}

function displayHourlyChart(hourlyForecast) {

    h20Element.textContent = 'Hourly Temperature Forecast';

    if (parentElement1.contains(h20Element)) {
        parentElement1.removeChild(h20Element);
    }

    parentElement1.appendChild(h20Element);

    const temperatures = hourlyForecast.map(item => item.temp);
    const descriptions = hourlyForecast.map(item => item.weather[0].description);
    const timestamps = hourlyForecast.map(item => new Date(item.dt * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));

    if (chart) {
        chart.destroy();
    }

    const ctx = document.getElementById('hourlyChart').getContext('2d');
    chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: timestamps,
            datasets: [{
                label: 'Temperature (°C)',
                data: temperatures,
                borderColor: 'rgba(23, 16, 13, 1)',
                backgroundColor: 'rgba(23, 16, 13, 0.2)',
                borderWidth: 1,
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: {
                    display: true,
                    title: {
                        display: true,
                        text: 'Time (Hourly)',
                        color: 'black'
                    },
                    ticks: {
                        maxRotation: 30,
                        padding: 10,
                        color: 'black'
                    }
                },
                y: {
                    display: true,
                    title: {
                        display: true,
                        text: 'Temperature (°C)',
                        color: 'black'
                    },
                    ticks: {
                        color: 'black'
                    }
                }
            },
            plugins: {
                tooltip: {
                    callbacks: {
                        title: (context) => {
                            return `Hourly Forecast`;
                        },
                        label: (context) => {
                            return `Temperature: ${context.parsed.y}°C\nDescription: ${descriptions[context.dataIndex]}`;
                        }
                    }
                }
            }
        }
    });
}

function displayForecast(forecastData, elementId) {

    h21Element.textContent = '8-Day Forecast';

    if (parentElement2.contains(h21Element)) {
        parentElement2.removeChild(h21Element);
        allele.forEach((Ele) => {
            Ele.remove();
        });
    }

    parentElement2.appendChild(h21Element);

    forecastElement.innerHTML = '';

    forecastData.forEach((item) => {
        const timestamp = new Date(item.dt * 1000);
        const date = timestamp.toLocaleDateString();
        const temperature = item.temp.day;
        const description = item.weather[0].description;

        const forecastItem = document.createElement('div');
        forecastItem.className = 'ele';
        forecastItem.innerHTML = `${date} - ${temperature}°C, ${description}<br><br>`;
        forecastElement.appendChild(forecastItem);
    });
    //forecast.appendChild(forecastElement);
}


function updateWeather(weatherType) {

    const newCSS = document.createElement('link');
    newCSS.rel = 'stylesheet';
    newCSS.type = 'text/css';

    const newJS = document.createElement('script');
    newJS.type = 'text/javascript';

    if (weatherType.includes('thunderstorm')) {
        newCSS.href = '/css/thunderstorm.css';
        newJS.src = '/js/thunderstorm.js';
    } else if (weatherType.includes('light') && weatherType.includes('drizzle')) {
        newCSS.href = '/css/drizzel.css';
        newJS.src = '/js/drizzel.js';
    } else if (weatherType.includes('sunny')) {
        newCSS.href = '/css/sunny.css';
        newJS.src = '/js/sunny.js';
    } else if (weatherType.includes('cloudy')) {
        newCSS.href = '/css/cloudy.css';
        newJS.src = '/js/cloudy.js';
    } else if (weatherType.includes('light') && weatherType.includes('rain')) {
        newCSS.href = '/css/lightrain.css';
        newJS.src = '/js/lightrain.js';
    } else if ((weatherType.includes('partly') && weatherType.includes('cloudy')) || weatherType.includes('overcast') && weatherType.includes('clouds')) {
        newCSS.href = '/css/partlycloudy.css';
        newJS.src = '/js/partlycloudy.js';
    } else if (weatherType.includes('heavy') && weatherType.includes('rain')) {
        newCSS.href = '/css/heavyrain.css';
        newJS.src = '/js/heavyrain.js';
    } else if (weatherType.includes('snowy')) {
        newCSS.href = '/css/snowy.css';
        newJS.src = '/js/snowy.js';
    } else if (weatherType.includes('clear') && weatherType.includes('sky')) {
        newCSS.href = '/css/clearsky.css';
        newJS.src = '/js/clearsky.js';
    } else if ((weatherType.includes('scattered') || weatherType.includes('few')) && weatherType.includes('clouds')) {
        newCSS.href = '/css/scatteredclouds.css';
        newJS.src = '/js/scatteredclouds.js';
    } else if (weatherType.includes('broken') && weatherType.includes('clouds')) {
        newCSS.href = '/css/brokenclouds.css';
        newJS.src = '/js/brokenclouds.js';
    } else if (weatherType.includes('haze') || weatherType.includes('mist') || weatherType.includes('fog')) {
        newCSS.href = '/css/haze.css';
        newJS.src = '/js/haze.js';
    } else if (weatherType.includes('moderate') && weatherType.includes('rain')) {
        newCSS.href = '/css/modraterain.css';
        newJS.src = '/js/modraterain.js';
    } else if (weatherType === 'not') {
        console.log("x");
        newCSS.href = '/css/blank.css';
        newJS.src = '/js/blank.js';
    }

    const head = document.head;

    const oldCSS = document.querySelector('link[data-weather]');
    const oldJS = document.querySelector('script[data-weather]');

    var container = document.getElementById('img-container');

    if (oldCSS) {
        head.removeChild(oldCSS);
    }

    if (oldJS) {
        document.body.removeChild(oldJS);
    }
    head.appendChild(newCSS);

    if (newJS.src) {
        document.body.appendChild(newJS);
    }

    newCSS.setAttribute('data-weather', weatherType);
    newJS.setAttribute('data-weather', weatherType);

}