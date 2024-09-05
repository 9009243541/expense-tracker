const Joi = require("joi");

const registerSchema = Joi.object({
  name: Joi.string()
    .trim()
    .min(1)
    .regex(/^[a-zA-Z]+$/)
    .required()
    .messages({
      "string.empty": "Name cannot be empty.",
      "string.min": "Name must be at least 1 character long.",
      "string.pattern.base": "Name must contain only alphabetic characters.",
    }),
  email: Joi.string().trim().email().required().messages({
    "string.empty": "Email cannot be empty.",
    "string.email": "Email must be a valid email address.",
  }),
  password: Joi.string()
    .trim()
    .min(8)
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@!#$%^&*()_+={}\[\]|\\:;"'<>,.?/~`-]{8,}$/
    )
    .required()
    .messages({
      "string.empty": "Password cannot be empty.",
      "string.min": "Password must be at least 8 characters long.",
      "string.pattern.base":
        "Password should include at least one uppercase letter, one lowercase letter, one number, and can include special characters.",
    }),
  confirmPassword: Joi.string()
    .trim()
    .valid(Joi.ref("password"))
    .required()
    .messages({
      "any.only": "Confirm Password must match the Password.",
    }),
});
const loginSchema = Joi.object({
  email: Joi.string().trim().email().required().messages({
    "string.empty": "Email cannot be empty.",
    "string.email": "Email must be a valid email address.",
  }),
  password: Joi.string()
    .trim()
    .min(8)
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@!#$%^&*()_+={}\[\]|\\:;"'<>,.?/~`-]{8,}$/
    )
    .required()
    .messages({
      "string.empty": "Password cannot be empty.",
      "string.min": "Password must be at least 8 characters long.",
      "string.pattern.base":
        "Password should include at least one uppercase letter, one lowercase letter, one number, and can include special characters.",
    }),
});

module.exports = { registerSchema, loginSchema };
