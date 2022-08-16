//Variaveis
//Neste arquivo, estou capturando os elementos HTML, e armazenando-os em constantes e exportando-as para o arquivo principal.

// variaveis do display
const minutesDisplay = document.querySelector('.minutes')
const secondsDisplay = document.querySelector('.seconds')

// variaveis de controle
const buttonPlay = document.querySelector('.play')
const buttonPause = document.querySelector('.pause')
const buttonStop = document.querySelector('.stop')
const buttonAddTimer = document.querySelector('.addTimer')
const buttonremoveTimer = document.querySelector('.removeTimer')

// variaveis referentes aos sons
const buttonSoundForest = document.querySelector('.forest')
const buttonSoundRain = document.querySelector('.rain')
const buttonSoundCoffeeShop = document.querySelector('.coffeeShop')
const buttonSoundfireplace = document.querySelector('.fireplace')

//abaixo estou pegando o elemento de background color e font color dos meus elementos svgs.
const bgColorForest = document.querySelector('.bg-color-forest')
const fontColorForest = document.querySelector('.font-color-forest')
const bgColorRain = document.querySelector('.bg-color-rain')
const fontColorRain = document.querySelector('.font-color-rain')
const bgColorCoffeeShop = document.querySelector('.bg-color-coffeeShop')
const fontColorCoffeeShop = document.querySelector('.font-color-coffeeShop')
const bgColorFireplace = document.querySelector('.bg-color-fireplace')
const fontColorFireplace = document.querySelector('.font-color-fireplace')

export {
  minutesDisplay,
  secondsDisplay,
  buttonPlay,
  buttonPause,
  buttonStop,
  buttonAddTimer,
  buttonremoveTimer,
  buttonSoundForest,
  buttonSoundRain,
  buttonSoundCoffeeShop,
  buttonSoundfireplace,
  bgColorForest,
  fontColorForest,
  bgColorRain,
  fontColorRain,
  bgColorCoffeeShop,
  fontColorCoffeeShop,
  bgColorFireplace,
  fontColorFireplace,
}