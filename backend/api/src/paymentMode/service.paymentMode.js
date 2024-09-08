const PaymentMode = require("./model.paymentMode");
const paymentModeService = {};

paymentModeService.addPaymentDetails = async (paymentData) => {
  return await PaymentMode.create(paymentData);
};
paymentModeService.getPaymentMode = async () => {
  return await PaymentMode.find();
};
paymentModeService.getPaymentModeById = async (id) => {
  return await PaymentMode.findById(id);
};
paymentModeService.updatePaymentMode = async (id, updateData) => {
  return await PaymentMode.findByIdAndUpdate(id, updateData, { new: true });
};

paymentModeService.deletePaymentMode = async (id) => {
  return await PaymentMode.findByIdAndDelete(id);
};

module.exports = paymentModeService;
