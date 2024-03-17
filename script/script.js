let player1;
let player2;
let fields = [
    null,
    null,
    'circle',
    null,
    'cross',
    null,
    null,
    null,
    null
];


function goToChoseNamesForPlayers() {
    getMainContainer();
    container.innerHTML = '';
    container.innerHTML = /*html*/`
        <div class="container-names">
            <form onsubmit="startGame(); return false">
                <span class="container-names-description">Please enter your player names. (min. 2 and max. 20 signs)</span>
                <label class="label-player1">Player 1: <input placeholder="Name" minlength="2" maxlength="20" required id="inputPlayer1"></label>
                <label class="label-player2">Player 2: <input placeholder="Name" minlength="2" maxlength="20" required id="inputPlayer2"></label>
                <button type="submit">Ok</button>
            </form>
        </div>
    `;
}


function getMainContainer() {
    let container = document.getElementById('conatiner');
    return container;
}


function startGame() {
    saveNames();
    getMainContainer();
    container.innerHTML = '';
    initGameField(container);
}


function saveNames() {
    player1 = document.getElementById('inputPlayer1').value;
    player2 = document.getElementById('inputPlayer2').value;
    console.log("Player1 ", player1, " Player2 ", player2);
}


function initGameField(container) {
    container.innerHTML = '';
}


function init() {
    render();
}


function render() {
    let content = document.getElementById('content');
    let tableHTML = '<table>';
    for (let i = 0; i < 3; i++) {
        tableHTML += '<tr>';
        for (let j = 0; j < 3; j++) {
            let index = i * 3 + j;
            let symbol = fields[index];
            if (symbol === 'circle') {
                tableHTML += '<td>o</td>';
            } else if (symbol === 'cross') {
                tableHTML += '<td>x</td>';
            } else {
                tableHTML += '<td></td>';
            }
        }
        tableHTML += '</tr>';
    }
    tableHTML += '</table>';
    content.innerHTML = '';
    content.innerHTML += /*html*/`
        <span class="content-text">It's <b>Player 1</b>'s turn.</span>
        <div class="sign-of-player">
            <div>x</div>
            <div>o</div>
        </div>
    `;
    content.innerHTML += tableHTML;
}