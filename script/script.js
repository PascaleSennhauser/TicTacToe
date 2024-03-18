let player1;
let player2;
let fields = [
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null
];
const WINNING_COMBINATIONS = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // horizontal
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // vertical
    [0, 4, 8], [2, 4, 6], // diagonal
];
let currentPlayer = 'circle';


function init() {
    getMainContainer();
    container.innerHTML = '';
    container.innerHTML = /*html*/`
        <button onclick="goToChoseNamesForPlayers()">Start Game</button>
    `;
}


function getMainContainer() {
    let container = document.getElementById('conatiner');
    return container;
}


function goToChoseNamesForPlayers() {
    getMainContainer();
    container.innerHTML = '';
    container.innerHTML = /*html*/`
        <div class="container-names">
            <form onsubmit="startGame(); return false">
                <span class="container-names-description">Please enter your player names. (min. 2 and max. 20 signs)</span>
                <label class="label-player1">Player 1 (o): <input placeholder="Name" minlength="2" maxlength="20" required id="inputPlayer1"></label>
                <label class="label-player2">Player 2 (x): <input placeholder="Name" minlength="2" maxlength="20" required id="inputPlayer2"></label>
                <button type="submit">Ok</button>
            </form>
        </div>
    `;
}


function startGame() {
    saveNames();
    initGameField();
}


function saveNames() {
    player1 = document.getElementById('inputPlayer1').value;
    player2 = document.getElementById('inputPlayer2').value;
    console.log("Player1 ", player1, " Player2 ", player2);
}


function initGameField() {
    renderGameInfo();
    renderCurrentPlayer();
    renderField();
}


function renderGameInfo() {
    getMainContainer();
    let smallCross = generateSmallCrossSVG('#FFC000');
    let smallCircle = generateSmallCircleSVG('#00B0EF');
    container.innerHTML = '';
    container.innerHTML = /*html*/`
        <div id="gameDiv">
            <div class="gameInfo">
                <span>It's <b id="currentPlayer">${player1}</b>'s turn.</span>
                <div class="sign-container">
                    <div id="signPlayer1">${smallCircle}</div>
                    <div id="signPlayer2">${smallCross}</div>
                </div>
            </div>
            <div id="content">
            </div>
            <button class="button-restart" onclick="restartGame()">Restart Game</button>
        </div>
    `;
}


function renderCurrentPlayer() {
    let currentPlayerText = document.getElementById('currentPlayer');
    currentPlayerText.innerHTML = '';
    let signPlayer1 = document.getElementById('signPlayer1');
    let signPlayer2 = document.getElementById('signPlayer2');
    if (currentPlayer == 'circle') {
        currentPlayerText.innerHTML = player1;
        signPlayer1.innerHTML = generateSmallCircleSVG('#00B0EF');
        signPlayer2.innerHTML = generateSmallCrossSVG('rgba(255, 255, 255, 0.2)');
    } else {
        currentPlayerText.innerHTML = player2;
        signPlayer1.innerHTML = generateSmallCircleSVG('rgba(255, 255, 255, 0.2)');
        signPlayer2.innerHTML = generateSmallCrossSVG('#FFC000');
    }
}


function renderField() {
    const contentDiv = document.getElementById('content');

    let tableHtml = '<table>';
    for (let i = 0; i < 3; i++) {
        tableHtml += '<tr>';
        for (let j = 0; j < 3; j++) {
            const index = i * 3 + j;
            let symbol = '';
            if (fields[index] === 'circle') {
                symbol = generateCircleSVG();
            } else if (fields[index] === 'cross') {
                symbol = generateCrossSVG();
            }
            tableHtml += /*html*/`<td onclick="handleClick(this, ${index})">${symbol}</td>`;
        }
        tableHtml += '</tr>';
    }
    tableHtml += '</table>';

    contentDiv.innerHTML = tableHtml;
}


function handleClick(cell, index) {
    if (fields[index] === null) {
        fields[index] = currentPlayer;
        cell.innerHTML = currentPlayer === 'circle' ? generateCircleSVG() : generateCrossSVG();
        cell.onclick = null;
        currentPlayer = currentPlayer === 'circle' ? 'cross' : 'circle';
        if (isGameFinished()) {
            const winCombination = getWinningCombination();
            drawWinningLine(winCombination);
        }
    }
    renderCurrentPlayer();
}


