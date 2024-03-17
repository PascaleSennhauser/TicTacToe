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
    'cross',
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
    const contentDiv = document.getElementById('content');
    let symbolCircle = generateCircleSVG();
    let symbolCross = generateCrossSVG();
    let tableHtml = '<table>';
    for (let i = 0; i < 3; i++) {
        tableHtml += '<tr>';
        for (let j = 0; j < 3; j++) {
            const index = i * 3 + j;
            let symbol = '';
            if (fields[index] === 'circle') {
                symbol = symbolCircle;
            } else if (fields[index] === 'cross') {
                symbol = symbolCross;
            }
            tableHtml += `<td>${symbol}</td>`;
        }
        tableHtml += '</tr>';
    }
    tableHtml += '</table>';

    contentDiv.innerHTML = '';
    contentDiv.innerHTML += /*html*/`
        <div>
            <span class="content-text">It's <b>Player 1</b>'s turn.</span>
            <div class="sign-of-player">
                <div>${symbolCircle}</div>
                <div>${symbolCross}</div>
            </div>
        </div>
    `;
    contentDiv.innerHTML += tableHtml;
}


function generateCircleSVG() {
    const color = '#48ff91';
    const width = 70;
    const height = 70;

    return `<svg width="${width}" height="${height}">
              <circle cx="35" cy="35" r="30" stroke="${color}" stroke-width="5" fill="none">
                <animate attributeName="stroke-dasharray" from="0 188.5" to="188.5 0" dur="0.2s" fill="freeze" />
              </circle>
            </svg>`;
}


function generateCrossSVG() {
    const color = '#35bcff';
    const width = 70;
    const height = 70;

    const svgHtml = `
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