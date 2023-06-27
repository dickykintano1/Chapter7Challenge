module.exports = (role) => (req, res, next) => {
  if (req.session.User.role == role) {
    return next();
  }

  return res.status(405).json({
    message: "not allowed",
  });
};
