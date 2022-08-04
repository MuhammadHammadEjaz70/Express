var mongoose = require("mongoose");
var productSchema = mongoose.Schema({
  Name: String,
  Price: String,
});

const Product = mongoose.model("products", productSchema);
module.exports = Product;
