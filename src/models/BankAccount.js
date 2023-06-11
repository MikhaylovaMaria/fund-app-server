const { Schema, model } = require("mongoose");

const sсhema = new Schema(
  {
    name: String,
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    balance: Number,
    type: String,
    category: { type: Schema.Types.ObjectId, ref: "Category", required: true },
    icon: String,
  },

  { timestamps: { createdAt: "created_at" } }
);

module.exports = model("BankAccount", sсhema);
