const isAuthorized = async () => {
  const { token } = req.cookies;
  if (!token) {
    return;
  }
  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

  req.user = await User.findById(decoded.id);

  next();
};
module.exports = { isAuthorized };
