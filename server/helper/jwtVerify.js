var jwt = require("jsonwebtoken");
const { throwError } = require("./throwError");

module.exports = (req, res, next) => {
  try {
    let token = req.headers.authorization.split(" ")[1];
    var decoded = jwt.verify(
      token,
      "MyVeryPersonalSecretKeyAndThisIsNotPersonalReallyItsNotButKeepItSecure"
    );
    res.user = decoded;
    next();
  } catch (error) {
    throwError("Invalid Token");
  }
};
