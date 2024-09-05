const router = require("express").Router();
const autHelper = require("../../helper/authHelper");
const validate = require("../../midleware/validation.midleware");
const {
  registerSchema,
  loginSchema,
} = require("../ValidationSchema/validation.user");
const userController = require("./controller.user");

router.post("/register", validate(registerSchema), userController.registerUser);
router.post("/login", validate(loginSchema), userController.loginUser);
router.get("/getUser", autHelper, userController.getUser);

module.exports = router;
