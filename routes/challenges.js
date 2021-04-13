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
    res.redirect(`/level/${req.session.levels[1].url}`)
})

//challenge 1 TODO


module.exports = router;