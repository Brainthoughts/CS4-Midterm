const express = require("express"),
    router = express.Router()

router.use(function (req, res, next) {
    if (req.session.challenge) {
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
    res.end("Good Job, go to the next level")
})

//Challenge 2
router.post("/mates", function (req, res) {
    req.session.challenges[2].completed = true;
    req.session.challenges[3].playable = true;
    res.end("Good Job, go to the next level")
})

//Challenge 3
router.put("/away", function (req, res) {
    req.session.challenges[3].completed = true;
    req.session.challenges[4].playable = true;
    res.end("Good Job, go to the next level")
})

//Challenge 4
router.delete("/that", function (req, res) {
    req.session.challenges[4].completed = true;
    req.session.challenges[5].playable = true;
    res.end("Good Job, go to the next level")
})

//Challenge 5
router.post("/board", function (req, res) {
    if (Object.keys(req.body).includes("hello")) {
        req.session.challenges[5].completed = true;
        req.session.challenges[6].playable = true;
        res.end("Good Job, go to the next level")
    } else
        res.end("Try again")
})

//Challenge 6
router.get("/icecream", function (req, res) {
    if (req.query.want === "true") {
        req.session.challenges[6].completed = true;
        req.session.challenges[7].playable = true;
        res.end("Good Job, go to the next level")
    } else
        res.end("Try again")
})

//Challenge 7
router.get("/fefifofum", function (req, res) {
    res.json({secret: "goldenegg"})
})

router.post("/jack", function (req, res) {
    if (req.body.secret === "goldenegg") {
        console.log("ch7")
        req.session.challenges[7].completed = true;
        req.session.challenges[8].playable = true;
        res.end("Good Job, go to the next level")
    } else
        res.end("Try again")
})

//Challenge 8
router.get("/alice", function (req, res) {
    res.json({foe: "jabberwocky"})
})

router.delete("/jabberwocky", function (req, res) {
    if (req.body.weapon === "Vorpal Sword") {
        console.log("ch8")
        req.session.challenges[8].completed = true;
        req.session.challenges[9].playable = true;
        res.end("Good Job, go to the next level")
    } else
        res.end("Try again")
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