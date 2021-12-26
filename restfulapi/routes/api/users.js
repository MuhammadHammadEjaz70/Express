const express = require("express");
let router = express.Router();
let { User } = require("../../models/user");
var bcrypt = require("bcryptjs");

const _ = require("lodash");
const jwt = require("jsonwebtoken");
const config = require("config");

router.post("/register", async (req, res) => {
  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("User alredy exists");
  user = new User();
  user.name = req.body.name;
  user.email = req.body.email;
  user.password = req.body.password;
  user.role = req.body.role;
  await user.generateHashedPasswords();
  await user.save();
  let token = jwt.sign(
    { _id: user._id, name: user.name,role:user.role },
    config.get("jwtPrivateKey")
  );
  let datatoReturn ={name: user.name,email:user.email,token:user.token}
  return res.send(datatoReturn);
});
router.post("/login", async (req, res) => {
  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("User doesn't exists");
  let isValid = await bcrypt.compare(req.body.password, user.password);
  if (!isValid) return res.status(401).send("Invalid Password");
  let token = jwt.sign(
    { _id: user._id, name: user.name,role:user.role },
    config.get("jwtPrivateKey")
  );
  res.send(token);
});
router.get("/", async (req, res) => {
  let user = await User.find();
  return res.send(user);
});
module.exports = router;
