const express = require("express"),
    router = express.Router()

router.get("/", function (req, res) {
    res.redirect("/")
})

router.get("/:url", function (req, res) {
    let url = req.params.url;
    let sucess = false;
    for (let i = 0; i < req.session.levels.length; i++) {
        if (req.session.levels[i].playable && req.session.levels[i].url === url){
            res.render(`levels/level${i}`)
            sucess = true;
            break;
        }
    }
    if (!sucess)
        res.redirect("/");
})

router.post("/:url", function (req, res) {
    let url = req.params.url;
    let sucess = false;
    for (let i = 0; i < req.session.levels.length; i++) {
        if (req.session.levels[i].playable && req.session.levels[i].url === url){
            if (req.body.flag && i+1 < req.session.levels.length && req.session.levels[i+1].url === req.body.flag){
                req.session.levels[i].completed = true;
                req.session.levels[i+1].playable = true;
                res.redirect(req.baseUrl + "/" + req.session.levels[i+1].url)
                sucess = true;
                break;
            }
            else if (req.body.answer){
                if (typeof req.body.answer === "string" && req.session.levels[i].answer && req.body.answer.toLowerCase().includes(req.session.levels[i].answer)){
                    res.render(`levels/level${i}`, { flag: req.session.levels[i+1].url})
                    sucess = true;
                }
            }
        }
    }
    if (!sucess) {
        req.flash("error", "That ain't it chief");
        res.redirect(req.originalUrl)
    }
})

module.exports = router;