const router = require("express").Router();
const authHelper = require("../../midleware/authHelper");
const validate = require("../../midleware/validation.midleware");
const {
  paymentModeSchema,
} = require("../ValidationSchema/paymentMode.validation");
const paymentModeController = require("./controller.paymentMode");
router.post(
  "/addPaymentMode",
  authHelper,
  validate(paymentModeSchema),
  paymentModeController.addPaymentDetails
);
router.get("/getPaymentMode", authHelper, paymentModeController.getPaymentMode);
router.patch(
  "/updatePaymentMode/:id",
  authHelper,
  validate(paymentModeSchema),
  paymentModeController.updatePaymentMode
);
router.delete(
  "/deletePaymentMode/:id",
  authHelper,
  paymentModeController.deletePaymentMode
);

module.exports = router;
