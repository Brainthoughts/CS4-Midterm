const express = require("express"),
    router = express.Router()

router.get("/", function (req, res) {
    res.redirect("/")
})

router.get("/:url", function (req, res) {
    let url = req.params.url;
    let sucess = false;
    for (let i = 0; i < req.session.levels.length; i++) {
        if (req.session.levels[i].playable && req.session.levels[i].url === url) {
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
    let success = false;
    for (let i = 0; i < req.session.levels.length; i++) {
        if (req.session.levels[i].playable && req.session.levels[i].url === url) {
            if (req.body.flag) {
                if (i + 1 < req.session.levels.length && req.session.levels[i + 1].url === req.body.flag){
                    req.session.levels[i + 1].playable = true;
                    res.redirect(req.baseUrl + "/" + req.session.levels[i + 1].url)
                    success = true;
                }
                else if (i + 1 >= req.session.levels.length && req.session.levels[i].flag === req.body.flag){
                    req.session.levels[i].completed = true;
                    res.redirect("/congratulations")
                    success = true;
                }
                else {
                    req.flash("error", req.session.levels[i].hint);
                    res.redirect(req.originalUrl)
                    success = true;
                    break;
                }
                break;
            } else if (req.body.answer) {
                if (typeof req.body.answer === "string" && req.session.levels[i].answer && req.body.answer.toLowerCase().includes(req.session.levels[i].answer)) {
                    res.render(`levels/level${i}`, {flag: req.session.levels[i + 1].url})
                    success = true;
                }
                else {
                    req.flash("error", req.session.levels[i].hint);
                    res.redirect(req.originalUrl)
                    success = true;
                    break;
                }
                break;
            }
            else {
                req.flash("error", req.session.levels[i].hint);
                res.redirect(req.originalUrl)
                success = true;
                break;
            }
        }
    }
    if (!success) {
        res.redirect("/")
    }


})

module.exports = router;