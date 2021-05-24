let mongoose = require("mongoose");

let timeSchema = mongoose.Schema({
    username: {type: String, required: true},
    uuid: {type: String, required: true, unique: true},
    hours: {type: Number, required: true},
    minutes: {type: Number, required: true},
    seconds: {type: Number, required: true},
});

let time = mongoose.model("Time", timeSchema);
module.exports = time