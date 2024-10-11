const mongoose = require("mongoose")

const AuthorSchema = new mongoose.Schema(
  {
    author_name: {
        type: String,
        required: true,
        unique: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Author", AuthorSchema)
