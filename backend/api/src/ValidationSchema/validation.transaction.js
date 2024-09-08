const Joi = require("joi");
const moment = require("moment");

const expenseSchema = Joi.object({
  amount: Joi.number().positive().greater(0).required().messages({
    "number.base": "Amount must be a number.",
    "number.positive": "Amount must be a positive number.",
    "number.greater": "Amount must be greater than zero.",
    "any.required": "Amount cannot be empty.",
  }),
  date: Joi.string()
    .regex(/^\d{2}-\d{2}-\d{4}$/)
    .required()
    .custom((value, helpers) => {
      const date = moment(value, "DD-MM-YYYY", true); // Validate the date format strictly
      if (!date.isValid()) {
        return helpers.message("Date must be in DD-MM-YYYY format.");
      }
      if (date.isAfter(moment(), "day")) {
        return helpers.message("Date cannot be in the future.");
      }
      return value;
    })
    .messages({
      "string.empty": "Date cannot be empty.",
      "string.pattern.base": "Date must be in DD-MM-YYYY format.",
    }),
  paymentMode: Joi.string()
    .trim()
    .required()
    .messages({
      "string.base": "Payment Mode must be a string.",
      "any.only": "Please select a payment mode.",
      "any.required": "Payment Mode cannot be empty.",
    }),
  expenseCategory: Joi.string().trim().required().messages({
    "string.base": "Expense Category must be a string.",
    "any.required": "Please select an expense category.",
  }),
  necessary: Joi.boolean().required().messages({
    "boolean.base": "Necessary Expense must be a boolean value.",
    "any.required": "Please indicate if the expense is necessary.",
  }),
  remark: Joi.string().max(250).optional().messages({
    "string.base": "Remark must be a string.",
    "string.max": "Remark cannot exceed 250 characters.",
  }),
});

module.exports = { expenseSchema };
