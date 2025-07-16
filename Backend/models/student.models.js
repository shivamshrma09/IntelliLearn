const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const studentSchema = new mongoose.Schema({
name: { type: String, required: true },
email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
 

  totalPoints: { type: Number, default: 0 },
  rank: { type: Number, default: 0 },
  streak: { type: Number, default: 0 },
  numberOfBatchesCompleted: { type: Number, default: 0 },
});

// Methods
studentSchema.methods.generateAuthToken = function () {
  return jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
};
studentSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};
studentSchema.statics.hashPassword = async function (password) {
  return await bcrypt.hash(password, 10);
};

module.exports = mongoose.model("Student", studentSchema);
