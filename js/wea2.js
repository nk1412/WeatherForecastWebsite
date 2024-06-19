    const apiKey = '71f6779186cc32448b4c412eea65b982';
    const units = 'metric';
    const hourly = 1;

    var chart=null;

    document.getElementById('search').addEventListener('click', () => {
      var location = document.getElementById('city').value;
      fetchWeatherData(location);
    });

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
        const response = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=current,minutely,alerts&appid=${apiKey}&units=${units}`);
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
            borderColor: 'rgba(75, 192, 192, 1)',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderWidth: 1
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
                text: 'Time (Hourly)'
              },
              ticks: {
                maxRotation: 0,
                padding: 10,
                fontColor: 'black'
              }
            },
            y: {
              display: true,
              title: {
                display: true,
                text: 'Temperature (°C)'
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
      const forecastElement = document.getElementById(elementId);
      forecastElement.innerHTML = '';

    const h2Element = document.createElement('h2');
    h2Element.textContent = 'This is a dynamically added h2 element!';
    const parentElement = document.getElementById('dailyForecast');
    parentElement.appendChild(h2Element);


      forecastData.forEach((item) => {
        const timestamp = new Date(item.dt * 1000);
        const date = timestamp.toLocaleDateString();
        const temperature = item.temp.day;
        const description = item.weather[0].description;

        const forecastItem = document.createElement('div');
        forecastItem.innerHTML = `${date} - ${temperature}°C, ${description}`;
        forecastElement.appendChild(forecastItem);
      });
    }
