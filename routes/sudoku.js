const express = require("express"),
    router = express.Router(),
    Room = require("../recources/room"),
    Player = require("../recources/player"),
    {v4: uuidv4} = require('uuid')


let rooms = {}
let players = {}
let board = [
    [0, 1, 6, 2, 7, 3, 9, 4, 5],
    [5, 2, 4, 6, 1, 9, 8, 3, 7],
    [7, 9, 3, 4, 5, 8, 6, 1, 2],
    [3, 8, 9, 5, 2, 6, 4, 7, 1],
    [1, 6, 5, 8, 4, 7, 2, 9, 3],
    [4, 7, 2, 3, 9, 1, 5, 8, 6],
    [2, 4, 1, 7, 8, 5, 3, 6, 9],
    [9, 3, 8, 1, 6, 2, 7, 5, 4],
    [6, 5, 7, 9, 3, 4, 1, 2, 8]
]

router.use(function (req, res, next) {
    if (!req.session.playerid || !req.session.roomid || req.session.restart) {
        req.session.restart = false;
        let player = new Player(uuidv4(), 0, "Player")
        players[player.id] = player;
        req.session.playerid = player.id
        let room = new Room(board, null, uuidv4())
        rooms[room.id] = room
        rooms[room.id].players.push(req.session.playerid)
        players[req.session.playerid].name = "Player-" + rooms[room.id].players.length
        req.session.roomid = room.id

    }
    res.locals.board = rooms[req.session.roomid].board
    res.locals.code = req.session.roomid
    res.locals.name = players[req.session.playerid].name
    next();
})


router.get("/", function (req, res) {
    if (req.query.room){
        if (req.query.room !== req.session.roomid && rooms[req.query.room]) {
            console.log(rooms[req.query.room])
            req.session.roomid = req.query.room
            console.log(rooms[req.session.roomid])
            rooms[req.session.roomid].players.push(req.session.playerid)
            players[req.session.playerid].name = "Player-" + rooms[req.session.roomid].players.length
            players[req.session.playerid].points = 0
        }
        else {
            if (req.query.room === req.session.roomid)
                req.flash("error", "You are already in this room");
            else
                req.flash("error", "Invalid room");
        }
        res.redirect("/sudoku")
    }
    else {
        res.render("sudoku/play")
    }
})

router.post("/join", function (req, res) {
    if (!req.body.roomid || !rooms[req.body.roomid]) {
        res.redirect("/sudoku")
        return
    }
    req.session.roomid = req.body.roomid
    rooms[req.session.roomid].players.push(req.session.playerid)
    players[req.session.playerid].name = "Player-" + rooms[req.session.roomid].players.length
    players[req.session.playerid].points = 0
    res.redirect("/sudoku")
})

router.post("/new", function (req, res) {
    req.session.restart = true;
    res.redirect("/sudoku")
})
module.exports = [router,
    function (io) {
    io.on("connection", function (socket) {
        socket.on("join", function () {
            socket.join(socket.handshake.session.roomid)
        })
        socket.on("submit", function (data) {
            let roomid = socket.handshake.session.roomid;
            if (parseInt(data.number) === rooms[roomid].solution[data.row][data.col]) {
                socket.to(roomid).emit("update", {row: data.row, col: data.col, number: data.number, self: false})
                socket.emit("update", {row: data.row, col: data.col, number: data.number, self: true})
                rooms[roomid].board[data.row][data.col] = parseInt(data.number)
                players[socket.handshake.session.playerid].points++;
                if (rooms[roomid].isComplete()) {
                    let winner = null;
                    for (const playerid of rooms[roomid].players) {
                        if (!winner || winner.points < players[playerid].points)
                            winner = players[playerid]
                    }
                    io.to(roomid).emit("win", {name: winner.name, points: winner.points})
                }
            } else {
                socket.emit("fail", {row: data.row, col: data.col})
                rooms[roomid].disabled.push(socket.id)
                setTimeout(function () {
                    rooms[roomid].disabled.splice(rooms[roomid].disabled.indexOf(socket.id), 1)
                }, 5000)
            }
        })
    })
}]
