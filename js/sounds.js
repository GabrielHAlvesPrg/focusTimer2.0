export default function() {
  const buttonPressAudio = new Audio("https://github.com/maykbrito/automatic-video-creator/blob/master/audios/button-press.wav?raw=true")
  const kitchenTimer = new Audio("https://github.com/maykbrito/automatic-video-creator/blob/master/audios/kichen-timer.mp3?raw=true")
  const audioForest = document.querySelector('.audioForest')
  const audioRain = document.querySelector('.audioRain')
  const audioCoffeeShop = document.querySelector('.audioCoffeeShop')
  const audioFireplace = document.querySelector('.audioFireplace')

  audioForest.loop = true
  audioRain.loop = true
  audioCoffeeShop.loop = true
  audioFireplace.loop = true

  function pressButton() {
    buttonPressAudio.play()
  }

  function timeEnd() {
    kitchenTimer.play()
  }

  return {
    pressButton,
    timeEnd,
    audioForest,
    audioRain,
    audioCoffeeShop,
    audioFireplace
  }
}