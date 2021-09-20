const mongoose = require("mongoose");
var Schema = mongoose.Schema;
var now = new Date();

var Notification = new Schema({
    Note: { type: Schema.Types.ObjectId, ref: "note", default: null },
    Course: { type: Schema.Types.ObjectId, ref: "course", default: null },
    Claim: { type: Schema.Types.ObjectId, ref: "claim", default: null },
    Message: { type: String },
    status: { type: Boolean, default: false },

    Date: { type: Date, default: Date.now() },
    Owner: { type: Schema.Types.ObjectId, ref: "user" },
});
module.exports = mongoose.model("notification", Notification);
