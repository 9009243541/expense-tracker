// controllers/controller.category.js
const categoryService = require("./service.category");

const categoryController = {};

categoryController.addCategory = async (req, res) => {
  try {
    const { CategoryName, description } = req.body;
    const newCategory = await categoryService.addCategory({
      CategoryName,
      description,
    });

    return res.send({
      status: "OK",
      msg: "Category created successfully",
      data: newCategory,
    });
  } catch (error) {
    return res.send({
      status: "Error",
      msg: "Something went wrong",
      data: null,
    });
  }
};

categoryController.getCategories = async (req, res) => {
  try {
    const { id } = req.params;
    const categories = await categoryService.getCategories(id);
    // console.log(cate)
    return res.send({
      status: "OK",
      msg: "Categories retrieved successfully",
      data: categories,
    });
  } catch (error) {
    return res.send({
      status: "Error",
      msg: "Something went wrong",
      data: null,
    });
  }
};

categoryController.updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { CategoryName, description } = req.body;

    const updatedCategory = await categoryService.updateCategory(id, {
      CategoryName,
      description,
    });

    if (!updatedCategory) {
      return res.send({
        status: "Error",
        msg: "Category not found",
        data: null,
      });
    }

    return res.send({
      status: "OK",
      msg: "Category updated successfully",
      data: updatedCategory,
    });
  } catch (error) {
    return res.send({
      status: "Error",
      msg: "Something went wrong",
      data: null,
    });
  }
};

categoryController.deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedCategory = await categoryService.deleteCategory(id);

    if (!deletedCategory) {
      return res.send({
        status: "Error",
        msg: "Category not found",
        data: null,
      });
    }

    return res.send({
      status: "OK",
      msg: "Category deleted successfully",
      data: deletedCategory,
    });
  } catch (error) {
    return res.send({
      status: "Error",
      msg: "Something went wrong",
      data: null,
    });
  }
};

module.exports = categoryController;
