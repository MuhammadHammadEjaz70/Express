function checkSessionAuth(req, res, next) {
  //set variables for every pug files
  if (req.session.user) next();
  else return res.redirect("/login");
}
module.exports = checkSessionAuth;
