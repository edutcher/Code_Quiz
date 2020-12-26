const gameArea = document.getElementById('gameArea');
const timeText = document.getElementById('timeText');

const questArea = document.createElement('h3');
const ansBtn0 = document.createElement('button');
const ansBtn1 = document.createElement('button');
const ansBtn2 = document.createElement('button');
const ansBtn3 = document.createElement('button');
const statField = document.createElement('p');


const questArray = [{
    question: 'What HTML tag would you use to create a hyperlink?',
    ansArray: ['<a>', '<link>', '<hyper>', '<goto>'],
    answer: 0
}, {
    question: 'What CSS property changes text color?',
    ansArray: ['txtColor', 'text', 'color', 'chgColor'],
    answer: 2
}, {
    question: 'In Javascript, what is i++ shorthand for?',
    ansArray: ['i=i^2', 'i=i*2', 'i=i+1', 'nothing'],
    answer: 2
}, {
    question: 'What does DOM stand for?',
    ansArray: ['Data Only Management', 'Document Object Modal', 'Download Over Music', 'Destroy Other Methods'],
    answer: 1
}, {
    question: 'Which is NOT a loop in javascript?',
    ansArray: ['for', 'do while', 'while', 'if else'],
    answer: 3
}];

var secondsLeft = 75;
var gameOver = false;
var currentQ = 0;

function destroyArea() {
    gameArea.textContent = '';
}

function startTimer() {
    var timerInterval = setInterval(function() {
        secondsLeft--;


        if (secondsLeft === 0 || gameOver) {
            gameOver = true;
            secondsLeft++;
            showResults();
            clearInterval(timerInterval);
        }

        timeText.textContent = "Time: " + secondsLeft;

    }, 1000);
}

function welcomeScreen() {
    destroyArea();

    const welcome = document.createElement('div');
    const title = document.createElement('h1');
    const subtext = document.createElement('p');
    const strtBtn = document.createElement('button');

    welcome.classList.add('text-center');
    title.textContent = 'Coding Quiz';
    subtext.textContent = 'Test your web coding knowledge, Ready to start?';
    strtBtn.textContent = 'Start';

    strtBtn.classList.add('btn');
    strtBtn.classList.add('btn-success');

    strtBtn.setAttribute('onclick', 'playGame()');

    welcome.appendChild(title);
    welcome.appendChild(subtext);
    welcome.appendChild(strtBtn);

    gameArea.appendChild(welcome);

}

function showScores() {
    destroyArea();

    var getScores = JSON.parse(localStorage.getItem('Scores'));

    const scoreArea = document.createElement('p');

    scoreArea.textContent = getScores.init + " " + getScores.score;

    gameArea.appendChild(scoreArea);

}

function showResults() {
    destroyArea();

    if (secondsLeft === 1) {
        secondsLeft = 0;
    }

    const result = document.createElement('h4');
    result.textContent = "Your Score " + secondsLeft;

    var userScore = { init: 'TEST', score: secondsLeft };

    localStorage.setItem('Scores', JSON.stringify(userScore));

    gameArea.appendChild(result);

    showScores();
}

function answer(ans) {
    if (questArray[currentQ].answer != ans) {
        statField.textContent = 'Wrong!';
        secondsLeft = secondsLeft - 15;
    } else {
        statField.textContent = 'Correct!';
    }

    currentQ++;
    if (currentQ < questArray.length) {
        nextQ();
    } else {
        gameOver = true;
    }

    if (gameOver) {
        showResults();
    }
}

function nextQ() {
    questArea.textContent = questArray[currentQ].question;

    ansBtn0.textContent = questArray[currentQ].ansArray[0];
    ansBtn1.textContent = questArray[currentQ].ansArray[1];
    ansBtn2.textContent = questArray[currentQ].ansArray[2];
    ansBtn3.textContent = questArray[currentQ].ansArray[3];
}

function playGame() {
    destroyArea();

    startTimer();

    questArea.classList.add('text-center');
    ansBtn0.setAttribute('onclick', 'answer(0)');
    ansBtn1.setAttribute('onclick', 'answer(1)');
    ansBtn2.setAttribute('onclick', 'answer(2)');
    ansBtn3.setAttribute('onclick', 'answer(3)');

    gameArea.appendChild(questArea);
    gameArea.appendChild(ansBtn0);
    gameArea.appendChild(ansBtn1);
    gameArea.appendChild(ansBtn2);
    gameArea.appendChild(ansBtn3);
    gameArea.appendChild(statField);

    nextQ();
}

welcomeScreen();