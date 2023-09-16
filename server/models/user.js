const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  // can add multiple properties if needed
  googleId: String,
  credits: { type: Number, default: 0 }
});

mongoose.model("users", userSchema);
