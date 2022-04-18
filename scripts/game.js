const btn = document.querySelectorAll('.btn');
const eraseGame = document.querySelector('.X');
const text = document.querySelector('.area');
let buttonList = [];
let check = [];
for (let i = 0; i < 9; i++) {
  check[i] = false;
}

let leftHandItem = 'Пусто',
  rightHandItem = 'Пусто',
  backPackItem = 'Пусто';

eraseGame.onclick = function () {
  sessionSet = localStorage.setItem('message', JSON.stringify(0));
  nameSet = localStorage.setItem('name', 'Пиксель');

  str = localStorage.setItem('str', JSON.stringify(1));
  dex = localStorage.setItem('dex', JSON.stringify(1));
  int = localStorage.setItem('int', JSON.stringify(1));
  hp = localStorage.setItem('hp', JSON.stringify(3));
  points = localStorage.setItem('points', JSON.stringify(6));

  location.reload();
};

if (
  localStorage.getItem('message') === null ||
  localStorage.getItem('message') === undefined ||
  localStorage.getItem('message') === 0
) {
  sessionSet = localStorage.setItem('message', JSON.stringify(0));
  sessionSet = localStorage.getItem('message');
  sessionSet = JSON.parse(sessionSet);

  str = localStorage.setItem('str', JSON.stringify(1));
  str = localStorage.getItem('str');
  str = JSON.parse(str);
  dex = localStorage.setItem('dex', JSON.stringify(1));
  dex = localStorage.getItem('dex');
  dex = JSON.parse(dex);
  int = localStorage.setItem('int', JSON.stringify(1));
  int = localStorage.getItem('int');
  int = JSON.parse(int);
  hp = localStorage.setItem('hp', JSON.stringify(1));
  hp = localStorage.getItem('hp');
  hp = JSON.parse(hp);
  points = localStorage.setItem('points', JSON.stringify(6));
  points = localStorage.getItem('points');
  points = JSON.parse(points);
} else {
  //Если message не равно 0
  sessionSet = localStorage.getItem('message');
  sessionSet = JSON.parse(sessionSet);

  str = localStorage.getItem('str');
  str = JSON.parse(str);
  dex = localStorage.getItem('dex');
  dex = JSON.parse(dex);
  int = localStorage.getItem('int');
  int = JSON.parse(int);
  hp = localStorage.getItem('hp');
  hp = JSON.parse(hp);
  points = localStorage.getItem('points');
  points = JSON.parse(points);

  hudOverload();
}

if (
  localStorage.getItem('name') === null ||
  localStorage.getItem('name') === 'Пиксель' ||
  localStorage.getItem('name') === undefined
) {
  localStorage.setItem('name', 'Пиксель');
  nameSet = localStorage.getItem('name');
  name = nameSet;
} else {
  nameSet = localStorage.getItem('name', name);
  name = nameSet;
}

function messNum(num) {
  for (let i = 0; i < 9; i++) {
    check[i] = false;
  }
  localStorage.setItem('message', JSON.stringify(num));
  sessionSet = localStorage.setItem('message', JSON.stringify(num));
}

function saveStats(str, dex, int, hp, points) {
  localStorage.setItem('str', JSON.stringify(str));
  str = localStorage.setItem('str', JSON.stringify(str));
  localStorage.setItem('dex', JSON.stringify(dex));
  dex = localStorage.setItem('dex', JSON.stringify(dex));
  localStorage.setItem('int', JSON.stringify(int));
  int = localStorage.setItem('int', JSON.stringify(int));
  localStorage.setItem('hp', JSON.stringify(hp));
  hp = localStorage.setItem('hp', JSON.stringify(hp));
  localStorage.setItem('points', JSON.stringify(points));
  points = localStorage.setItem('points', JSON.stringify(points));
}

messNum(sessionSet);

let message = localStorage.getItem('message'); 
//0 титульная страница игры
message = JSON.parse(message);