function isGameFinished() {
    return fields.every((field) => field !== null) || getWinningCombination() !== null;
}


function getWinningCombination() {
    for (let i = 0; i < WINNING_COMBINATIONS.length; i++) {
        const [a, b, c] = WINNING_COMBINATIONS[i];
        if (fields[a] === fields[b] && fields[b] === fields[c] && fields[a] !== null) {
            return WINNING_COMBINATIONS[i];
        }
    }
    return null;
}


function generateCircleSVG() {
    const color = '#00B0EF';
    const width = 70;
    const height = 70;

    return /*html*/`<svg width="${width}" height="${height}">
              <circle cx="35" cy="35" r="30" stroke="${color}" stroke-width="5" fill="none">
                <animate attributeName="stroke-dasharray" from="0 188.5" to="188.5 0" dur="0.2s" fill="freeze" />
              </circle>
            </svg>`;
}


function generateSmallCircleSVG(colorCircle) {
    const color = colorCircle;
    const width = 30;
    const height = 30;

    return /*html*/`
    <svg width="${width}" height="${height}">
        <circle cx="${width / 2}" cy="${height / 2}" r="${width / 2 - 5}" stroke="${color}" stroke-width="5" fill="none">
            <animate attributeName="stroke-dasharray" from="0 ${Math.PI * (width / 2 - 5)}" to="${Math.PI * (width / 2 - 5)} 0" dur="0.2s" fill="freeze" />
        </circle>
    </svg>
    `;
}


function generateCrossSVG() {
    const color = '#FFC000';
    const width = 70;
    const height = 70;

    const svgHtml = /*html*/`
      <svg width="${width}" height="${height}">
        <line x1="0" y1="0" x2="${width}" y2="${height}"
          stroke="${color}" stroke-width="5">
          <animate attributeName="x2" values="0; ${width}" dur="200ms" />
          <animate attributeName="y2" values="0; ${height}" dur="200ms" />
        </line>
        <line x1="${width}" y1="0" x2="0" y2="${height}"
          stroke="${color}" stroke-width="5">
          <animate attributeName="x2" values="${width}; 0" dur="200ms" />
          <animate attributeName="y2" values="0; ${height}" dur="200ms" />
        </line>
      </svg>
    `;

    return svgHtml;
}


function generateSmallCrossSVG(colorCross) {
    const color = colorCross;
    const width = 30;
    const height = 30;

    const svgHtml = /*html*/`
        <svg width="${width}" height="${height}">
            <line x1="0" y1="0" x2="${width}" y2="${height}"
                stroke="${color}" stroke-width="5">
                <animate attributeName="x2" values="0; ${width}" dur="200ms" />
                <animate attributeName="y2" values="0; ${height}" dur="200ms" />
            </line>
            <line x1="${width}" y1="0" x2="0" y2="${height}"
                stroke="${color}" stroke-width="5">
                <animate attributeName="x2" values="${width}; 0" dur="200ms" />
                <animate attributeName="y2" values="0; ${height}" dur="200ms" />
            </line>
        </svg>
    `;

    return svgHtml;
}


function drawWinningLine(combination) {
    const lineColor = '#ffffff';
    const lineWidth = 5;

    const startCell = document.querySelectorAll(`td`)[combination[0]];
    const endCell = document.querySelectorAll(`td`)[combination[2]];
    const startRect = startCell.getBoundingClientRect();
    const endRect = endCell.getBoundingClientRect();

    const contentRect = document.getElementById('content').getBoundingClientRect();

    const lineLength = Math.sqrt(
        Math.pow(endRect.left - startRect.left, 2) + Math.pow(endRect.top - startRect.top, 2)
    );
    const lineAngle = Math.atan2(endRect.top - startRect.top, endRect.left - startRect.left);

    const line = document.createElement('div');
    line.style.position = 'absolute';
    line.style.width = `${lineLength}px`;
    line.style.height = `${lineWidth}px`;
    line.style.backgroundColor = lineColor;
    line.style.top = `${startRect.top + startRect.height / 2 - lineWidth / 2 - contentRect.top}px`;
    line.style.left = `${startRect.left + startRect.width / 2 - contentRect.left}px`;
    line.style.transform = `rotate(${lineAngle}rad)`;
    line.style.transformOrigin = `top left`;
    document.getElementById('content').appendChild(line);
}


function restartGame() {
    fields = [
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null
    ];
    renderField();
}