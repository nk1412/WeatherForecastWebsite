function createRaindrop() {
  const raindrop= document.createElement('div');
  raindrop.className = 'raindrop0';
  raindrop.style.left = `${Math.random() * 120}%`;
  document.body.appendChild(raindrop);  

  setTimeout(() => {
    raindrop.remove();
  }, 10000);
}

setInterval(createRaindrop, 0);
//7f:76:7a:11:7a:ca (oneplus nord 2)