const btn = document.querySelectorAll('.btn')
const eraseGame = document.querySelector('.X') 
const text = document.querySelector('.area')



eraseGame.onclick = function() {
    sessionSet = sessionStorage.setItem('message', JSON.stringify(0))
    nameSet = sessionStorage.setItem('name', 'Пискель')

    str = sessionStorage.setItem('str', JSON.stringify(1))
    
    dex = sessionStorage.setItem('dex', JSON.stringify(1))
    
    int = sessionStorage.setItem('int', JSON.stringify(1))
    
    hp = sessionStorage.setItem('hp', JSON.stringify(3))
    
    hp = sessionStorage.setItem('points', JSON.stringify(5))

    location.reload()
}

if (sessionStorage.getItem('message') === null || sessionStorage.getItem('message') === undefined || sessionStorage.getItem('message') === 0) {
    sessionSet = sessionStorage.setItem('message', JSON.stringify(0))
    sessionSet = sessionStorage.getItem('message')

    sessionSet = JSON.parse(sessionSet)
    console.log('ветка: ', 1, 'сессия: ', sessionSet)
} else {
    sessionSet = sessionStorage.getItem('message')
    sessionSet = JSON.parse(sessionSet)

    console.log('ветка: ', 2, 'сессия: ', sessionSet)
}

if (sessionStorage.getItem('name') === null || sessionStorage.getItem('name') === undefined || sessionStorage.getItem('name') === 'Пиксель') {
 
    nameSet = sessionStorage.setItem('name', 'Пискель')
    name = nameSet
    console.log('ветка: ', 1, 'имя: ', nameSet)
} else {
    nameSet = sessionStorage.getItem('name', name)
    name = nameSet
    console.log('ветка: ', 2, 'имя: ', nameSet)
}

function messNum (num) {
    localStorage.setItem('message', JSON.stringify(num))
    sessionSet = sessionStorage.setItem('message', JSON.stringify(num))
    
}

function saveStats (str, dex, int, hp, points) {
    localStorage.setItem('str', JSON.stringify(str))
    str = sessionStorage.setItem('str', JSON.stringify(str))
    localStorage.setItem('dex', JSON.stringify(dex))
    dex = sessionStorage.setItem('dex', JSON.stringify(dex))
    localStorage.setItem('int', JSON.stringify(int))
    int = sessionStorage.setItem('int', JSON.stringify(int))
    localStorage.setItem('hp', JSON.stringify(hp))
    hp = sessionStorage.setItem('hp', JSON.stringify(hp))
    localStorage.setItem('points', JSON.stringify(points))
    hp = sessionStorage.setItem('points', JSON.stringify(points))
    
}

messNum(sessionSet)

let message = localStorage.getItem('message') //0 титульная страница игры
    message = JSON.parse(message)



const disableButtons = function(btn) {
    for (var i = 0; i <= 9; i++) {
        if (btn[i].textContent === '') {
            btn[i].setAttribute('hidden', 'hidden')
        } else {
            btn[i].removeAttribute('hidden')
        }
        // ещё какие-то выражения
     }
}

const gamePlay = function() {
    
    switch (message) {
        case 0:
            btn[0].textContent = 'НОВАЯ ИГРА'
            btn[0].onclick = function() {
                message = 1;
                messNum(message)
                gamePlay()
                disableButtons(btn)
            }

            text.innerHTML = 
            `
            <div class="intro">
            <h1>ПЕРВОПРОХОДЕЦ</h1>
            <br>
            <img src="./image/wingmeel.png">
            </div>
            
            `
        
        break;
        case 1:
            btn[0].textContent = 'Сила +1'
            btn[1].textContent = 'Ловкость +1'
            btn[2].textContent = 'Интеллект +1'
            btn[3].textContent = 'Здоровье +1'
            btn[4].textContent = 'Сбросить'
            btn[5].textContent = 'Готово'
            disableButtons(btn)
            
            btn[0].onclick = function() {
                if (points > 0) {
                    points-=1
                    str+=1
                    gamePlay()
                    hudOverload();
                }
            }
            btn[1].onclick = function() {
                if (points > 0) {
                    points-=1
                    dex+=1
                    hudOverload();
                    gamePlay()
                }
            }
            btn[2].onclick = function() {
                if (points > 0) {
                    points-=1
                    int+=1
                    hudOverload();
                    gamePlay()
                }
            }
            btn[3].onclick = function() {
                if (points > 0) {
                    points-=1
                    hp+=1
                    hudOverload();
                    gamePlay()
                }
            }
            btn[4].onclick = function() {
                    points = 5
                    hp = 3
                    str = 1
                    dex = 1
                    int = 1
                    hudOverload();
                    gamePlay()
            }
            btn[5].onclick = function() {
                disableButtons(btn)
                hudOverload();
                gamePlay()
            }
            saveStats (str, dex, int, hp, points) 

            text.innerHTML = 
            `
            <div>
            <h3>Создание персонажа </h3>
            <hr>
            <p>Задайте стартовые характеристики персонажа.</p>
            <br>
            <div class="intro">
            <p>Очки характеристик: <strong>${points}</strong></p>
            <br>
            <p>Здоровье: <strong>${hp}</strong></p>
            <p>Сила: <strong>${str}</strong></p>
            <p>Ловкость: <strong>${dex}</strong></p>
            <p>Интеллект: <strong>${int}</strong></p>
            </div>
            <hr>
            <div class="intro">
            <p>Имя персонажа:</p>
            <input type="text" id="input-name" value="${name}"><button class="name-btn">Ок</button>
            </div>
            `
            const applyName = document.querySelector('.name-btn') 
            applyName.onclick = function() {
                name = document.querySelector('#input-name').value
                nameSet = sessionStorage.setItem('name', name)
                disableButtons(btn)
                hudOverload();
                gamePlay()
            }
            // 
            let div = document.createElement('div')
            if (str<=1 && int<=1 && dex<=1 && hp <= 3) {
                div.innerHTML = `Кажется, <strong id="name"> ${name} </strong> пока ничего из себя не представляет! Вы не забыли распределить очки характеристик? Это очень важно для будущих проверок навыков! Пока что ваш персонаж - слабак!` 
            } else 
            if (str>=5) {
                div.innerHTML = `Похоже, <strong id="name"> ${name} </strong> крепко стоит на ногах!`
            } else
            if (dex>=5) {
                div.innerHTML = `Ох уж эта хитрая ухмылка! Видимо <strong id="name"> ${name} </strong> настоящий проидоха... с ним нужно держать ухо востро!`
            } else
            if (int>=5) {
                div.innerHTML = `В глазах <strong id="name"> ${name} </strong> читается вековая мудрость...`
            } else
            if (hp>=7) {
                div.innerHTML = `Ого, а <strong id="name"> ${name} </strong> может похвастать недюжим телосложением!`
            } else 
            if (points != 0) {
                div.innerHTML = `Так-так-так...`
            } else {
                div.innerHTML = `Ну, это уже кое-что!`
            }

            text.append(div)

        break;
        case 100:
            btn[0].textContent = 'НОВАЯ ИГРА'
            btn[0].onclick = function() {
                message = 100;
                messNum(message)
                gamePlay()
                disableButtons(btn)
            }

            text.innerHTML = 
            `
            <div class="intro">
            <h1>КОНЕЦ</h1>
            <br>
            <img src="./image/feather.png">
            </div>
            
            `
        
        break;
    }
    
    
    // if (message === 0) {
    //     btn[0].textContent = 'НОВАЯ ИГРА'
    // }
    
}


gamePlay()
disableButtons(btn)
