const express = require("express"),
    router = express.Router()

router.use(function (req,res,next) {
    if (req.session.challenge){
        next();
    } else {
        res.redirect("/")
    }
})

//Challenge 0
router.get("/", function (req, res) {
    req.session.levels[0].chCompleted = true;
    res.redirect(`/level/${req.session.levels[1].url}`)
})

//challenge 1 TODO
router.get("/coffee", function (req, res) {
    req.session.levels[1].chCompleted = true;
    res.redirect(`/level/${req.session.levels[2].url}`)

})

module.exports = router;