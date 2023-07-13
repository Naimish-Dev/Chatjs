const jwt = require("jsonwebtoken");
const UserModule = require("../Modules/UserModule");
const Authmiddleware = async (req, res, next) => {
  const is_token = await req.headers.token;
  if (is_token) {
    const pure_Token = is_token.split(" ")[1].trim();
    jwt.verify(pure_Token, process.env.JWTPRIVET, (error, user) => {
      if (user) {
        req.user = user;
        next();
      } else {
        res.status(401).json("You are not authenticated");
      }
    });
  } else {
    res.status(401).json("You are not authenticated");
  }
};

module.exports = Authmiddleware;
