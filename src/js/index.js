// кнопка начать игру
let startBtn = document.getElementById('btn-start');
// контейнер с правилами 
let instructionsContainer = document.getElementById('container-instruction');
// контейнер диапазон чисел
let rangeContainer = document.getElementById('container-range');
// контейнер игры
let gameContainer = document.getElementById('container-game');

// переход на контейнер диапазон чисел 
startBtn.addEventListener('click', () => {
    instructionsContainer.style.display = 'none';
    rangeContainer.style.display = 'flex';
});

// диапазон 0-100
let firstOption = document.getElementById('to-100');
// диапазон 0-1000
let secondOption = document.getElementById('to-1000');
//  диапазон 0-1500
let thirdOption = document.getElementById('to-1500');

// число, которое загадали 
let num;
// которая попытка 
let attempts = 0;
let attemptsTxt = document.getElementById('attempts');
// который диапизон
let range;

// answer from computer
let answer = document.getElementById('game-title');

// input 
let guessInput = document.getElementById('guess');

// confetti 
function showConfetti(answer) {
    let confetti = document.getElementById('confetti-container');
    if(answer) {
        confetti.style.display = 'block';
    } else {
        confetti.style.display = 'none';
    }
}

// кнопка назад, правила игры
let btnRulesBack = document.getElementById('btn-instructions');
btnRulesBack.addEventListener('click', function(){
    rangeContainer.style.display = 'none';
    instructionsContainer.style.display = 'flex';
});

// кнопка назад, диапазон
let btnBack = document.getElementById('btn-back');
btnBack.addEventListener('click', function(){
    gameContainer.style.display = 'none';
    rangeContainer.style.display = 'flex';
    guessInput.value = '';
    attempts = 0;
    showConfetti(false);
});

// генерируем число в заданном диапазоне 
function generateNumber(max) {
    num = Math.floor(Math.random() * max);
}

// отображаем контейнер с игрой
function showGameContainer() {
    rangeContainer.style.display = 'none';
    gameContainer.style.display = 'flex';
}

// текст, который встречает игрока
function showFirstTxt(range) {
    if(range === 100){
        answer.textContent = 'Угадайте число в диапазоне от 0 до 100. Введите ваше предположение.';
    } else if(range === 1000) {
        answer.textContent = 'Угадайте число в диапазоне от 0 до 1000. Введите ваше предположение.';
    } else {
        answer.textContent = 'Угадайте число в диапазоне от 0 до 1500. Введите ваше предположение.';
    }
}

// диапазон 0-100
firstOption.addEventListener('click', () => {
    // отображаем игру
    showGameContainer();
    // обнуляем попытки совершенные
    attempts = 0;
    attemptsTxt.textContent = attempts;
    // сохраняем который диапазон
    range = 100;
    // отображаем текст
    showFirstTxt(range);
    // генерируем цифру
    generateNumber(range);
});
// диапазон 0-1000
secondOption.addEventListener('click', () => {
    // отображаем игру
    showGameContainer();
    // обнуляем попытки совершенные
    attempts = 0;
    attemptsTxt.textContent = attempts;
    // сохраняем который диапазон
    range = 1000;
    // отображаем текст
    showFirstTxt(range);
    // генерируем цифру
    generateNumber(range);
});
//  диапазон 0-1500
thirdOption.addEventListener('click', () => {
    // отображаем игру
    showGameContainer();
    // обнуляем попытки совершенные
    attempts = 0;
    attemptsTxt.textContent = attempts;
    // сохраняем который диапазон
    range = 1500;
    // отображаем текст
    showFirstTxt(range);
    // генерируем цифру
    generateNumber(range);
});

// начать новую игру
let btnRestart = document.getElementById('btn-restart');
btnRestart.addEventListener('click', () => {
    // обнуляем попытки
    attempts = 0;
    attemptsTxt.textContent = attempts;
    // чистим инпут
    guessInput.value = '';
    // убираем кофетти, если были 
    showConfetti(false);
    // отображаем начальное сообщение
    showFirstTxt(range);
    // генерируем цифру
    generateNumber(range);
});

// валидация input, ввод только цифр
guessInput.addEventListener('input', function(e) {
    e.target.value = e.target.value.replace(/\D/g, '');
});

// увеличиваем число попыток
function increaseAttempts() {
    attempts+=1;
    attemptsTxt.textContent = attempts;
}

// проверка ответа
function checkGuess(e) {
    e.preventDefault();
    // введенное в input число
    let userGuess = parseInt(guessInput.value);

    if(userGuess === num) {
        // отображаем конфетти 
        showConfetti(true);
        // выводим сообщение о победе
        answer.textContent = 'Вы угадали число!';
    } else {
        // если игрок ввел число не в пределах диапазона
        if(userGuess > range) {
            if(range === 100) {
                answer.textContent = 'Введите число в диапазоне от 0 до 100';
            } else if(range === 1000) {
                answer.textContent = 'Введите число в диапазоне от 0 до 1000';
            } else {
                answer.textContent = 'Введите число в диапазоне от 0 до 1500';
            }

            increaseAttempts();
        } else if((attempts+1)%3 === 0 && attempts > 0) {
            // Каждые три неудачные попытки пользователь получает подсказку о том, является ли число четным или нечетным
            num%2 === 0
            ? answer.textContent = 'Загаданное число четное'
            : answer.textContent = 'Загаданное число нечетное';

            increaseAttempts();
        } else {
            // даем подсказку, является ли загаддное число меньше или больше предложенного
            userGuess > num
            ? answer.textContent = 'Загаданное число меньше предложенного'
            : answer.textContent = 'Загаданное число больше предложенного';
    
            increaseAttempts();
        }
    }
} 

// отправка ответа
let btnGuess = document.getElementById('btn-guess');
btnGuess.addEventListener('click', checkGuess);
// отправка ответа кнопкой enter/return
guessInput.addEventListener("keypress", function(e) {
    if (e.key === "Enter") {
        checkGuess(e);
    }
});
