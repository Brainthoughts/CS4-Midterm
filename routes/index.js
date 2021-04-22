const express = require("express"),
    router = express.Router(),
    levels = require("../recources/levels.js")

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

router.get("/congratulations", function (req, res) {
    if (req.session.levels[req.session.levels.length-1].completed) {
        req.session.challenge = true;
        let startTime = new Date(req.session.startTime)
        let finishTime = new Date()
        res.locals.timeTaken = (new Date(finishTime - startTime)); //This breaks if you take longer than an hour; "It's not a bug it's a feature"
        res.render("index/congratulations")
    } else {
        res.redirect("/")
    }
})


router.get("/hackme", function (req, res) {
    res.render("index/hackme")
})

module.exports = router;