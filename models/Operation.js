const { Schema, model } = require("mongoose");

const sсhema = new Schema(
  {
    account: {
      type: Schema.Types.ObjectId,
      ref: "BankAccount",
      required: true,
    },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    date: {
      type: String,
    },
    comment: { type: String },
    type: { type: String, enum: ["income", "expenditure"], required: true },
    summa: { type: Number },
    category: { type: Schema.Types.ObjectId, ref: "Category", required: true },
  },

  { timestamps: true }
);

module.exports = model("Operation", sсhema);
