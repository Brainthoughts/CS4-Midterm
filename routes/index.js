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
            for (let level of req.session.levels) {
                level.completed = true;
                level.playable = true;
            }
        } else {
            req.session.admin = false
            req.session.levels = levels
        }
    }
    res.redirect("/")
})

router.get("/congratulations", function (req, res) {
    if (req.session.levels[req.session.levels.length-1].completed) {
        res.render("index/congratulations")
    } else {
        res.redirect("/")
    }
})

module.exports = router;