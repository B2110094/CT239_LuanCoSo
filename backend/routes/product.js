const express = require("express")
const router = express.Router()
const API_product  = require("../controllers/product.controller")


//Thêm sản phẩm
router.post("/", API_product.createProduct)

//Cập nhật sản phẩm
router.put("/:id", API_product.updateProduct)

//Cập nhật sản phẩm sau bán
router.put("/:id", API_product.updateproductafterorder)

//Xóa sản phẩm
router.delete("/:id", API_product.deleteProduct)

//Hiển thị 1 sản phẩm
router.get("/find/:id", API_product.findoneProduct)

//Tìm sản phẩm với tên
router.get("/findProduct/:nameproduct", API_product.findproductwithName)

//Hiển thị tất cả sản phẩm
router.get("/", API_product.getAllProduct)

//Hiển thị số lượng còn lại trong kho của sản phẩm 
router.get("/limit", API_product.getProductLimit)

//Hiển thị sản phẩm với tên danh mục
router.get("/categoryBook/:name", API_product.getcategoryProduct)

//Hiển thị sản phẩm với id
router.get("/editBook/:id", API_product.getproductwithID)

//Hiển thị sản phẩm với id ở mọi nơi
router.get("/:id", API_product.getwithID)

module.exports = router