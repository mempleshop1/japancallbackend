const mongoose = require("mongoose");

const teamSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  admin1: {
    type: Boolean,
    default: false,
  },
  admin2: {
    type: Boolean,
    default: false,
  },
  admin3: {
    type: Boolean,
    default: false,
  },
  admin4: {
    type: Boolean,
    default: false,
  },
  admin5: {
    type: Boolean,
    default: false,
  },
});

exports.Team = mongoose.model("Team", teamSchema);
