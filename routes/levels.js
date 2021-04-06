const express = require("express"),
    router = express.Router()

router.get("/", function (req, res) {
    res.redirect("/")
})

router.get("/:url", function (req, res) {
    let url = req.params.url;
    for (let i in req.session.levels) {
        if (req.session.levels[i].completed && req.session.levels[i].url === url){
            res.render(`levels/level${i}`, {levels: req.session.levels})
            break;
        }
    }
})

module.exports = router;