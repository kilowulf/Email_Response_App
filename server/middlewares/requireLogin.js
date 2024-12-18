// next parameter typically used to ensure process is passed to the next middleware

module.exports = (req, res, next) => {
  if (!req.user) {
    return res.status(401).send({ error: "You must log in!" });
  }
  next();
};
