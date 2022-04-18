let windowHeight = window.innerHeight;

const areaHeight = document.querySelector('.area-max');
const hud = document.querySelector('.hud');
const settingsButtons = document.querySelectorAll('.inventory');
const content = document.querySelector('body');

let fonts = document.getElementsByTagName('p');
const soundSetting = document.getElementById('sound');

let soundCheck;
const musicTheme = new Audio();
musicTheme.preload = 'auto';
musicTheme.src = './sound/music-1.mp3';

const lhand = document.querySelector('lhand');
const rhand = document.querySelector('rhand');
const bpack = document.querySelector('bpack');

//0 - звук выключен, 1 - только звуки, 2 - звуки и музыка

let str = 1;
let dex = 1;
let int = 1;
let hp = 3;
let points = 6;

let name = 'Пиксель';

let diceSide = 1;
let rollerArray = new Array(
  'dice1',
  'dice2',
  'dice3',
  'dice4',
  'dice5',
  'dice6'
);
let fontSizeCheck = 0;
let fontSize = '20px';

const hudOverload = function () {
  hud.innerHTML = `
    <p>Здоровье: <strong>${hp}</strong></p>
    <p>Сила: <strong>${str}</strong></p>
    <p>Ловкость: <strong>${dex}</strong></p>
    <p>Интеллект: <strong>${int}</strong></p>

    <img src="./image/${
      rollerArray[diceSide - 1]
    }.png" class="dice" onclick="imageSrc()">
    `;
};

const areaSize = function () {
  if (windowHeight > 600) {
    areaHeight.classList.replace('area-min', 'area-max');
  } else {
    areaHeight.classList.replace('area-max', 'area-min');
  }
};

areaSize();
hudOverload();

const dice = document.querySelector('.dice');
let roll = 0;

function imageSrc() {
  diceSide = Math.floor(Math.random() * 6) + 1;
  dice.src = `/image/${rollerArray[diceSide - 1]}.png`;
  soundDiceRoll();
  hudOverload();

  return diceSide;
}

function musicPlay() {
  if (soundCheck === 2) {
    musicTheme.play();
  } else {
    musicTheme.pause();
  }
}

function soundDiceRoll() {
  let audio = new Audio(); // Создаём новый элемент Audio
  audio.src = './sound/diceroll.mp3'; // Указываем путь к звуку "клика"
  audio.autoplay = true; // Автоматически запускаем
}

function scroller(time) {
  let timerId = setInterval(() => areaHeight.scrollBy(0, 5), time);
  setTimeout(() => clearInterval(timerId), time * 100);
}

for (i = 0; i < 8; i++) {
  settingsButtons[i].classList.add('hide');
}
for (i = 0; i < 3; i++) {
  settingsButtons[i].classList.remove('hide');
}

function showSettings() {
  soundClick();
  if (settingsButtons[5].classList.contains('hide')) {
    for (i = 4; i < 8; i++) {
      settingsButtons[i].classList.remove('btn-outo');
      settingsButtons[i].classList.add('btn-into');
      settingsButtons[i].classList.remove('hide');
    }
  } else {
    for (i = 4; i < 8; i++) {
      settingsButtons[i].classList.remove('btn-into');
      settingsButtons[i].classList.add('btn-outo');
      setTimeout(function () {
        for (i = 5; i < 8; i++) {
          settingsButtons[i].classList.add('hide');
        }
      }, 800);
    }
  }
}

//КОНТРОЛЬ ЗВУКА
settingsButtons[4].onclick = function toggleScreen() {
  if (soundCheck < 2) {
    soundCheck++;
    localStorage.setItem('sound', JSON.stringify(soundCheck));
  } else {
    soundCheck = 0;
    localStorage.setItem('sound', JSON.stringify(soundCheck));
  }
  switch (soundCheck) {
    case 0:
      soundSetting.src = './image/snd-off.png';
      musicPlay();
      break;
    case 1:
      soundSetting.src = './image/snd-on.png';
      musicPlay();
      break;
    case 2:
      soundSetting.src = './image/snd-music.png';
      musicPlay();
      break;
  }

  soundClick();
};

//ПОЛНОЭКРАННЫЙ РЕЖИМ
settingsButtons[5].onclick = function toggleScreen() {
  if (!document.fullscreenElement) {
    content.requestFullscreen(); //возвращает элемент
  } else {
    if (document.fullscreenEnabled) {
      document.exitFullscreen();
    }
  }
  soundClick();
};

settingsButtons[8].onclick = function () {
  showSettings();
  soundClick();
};

if (
  localStorage.getItem('sound') === null ||
  localStorage.getItem('sound') === undefined
) {
  localStorage.setItem('sound', JSON.stringify(soundCheck));
  soundCheck = localStorage.getItem('sound');
  soundCheck = JSON.parse(soundCheck);
  console.log(soundCheck);
  musicPlay();
} else {
  // soundCheck = localStorage.setItem('sound', JSON.stringify(1));
  soundCheck = localStorage.getItem('sound');
  soundCheck = JSON.parse(soundCheck);
  console.log(soundCheck);
  //   musicPlay();
}
switch (soundCheck) {
  case 0:
    soundSetting.src = './image/snd-off.png';
    break;
  case 1:
    soundSetting.src = './image/snd-on.png';
    break;
  case 2:
    soundSetting.src = './image/snd-music.png';
    break;
}
