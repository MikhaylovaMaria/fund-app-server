const { Schema, model } = require("mongoose");

const sсhema = new Schema(
  {
    name: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    image: String,
    age: Number,    
    sex: { type: String, enum: ["male", "female", "other"] },
  },
  { timestamps: true }
);

module.exports = model("User", sсhema);
