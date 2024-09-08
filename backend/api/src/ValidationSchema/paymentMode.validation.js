const Joi = require("joi");

const paymentModeSchema = Joi.object({
  paymentMode: Joi.string().trim().required().messages({
    "string.empty": "Please select a payment mode or amount type",
  }),
  upiId: Joi.when("paymentMode", {
    is: "UPI",
    then: Joi.string().trim().required().messages({
      "string.empty": "UPI details cannot be empty",
    }),
    otherwise: Joi.string().trim().allow(""),
  }),
  bankName: Joi.when("paymentMode", {
    is: "Bank Account",
    then: Joi.string().trim().required().messages({
      "string.empty": "Bank name cannot be empty",
    }),
    otherwise: Joi.string().trim().allow(""),
  }),
});

module.exports = { paymentModeSchema };
