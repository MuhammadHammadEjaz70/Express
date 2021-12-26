const express = require("express");
const authAdmin = require("../../middlewares/admin");
const auth = require("../../middlewares/auth");
let router = express.Router();
const validateTravel = require("../../middlewares/validateTravel");
var  Travel  = require("../../models/travel");
//get all products
router.get("/", async (req, res) => {
  //   console.log(req.query);
  console.log(req.user);
  // let page = Number(req.query.page ? req.query.page : 1);
  // let perPage = Number(req.query.perPage ? req.query.perPage : 10);
  // let skipRecords = perPage * (page - 1);
  let travel = await Travel.find();
  return res.send(travel);
});
// //get  single product
// router.get("/:id", async (req, res) => {
//   try {
//     let travel = await travel.findById(req.params.id);
//     if (!travel)
//       return res.status(400).send("travel with given ID is not present");
//     return res.send(travel);
//   } catch (err) {
//     return res.status(400).send(" Invalid ID");
//   }
// });
// //update record
// router.put("/:id", validateTravel, auth, authAdmin,async (req, res) => {
//   let travel = await travel.findById(req.params.id);
//   travel.name = req.body.name;
//   travel.price = req.body.price;
//   await travel.save();
//   return res.send(travel);
// });
// //delete record
// router.delete("/:id", auth,authAdmin,async (req, res) => {
//   let { error } = validate(req.body);
//   if (error) return res.status(400).send(details[0].message);
//   let travel = await travel.findByIdAndDelete(req.params.id);
//   return res.send(travel);
// });
// //insert record
// router.post("/", validateTravel,auth, async (req, res) => {
//   let travel = new travel();
//   travel.name = req.body.name;
//   travel.price = req.body.price;
//   await travel.save();
//   return res.send(travel);
// });

module.exports = router;
