const { date } = require("joi");

const transactionService = require("./service.transaction");
const categoryService = require("../categories/service.category");
const paymentModeService = require("../paymentMode/service.paymentMode");
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
    const CategoriesData = await categoryService.getCategoryById(
      expenseCategory
    );
    const paymentModeData = await paymentModeService.getPaymentModeById(
      paymentMode
    );

    const categoryName = CategoriesData?.CategoryName;
    const paymentModeType = paymentModeData?.paymentMode;

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

    const responseData = {
      ...transactionData.toObject(),
      paymentMode: {
        _id: paymentMode,
        paymentMode: paymentModeType,
      },
      // Convert Mongoose document to plain JS object
      expenseCategory: {
        _id: expenseCategory, // The original expenseCategory ID
        name: categoryName, // The fetched category name
      },
    };

    return res.send({
      status: "OK",
      msg: "Amount, date, paymentMode, expenseCategory, essential and remark is created successfully",
      data: responseData,
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
    const userId = req._id;
    console.log(req._id, "getTransactionParUserId");
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
    // console.log(filters, "filters");

    const getTransactionData = await transactionService.getTransections(
      filters,
      {
        limit,
        skip,
      }
    );
    const transactionsWithDetails = getTransactionData.map((transaction) => ({
      ...transaction.toObject(),
      paymentMode: transaction.paymentMode?.paymentMode || "Unknown", // Convert Mongoose document to plain object
      expenseCategory: transaction.expenseCategory?.CategoryName || "Unknown", // Replace ID with category name
    }));
    return res.send({
      status: "OK",
      msg: " transaction retrived succeessfully",
      length: getTransactionData.length,
      data: transactionsWithDetails,
    });
  } catch (error) {
    return res.send({
      status: "Error",
      msg: " Something went wrong",
      data: null,
    });
  }
};

transactionController.getTransactionByUserId = async (req, res) => {
  try {
    const { userId } = req.params;
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

    if (!userId) {
      return res.send({ status: "Err", msg: "Invalid userId", data: null });
    }
    const getTransactionDataByUserId =
      await transactionService.getTransactionByUserId(
        { userId },
        { skip, limit }
      );
    // .populate("expenseCategory", "CategoryName");
    if (!getTransactionDataByUserId.length) {
      return res.send({
        status: "Err",
        msg: "No transactions found for the user",
        data: null,
      });
    }

    const transactionsWithDetails = getTransactionDataByUserId.map(
      (transaction) => ({
        ...transaction.toObject(), // Convert Mongoose document to plain object
        paymentMode: transaction.paymentMode?.paymentMode || "Unknown",
        expenseCategory: transaction.expenseCategory?.CategoryName || "Unknown", // Replace ID with category name
      })
    );
    console.log(transactionsWithDetails, "transactionsWithCategoryName");
    res.send({
      status: "OK",
      msg: "Transactions get sucessfully",
      length: transactionsWithDetails.length,
      data: transactionsWithDetails,
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "Error",
      msg: "Something went wrong",
      data: null,
    });
  }
};

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
    const transactionsWithDetails = filteredTransactions.data.map(
      (transaction) => ({
        ...transaction.toObject(), // Convert Mongoose document to plain object
        paymentMode: transaction.paymentMode?.paymentMode || "Unknown",
        expenseCategory: transaction.expenseCategory?.CategoryName || "Unknown", // Replace ID with category name
      })
    );
    return res.send({
      status: "OK",
      msg: "Transactions filtered successfully",
      length: transactionsWithDetails.length,
      data: transactionsWithDetails,
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
    const CategoriesUpdateData = await categoryService.getCategoryById(
      expenseCategory
    );
    const categoryName = CategoriesUpdateData?.CategoryName;
    // console.log(CategoriesUpdateData,"CategoriesUpdateData");
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
    const responseData = {
      ...updatedTransactionData.toObject(), // Convert Mongoose document to plain JS object
      expenseCategory: {
        _id: expenseCategory, // The original expenseCategory ID
        name: categoryName, // The fetched category name
      },
    };

    return res.send({
      status: "OK",
      msg: "Transaction update successfully",
      data: responseData,
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
        msg: "Transaction not found",
      });
    }
    if (isExistTransaction?.isDeleted) {
      res.send({
        status: "Erorr",
        msg: "Transaction already deleted",
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
