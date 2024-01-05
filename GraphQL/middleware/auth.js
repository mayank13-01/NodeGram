const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  // console.log(req.headers);
  const authHeader = req.get("Authorization");
  if (!authHeader) {
    req.isAuth = false;
    return next();
  }
  const token = req.get("Authorization").split(" ")[1];
  // console.log(token);
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, "secret");
  } catch {
    req.isAuth = false;
    return next();
  }

  if (!decodedToken) {
    req.isAuth = false;
    return next();
  }

  req.userId = decodedToken.userId;
  req.isAuth = true;
  next();
};
