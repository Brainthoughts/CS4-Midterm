const express = require("express"),
    router = express.Router(),
    levels = require("../recources/levels.js")

router.get("/", function (req, res) {
    res.render("index/index", {levels: req.session.levels})
})

router.get("/admin", function (req, res) {
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
    res.redirect("/")
})

module.exports = router;