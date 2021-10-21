const mongoose = require("mongoose");

const superadminSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
});

exports.Superadmin = mongoose.model("Superadmin", superadminSchema);
