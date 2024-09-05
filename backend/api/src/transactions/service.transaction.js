const Transaction = require("./model.trasaction");

const transactionService = {};

transactionService.addTransaction = async ({
  amount,
  date,
  paymentMode,
  account,
  expenseCategory,
  necessary,
  remark,
  userId,
}) => {
  return await Transaction.create({
    amount,
    date,
    paymentMode,
    account,
    expenseCategory,
    necessary,
    remark,
    userId,
  });
};

transactionService.getTransections = async (
  { filters },
  { limit, skip, type, startDate, endDate, minAmount, maxAmount }
) => {
  // if (paymentMode) {
  //   filters["paymentMode"] = { $in: cash };
  // }
  return await Transaction.find(
    {
      filters,
      // amount: { $gte: 2000 },
    },
    {},
    { limit, skip, type, startDate, endDate, minAmount, maxAmount }
  );
};
transactionService.filterTransactions = async (userId, filterOption) => {
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
  } = filterOption;

  const query = { userId };

  // Filter by exact amount
  if (amount) {
    query.amount = amount;
  }

  // Filter by amount range
  if (amountRange) {
    const { minAmount, maxAmount } = amountRange;
    query.amount = { $gte: minAmount, $lte: maxAmount };
  }

  // Filter by specific date
  if (date) {
    query.date = date;
  }

  // Filter by date range
  if (dateRange) {
    const { startDate, endDate } = dateRange;
    query.date = { $gte: startDate, $lte: endDate };
  }

  // Filter by payment mode
  if (paymentMode) {
    query.paymentMode = paymentMode;
  }

  // Filter by account
  if (account) {
    query.account = account;
  }

  // Filter by expense category
  if (expenseCategory) {
    query.expenseCategory = expenseCategory;
  }

  // Filter by necessity
  if (necessary !== undefined) {
    query.necessary = necessary;
  }

  // Filter by remark with case-insensitive regex search
  if (remark) {
    query.remark = { $regex: remark, $options: "i" };
  }

  // Search by keyword in remark or category
  if (searchKeyword) {
    query.$or = [
      { remark: { $regex: searchKeyword, $options: "i" } },
      { expenseCategory: { $regex: searchKeyword, $options: "i" } },
    ];
  }

  try {
    let transactions = await Transaction.find(query);
    return { status: "OK", data: transactions };
  } catch (err) {
    console.log(err);
    return { status: "ERR", data: null, error: err };
  }
};

transactionService.updateTransaction = async (id, updateData) => {
  return await Transaction.findOneAndUpdate({ _id: id }, updateData, {
    new: true,
  });
};
transactionService.deleteTransaction = async (id, updateDeleteData) => {
  return await Transaction.findByIdAndUpdate(
    { _id: id },
    { ...updateDeleteData },
    { new: true }
  );
};
transactionService.getTransactionById = async (id) => {
  return await Transaction.findById(id);
};
// transactionService.filterTransactions = async (userId, filterOption) => {};

module.exports = transactionService;
