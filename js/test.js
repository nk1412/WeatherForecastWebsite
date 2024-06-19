function createRaindrop() {
  const raindrop = document.createElement('div');
  raindrop.className = 'raindrop';
  raindrop.style.left = `${Math.random() * 120}%`;
  document.body.appendChild(raindrop);
  
  setTimeout(() => {
    raindrop.remove();
  }, 2000);
}

setInterval(createRaindrop, 100);
