let windowHeight = window.innerHeight

const areaHeight = document.querySelector('.area-max')
const hud = document.querySelector('.hud') 
let str = 1
let dex = 1
let int = 1
let hp = 3
let points = 5

let name = 'Пиксель'



const hudOverload = function() {
    hud.innerHTML = `
    <p>Здоровье: <strong>${hp}</strong></p>
    <p>Сила: <strong>${str}</strong></p>
    <p>Ловкость: <strong>${dex}</strong></p>
    <p>Интеллект: <strong>${int}</strong></p>

    <img src="./image/dice1.png" class="dice" onclick="imageSrc();">
    `
}

const areaSize = function () {
    if (windowHeight > 600) {
        areaHeight.classList.replace('area-min', 'area-max')
    } else {
        areaHeight.classList.replace('area-max', 'area-min')
    }
}

areaSize();
hudOverload();

const dice = document.querySelector('.dice')

let diceSide = 0;
let rollerArray = new Array('dice1.png', 'dice2.png', 'dice3.png', 'dice4.png', 'dice5.png', 'dice6.png')

function imageSrc() {
    diceSide = (Math.floor(Math.random() * 6) + 1)
    dice.src = `./image/${rollerArray[diceSide-1]}`
    return diceSide;
}
