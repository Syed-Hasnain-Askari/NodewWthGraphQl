const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const authHeader = req.get("Authorization");
  console.log(authHeader,"authHeader");
  if (!authHeader) {
    req.isAuth = false;
    return next();
  }
  const token = authHeader
  console.log(token,"token")
  if (!token || token === '') {
    req.isAuth = false;
    return next();
  }

  try {
    // Verify the token with the correct secret key
    const decodedToken = jwt.verify(token, "secretkey");

    if (!decodedToken) {
      req.isAuth = false;
      return next();
    }

    req.isAuth = true;
    req.userId = decodedToken.userId;
    return next(); // Don't forget to call next() here
  } catch (err) {
    req.isAuth = false;
    return next();
  }
};
