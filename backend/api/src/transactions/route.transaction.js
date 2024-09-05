const router = require("express").Router();
const authHelper = require("../../helper/authHelper");
const transactionController = require("./constroller.transaction");
const validate = require("../../midleware/validation.midleware");
const { expenseSchema } = require("../ValidationSchema/validation.transaction");

router.post(
  "/addTransaction",
  authHelper,
  validate(expenseSchema),
  transactionController.addTransaction
);
router.get(
  "/getTransaction",
  authHelper,
  transactionController.getTransections
);
router.get(
  "/getFilterTransactions",
  authHelper,
  transactionController.getFilterTransactions
);
router.patch(
  "/editTransaction/:id",
  authHelper,
  validate(expenseSchema),
  transactionController.updateTransaction
);
router.delete(
  "/deleteTransaction/:id",
  authHelper,
  transactionController.deleteTransaction
);
module.exports = router;
