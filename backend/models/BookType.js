const mongoose = require("mongoose")

const BookTypeSchema = new mongoose.Schema(
  {
    booktype_name: {
      type: String,
      required: true,
    },
    category_name: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("BookType", BookTypeSchema)
