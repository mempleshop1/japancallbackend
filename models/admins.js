const mongoose = require("mongoose");

const adminSchema = mongoose.Schema({
  admin1: {
    type: Boolean,
    required: true,
  },
  admin2: {
    type: Boolean,
    required: true,
  },
  admin3: {
    type: Boolean,
    required: true,
  },
  admin4: {
    type: Boolean,
    required: true,
  },
});

exports.Admin = mongoose.model("Admin", adminSchema);
