const express = require("express");
const authAdmin = require("../../middlewares/admin");
const auth = require("../../middlewares/auth");
let router = express.Router();
const validateProduct = require("../../middlewares/validateProduct");
var { Product } = require("../../models/product");
//get all products
router.get("/", async (req, res) => {
  //   console.log(req.query);
  console.log(req.user);
  let page = Number(req.query.page ? req.query.page : 1);
  let perPage = Number(req.query.perPage ? req.query.perPage : 10);
  let skipRecords = perPage * (page - 1);
  let products = await Product.find().skip(skipRecords).limit(perPage);
  return res.send(products);
});
//get  single product
router.get("/:id", async (req, res) => {
  try {
    let product = await Product.findById(req.params.id);
    if (!product)
      return res.status(400).send("Product with given ID is not present");
    return res.send(product);
  } catch (err) {
    return res.status(400).send(" Invalid ID");
  }
});
//update record
router.put("/:id", validateProduct, auth, async (req, res) => {
  let product = await Product.findById(req.params.id);
  product.Name = req.body.Name;
  product.Price = req.body.Price;
  await product.save();
  return res.send(product);
});
//delete record
router.delete("/:id", auth, authAdmin, async (req, res) => {
  let { error } = validate(req.body);
  if (error) return res.status(400).send(details[0].message);
  let product = await Product.findByIdAndDelete(req.params.id);
  return res.send(product);
});
//insert record
router.post("/", validateProduct, auth, async (req, res) => {
  let product = new Product();
  product.Name = req.body.Name;
  product.Price = req.body.Price;
  await product.save();
  return res.send(product);
});

module.exports = router;
