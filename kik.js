const PLAYER1 = 'fa-circle-o';
const PLAYER2 = 'fa-times';
let round = 1;
const board = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
];
const combinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

const boxes = [...document.querySelectorAll('.boxx')];
boxes.forEach(boxx => boxx.addEventListener('click', pick));

function pick(event) {
    const { row, column } = event.target.dataset;
    const turn = round % 2 === 0 ? PLAYER2 : PLAYER1;
    if (board[row][column] !== '') return;
    event.target.classList.add(turn);
    board[row][column] = turn;
    round++;

    console.log(check());
}

function check() {
    const result = board.reduce((total, row) => total.concat(row));
    let winner = null;
    let moves = {
        'fa-times': [],
        'fa-circle-o': []
    };
    result.forEach((field, index) => moves[field] ? moves[field].push(index) : null);
    combinations.forEach(combination => {
        if (combination.every(index => moves[PLAYER1].indexOf(index) > -1)) {
            winner = 'Winner: Player 1';
            document.getElementById("napis").innerHTML = "Brawo! <br>Wygrał gracz nr 1!" + '<br /><br /><span class="reset" onclick="location.reload()">JESZCZE RAZ?</span><br>lub<a href="index.html">zobacz więcej!</a>'
            boxes.forEach(boxx => boxx.removeEventListener('click', pick, false));
        }
        if (combination.every(index => moves[PLAYER2].indexOf(index) > -1)) {
            winner = 'Winner: Player 2';
            document.getElementById("napis").innerHTML = "Brawo! <br>Wygrał gracz nr 2!" + '<br /><br /><span class="reset" onclick="location.reload()">JESZCZE RAZ?</span><br>lub<a href="index.html">zobacz więcej!</a>'
            boxes.forEach(boxx => boxx.removeEventListener('click', pick, false));
        }
    });

    return winner;
}