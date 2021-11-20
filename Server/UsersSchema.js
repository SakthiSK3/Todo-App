const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  name: {
    type: String,
  },
  status: {
    type: String,
  },
});

module.exports = mongoose.model("User", UserSchema);
