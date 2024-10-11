const express = require("express")
const router = express.Router()
const API_user = require("../controllers/user.controller")

//Thêm người dùng
router.post("/", API_user.createUser)

//Cập nhật người dùng
router.put("/:id", API_user.updateUser)

//Xóa người dùng
router.delete("/:id", API_user.deleteUser)

//Hiển thị tất cả người dùng
router.get("/", API_user.getAllUser)

//Hiển thị người dùng với id
router.get("/infoUser/:id", API_user.getUserWithID)

//Tìm người dùng với tên
router.get("/finduser/:nameuser", API_user.finduserwithName)

//Lấy người dùng đổi mật khẩu
router.put("/changepassword/:id", API_user.getUserWithIDChangepass)

module.exports = router
