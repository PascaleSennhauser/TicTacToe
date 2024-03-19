let player1;
let player2;
let currentPlayer = 'circle';
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


/**
 * This function invoked in the beginning to show the "Start Game"-button.
 */
function init() {
    getMainContainer();
    container.innerHTML = '';
    container.innerHTML = /*html*/`
        <button onclick="goToChoseNamesForPlayers()">Start Game</button>
    `;
}


/**
 * This function gets the main-container to put content in it.
 * @returns The main-container.
 */
function getMainContainer() {
    let container = document.getElementById('conatiner');
    return container;
}


/**
 * This function renders the form to chose the names for the players.
 */
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


/**
 * This function starts the main game.
 */
function startGame() {
    saveNames();
    initGameField();
}


/**
 * This function saves the inserted names in the variables player1 and player2.
 */
function saveNames() {
    player1 = document.getElementById('inputPlayer1').value;
    player2 = document.getElementById('inputPlayer2').value;
    console.log("Player1 ", player1, " Player2 ", player2);
}


/**
 * This function initializes the tic-tac-toe-field.
 */
function initGameField() {
    renderGameInfo();
    renderCurrentPlayer();
    renderField();
}


/**
 * This function renders the information above the field.
 */
function renderGameInfo() {
    getMainContainer();
    let smallCross = generateSmallCrossSVG('#FFC000');
    let smallCircle = generateSmallCircleSVG('#00B0EF');
    container.innerHTML = '';
    container.innerHTML = gameInfoTemplate(smallCross, smallCircle);
}


/**
 * This function shows gets the html-template for the information above the field.
 * @param {HTMLElement} smallCross - The HTML-element of the small cross.
 * @param {HTMLElement} smallCircle - The HTML-element of the small circle.
 * @returns The HTML-template of the information, tic-tac-toe-field and restart-button.
 */
