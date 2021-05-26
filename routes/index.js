const express = require("express"),
    { body } = require('express-validator');
    router = express.Router(),
    levels = require("../recources/levels.js"),
    time = require("../models/time")

router.get("/", function (req, res) {
    res.render("index/index")
})

router.get("/admin", function (req, res) {
    if (req.session.allowAdmin) {
        if (!req.session.admin) {
            req.session.admin = true
            req.session.challenge = true;
            for (let level of req.session.levels) {
                level.completed = true;
                level.playable = true;
                level.chCompleted = true;
            }
        } else {
            req.session.admin = false
            req.session.challenge = false;
            req.session.levels = levels
        }
    }
    res.redirect("/")
})

router.get("/leaderboard", function (req, res) {
    time.find().sort({time: 1}).exec(function (err, docs) {
        res.locals.times = docs
        res.render("index/leaderboard")
    })
})

router.get("/congratulations", function (req, res) {
    if (req.session.levels[req.session.levels.length - 1].completed) {
        req.session.challenge = true;
        let startTime = req.session.startTime
        let finishTime;
        if (!req.session.finishTime) {
            finishTime = Date.now()
            req.session.finishTime = finishTime
        } else {
            finishTime = req.session.finishTime
        }
        let timeTaken = new Date(finishTime - startTime);
        console.log(timeTaken)
        res.locals.hours = timeTaken.getUTCHours();
        res.locals.minutes = timeTaken.getUTCMinutes();
        res.locals.seconds = timeTaken.getUTCSeconds();
        if (res.locals.seconds < 0) {
            res.locals.seconds += 60;
            res.locals.minutes -= 1;
        }
        if (res.locals.minutes < 0) {
            res.locals.minutes += 60;
            res.locals.hours -= 1;
        }
        time.findOne({uuid: req.session.levels[req.session.levels.length - 1].flag}, function (err, doc) {
            console.log(doc)
            if (!doc) {
                time.create({
                    username: "Anonymous",
                    uuid: req.session.levels[req.session.levels.length - 1].flag,
                    time: timeTaken
                })
            }
        })
        res.render("index/congratulations")
    } else {
        res.redirect("/")
    }
})

router.post("/congratulations", body("answer").escape(), function (req, res) {
    if (req.session.levels[req.session.levels.length - 1].completed) {
        time.findOneAndUpdate({uuid: req.session.levels[req.session.levels.length - 1].flag}, {username: req.body.answer}, function () {
            res.redirect("/leaderboard")
        })
    } else {
        res.redirect("/")
    }
})


router.get("/hackme", function (req, res) {
    res.render("index/hackme")
})

module.exports = router;