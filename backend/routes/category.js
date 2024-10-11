const express = require("express")
const router = express.Router()
const API_category = require("../controllers/categories.controller")

//Thêm danh mục
router.post("/",API_category.createCategory)

//Cập nhật danh mục
router.put("/:id",API_category.updateCategory)

//Xóa danh mục
router.delete("/:id",API_category.deleteCategory)

//Hiển thị tất cả danh mục
router.get("/",API_category.getAllCategory)

//Hiển thị danh mục với id
router.get("/editCategory/:id", API_category.getcategorytwithID)

//Tìm danh mục với tên
router.get("/findCategory/:namecategory", API_category.findcategorywithName)

module.exports = router
