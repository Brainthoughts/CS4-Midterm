const express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    favicon = require("serve-favicon"),
    session = require("express-session"),
    crypto = require("crypto"),
    logger = require("morgan"),
    flash = require("connect-flash"),
    levels = require("./recources/levels")

const indexRoutes = require("./routes/index.js"),
    levelRoutes = require("./routes/levels.js"),
    challengeRoutes = require("./routes/challenges.js")

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(favicon(__dirname + "/public/images/favicon.ico"));
app.use(session({secret: "averygoodsecret", resave: false, saveUninitialized: false}))
app.use(logger("dev"));
app.use(flash())

let allowAdmin = process.env.allowAdmin;


//initialize session variables
app.use(function (req, res, next) {
    res.locals.flash = {success: req.flash("success"), info: req.flash("info"), error: req.flash("error")};
    res.locals.currentUrl = req.originalUrl;
    res.locals.admin = req.session.admin;
    if (allowAdmin){
        req.session.allowAdmin = true;
        res.locals.allowAdmin = true
    }
    if (req.session.challenge){
        res.locals.challenge = req.session.challenge;
    }
    if (req.session.levels) {
        res.locals.levels = req.session.levels;
        next()
    } else {
        req.session.levels = levels;
        req.session.randNum = Math.random().toString()
        for (let i in req.session.levels) {
            i = parseInt(i);
            let shasum = crypto.createHash('sha1');
            shasum.update(i + req.session.randNum);
            req.session.levels[i].url = shasum.digest('hex')
            req.session.levels[i].id = i;
            req.session.levels[i].chCompleted = false;
            if (!req.session.levels[i].hint){
                req.session.levels[i].hint = "<i>Add Hint</i>"
            }
            if (i+1 === req.session.levels.length){
                shasum = crypto.createHash('sha1');
                shasum.update("LastLevel" + req.session.randNum);
                req.session.levels[i].flag = shasum.digest('hex')
            }
        }
        console.log(req.session)
        res.locals.levels = req.session.levels;
        next();
    }
})
app.use("/", indexRoutes)
app.use("/level", levelRoutes)
app.use("/challenge", challengeRoutes)


app.listen(4006, function () {
    console.log("Server started!")
    if (allowAdmin){
        console.log("Debug on!")
    }
});