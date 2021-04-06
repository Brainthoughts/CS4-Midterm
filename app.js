const express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    favicon = require("serve-favicon"),
    session = require("express-session"),
    indexRoutes = require("./routes/index.js")

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(favicon(__dirname + "/public/images/favicon.ico"));
app.use(session({ secret: 'averygoodsecret', cookie: { maxAge: 60000 }}))
app.use("/", indexRoutes)

app.listen(3000);