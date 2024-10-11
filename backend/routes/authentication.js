const express = require("express")
const router = express.Router()
const API_authentication = require("../controllers/authentication.controller")

//Đăng ký
router.post("/register", API_authentication.registerAccount)

//Đăng nhập
router.post("/login", API_authentication.loginAccount)

module.exports = router
