const mongoose = require("mongoose");

const paymentModeSchema = mongoose.Schema({
  paymentMode: {
    type: String,
    // required: true,
  },
  upiId: {
    type: String,
  },
  bankName: {
    type: String,
  },
});
module.exports = mongoose.model("paymentDetail", paymentModeSchema);
