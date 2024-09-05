const { required } = require("joi");
const mongoose = require("mongoose");
const transactionSchema = mongoose.Schema(
  {
    amount: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    paymentMode: {
      type: String,
      required: true,
    },
    // expenseCategory: {
    //   type: mongoose.Schema.Types.ObjectId, // Reference to another model
    //   ref: "Category", // The name of the model being referenced
    //   required: true,
    // },
    expenseCategory: {
      type: String,
      required: true,
    },
    necessary: {
      type: Boolean,
      required: true,
    },
    remark: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("Transaction", transactionSchema);