function gameInfoTemplate(smallCross, smallCircle) {
    return /*html*/`
        <div id="gameDiv">
            <div class="gameInfo">
                <span id="gameInfoText"></span>
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


/**
 * This runction renders the current player in the text, as well as the sign of the player.
 */
function renderCurrentPlayer() {
    let gameInfoText = document.getElementById('gameInfoText');
    gameInfoText.innerHTML = '';
    let signPlayer1 = document.getElementById('signPlayer1');
    let signPlayer2 = document.getElementById('signPlayer2');
    if (currentPlayer == 'circle') {
        currentPlayerCircle(gameInfoText, player1, signPlayer1, signPlayer2);
    } else {
        currentPlayerCross(gameInfoText, player2, signPlayer1, signPlayer2);
    }
}


/**
 * This function renders the informations, when the current player is the circle-sign.
 * @param {HTMLElement} gameInfoText - The HTML-element for the text information.
 * @param {String} player1 - The name of the player1.
 * @param {HTMLElement} signPlayer1 - The HTML-element where the sign of the player1 gets put in.
 * @param {HTMLElement} signPlayer2 - The HTML-element where the sign of the player2 gets put in.
 */
function currentPlayerCircle(gameInfoText, player1, signPlayer1, signPlayer2) {
    gameInfoText.innerHTML = `
        It's <b>${player1}</b>'s turn.
    `;
    signPlayer1.innerHTML = generateSmallCircleSVG('#00B0EF');
    signPlayer2.innerHTML = generateSmallCrossSVG('rgba(255, 255, 255, 0.2)');
}


/**
 * This function renders the information, when the current player is the cross-sign.
 * @param {HTMLElement} gameInfoText - The HTML-element for the text information.
 * @param {STring} player2 - The name of the player2.
 * @param {HTMLElement} signPlayer1 - The HTML-element where the sign of the player1 gets put in.
 * @param {HTMLElement} signPlayer2 - The HTML-element where the sign of the player2 gets put in.
 */
function currentPlayerCross(gameInfoText, player2, signPlayer1, signPlayer2) {
    gameInfoText.innerHTML = `
        It's <b>${player2}</b>'s turn.
    `;
    signPlayer1.innerHTML = generateSmallCircleSVG('rgba(255, 255, 255, 0.2)');
    signPlayer2.innerHTML = generateSmallCrossSVG('#FFC000');
}


/**
 * This function renders the tic-tac-toe-field.
 */
function renderField() {
    const contentDiv = document.getElementById('content');
    let tableHtml = '<table>';
    for (let i = 0; i < 3; i++) {
        tableHtml += '<tr>';
        for (let j = 0; j < 3; j++) {
            const index = i * 3 + j;
            let symbol = generateSymbol(index);
            tableHtml += /*html*/`<td class="td-hover" onclick="handleClick(this, ${index})">${symbol}</td>`;
        }
        tableHtml += '</tr>';
    }
    tableHtml += '</table>';
    contentDiv.innerHTML = tableHtml;
}


/**
 * This function generates the cross or circle in the field.
 * @param {Number} index - This is the index of the cell.
 * @returns The generated symbol.
 */
function generateSymbol(index) {
    let symbol = '';
    if (fields[index] === 'circle') {
        symbol = generateCircleSVG();
    } else if (fields[index] === 'cross') {
        symbol = generateCrossSVG();
    }
    return symbol;
}


/**
 * This function is when you click in a cell of the field.
 * @param {HTMLElement} cell - This is the cell the player clicked.
 * @param {Number} index - This is the index of the cell.
 */
function handleClick(cell, index) {
    if (fields[index] === null) {
        fields[index] = currentPlayer;
        cell.innerHTML = currentPlayer === 'circle' ? generateCircleSVG() : generateCrossSVG();
        cell.onclick = null;
        currentPlayer = currentPlayer === 'circle' ? 'cross' : 'circle';
        renderCurrentPlayer();
        gameFinished();
    }
}


/**
 * This function is to render the specific end values.
 */
function gameFinished() {
    if (isGameFinished()) {
        const winCombination = getWinningCombination();
        if (winCombination) {
            drawWinningLine(winCombination);
        }
        removeOnClick();
        if (getWinningCombination() == null) {
            renderTieText();
        } else {
            renderWinner();
        }
    }
}


/**
 * This function removes the onclick-function, when the game is finished.
 */
function removeOnClick() {
    const tdElements = document.querySelectorAll('td');
    tdElements.forEach((td) => {
        td.onclick = null;
        td.style.cursor = 'default';
        td.classList.remove('td-hover');
    });
}


/**
 * This function checks if the game is finished.
 * @returns - True or false.
 */
function isGameFinished() {
    return fields.every((field) => field !== null) || getWinningCombination() !== null;
}


/**
 * This function gets the winning combination.
 * @returns The winning combination or null gets returned.
 */
function getWinningCombination() {
    for (let i = 0; i < WINNING_COMBINATIONS.length; i++) {
        const [a, b, c] = WINNING_COMBINATIONS[i];
        if (fields[a] === fields[b] && fields[b] === fields[c] && fields[a] !== null) {
            return WINNING_COMBINATIONS[i];
        }
    }
    return null;
}


/**
 * This function renders the winner in the text, as well as the fitting sign.
 */
function renderWinner() {
    let gameInfoText = document.getElementById('gameInfoText');
    gameInfoText.innerHTML = '';
    let signPlayer1 = document.getElementById('signPlayer1');
    let signPlayer2 = document.getElementById('signPlayer2');
    if (currentPlayer == 'cross') {
        winnerPlayer1(gameInfoText, player1, signPlayer1, signPlayer2);
    } else {
        winnerPlayer2(gameInfoText, player2, signPlayer1, signPlayer2);
    }   
}


/**
 * This function renders the player1 as the winner.
 * @param {HTMLElement} gameInfoText - The HTML-element for the text information.
 * @param {String} player1 - The name of the player1.
 * @param {HTMLElement} signPlayer1 - The HTML-element where the sign of the player1 gets put in.
 * @param {HTMLElement} signPlayer2 - The HTML-element where the sign of the player2 gets put in.
 */
function winnerPlayer1(gameInfoText, player1, signPlayer1, signPlayer2) {
    gameInfoText.innerHTML = `
        <b>${player1}</b> won.
    `;
    signPlayer1.innerHTML = generateSmallCircleSVG('#00B0EF');
    signPlayer2.innerHTML = generateSmallCrossSVG('rgba(255, 255, 255, 0.2)');
}


/**
 * This function renders the player2 as the winner.
 * @param {HTMLElement} gameInfoText - The HTML-element for the text information.
 * @param {String} player2 - The name of the player2.
 * @param {HTMLElement} signPlayer1 - The HTML-element where the sign of the player1 gets put in.
 * @param {HTMLElement} signPlayer2 - The HTML-element where the sign of the player2 gets put in.
 */
function winnerPlayer2(gameInfoText, player2, signPlayer1, signPlayer2) {
    gameInfoText.innerHTML = `
        <b>${player2}</b> won.
    `;
    signPlayer1.innerHTML = generateSmallCircleSVG('rgba(255, 255, 255, 0.2)');
    signPlayer2.innerHTML = generateSmallCrossSVG('#FFC000');
}


/**
 * This function renders the information text, when theres a tie.
 */
function renderTieText() {
    let gameInfoText = document.getElementById('gameInfoText');
    gameInfoText.innerHTML = '';
    gameInfoText.innerHTML = `This match is a tie.`;
    let signPlayer1 = document.getElementById('signPlayer1');
    let signPlayer2 = document.getElementById('signPlayer2');
    signPlayer1.innerHTML = generateSmallCircleSVG('rgba(255, 255, 255, 0.2)');
    signPlayer2.innerHTML = generateSmallCrossSVG('rgba(255, 255, 255, 0.2)');
}


/**
 * This function generates the svg-circle.
 * @returns The svg of the circle gets returned.
 */
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


/**
 * This function generates the small-svg-circle.
 * @param {String} colorCircle - The color of the circle.
 * @returns The svg of the small circle gets returned.
 */
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


/**
 * This function generates the svg-cross.
 * @returns The svg of the cross gets returned.
 */
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


/**
 * This function generates the small-svg-cross.
 * @param {String} colorCross - The color of the cross.
 * @returns The svg of the small cross gets returned.
 */
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


/**
 * This function draws the winning line in the field.
 * @param {Array} combination - The array of the winning combination.
 */
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


/**
 * This function restarts the game, when you click on the button.
 */
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
    renderCurrentPlayer();
    renderField();
    addOnClick();
}


/**
 * The onclick-function of the cells gets added, when you restart the game.
 */
function addOnClick() {
    const tdElements = document.querySelectorAll('td');
    tdElements.forEach((td, index) => {
        td.onclick = () => handleClick(td, index);
        td.style.cursor = 'pointer';
        td.classList.add('td-hover');
    });
}