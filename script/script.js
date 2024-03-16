let player1;
let player2;


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