const disableButtons = function (btn) {
  for (var i = 0; i <= 9; i++) {
    if (btn[i].textContent === '') {
      btn[i].setAttribute('hidden', 'hidden');
    } else {
      btn[i].removeAttribute('hidden');
      btn[i].classList.add('btn-into');
    }
  }
};

const clearButtons = function () {
  for (var i = 0; i <= 9; i++) {
    if (!check[i]) {
      btn[i].classList.remove('btn-outo');
      btn[i].removeAttribute('disabled');
      setTimeout((btn[i].textContent = ''), 500);
    }
  }
};

function animateButton(button) {
  button.classList.add('btn-outo');
  button.setAttribute('disabled', 'disabled');

  setTimeout(function () {
    button.textContent = '';
    disableButtons(btn);
  }, 1000);
}

function animatingButtons() {
  for (var i = 0; i <= 9; i++) {
    btn[i].classList.add('btn-outo');
    btn[i].setAttribute('disabled', 'disabled');
  }
  text.classList.add('area-out');
}

const refresh = function (
  b0 = '',
  b1 = '',
  b2 = '',
  b3 = '',
  b4 = '',
  b5 = '',
  b6 = '',
  b7 = '',
  b8 = '',
  b9 = ''
) {
  buttonList = [b0, b1, b2, b3, b4, b5, b6, b7, b8, b9];

  clearButtons();
  for (i = 0; i < 9; i++) {
    if (!check[i]) btn[i].textContent = buttonList[i];
    else btn[i].textContent = '';
  }

  disableButtons(btn);
};

function turnPage() {
  animatingButtons();
  setTimeout(function () {
    clearButtons();
    messNum(message);
    gamePlay();
    disableButtons(btn);
    setTimeout(text.classList.remove('area-out'), 500);
  }, 500);
  soundSheetlisting();
}



function soundSheetlisting() {
  if (soundCheck !== 0) {
    const audio = new Audio();
    audio.preload = 'auto';
    audio.src = './sound/sheetlisting.mp3';
    audio.play();
  }
}

function soundClick() {
  if (soundCheck !== 0) {
    const audio = new Audio();
    audio.preload = 'auto';
    audio.src = './sound/click.mp3';
    audio.play();
  }
}

function expressionText(txt) {
  let div = document.createElement('div');
  div.classList.add('story');
  div.innerHTML = txt;
  text.append(div);
  scroller(10);
}

function chekingButton() {
  for (let i = 0; i < 9; i++) {
    check[i] = false;
  }
}

function checkingDice(par, max, mid, min) {
  ///(что проверяем, лучший результат, средний, худший результат)
  let div = document.createElement('div'),
    scrolled = 0;
  div.classList.add('story');

  let prepare = 0;
  if (par === 'Интеллект') {
    prepare = int;
  }
  if (par === 'Сила') {
    prepare = str;
  }
  if (par === 'Ловкость') {
    prepare = dex;
  }

  roll = imageSrc() + prepare;
  scrolled = 300;
  let direct = '';

  if (roll > 8) {
    direct = `<p><em id="hard">(${par} ${prepare} + ${diceSide} = <strong>${roll}</strong>)</em></p>`;
    console.log(roll, ' > 8');
    div.innerHTML = direct + max;
  } else if (roll > 5) {
    direct = `<p><em id="medium">(${par} ${prepare} + ${diceSide} = <strong>${roll}</strong>)</em></p>`;
    console.log(roll, ' > 5');
    div.innerHTML = direct + mid;
  } else {
    direct = `<p><em id="easy">(${par} ${prepare} + ${diceSide} = <strong>${roll}</strong>)</em></p>`;
    console.log(roll, ' <= 5');
    div.innerHTML = direct + min;
  }
  text.append(div);
  scroller(10);
}

document.querySelector('html').addEventListener('click', function() {
  var context = new AudioContext();
  musicPlay()
});