const router = require("express").Router();
const authHelper = require("../../midleware/authHelper");
const categoryController = require("./controller.category");
const validate = require("../../midleware/validation.midleware");
const { categorySchema } = require("../ValidationSchema/validation.category");

router.post(
  "/addCategory",
  authHelper,
  validate(categorySchema),
  categoryController.addCategory
);
router.get("/getCategory", authHelper, categoryController.getCategories);
router.patch(
  "/updateCategory/:id",
  authHelper,
  validate(categorySchema),
  categoryController.updateCategory
);
router.delete(
  "/deleteCategory/:id",
  authHelper,
  categoryController.deleteCategory
);
// router.get(
//   "/getCategoriesDataById/:id",
//   categoryController.getCategoriesDataById
// );
module.exports = router;
