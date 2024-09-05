const userRoute = require("./src/users/route.user");
const transactionRoute = require("./src/transactions/route.transaction");
const categories = require("./src/categories/route.category");
const router = require("express").Router();
router.use("/user", userRoute);
router.use("/transaction", transactionRoute);
router.use("/category", categories);
module.exports = router;
