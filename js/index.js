//Abaixo, estou importando as constantes:
import {
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
} from "./elements.js"

let audioForest = false
let audioRain = false
let audioCoffeeShop = false
let audioFireplace = false
let timerTimeOut
let minutes = Number(minutesDisplay.textContent)

// Estou importando os sonds da minha aplicação.
import Sounds from "./sounds.js"
const sound = Sounds()

// Eventos ------------------------------------------------------

buttonPlay.addEventListener('click', function() {
  sound.pressButton()
  play()
  countDown()
})

buttonPause.addEventListener('click' , function(){
  sound.pressButton()
  hold()
  pause()
})

buttonStop.addEventListener('click', function(){
  resetTimer()
  resetControls()
  sound.pressButton()
})

buttonAddTimer.addEventListener('click', function() {
  addTimerDisplay()
  sound.pressButton()
})

buttonremoveTimer.addEventListener('click', function(){
  removeTimerDisplay()
  sound.pressButton()
})


// Eventos dos cards: ------------------------------------------------------
//Armazeno o retorno da minha função, nas variaveis de audio.
buttonSoundForest.addEventListener('click', function() {
  audioForest = soundCardOnOff(audioForest, sound.audioForest, bgColorForest, fontColorForest)
})

buttonSoundRain.addEventListener('click', function(){
  audioRain = soundCardOnOff(audioRain, sound.audioRain, bgColorRain, fontColorRain)
})

buttonSoundCoffeeShop.addEventListener('click', function() {
  audioCoffeeShop = soundCardOnOff(audioCoffeeShop, sound.audioCoffeeShop, bgColorCoffeeShop, fontColorCoffeeShop)
})

buttonSoundfireplace.addEventListener('click', function(){
  audioFireplace = soundCardOnOff(audioFireplace, sound.audioFireplace, bgColorFireplace, fontColorFireplace)
})

// Funções ------------------------------------------------------

/*
  A função soundCardOnOff() faz a seguinde verificação:
  - Se o audio passado no argumento, for false:
    * executa o audio.
    * muda a cor de fundo do botão
    * muda a cor da fonte do botão
    * atribui true para o audio
    * retorna o audio
  - Se o audio passado no argumento, for true:
    * Pausa o audio
    * muda a cor de fundo do botão de volta a cor original
    * muda a cor da fonte do botão de volta a cor original
    * atribui false para o audio
    * retorna o audio
*/
function soundCardOnOff(audio, sound, bgColor, fontColor){ 
  if (audio === false){
    sound.play()
    bgColor.style.fill = '#02799D'
    fontColor.style.fill = '#ffffff'
    audio = true
    return audio 
  }else {
    sound.pause()
    bgColor.style.fill = '#E1E1E6'
    fontColor.style.fill = '#323238'
    audio = false
    return audio
  }
}


function updateDisplay(newMinutes, seconds) {

  newMinutes = newMinutes === undefined ? minutes : newMinutes
  seconds = seconds === undefined ? 0 : seconds
  /*
    Para preencher o primeiro caractere(minutos), quando o seconds está entre 0 e 9, envolvo o calculo matemático em uma String,
    Para utilizar a propriedade (padStart - preenchimento inicial) que será responsavel pelo preenchimento.
    O primeiro argumento é um number, que diz a quantidade de caracteres desejados, o segundo argumento é uma string que irá ocupar a primeira casa.
  */
  minutesDisplay.textContent = String(newMinutes).padStart(2, "0")
  secondsDisplay.textContent = String(seconds).padStart(2, "0")
}

/*
  A função addTimerDisplay(), pega o conteudo da variavel minutesDisplay, tranforma em número e armazena na variavel display.
  Então faz uma verificação, se o display for menor que 95 incrementa + 5 ao display e faz a calback da função updateDisplay(), passando
  o display como primeiro argumento e 0 como o segundo, se não, retorna um alerta.

  A funçã0 removeTimerDisplay(), faz a mesma coisa, só que verificando se o display é maior que 5, entao decrementando 5 se não, mandando um alerta.
*/
function addTimerDisplay(){
  let display = Number(minutesDisplay.textContent)
  if (display < 95){
    display += 5
    updateDisplay(display, 0)
  }else {
    return alert('Não permitido tempo superior a 95 minutos.')
  }
  
}

function removeTimerDisplay(){
  let display = Number(minutesDisplay.textContent)
  if (display > 5){
    display -= 5
    updateDisplay(display, 0)
  }else {
    return alert('Não prermitido tempo inferior a 5 minutos.')
  }
  
}

/*
Na função countDown(), a váriavel timerTimeOut(), está recebendo  o método setTimeout(), que define um cronômetro que executa uma função anonima, 
essa função declara três variaveis, seconds, minutes e  isFinished.
  * seconds: recebe os segundos que estão lá no display dos segundos, e tranforma o valor, que é uma String para Number.
  * minutes: recebe os minutos que estão lá no display dos minutos, e tranforma o valor, que é uma String para Number.
  * isFinished: verifica se os minutos e segundos, são menores ou iguais a zero, armazera isso em um valor booleano. (true ou false)
Após a declaração das variaveis, é feito o calback da função updateDisplay() e duas verificações, a primeira é se o valor do isFinished é true ou false,
 se for true, caira dentro da condicional e será feito os seguintes passos:
  * calback da função resetControls()
  * calback da função updateDisplay()
  * calback da função timeEnd() que esta no arquivo souns.js
  Se a resposta do isFinished for false, o programa seguira para a proxima estrutura de repetição, já nela, se seconds for menor ou igual a zero,
  será atribuido o valor de 60 para a variavel seconds e decrementado o valor de 1 da variavel minutos.
  Se não, o programa continuará e fará a calback da função updateDisplay() decrementando o valor 1 da variavel segundos e em seguida executará ela mesma novamente até o isFinished ser true,
  quando isso acontecer o countDown() será encerrado.
*/
function countDown(){
  timerTimeOut = setTimeout(function (){
    let seconds = Number(secondsDisplay.textContent)
    let minutes = Number(minutesDisplay.textContent)
    let isFinished = minutes <= 0 && seconds <= 0

    updateDisplay(minutes, 0)

    if (isFinished) {
      resetControls()
      updateDisplay()
      sound.timeEnd()
      return
    }

    if (seconds <= 0){
      seconds = 60
      --minutes
    }
    //  A lógica a seguir, está decrementando 1 segundo no display. 
    updateDisplay(minutes, String(seconds - 1))

    countDown() //Recursão ou recursiva, quando uma função, chama ela mesma.
  }, 1000)
}

function hold(){
  clearTimeout(timerTimeOut)//o js vai procurar dentro do timeOUt o id referente, e vai pausar.
}

//A função resetTimer, faz o calback do função updateDisplay e da função clearTimeout(), que limpa o tempo limite que foi definido pela função setTimeout() antes disso.
function resetTimer(){
  updateDisplay(minutes, 0)
  clearTimeout(timerTimeOut)
}

//A função resetControls, remove o status hide, no botão play, e adiciona no pause.
function resetControls(){
  buttonPlay.classList.remove('hide')
  buttonPause.classList.add('hide')
}

//A função play,adiciona o status hide, no botão play e remove do botão pause. 
function play() {
  buttonPlay.classList.add('hide')
  buttonPause.classList.remove('hide')
}

//A função pause,adiciona o status hide, no botão pause e remove do botão play. 
function pause() {
  buttonPause.classList.add('hide')
  buttonPlay.classList.remove('hide')
}