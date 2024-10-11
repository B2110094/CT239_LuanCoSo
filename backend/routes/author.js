const express = require("express")
const router = express.Router()
const API_author = require("../controllers/author.controller")

//Thêm tác giả
router.post("/", API_author.createAuthor)

//Cập nhật tác giả
router.put("/:id", API_author.updateAuthor)

//Xóa tác giả
router.delete("/:id", API_author.deleteAuthor)

//Hiển thị tất cả tác giả
router.get("/", API_author.getAllAuthor)

//Hiển thị tác giả với id
router.get("/editauthor/:id", API_author.getauthortwithID)

//Tìm tác giả với tên
router.get("/findauthor/:nameauthor", API_author.findauthorwithName)

module.exports = router
