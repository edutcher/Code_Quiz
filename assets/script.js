const gameArea = document.getElementById('gameArea');
const timeText = document.getElementById('timeText');
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

function destroyArea() {
    gameArea.textContent = '';
}

function playGame() {
    destroyArea();

    const questArea = document.createElement('h3');
    questArea.classList.add('text-center');

    gameArea.appendChild(questArea);

}