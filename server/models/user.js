const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  // can add multiple properties if needed
  googleId: String
});

mongoose.model("users", userSchema);
