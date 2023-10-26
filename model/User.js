const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: { type: String, required: true },
  roles: {
    User: {
      type: Number,
      default: 2002,
    },
    Admin: Number,
    Editor: Number,
  },
  password: { type: String, required: true },
  refreshToken: String,
});

module.exports = mongoose.model("User", userSchema);
