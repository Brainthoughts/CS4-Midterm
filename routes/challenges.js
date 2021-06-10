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
    req.session.challenges[0].completed = true;
    req.session.challenges[1].playable = true;
    res.redirect(`/challenge/${req.session.challenges[1].url}`)
})

//Challenge 1
router.get("/coffee", function (req, res) {
    req.session.challenges[1].completed = true;
    req.session.challenges[2].playable = true;
    res.redirect(`/challenges/${req.session.challenges[2].url}`)

})

//Challenge 2
router.post("/mates", function (req, res) {
    req.session.challenges[2].completed = true;
    req.session.challenges[3].playable = true;
    res.end("Good Job, go to the next level")
    // res.redirect(`/level/${req.session.levels[3].url}`)

})

router.get("/:url", function (req, res) {
    let url = req.params.url;
    let success = false;
    for (let i = 0; i < req.session.challenges.length; i++) {
        if (req.session.challenges[i].playable && req.session.challenges[i].url === url) {
            res.locals.hint = req.session.challenges[i].hint;
            res.render(`challenges/challenge${i}`, {currentChallenge: i})
            success = true;
            break;
        }
    }
    if (!success)
        res.redirect("/");
})

module.exports = router;