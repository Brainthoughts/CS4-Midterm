let Room = function (board, solution, id) {
    this.board = JSON.parse(JSON.stringify(board)) || [
        [0, 0, 0, 2, 7, 3, 9, 0, 5],
        [5, 0, 0, 0, 0, 9, 0, 3, 7],
        [7, 9, 0, 4, 0, 0, 0, 0, 2],
        [0, 8, 0, 5, 2, 6, 4, 0, 0],
        [1, 6, 5, 8, 0, 0, 0, 0, 0],
        [0, 0, 2, 0, 9, 0, 5, 0, 6],
        [0, 0, 1, 0, 0, 5, 3, 6, 0],
        [9, 3, 8, 0, 6, 2, 0, 0, 0],
        [0, 0, 0, 9, 3, 0, 0, 2, 8],
    ];
    this.solution = solution || [
        [8, 1, 6, 2, 7, 3, 9, 4, 5],
        [5, 2, 4, 6, 1, 9, 8, 3, 7],
        [7, 9, 3, 4, 5, 8, 6, 1, 2],
        [3, 8, 9, 5, 2, 6, 4, 7, 1],
        [1, 6, 5, 8, 4, 7, 2, 9, 3],
        [4, 7, 2, 3, 9, 1, 5, 8, 6],
        [2, 4, 1, 7, 8, 5, 3, 6, 9],
        [9, 3, 8, 1, 6, 2, 7, 5, 4],
        [6, 5, 7, 9, 3, 4, 1, 2, 8]
    ];
    this.id = id;
    this.players = []
    this.disabled = []
    this.isComplete = function () {
        for (const row of this.board) {
            for (const rowElement of row) {
                if (rowElement === 0)
                    return false;
            }
        }
        return true;
    }
}

module.exports = Room