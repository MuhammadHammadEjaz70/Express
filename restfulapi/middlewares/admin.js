function authAdmin(req, res, next) {
  if (req.user.role != "admin")
    return res.status(403).send("Your are not authorized");
  next();
}
module.exports = authAdmin;
