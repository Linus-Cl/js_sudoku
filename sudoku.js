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

let board2 = [
    [1, 2, 3, 4, 5, 6, 7, 8, 9],
    [2, 3, 4, 5, 6, 7, 8, 9, 1],
    [3, 4, 5, 6, 7, 8, 9, 1, 2],
    [4, 5, 6, 7, 8, 9, 1, 2, 3],
    [5, 6, 7, 8, 9, 1, 2, 3, 4],
    [6, 7, 8, 9, 1, 2, 3, 4, 5],
    [7, 8, 9, 1, 2, 3, 4, 5, 6],
    [8, 9, 1, 2, 3, 4, 5, 0, 7],
    [9, 1, 2, 3, 4, 5, 6, 7, 8],
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

document.addEventListener('keydown', function (event) {
    if (event.key > 0 && event.key <= 9 && activeTile) {
        activeTile.textContent = event.key;
        updateBoard(activeTile.id, event.key);
        activeTile.className = "tile";
        activeTile = null;
    }
    else {
        console.log("invalid input or no active file");
    }
})


function updateBoard(id, num) {
    const coords = id.split("-");
    board[coords[0]][coords[1]] = num;
    //console.log(board);
}

function evaluateBoard() {
    for (let r = 0; r < 9; r++) {
        for (let c = 0; c < 9; c++) {
            if (board[r][c] === 0) {
                return false;
            }
            if (!evaluateRow(r, c) ||
                !evaluateCollumn(r, c) /*&&
                evaluateBlock(r, c)*/) {
                return false;
            }

        }
    }
    return true;
}

function evaluateRow(row, collumn) {
    for (let i = 0; i < 9; i++) {
        if (i === collumn) {
            continue;
        }
        if (board[row][i] === board[row][collumn]) {
            return false;
        }
    }
    return true;
}

function evaluateCollumn(row, collumn) {
    for (let i = 0; i < 9; i++) {
        if (i === row) {
            continue;
        }
        if (board[i][collumn] === board[row][collumn]) {
            return false;
        }
    }
    return true;
}
