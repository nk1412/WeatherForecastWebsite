function createRaindrop() {
  const raindrop= document.createElement('div');
  raindrop.className = 'raindrop';
  raindrop.style.left = `${Math.random() * 120}%`;
  document.body.appendChild(raindrop);  
  setTimeout(() => {
    raindrop.remove();
  }, 10000);
}

setInterval(createRaindrop, 0);
