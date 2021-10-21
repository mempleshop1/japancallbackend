const mongoose = require("mongoose");

const adminSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
});

exports.Admin = mongoose.model("Admin", adminSchema);
