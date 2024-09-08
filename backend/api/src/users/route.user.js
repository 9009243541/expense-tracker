const router = require("express").Router();
const authHelper = require("../../midleware/authHelper");

const validate = require("../../midleware/validation.midleware");
const {
  registerSchema,
  loginSchema,
} = require("../ValidationSchema/validation.user");
const userController = require("./controller.user");

router.post("/register", validate(registerSchema), userController.registerUser);
router.post("/login", validate(loginSchema), userController.loginUser);
router.get("/getUser", authHelper, userController.getUser);

module.exports = router;
