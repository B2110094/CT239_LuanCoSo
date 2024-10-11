const express = require("express")
const router = express.Router()
const API_store = require("../controllers/store.controller")

//Hiển thị toàn bộ kho
router.get("/admin", API_store.getAllStore)

//Thêm kho
router.post("/", API_store.createStore)

//Cập nhật kho
router.put("/:id", API_store.updateStore)

//Hiển thị kho với id
router.get("/:id", API_store.getStorewithID)

//Hiển thị số lượng sản phẩm trong kho theo sắp xếp
router.get("/", API_store.getStoreSort)

module.exports = router
