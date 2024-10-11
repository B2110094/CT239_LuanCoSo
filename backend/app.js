//Import Library
const express = require("express")
const cors = require("cors")
require("dotenv").config()
const mongoose = require("mongoose")
const ApiError = require("./routes/api-error")
const authRoute = require("./routes/authentication")
const productRoute = require("./routes/product")
const categoryRoute = require("./routes/category")
const authorRoute = require("./routes/author")
const userRoute = require("./routes/user")
const orderRoute = require("./routes/order")
const storeRoute = require("./routes/store")
const booktypeRoute = require("./routes/booktype")

const app = express()

//Connection database
mongoose
  .set('strictQuery', true)
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("Connection database were successfully !")
  })
  .catch((err) => {
    console.log(err)
  });

app.use(cors())
app.use(express.json())

//Router
app.use("/api/auth", authRoute)
app.use("/api/products", productRoute)
app.use("/api/category", categoryRoute)
app.use("/api/author", authorRoute)
app.use("/api/user", userRoute)
app.use("/api/booktype", booktypeRoute)
app.use("/api/order", orderRoute)
app.use("/api/store", storeRoute)

//Middleware xử lý lỗi
app.use((req, res, next) => {
  //next() để chuyển sang middleware xử lý lỗi
  return next(new ApiError(404, "Resource not found"))
});

app.use((error, req, res, next) => {
  return res.status(error.statusCode || 500).json({
    message: error.message || "Internal Server Error"})
});

//Run Server
app.listen(process.env.PORT, () => {
  console.log(`Server is listening on http://localhost:${process.env.PORT}`)
});
