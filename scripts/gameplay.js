const gamePlay = function () {
  switch (message) {
    case 0:
      refresh('НОВАЯ ИГРА', 'ПРАВИЛА');

      text.innerHTML = `
            <div class="intro">
            <h1 class="area"><p>ПЕРВОПРОХОДЕЦ</p></h1>
            <br>
            <img class="btn-into" src="./image/wingmeel.png">
            </div>
            `;

      btn[0].onclick = function () {
        message = 1;
        turnPage();
        soundClick();
        text.classList.add('area-out');
        document
          .querySelector('.area')
          .querySelector('img')
          .classList.add('area-out');
      };
      btn[1].onclick = () => {
        message = 999;
        turnPage();
        soundClick();
      };
      break;

    case 1:
      refresh(
        'Сила +1',
        'Ловкость +1',
        'Интеллект +1',
        'Здоровье +1',
        'Сбросить',
        'Готово'
      );

      btn[0].onclick = function () {
        if (points > 0) {
          points -= 1;
          str += 1;
          gamePlay();
          soundClick();
          hudOverload();
        }
      };
      btn[1].onclick = function () {
        if (points > 0) {
          points -= 1;
          dex += 1;
          hudOverload();
          gamePlay();
          soundClick();
        }
      };
      btn[2].onclick = function () {
        if (points > 0) {
          points -= 1;
          int += 1;
          hudOverload();
          gamePlay();
          soundClick();
        }
      };
      btn[3].onclick = function () {
        if (points > 0) {
          points -= 1;
          hp += 1;
          hudOverload();
          gamePlay();
          soundClick();
        }
      };
      btn[4].onclick = function () {
        points = 6;
        hp = 3;
        str = 1;
        dex = 1;
        int = 1;
        hudOverload();
        gamePlay();
        soundClick();
      };
      btn[5].onclick = function () {
        text.classList.add('area');
        message = 2;
        turnPage();
      };

      saveStats(str, dex, int, hp, points);

      text.classList.remove('area');
      text.innerHTML = `
            <div>
            <h3><p>Создание персонажа</p></h3>
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
            <p><input type="text" id="input-name" value="${name}"><button class="name-btn">Ок</button></p>
            </form>
            </div>
            `;

      const applyName = document.querySelector('.name-btn');
      applyName.onclick = function () {
        name = document.querySelector('#input-name').value;
        nameSet = localStorage.setItem('name', name);
        disableButtons(btn);
        hudOverload();
        gamePlay();
      };
      //
      let div = document.createElement('div');
      div.classList.add('story');

      if (str <= 1 && int <= 1 && dex <= 1 && hp <= 3) {
        div.innerHTML = `<p>Кажется, <strong id="name"> ${name} </strong> пока ничего из себя не представляет! Вы не забыли распределить очки характеристик? Это очень важно для будущих проверок навыков! Пока что ваш персонаж - слабак!</p>`;
      } else if (str >= 5) {
        div.innerHTML = `<p>Похоже, <strong id="name"> ${name} </strong> крепко стоит на ногах!</p>`;
      } else if (dex >= 5) {
        div.innerHTML = `<p>Ох уж эта хитрая ухмылка! Видимо <strong id="name"> ${name} </strong> настоящий проидоха... с ним нужно держать ухо востро!</p>`;
      } else if (int >= 5) {
        div.innerHTML = `<p>В глазах <strong id="name"> ${name} </strong> читается вековая мудрость...</p>`;
      } else if (hp >= 7) {
        div.innerHTML = `<p>Ого, а <strong id="name"> ${name} </strong> может похвастать недюжим телосложением!</p>`;
      } else if (points != 0) {
        div.innerHTML = `<p>Так-так-так...</p>`;
      } else {
        div.innerHTML = `<p>Ну, это уже кое-что! Теперь <strong id="name"> ${name} </strong> может отправляться в путь.</p>`;
      }
      text.append(div);

      break;
    //ДЕЙСТВИЕ 2
    case 2:
      chekingButton();
      check[4] = true;
      refresh(
        'Попробовать встать',
        'Внимательно осмотреться',
        'Позвать на помощь',
        'Попытаться вспомнить хоть что-то... (интеллект)',
        'Подобрать ведро'
      );
      if (int >= 3)
        btn[3].textContent = 'Попытаться вспомнить хоть что-то... (интеллект)';
      else btn[3].textContent = '';

      btn[0].onclick = function () {
        message = 3;
        turnPage();
      };

      btn[1].onclick = () => {
        check[1] = true; //отключаем уже нажатую кнопку
        check[4] = false;
        // clearButtons();

        btn[4].textContent = 'Подобрать ведро';
        btn[4].classList.add('btn-intro');
        // btn[1].textContent = ''

        disableButtons(btn);

        if (int >= 3)
          btn[3].textContent =
            'Попытаться вспомнить хоть что-то... (интеллект)';
        else btn[3].textContent = '';

        expressionText(
          `<p>Вы пробуете оглядеться. Становится понятно, что сейчас ещё раннее утро. Помещение пыльное и затхлое. В нём нет ничего, кроме вашей койки и небольшого стола, под которым стоит ведро. Дверь, что у противоположной стены, явно закрыта. Это всё. </p>`
        );
        animateButton(btn[1]);
        soundClick();
      };

      btn[2].onclick = () => {
        check[2] = true; //отключаем уже нажатую кнопку

        // localStorage.setItem('check', )
        expressionText(`<p>- Эй! Меня кто-нибудь слышит?.. - громко кричите вы. Ждёте примерно минуту, но ничего не происходит.</p>
                <p>Вокруг тишина.</p>`);
        animateButton(btn[2]);
        soundClick();
      };

      btn[3].onclick = () => {
        check[3] = true; //отключаем уже нажатую кнопку

        checkingDice(
          'Интеллект',
          `
                    <p><em>"Двое неизвестных подстерегли меня у самого дома, а потом?.."</em>, 
                    вы силитесь вспомнить что-то ещё и в голове всплывает хриплый, 
                    низкий голос, который произносит: </p>
                    <p>- Эй, ${name}! Тебе привет от босса!</p>
                    <p>Вы помните, как вы обернулись, и поймали лицом дубину.
                    Это последнее воспоминание...</p>
                    `,
          `
                    <p><em>"Кажется, меня похитили..."</em>, вы изо всех сил стараетесь напрячь память, 
                    но мозг лишь отзывается тугой болью. Вас били по голове?..</p>
                    `,
          `
                    <p>Вам не удалось ничего вспомнить.</p>
                `
        );

        animateButton(btn[3]);
        soundClick();
      };
      btn[4].onclick = () => {
        backPackItem = 'Ведро';
      };

      text.innerHTML = `
            <div class="story">
            <h3><p>Глава первая.</p> </h3>
            <h4><p>Открывая глаза...</p></h4>
            <p>Вы открываете глаза в сыром и холодном помещении.
            Тусклый свет пробивается через узенькое окошко под потолком. 
            Под собой вы ощущаете твёрдую деревянную скамью, на которой лежите.</p>
            <p>Как же вы здесь оказались? И где - здесь?</p>
            </div>
            
            `;

      break;
    //ДЕЙСТВИЕ 3
    case 3:
      refresh(
        'На шаг назад',
        'Выбраться через окно',
        'Открыть дверь',
        'Подсмотреть в дверной замок (Ловкость)',
        'Выломать дверь с разбега (Сила)'
      );

      if (dex >= 3)
        btn[3].textContent = 'Подсмотреть в дверной замок (Ловкость)';
      else btn[3].textContent = '';

      if (str >= 3) btn[4].textContent = 'Выломать дверь с разбега (Сила)';
      else btn[4].textContent = '';

      btn[0].onclick = function () {
        message = 2;

        turnPage();
      };

      btn[1].onclick = () => {
        // через окно

        check1 = true;
        expressionText(
          `<p>Вы видите решётки на окне, и понимаете, что через окно не выйти.</p>`
        );
        animateButton(btn[1]);
        soundClick();
      };
      btn[2].onclick = () => {
        // открыть дверь

        soundClick();
        check[2] = true;
        expressionText(`<p>Дверь с тихим скрипом открывается...</p>`);
        animateButton(btn[2]);
      };
      btn[3].onclick = () => {
        check[3] = true;

        checkingDice(
          'Ловкость',
          `
                    <p>Приловчившись у замочной скважины, вы отчётливо видите коридор за дверью.</p>
                    <p>В коридоре горят тусклые светильники, напротив вашей двери картина с мельницей. 
                    Слева противоположная стена имеет дверь, а справа окно.</p>
                    `,
          `
                    <p>Не самый удачный ракурс, но.</p>
                    <p>Вы видите тусклый коридор, свет падает откуда-то справа. Прямо напротив вас видно мельницу.</p>
                    `,
          `
                    <p>Неуклюже привалившись к двери, вы пытаетесь разглядеть что-нибудь в глазок.</p>
                    <p>Вы видите перед собой мельницу.</p>
                `
        );

        animateButton(btn[3]);
        soundClick();
      };

      btn[4].onclick = function () {
        check4 = true; //отключаем уже нажатую кнопку
        checkingDice(
          'Сила',
          `
                <p>Вы со всей силы толкете дверь плечом. Дверь легко срывается с петель и падает в коридор.
                Как жаль, что вы при этом слегка поранили плечо.</p>
                `,
          `
                <p>Вы прислоняетесь к двери и делаете резкий толчок плечом. Дверь с размахом открывается.</p>
                `,
          `
                <p>Вы с разбегу бьётесь об дверь. И травмируете себе руку.</p>
                `
        );
        if (roll > 8) {
          hp -= 1;
          hudOverload();
        }

        animateButton(btn[4]);
        soundClick();
      };

      text.innerHTML = `
            <div class="story">
            <p>Вы медленно поднимаетесь. Сначала принимаете положение сидя, а после и встаёте.</p>
            </div>
            `;
      break;

    case 999:
      refresh('В НАЧАЛО');

      btn[0].onclick = function () {
        message = 0;
        turnPage();
      };

      text.innerHTML = `
            <div class="intro">
            <h1><p>Основные правила игры</p></h1>
            <hr>
            <p><img src="./image/feather.png"></p>
            </div>
            <div class="story">
            <h4><p>Делать выбор</p></h4>
            <p>Читайте нашу захватывающую историю и помогайте главному герою делать выбор, нажимая кнопки снизу.</p>
            <h4><p>Проходить испытания</p></h4>
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
            <h4><p>Веди диалоги</p></h4>
            <p>Каждый диалог в игре - своего рода миниигра. Второстепенные персонажи запоминают ваши ответы. 
            Кнопки ответов будут меняться динамически, вы не покините страницу с диалогом, пока он не завершится.
            Исходя из выводов и результатов диалога, вы получите новый сценарий.</p>
            <p>Например, если вы смогли договориться с охранником, вам позволят пройти куда-либо. 
            А если вы поругаетесь с этим охранником, вы можете оказаться в боевом режиме.</p>
            <h4><p>Боевой режим</p></h4>
            <p>Миниигра, напоминающая диалог и проверку навыков одновременно. 
            Возможные действия в бою сопровождаются плашками проверок: <em id="medium">Пнуть в живот(Сила)</em>. 
            Вы не покидаете боевой режим, пока бой не закончится. 
            Однако в боевом режиме всегда доступна проверка на <em id="hard">побег (Ловкость)</em>, 
            которая позволяет прервать бой, если вы понимаете, что не сможете выиграть. 
            Как и с результатом любой другой проверки, вы окажетесь в таком сценарии, 
            к которому логически ведёт данное действие.</p>
            </div>
            `;

      break;
  }

  //=====УПРАВЛЕНИЕ ИНВЕНТАРЁМ
  if (message !== 0 && message !== 1) {
    settingsButtons[0].onclick = function () {
      if (leftHandItem === 'Пусто') {
        expressionText(`<p>К сожалению, в левой руке пока ничего нет.</p>`);
      }
      soundClick();
    };

    settingsButtons[1].onclick = function () {
      inventory()
      if (rightHandItem === 'Пусто') {
        expressionText(`<p>Правая рука пуста...</p>`);
      }
      
      soundClick();
    };
    settingsButtons[2].onclick = function () {
      if (backPackItem === 'Пусто') {
        expressionText(
          `<p>Пошарив по карманам, вам ничего не удаётся найти.</p>`
        );
      } else if (backPackItem === 'Ведро') {
        expressionText(
          `<p>Шикарное ведро.</p>`
        );
      }
      soundClick();
    };
  }
  disableButtons(btn);
};

gamePlay();

// шаблон
// case 3:
//     btn[0].textContent = ''
//     btn[0].onclick = function() {
//         message = 1;
//         messNum(message)
//         gamePlay()
//         disableButtons(btn)
//     }
//     text.innerHTML =
//     `
//     <div class="story">
//     <p></p>
//     </div>
//     `
// break;
