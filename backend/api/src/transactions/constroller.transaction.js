const { date } = require("joi");
const userController = require("../users/controller.user");
const transactionService = require("./service.transaction");
// const categoryService = require("../categories/service.category");
const transactionController = {};
transactionController.addTransaction = async (req, res) => {
  try {
    const {
      amount,
      date,
      paymentMode,
      account,
      expenseCategory,
      necessary,
      remark,
    } = req.body;
    // const CategoriesData = await categoryService.getCategories();
    // console.log(CategoriesData[0]._id, "cate");
    const transactionData = await transactionService.addTransaction({
      amount,
      date,
      paymentMode,
      account,
      expenseCategory,
      necessary,
      remark,
      userId: req?._id,
    });

    return res.send({
      status: "OK",
      msg: "Amount, date, paymentMode, expenseCategory, essential and remark is created successfully",
      data: transactionData,
    });
  } catch (error) {
    console.log(error, "errorerror");
    return res.send({
      status: "Error",
      msg: "Something went wrong",
      data: null,
    });
  }
};
transactionController.getTransections = async (req, res) => {
  try {
    const userId = req?._id;

    let { page, limit } = req.query;
    // if (limit > 50) limit = 50;
    // const skip = (page - 1) * limit;
    page = parseInt(page, 10);
    limit = parseInt(limit, 10);

    // Validate page and limit
    if (isNaN(page) || page < 1) page = 1;
    if (isNaN(limit) || limit < 1) limit = 10;
    if (limit > 50) limit = 50;

    const skip = (page - 1) * limit;

    // Construct filters based on query parameters
    const filters = { userId };
    // if (date) {
    //   const startDate = new Date(date);
    //   console.log(startDate)
    //   const endDate = new Date(date);
    //   endDate.setHours(23, 59, 59, 999); // Set end of the day
    //   query.createdAt = { $gte: startDate, $lte: endDate };
    // }

    const getTransactionData = await transactionService.getTransections(
      filters,
      {
        limit,
        skip,
      }
    );
    return res.send({
      status: "OK",
      msg: " transaction retrived succeessfully",
      length: getTransactionData.length,
      data: getTransactionData,
    });
  } catch (error) {
    return res.send({
      status: "Error",
      msg: " Something went wrong",
      data: null,
    });
  }
};
// Helper function to convert dd-mm-yyyy to a valid Date object
// const parseDate = (dateString) => {
//   const [day, month, year] = dateString.split("-");
//   return new Date(`${year}-${month}-${day}`);
// };
transactionController.getFilterTransactions = async (req, res) => {
  const userId = req?._id;

  const {
    amount,
    amountRange,
    date,
    dateRange,
    paymentMode,
    account,
    expenseCategory,
    necessary,
    remark,
    createdAt,
    searchKeyword,
  } = req.query;

  const filterOptions = {};

  if (amount) {
    filterOptions.amount = parseFloat(amount);
  }

  if (amountRange) {
    const [minAmount, maxAmount] = amountRange.split(",");
    filterOptions.amountRange = {
      minAmount: parseFloat(minAmount),
      maxAmount: parseFloat(maxAmount),
    };
  }

  if (date) {
    filterOptions.date = date;
  }

  if (dateRange) {
    const [startDate, endDate] = dateRange.split(",");
    filterOptions.dateRange = {
      startDate: startDate,
      endDate: endDate,
    };
  }

  if (paymentMode) {
    filterOptions.paymentMode = paymentMode;
  }

  if (account) {
    filterOptions.account = account;
  }

  if (expenseCategory) {
    filterOptions.expenseCategory = expenseCategory;
  }

  if (necessary !== undefined) {
    filterOptions.necessary = necessary === "true";
  }

  if (remark) {
    filterOptions.remark = remark;
  }

  // Add searchKeyword to filterOptions
  if (searchKeyword) {
    filterOptions.searchKeyword = searchKeyword;
  }

  try {
    const filteredTransactions = await transactionService.filterTransactions(
      userId,
      filterOptions
    );

    return res.send({
      status: "OK",
      msg: "Transactions filtered successfully",
      data: filteredTransactions.data,
    });
  } catch (err) {
    console.log(err);
    return res.send({ status: "ERR", msg: "Something went wrong", data: null });
  }
};
transactionController.updateTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    const { amount, date, paymentMode, expenseCategory, essential, remark } =
      req.body;
    if (
      !amount ||
      !date ||
      !paymentMode ||
      !expenseCategory ||
      !essential ||
      !remark
    ) {
      return res.send({
        status: "Error",
        msg: "Amount, date, paymentMode, expenseCategory, essential and remark are required ",
        data: null,
      });
    }
    const updatedTransactionData = await transactionService.updateTransaction(
      { _id: id },
      { amount, date, paymentMode, expenseCategory, essential, remark },
      { new: true }
    );
    // Check if transaction was found and updated
    if (!updatedTransactionData) {
      return res.send({
        status: "Error",
        msg: "Transaction not found",
        data: null,
      });
    }

    return res.send({
      status: "OK",
      msg: "Transaction update successfully",
      data: updatedTransactionData,
    });
  } catch (error) {
    return res.send({
      status: "Error",
      msg: "Something went wrong",
      data: null,
    });
  }
};
transactionController.deleteTransaction = async (req, res) => {
  try {
    const { id } = req.params;

    const isExistTransaction = await transactionService.getTransactionById(id);

    if (!isExistTransaction) {
      res.send({
        status: "Erorr",
        msg: "transaction not found",
      });
    }
    if (isExistTransaction?.isDeleted) {
      res.send({
        status: "Erorr",
        msg: "transaction is already deleted",
        data: isExistTransaction._id,
      });
    }
    const deletedTransaction = await transactionService.deleteTransaction(id, {
      $set: { isDeleted: true },
    });

    if (deletedTransaction.isDeleted) {
      return res.send({
        status: "OK",
        msg: "Transaction deleted successfully",
        data: deletedTransaction,
      });
    }
  } catch (error) {
    console.error(error);
    return res.send({
      status: "Err",
      msg: "Something went wrong",
      data: null,
    });
  }
};
module.exports = transactionController;
