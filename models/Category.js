const { Schema, model } = require("mongoose");

const sсhema = new Schema({
  name: String,
  userId: { type: Schema.Types.ObjectId, ref: "User" },
  icon: String,
  type: { type: String, enum: ["base", "user"] },
  article: {
    type: String,
    enum: ["operation", "account", "other"],
    required: true,
  },
});

module.exports = model("Category", sсhema);
