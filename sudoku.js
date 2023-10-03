let board = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
]

let activeTile = null;

window.onload = (event) => {
    setupGame();
};

function setupGame() {
    for (let r = 0; r < 9; r++) {
        for (let c = 0; c < 9; c++) {
            let tile = document.createElement("div");
            tile.className = "tile";
            tile.id = r + '-' + c;
            console.log(tile.id);
            tile.onclick = function () {
                changeTile(tile);
            };
            document.getElementById("board").appendChild(tile);
        }

    }

}

function changeTile(tile) {
    if (activeTile === tile) {
        return;
    }
    if (activeTile) {
        activeTile.className = "tile";
    }
    console.log(tile.id);
    activeTile = tile;
    tile.className = "active-tile";

}
