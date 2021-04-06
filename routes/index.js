const express = require("express"),
    router = express.Router()

router.get("/", function (req, res) {
    res.render(process.cwd() + "/views/index")
})

module.exports = router;