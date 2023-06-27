module.exports = (role) => (req, res, next) => {
  if (!req.session.User) {
    return res.redirect("/login");
  } else if (req.session.User.role !== role){
    return res.status(405).json({
      message: "not allowed",
    })
  }

  return next();
};
