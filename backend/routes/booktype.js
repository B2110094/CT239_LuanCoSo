const express = require("express")
const router = express.Router()
const API_booktype = require("../controllers/booktype.controller")

//Router
//Thêm loại sách
router.post("/", API_booktype.createBookType)

//Cập nhật loại sách
router.put("/:id", API_booktype.updateBookType)

//Xóa loại sách
router.delete("/:id", API_booktype.deleteBookType)

//Hiển thị tất cả loại sách
router.get("/", API_booktype.getAllBookType)

//Hiển thị loại sách với id
router.get("/editbooktype/:id", API_booktype.getbooktypewithID)

//Tìm loại sách với tên
router.get("/findbooktype/:namebooktype", API_booktype.findbooktypewithName)

module.exports = router
