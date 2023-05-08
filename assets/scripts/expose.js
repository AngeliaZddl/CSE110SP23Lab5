// expose.js
window.addEventListener('DOMContentLoaded', init);

function init() {
  // TODO
  const hornSelect = document.getElementById('horn-select');
  const hornImage = document.querySelector('img');
  const hornSound = document.querySelector('audio');
  const jsConfetti = new JSConfetti();
  hornSelect.addEventListener("change", showPicAndSound);

  function showPicAndSound(){
    const selectedHorn = hornSelect.value;
    if (selectedHorn === 'party-horn') {
      hornImage.src = 'assets/images/party-horn.svg';
      hornSound.src = 'assets/audio/party-horn.mp3';
    } else if(selectedHorn === 'air-horn') {
      hornImage.src = 'assets/images/air-horn.svg';
      hornSound.src = 'assets/audio/air-horn.mp3';
    } else if(selectedHorn === 'car-horn') {
      hornImage.src = 'assets/images/car-horn.svg';
      hornSound.src = 'assets/audio/car-horn.mp3';
    } else {
      hornImage.src = 'assets/images/no-image.svg';
      hornSound.src = null;
    }
  }

  const slider = document.querySelector('#volume-controls input');
  const volumeIcon = document.querySelector('#volume-controls img');
  slider.addEventListener("input", changeVolume);

  function changeVolume(){
    const volume = slider.value;
    if (volume == 0) {
      volumeIcon.src = 'assets/icons/volume-level-0.svg';
    } else if (volume < 33) {
      volumeIcon.src = 'assets/icons/volume-level-1.svg';
    } else if (volume < 67) {
      volumeIcon.src = 'assets/icons/volume-level-2.svg';
    } else {
      volumeIcon.src = 'assets/icons/volume-level-3.svg';
    }
    hornSound.volume = volume / 100;
  }

  const playButton = document.querySelector('button');
  playButton.addEventListener("click", playSound);
  
  function playSound(){
    hornSound.play();
    const selectedHorn = hornSelect.value;
    if (selectedHorn === 'party-horn') {
      jsConfetti.addConfetti();
    }
  }
}