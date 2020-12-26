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

    secondsLeft = 75;

    const welcome = document.createElement('div');
    const title = document.createElement('h1');
    const subtext = document.createElement('p');
    const strtBtn = document.createElement('button');

    welcome.classList.add('text-center');
    title.textContent = 'Coding Quiz';
    subtext.textContent = 'Test your web coding knowledge, Ready to start?';
    strtBtn.textContent = 'Start';

    strtBtn.classList.add('btn', 'btn-success');

    strtBtn.setAttribute('onclick', 'playGame()');

    var welcomeFrag = document.createDocumentFragment();

    welcomeFrag.appendChild(title);
    welcomeFrag.appendChild(subtext);
    welcomeFrag.appendChild(strtBtn);

    welcome.appendChild(welcomeFrag);

    gameArea.appendChild(welcome);

}

function clearScores() {
    localStorage.clear();
    showScores();
}

function showScores() {
    destroyArea();

    if (localStorage.getItem('Scores') === null) {
        var userScore = { init: 'none', score: 0 };
        localStorage.setItem('Scores', JSON.stringify(userScore));
    }

    var getScores = JSON.parse(localStorage.getItem('Scores'));

    const scoreArea = document.createElement('p');
    const welcomeBtn = document.createElement('button');
    const clearBtn = document.createElement('button');

    scoreArea.classList.add('no-flex');

    if (!Array.isArray(getScores)) {
        scoreArea.textContent = getScores.init + " " + getScores.score;
    } else {
        for (var i = 0; i < getScores.length; i++) {
            const scoreItem = document.createElement('p');
            scoreItem.textContent = getScores[i].init + ": " + getScores[i].score;
            scoreArea.appendChild(scoreItem);
        };
    }

    clearBtn.textContent = 'Clear';
    clearBtn.classList.add('btn', 'btn-danger', 'mr-1');
    clearBtn.setAttribute('onclick', 'clearScores()');

    welcomeBtn.textContent = 'Back';
    welcomeBtn.classList.add('btn', 'btn-success');
    welcomeBtn.setAttribute('onclick', 'welcomeScreen()');

    var scoreFrag = document.createDocumentFragment();

    scoreFrag.appendChild(scoreArea);
    scoreFrag.appendChild(clearBtn);
    scoreFrag.appendChild(welcomeBtn);

    gameArea.appendChild(scoreFrag);
}

function checkScores(gameScore) {
    const initInput = document.querySelector('input');

    var userScore = { init: initInput.value, score: gameScore };

    if (localStorage.getItem('Scores') === null) {
        localStorage.setItem('Scores', JSON.stringify(userScore));
    }

    var getScores = JSON.parse(localStorage.getItem('Scores'));
    var tempArray = [];

    if (!Array.isArray(getScores)) {
        tempArray[0] = userScore;
        localStorage.setItem('Scores', JSON.stringify(tempArray));
    } else if (getScores.length < 5) {
        tempArray = getScores;
        tempArray.push(userScore);
        var tempScore;
        for (var i = 0; i < tempArray.length; i++) {
            for (var j = i + 1; j < tempArray.length; j++) {
                if (tempArray[j].score > tempArray[i].score) {
                    tempScore = tempArray[i];
                    tempArray[i] = tempArray[j];
                    tempArray[j] = tempScore;
                }
            }
        }
        localStorage.setItem('Scores', JSON.stringify(tempArray));
    } else {
        for (var i = 0; i < getScores.length; i++) {
            if (gameScore > getScores[i].score) {
                for (var j = getScores.length - 1; j > i; j--) {
                    getScores[j] = getScores[j - 1];
                }
                getScores[i] = userScore;
                break;
            }
        }
        localStorage.setItem('Scores', JSON.stringify(getScores))
    }

    showScores();
}

function showResults() {
    destroyArea();

    if (secondsLeft === 1) {
        secondsLeft = 0;
    }

    const result = document.createElement('h4');
    const initRow = document.createElement('div');
    const initPrompt = document.createElement('p');
    const initInput = document.createElement('input');
    const initBtn = document.createElement('button');

    result.textContent = "Your Score " + secondsLeft;
    result.classList.add('mb-4');

    initRow.classList.add('row');

    initPrompt.textContent = 'Enter Initials: ';
    initPrompt.classList.add('h3');

    initInput.classList.add('mx-2');

    initBtn.classList.add('btn');
    initBtn.classList.add('btn-success', 'mx-1');
    initBtn.setAttribute('onclick', 'checkScores(secondsLeft)');

    initBtn.textContent = 'Enter';

    initRow.appendChild(initPrompt);
    initRow.appendChild(initInput);
    initRow.appendChild(initBtn);

    var resultFrag = document.createDocumentFragment();

    resultFrag.appendChild(result);
    resultFrag.appendChild(initRow);

    gameArea.appendChild(resultFrag);
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

    currentQ = 0;
    secondsLeft = 75;
    gameOver = false;
    statField.textContent = '';

    startTimer();

    questArea.classList.add('text-center');
    ansBtn0.setAttribute('onclick', 'answer(0)');
    ansBtn1.setAttribute('onclick', 'answer(1)');
    ansBtn2.setAttribute('onclick', 'answer(2)');
    ansBtn3.setAttribute('onclick', 'answer(3)');

    ansBtn0.classList.add('btn', 'purple', 'col-3');
    ansBtn1.classList.add('btn', 'purple', 'col-3');
    ansBtn2.classList.add('btn', 'purple', 'col-3');
    ansBtn3.classList.add('btn', 'purple', 'col-3');

    var gameFrag = document.createDocumentFragment();

    gameFrag.appendChild(questArea);
    gameFrag.appendChild(ansBtn0);
    gameFrag.appendChild(ansBtn1);
    gameFrag.appendChild(ansBtn2);
    gameFrag.appendChild(ansBtn3);
    gameFrag.appendChild(statField);

    gameArea.appendChild(gameFrag)

    nextQ();
}

welcomeScreen();