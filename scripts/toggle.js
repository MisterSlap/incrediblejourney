
document.querySelector('.themetoggle').addEventListener('click', (event) => {
    event.preventDefault();
    backPackItem = 'Пусто';

    addDarkClassToHTML();
    soundClick()
})

function addDarkClassToHTML(){
    try {
        if (localStorage.getItem('theme') === 'dark') {
            document.querySelector('body').classList.add('dark')        
            document.querySelector('.themetoggle span').textContent = 'dark_mode'
        } else {
            document.querySelector('body').classList.remove('dark')
            document.querySelector('.themetoggle span').textContent = 'wb_sunny'
        }
    } catch (err) {}
}

addDarkClassToHTML();