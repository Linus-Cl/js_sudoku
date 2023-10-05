let emptyBoard = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
];

let board = [
    [4, 1, 0, 0, 6, 5, 0, 0, 7],
    [0, 0, 6, 0, 0, 7, 4, 8, 0],
    [2, 0, 7, 4, 9, 0, 0, 0, 6],
    [0, 6, 0, 0, 7, 0, 1, 0, 0],
    [3, 0, 1, 5, 0, 0, 0, 7, 2],
    [0, 9, 0, 0, 4, 2, 3, 0, 8],
    [1, 0, 8, 6, 0, 0, 0, 2, 9],
    [0, 2, 0, 0, 1, 8, 6, 4, 0],
    [6, 0, 0, 3, 0, 0, 0, 1, 0],
];

let boardValid = [
    [5, 3, 4, 6, 7, 8, 9, 1, 2],
    [6, 7, 2, 1, 9, 5, 3, 4, 8],
    [1, 9, 8, 3, 4, 2, 5, 6, 7],
    [8, 5, 9, 7, 6, 1, 4, 2, 3],
    [4, 2, 6, 8, 5, 3, 7, 9, 1],
    [7, 1, 3, 9, 2, 4, 8, 5, 6],
    [9, 6, 1, 5, 3, 7, 2, 8, 4],
    [2, 8, 7, 4, 1, 9, 6, 3, 5],
    [3, 4, 5, 2, 8, 6, 1, 7, 9],
];

let activeTile = null;

window.onload = (event) => {
    setupGame();
};

function setupGame() {
    for (let r = 0; r < 9; r++) {
        for (let c = 0; c < 9; c++) {
            let tile = document.createElement("div");
            if (board[r][c] !== 0) {
                tile.className = "fixed-tile";
                tile.innerText = board[r][c];
            }
            else {
                tile.className = "tile";
            }
            tile.id = r + '-' + c;
            console.log(tile.id);
            if (tile.className === "tile") {
                tile.onclick = function () {
                    changeTile(tile);
                };
            }
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
}

function evaluateBoard() {
    for (let r = 0; r < 9; r++) {
        for (let c = 0; c < 9; c++) {
            if (board[r][c] === 0) {
                return false;
            }
            if (!evaluateRow(r, c) || !evaluateCollumn(r, c)) {
                return false;
            }
        }
    }
    if (evaluateBlock()) {
        return true;
    }
    else {
        return false;
    }
}

function evaluateRow(row, collumn) {
    for (let i = 0; i < 9; i++) {
        if (i === collumn) {
            continue;
        }
        if (board[row][i] == board[row][collumn]) {
            return false;
        }
    }
    console.log("row ok: " + row + "-" + collumn);
    return true;
}

function evaluateCollumn(row, collumn) {
    for (let i = 0; i < 9; i++) {
        if (i === row) {
            continue;
        }
        else if (board[i][collumn] == board[row][collumn]) {
            return false;
        }
    }
    console.log("col ok: " + row + "-" + collumn);
    return true;
}

function evaluateBlock() {
    for (let r = 0; r <= 8; r += 3) {
        for (let c = 0; c <= 8; c += 3) {
            const mySet = new Set();
            for (let innerR = 0; innerR < 3; innerR++) {
                for (let innerC = 0; innerC < 3; innerC++) {
                    let value = board[r + innerR][c + innerC];
                    if (!mySet.has(value)) {
                        mySet.add(value);
                    }
                    else {
                        return false;
                    }
                }
            }
        }
    }
    console.log("block ok");
    return true;
}
