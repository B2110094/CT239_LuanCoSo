const StoreModel = require("../models/Store")
const ProductModel = require("../models/Product")

module.exports = class API {
  //Tạo mới kho
  static async createStore(req, res) {
    const storeInput = new StoreModel({
      id_product : req.body.id_product,
      sellquantity: req.body.sellquantity,  //Số lượng sản phẩm bán ra
    })

    try {
      const createNewStore = await storeInput.save()
      res.status(200).json(createNewStore)
    } catch (err) {
      // console.log(err)
      res.status(501).json(err)
    }
  }

  //Cập nhật số lượng trong kho sau khi bán
  static async updateStore(req, res) {
    const id_product_input = req.params.id
    try {
      const updateStore = await StoreModel.findOneAndUpdate(
        {id_product: id_product_input},
        {
          sellquantity: req.body.sellquantity
        },
        { new: true }
      )
      res.status(200).json(updateStore)
    } catch (err) {
      console.log(err)
      res.status(501).json(err)
    }
  }


  //Hiển thị kho với id
  static async getStorewithID(req, res){
    const id_product_store = req.params.id
    try{
      const dataStore = await StoreModel.findOne({id_product: id_product_store})
      res.status(200).json(dataStore)
    }catch(err){
      res.status(501).json(err)
    }
  }

  //Hiển thị toàn bộ kho hàng
  static async getAllStore(req, res) {
    try {
      const arrayStore = await StoreModel.find()
      res.status(200).json(arrayStore)
    } catch (err) {
      res.status(501).json(err)
    }
  }

  //Hiển thị số lượng sản phẩm trong kho theo sắp xếp
  static async getStoreSort(req, res){
    try{
      const data = await StoreModel.find().sort( { sellquantity: -1 } ).limit(8)
      var dataArray = []
      for(let i=0; i< data.length; i++){
        const resultProduct = await ProductModel.findOne({ _id: data[i].id_product })
        let soluong = data[i].sellquantity
        let objectData = {
            sanphamdata: resultProduct,
            soluongSP: soluong
        }
        dataArray.push(objectData)
      }
      res.status(200).json(dataArray)
    }catch(err){
      console.log(err)
      res.status(501).json(err)
    }
  }
}
