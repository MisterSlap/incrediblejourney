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
    points = sessionStorage.setItem('points', JSON.stringify(5))

    location.reload()
}

if (sessionStorage.getItem('message') === null || sessionStorage.getItem('message') === undefined || sessionStorage.getItem('message') === 0) {
    sessionSet = sessionStorage.setItem('message', JSON.stringify(0))
    sessionSet = sessionStorage.getItem('message')
    sessionSet = JSON.parse(sessionSet)

    console.log('ветка: ', 1, 'сессия: ', sessionSet)

    str = sessionStorage.setItem('str', JSON.stringify(1))
    str = sessionStorage.getItem('str')
    str = JSON.parse(str)
    dex = sessionStorage.setItem('dex', JSON.stringify(1))
    dex = sessionStorage.getItem('dex')
    dex = JSON.parse(dex)
    int = sessionStorage.setItem('int', JSON.stringify(1))
    int = sessionStorage.getItem('int')
    int = JSON.parse(int)
    hp = sessionStorage.setItem('hp', JSON.stringify(1))
    hp = sessionStorage.getItem('hp')
    hp = JSON.parse(hp)
    points = sessionStorage.setItem('points', JSON.stringify(5))
    points = sessionStorage.getItem('points')
    points = JSON.parse(points)

} else { 
    //Если message не равно 0
    sessionSet = sessionStorage.getItem('message')
    sessionSet = JSON.parse(sessionSet)

    console.log('ветка: ', 2, 'сессия: ', sessionSet)

    str = sessionStorage.getItem('str')
    str = JSON.parse(str)
    dex = sessionStorage.getItem('dex')
    dex = JSON.parse(dex)
    int = sessionStorage.getItem('int')
    int = JSON.parse(int)
    hp = sessionStorage.getItem('hp')
    hp = JSON.parse(hp)
    points = sessionStorage.getItem('points')
    points = JSON.parse(points)
    hudOverload();
}

if (sessionStorage.getItem('name') === null || sessionStorage.getItem('name') === 'Пиксель' || sessionStorage.getItem('name') === undefined) {
 
    sessionStorage.setItem('name', 'Пискель')
    nameSet = sessionStorage.getItem('name')
    name = nameSet
    console.log('ветка: ', 1, 'имя: ', name)
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
    points = sessionStorage.setItem('points', JSON.stringify(points))
    
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

const clearButtons = function() {
    for (var i = 0; i <= 9; i++) {
        btn[i].textContent=''
    }
}



