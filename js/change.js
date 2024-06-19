document.getElementById('search').addEventListener('click', () => {
  var type = document.getElementById('city').value;
  type = type.toLowerCase();
  updateWeather(type);
});

function updateWeather(weatherType) {

  const newCSS = document.createElement('link');
  newCSS.rel = 'stylesheet';
  newCSS.type = 'text/css';

  const newJS = document.createElement('script');
  newJS.type = 'text/javascript';

 if (weatherType === 'thunderstorm') {
    newCSS.href = 'thunderstorm.css';
    newJS.src = 'thunderstorm.js';
  } else if (weatherType === 'drizzle') { // Typo in 'drizzle'?
    newCSS.href = 'drizzel.css';
    newJS.src = 'drizzel.js';
  } else if (weatherType === 'sunny') {
    newCSS.href = 'sunny.css';
    newJS.src = 'sunny.js';
  } else if (weatherType === 'cloudy') {
    newCSS.href = 'cloudy.css';
    newJS.src = 'cloudy.js';
  } else if (weatherType.includes('light') && weatherType.includes('rain')) {
    newCSS.href = 'lightrain.css';
    newJS.src = 'lightrain.js';
  } else if ((weatherType.includes('partly') && weatherType.includes('cloudy')) || weatherType.includes('overcast') && weatherType.includes('clouds')) {
    newCSS.href = 'partlycloudy.css';
    newJS.src = 'partlycloudy.js';
  } else if (weatherType.includes('heavy') && weatherType.includes('rain')) {
    newCSS.href = 'heavyrain.css';
    newJS.src = 'heavyrain.js';
  } else if (weatherType === 'snowy') {
    newCSS.href = 'snowy.css';
    newJS.src = 'snowy.js';
  } else if (weatherType.includes('clear') && weatherType.includes('sky')) {
    newCSS.href = 'clearsky.css';
    newJS.src = 'clearsky.js';
  } else if ((weatherType.includes('scattered') || weatherType.includes('few')) && weatherType.includes('clouds')) {
    newCSS.href = 'scatteredclouds.css';
    newJS.src = 'scatteredclouds.js';
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
