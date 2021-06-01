let mongoose = require("mongoose");

let progressSchema = mongoose.Schema({
    token: {type: String},
    session: {type: Object}
});

let progress = mongoose.model("progress", progressSchema);
module.exports = progress