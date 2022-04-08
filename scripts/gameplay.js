const gamePlay = function() {
    
    switch (message) {
        case 0:
            btn[0].textContent = 'НОВАЯ ИГРА'
            btn[1].textContent = 'ПРАВИЛА'
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
            btn[1].onclick = () => {
                clearButtons();
                message = 999;
                messNum(message)
                gamePlay()
                disableButtons(btn)
            }
            
        
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
                clearButtons();
                message = 2;
                messNum(message)
                gamePlay()
                disableButtons(btn)
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
            <form>
            <input type="text" id="input-name" value="${name}"><button class="name-btn">Ок</button>
            </form>
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
                div.innerHTML = `Ну, это уже кое-что! Теперь <strong id="name"> ${name} </strong> может отправляться в путь.`
            }

            text.append(div)

        break;
        case 2:
            btn[0].textContent = 'ПОКА ВСЁ'
            btn[0].onclick = function() {
                message = 999;
                messNum(message)
                gamePlay()
                disableButtons(btn)
            }

            text.innerHTML = 
            `
            <div class="story">
            <h3>Глава первая. </h3>
            <h4>Открывая глаза...</h4>
            <p>Похоже, что больше ничего нет.</p>
            <br>
            </div>
            
            `
        
        break;
        case 999:
            btn[0].textContent = 'В НАЧАЛО'
            btn[0].onclick = function() {
                clearButtons();
                message = 0;
                messNum(message)
                gamePlay()
                disableButtons(btn)
            }

            text.innerHTML = 
            `
            <div class="intro">
            <h1>Основные правила игры</h1>
            <hr>
            <img src="./image/feather.png">
            </div>
            <div class="story">
            <h4>Делать выбор</h4>
            <p>Читайте нашу захватывающую историю и помогайте главному герою делать выбор, нажимая кнопки снизу.</p>
            <h4>Проходить испытания</h4>
            <p>Вверху вы видите дайс - шестигранный кубик. Вы можете нажать на него, чтобы сделать бросок. 
            Многие действия будут требовать от игрока проверок, 
            которые будут происходить с помощью броска этого шестигранника.
            Проверки испытывают основные характеристики, 
            которые так же прописаны в поле наверху. 
            Они имеют следующую градацию сложности:
            <br>
            <em id="easy">Легко</em> - сложность проверки 3. 
            <br>
            <em id="medium">Средне</em> - сложность проверки 5. 
            <br>
            <em id="hard">Сложно</em> - сложность проверки 8.
            <br>
            <em id="impossible">Невероятно</em> - сложность проверки 11.
            </p>
            <p>Результат броска суммируется с характеристиками персонажа.
             Он должен превзойти сложность проверки, чтобы действие считалось успешным.</p>
            <p>Например: <em id="easy">Поднять камень (сила)</em>.</p>
            <p>
            Если на кубике выпадает 2, и при этом у нас всего 1 силы, то результат проверки
            равен её сложности. Персонаж не смог поднять камень, действие будет разворачиваться
            по сценарию, в котором у персонажа камня нет. 
            Однако, если мы выбросили 3, а наш бонус силы по прежнему 1, то мы превзошли сложность проверки и подняли камень.
            В следующем сценарии у нас будет возможность выбрать действие с ним связанное.
            </P> 
            <h4>Веди диалоги</h4>
            <p>Каждый диалог в игре - своего рода миниигра. Второстепенные персонажи запоминают ваши ответы. 
            Кнопки ответов будут меняться динамически, вы не покините страницу с диалогом, пока он не завершится.
            Исходя из выводов и результатов диалога, вы получите новый сценарий.</p>
            <p>Например, если вы смогли договориться с охранником, вам позволят пройти куда-либо. 
            А если вы поругаетесь с этим охранником, вы можете оказаться в боевом режиме.</p>
            <h4>Боевой режим</h4>
            <p>Миниигра, напоминающая диалог и проверку навыков одновременно. 
            Возможные действия в бою сопровождаются плашками проверок: <em id="medium">Пнуть в живот(Сила)</em>. 
            Вы не покидаете боевой режим, пока бой не закончится. 
            Однако в боевом режиме всегда доступна проверка на <em id="hard">побег (Ловкость)</em>, 
            которая позволяет прервать бой, если вы понимаете, что не сможете выиграть. 
            Как и с результатом любой другой проверки, вы окажетесь в таком сценарии, 
            к которому логически ведёт данное действие.</p>
            </div>
            `
        
        break;
    }
    

}

gamePlay()
disableButtons(btn)
