const ProductModel = require("../models/Product")
const CategoryModel = require("../models/Category")

module.exports = class API {
  //Thêm sản phẩm
  static async createProduct(req, res) {
    const productInput = new ProductModel({
      title: req.body.title,
      img_url: req.body.img_url,
      author: req.body.author,
      categories: req.body.categories,
      bookType: req.body.bookType,
      price: req.body.price,
      description: req.body.description,
    })
    try {
      const createNewProduct = await productInput.save()
      res.status(200).json(createNewProduct)
    } catch (err) {
      // console.log(err)
      res.status(501).json(err)
    }
  }

  //Cập nhật sản phẩm
  static async updateProduct(req, res) {
    const id_product = req.params.id
    try {
      const updateProduct = await ProductModel.findByIdAndUpdate(
        id_product,
        {
          $set: req.body,
        },
        { new: true }
      )
      res.status(200).json(updateProduct)
    } catch (err) {
      res.status(501).json(err)
    }
  }

  //Cập nhật số lượng sản phẩm sau khi bán
  static async updateproductafterorder(req, res) {
    const id_product = req.params.id
    try {
      const updateProduct = await ProductModel.findByIdAndUpdate(
        id_product,
        {
          quantityonhand: req.body.quantity_update,
        },
        { new: true }
      )
      res.status(200).json(updateProduct)
    } catch (err) {
      res.status(501).json(err)
    }
  }

  //Xóa sản phẩm
  static async deleteProduct(req, res) {
    const id_product = req.params.id
    try {
      await ProductModel.findByIdAndDelete(id_product);
      res.status(200).json("Sản phẩm đã xóa thành công!")
    } catch (err) {
      res.status(501).json(err)
    }
  }

  //Hiển thị một sản phẩm
  static async findoneProduct(req, res) {
    const id_product = req.params.id
    try {
      const ProductResult = await ProductModel.findById(id_product)
      res.status(201).json(ProductResult)
    } catch (err) {
      res.status(501).json(err)
    }
  }

  //Hiển thị sản phẩm với tên
  static async findproductwithName(req, res) {
    try {
      const name_product = await req.params.nameproduct
      const ProductData = await ProductModel.find({
        $or: [
          { title: { $regex: `${name_product}`, $options: "i" } },
          { description: { $regex: `${name_product}`, $options: "i" } },
        ],
      })

      res.status(201).json(ProductData)
    } catch (err) {
      res.status(501).json(err)
    }
  }

  //Hiển thị tất cả sản phẩm
  static async getAllProduct(req, res) {
    try {
      const arrayProduct = await ProductModel.find()
      res.status(200).json(arrayProduct)
    } catch (err) {
      res.status(501).json(err)
    }
  }

  //Hiển thị số lượng sản phẩm được giới hạn
  static async getProductLimit(req, res) {
    try {
      const arrayProduct = await ProductModel.find().limit(12)
      res.status(200).json(arrayProduct)
    } catch (err) {
      res.status(501).json(err)
    }
  }

  //Hiển thị danh mục sản phẩm
  static async getcategoryProduct(req, res) {
    try {
      var arrayProduct
      if (req.params.name === "Tất Cả Sách") {
        arrayProduct = await ProductModel.find({})
      } else {
        let arrayResultCategory = await CategoryModel.find()
        var check_duplicated = 0
        arrayResultCategory.forEach((item, index) => {
          if (item.category_name === req.params.name) {
            check_duplicated++
          }
        });

        if (check_duplicated == 0) {
          arrayProduct = await ProductModel.find({ bookType: req.params.name })
        } else {
          arrayProduct = await ProductModel.find({
            categories: req.params.name,
          })
        }

        if(arrayProduct.length == 0){
          arrayProduct = await ProductModel.find({author: req.params.name})
        }
      }

      res.status(200).json(arrayProduct)
    } catch (err) {
      res.status(501).json(err)
    }
  }

  //Hiển thị sản phẩm với id
  static async getproductwithID(req, res) {
    try {
      const result = await ProductModel.findOne({ _id: req.params.id })
      res.status(201).json(result)
    } catch (err) {
      res.status(501).json(err)
    }
  }

  //Hiển thị sản phẩm với id ở mọi nơi
  static async getwithID(req, res) {
    try {
      const result = await ProductModel.findOne({ _id: req.params.id })
      res.status(201).json(result)
    } catch (err) {
      res.status(501).json(err)
    }
  }
}
