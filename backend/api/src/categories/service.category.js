// services/service.category.js
const Category = require("./model.category");

const categoryService = {};

categoryService.addCategory = async (categoryData) => {
  return await Category.create(categoryData);
};

categoryService.getCategories = async () => {
  return await Category.find();
};
categoryService.getCategoryById = async (id) => {
  return await Category.findById(id);
};
// categoryService.getCategoriesDataById = async (id) => {
//   return await Category.findById(id);
// };

categoryService.updateCategory = async (id, updateData) => {
  return await Category.findByIdAndUpdate(id, updateData, { new: true });
};

categoryService.deleteCategory = async (id) => {
  return await Category.findByIdAndDelete(id);
};

module.exports = categoryService;
