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
            console.log(req.session)
        }
    }
    res.redirect("/")
})

router.get("/congratulations", function (req, res) {
    if (req.session.levels[req.session.levels.length-1].completed) {
        res.render("index/congratulations")
        req.session.challenge = true;
    } else {
        res.redirect("/")
    }
})

router.get("/hackme", function (req, res) {
    res.render("index/hackme.js")
})

module.exports = router;