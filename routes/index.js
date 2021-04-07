const express = require("express"),
    router = express.Router()

router.get("/", function (req, res) {
    res.render("index/index", {levels: req.session.levels})
})

router.get("/admin", function (req, res) {
    req.session.admin = true;
    for (let level of req.session.levels) {
        level.completed = true;
        level.playable = true;
    }
    res.redirect("/")
})

module.exports = router;