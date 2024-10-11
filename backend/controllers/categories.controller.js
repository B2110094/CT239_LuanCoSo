const CategoryModel = require("../models/Category")

module.exports = class API {
  //Tạo mới danh mục
  static async createCategory(req, res) {
    const categoryInput = new CategoryModel({
      category_name: req.body.category_name
    })
    try {
      const createNewCategory = await categoryInput.save()
      res.status(200).json(createNewCategory)
    } catch (err) {
      res.status(501).json(err)
    }
  }

  //Cập nhật danh mục
  static async updateCategory(req, res) {
    const id_category = req.params.id;
    try {
      const updateCategory = await CategoryModel.findByIdAndUpdate(
        id_category,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updateCategory)
    } catch (err) {
      res.status(501).json(err)
    }
  }

  //Xóa danh mục
  static async deleteCategory(req, res) {
    const id_category = req.params.id
    try {
      await CategoryModel.findByIdAndDelete(id_category)
      res.status(200).json("Danh mục đã xóa thành công!")
    } catch (err) {
      res.status(501).json(err)
    }
  }

  //Hiển thị danh mục với id
  static async getcategorytwithID(req, res) {
    try {
      const result = await CategoryModel.findOne({ _id: req.params.id })
      res.status(201).json(result)
    } catch (err) {
      res.status(501).json(err)
    }
  }

  //Tìm danh mục với tên
  static async findcategorywithName(req, res) {
    try {
      const name_category = await req.params.namecategory;
      const CategoryData = await CategoryModel.find({
        category_name: { $regex: `${name_category}`, $options: "i" },
      })

      res.status(201).json(CategoryData)
    } catch (err) {
      res.status(501).json(err)
    }
  }

  //Hiển thịt toàn bộ danh mục
  static async getAllCategory(req, res) {
    try {
      const arrayCategory = await CategoryModel.find()
      res.status(200).json(arrayCategory)
    } catch (err) {
      res.status(501).json(err)
    }
  }
}
