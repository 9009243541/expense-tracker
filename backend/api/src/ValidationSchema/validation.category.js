const Joi = require("joi");

const categorySchema = Joi.object({
  CategoryName: Joi.string().trim().required().messages({
    "string.empty": "Category name is required",
  }),
  categoryDescription: Joi.string().trim().min(10).max(255).messages({
    "string.empty": "Category description cannot be empty.",
    "string.min": "Category description must be at least 10 characters long.",
    "string.max": "Category description cannot exceed 255 characters.",
  }),
});

module.exports = { categorySchema };
