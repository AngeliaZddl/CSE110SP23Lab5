// explore.js

window.addEventListener('DOMContentLoaded', init);

function init() {
  // TODO
  const synth = window.speechSynthesis;
  let voices = [];
  synth.addEventListener('voiceschanged', voiceList);
  const voiceSelect = document.getElementById('voice-select');
  const image = document.querySelector('img');
  function voiceList() {
    voices = synth.getVoices();
    for (let i = 0; i < voices.length; i++) {
      const option = document.createElement("option");
      option.textContent = `${voices[i].name} (${voices[i].lang})`;
      if (voices[i].default) {
        option.textContent += " — DEFAULT";
      }
      option.setAttribute("data-lang", voices[i].lang);
      option.setAttribute("data-name", voices[i].name);
      voiceSelect.appendChild(option);
    }
  }

  const talkButton = document.querySelector('button');
  talkButton.addEventListener('click', playSound);
  function playSound(){
    const textArea = document.querySelector('#text-to-speak');
    const voicesAll = document.querySelector('#voice-select');
    const utterThis = new SpeechSynthesisUtterance(textArea.value);
    const selectedVoice = voicesAll.selectedOptions[0].getAttribute('data-name');
    for (let i = 0; i < voices.length; i++) {
      if (voices[i].name === selectedVoice) {
        utterThis.voice = voices[i];
      }
    }
    synth.speak(utterThis);
    utterThis.addEventListener("start", imgChange);
    function imgChange() {
      image.src = 'assets/images/smiling-open.png';
    }
    utterThis.addEventListener("end", keepChange);
    function keepChange(){
      image.src = 'assets/images/smiling.png';
    }
  }
}