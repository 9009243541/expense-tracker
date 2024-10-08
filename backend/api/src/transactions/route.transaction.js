const router = require("express").Router();
const authHelper = require("../../midleware/authHelper");
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
  "/getAllTransactions",
  authHelper,
  transactionController.getTransections
);
router.get(
  "/getTransactionByUserId/:userId",
  authHelper,
  transactionController.getTransactionByUserId
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
