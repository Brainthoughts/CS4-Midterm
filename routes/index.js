const express = require("express"),
    router = express.Router()

router.get("/", function (req, res) {
    res.render("index/index", {levels: req.session.levels})
})

module.exports = router;