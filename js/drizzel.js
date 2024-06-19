function createRaindrop() {
  const raindrop = document.createElement('div');
  raindrop.className = 'raindrop2';
  raindrop.style.left = `${Math.random() * 120}%`;
  const clouds = document.getElementById('clouds');
  clouds.appendChild(raindrop);
  
  setTimeout(() => {
    raindrop.remove();
  }, 2000);

  const allRaindrops = document.querySelectorAll('.raindrop0');

  allRaindrops.forEach((raindrop) => {
    raindrop.remove();
  });

  const allRaindrops1 = document.querySelectorAll('.raindrop1');

  allRaindrops.forEach((raindrop) => {
    raindrop.remove();
  });


}

setInterval(createRaindrop, 500);
