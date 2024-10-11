const express = require("express")
const router = express.Router()
const API_order = require("../controllers/order.controller")

//Thêm đơn hàng
router.post("/", API_order.createOrder)

//Hiển thị tất cả đơn hàng
router.get("/", API_order.getAllOrder)

//Cập nhật đơn hàng
router.put("/infoUser/:id", API_order.updateOrder)

//Cập nhật đơn hàng bởi admin
router.put("/editorder/:id", API_order.updateOrderAdmin)

//Hiển thị thông tin đơn hàng với id
router.get("/detailorder/:id", API_order.getDataOrderWithID)

//Hiển thị thông tin đơn hàng với id user
router.get("/infoUser/:id", API_order.getDataOrderWithIDUser)

//Hiển thị thông tin đơn hàng với id đơn hàng
router.get("/:id", API_order.getDataOrderWithIDOrder)

//Tìm đơn hàng với id
router.get("/findOrder/:id", API_order.findorderwithID)

//Hiển thị thông tin trạng thái đơn hàng
router.get("/filterStatusOrder/:name", API_order.getorderwithstatusorder)

module.exports = router
