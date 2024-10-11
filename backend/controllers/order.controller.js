const OrderModel = require("../models/Order")

module.exports = class API {
  //Tạo mới đơn hàng
  static async createOrder(req, res) {
    const orderInput = new OrderModel({
      iduser: req.body.iduser,
      username: req.body.username,
      email: req.body.email,
      phonenumber: req.body.phonenumber,
      address: req.body.address,
      payment: req.body.payment,
      detail_cart: req.body.detail_cart,
      statusOrder: req.body.statusOrder,
      totalOrder: req.body.totalOrder,
      timecreateOrder: new Date().toLocaleString('en-GB', {hour12: false,}),
    })
    try {
      const createNewOrder = await orderInput.save()
      res.status(200).json(createNewOrder)
    } catch (err) {
      console.log(err)
      res.status(501).json(err)
    }
  }

  //Cập nhật đơn hàng
  static async updateOrder(req, res) {
    const id_order = req.params.id
    try {
      const updateOrder = await OrderModel.findByIdAndUpdate(
        id_order,
        {
          $set: req.body,
        },
        { new: true }
      )
      res.status(200).json(updateOrder)
    } catch (err) {
      res.status(501).json(err)
    }
  }

  //Cập nhật trạng thái đơn hàng bởi Admin
  static async updateOrderAdmin(req, res) {
    const id_order = req.params.id
    try {
      const updateOrder = await OrderModel.findByIdAndUpdate(
        id_order,
        {
          statusOrder: req.body,
        },
        { new: true }
      );
      res.status(200).json(updateOrder)
    } catch (err) {
      res.status(501).json(err)
    }
  }

  //Hiển thị thông tin đơn hàng bằng id phía admin
  static async getDataOrderWithID(req, res) {
    const id_order = req.params.id
    console.log(id_order)
    try {
      const dataOrder = await OrderModel.findById(id_order)
      res.status(200).json(dataOrder)
    } catch (err) {
      console.log(err)
      res.status(501).json(err)
    }
  }

  //Hiển thị thông tin đơn hàng bằng id phía user
  static async getDataOrderWithIDUser(req, res) {
    const id_user = req.params.id
    try {
      const dataOrder = await OrderModel.find({ iduser: id_user })
      res.status(200).json(dataOrder)
    } catch (err) {
      console.log(err)
      res.status(501).json(err)
    }
  }

  //Hiển thị thông tin đơn hàng của đơn hàng
  static async getDataOrderWithIDOrder(req, res) {
    const id_order = req.params.id
    try {
      const dataOrder = await OrderModel.find({ _id: id_order })
      res.status(200).json(dataOrder)
    } catch (err) {
      console.log(err)
      res.status(501).json(err)
    }
  }

  //Hiển thị tất cả đơn hàng
  static async getAllOrder(req, res) {
    try {
      const arrayOrder = await OrderModel.find()
      res.status(200).json(arrayOrder)
    } catch (err) {
      res.status(501).json(err)
    }
  }

  //Tìm đơn hàng với id
  static async findorderwithID(req, res) {
    try {
      const id_order = await req.params.id
      const OrderData = await OrderModel.find({
        phonenumber: { $regex: `${id_order}`, $options: "i" },
      })

      res.status(201).json(OrderData)
    } catch (err) {
      res.status(501).json(err)
    }
  }


  //Hiển thị trạng thái đơn hàng
  static async getorderwithstatusorder(req, res){
    try{
      const statusInput = req.params.name
      const dataOrder = await OrderModel.find({statusOrder: statusInput})
      res.status(201).json(dataOrder)
    }catch(err){
      res.stats(501).json(err)
    }
  }
}
