const jwt = require("jsonwebtoken");
require("dotenv").config();

function veryftJwt(req, res, next) {
  const authHeader = req.headers.authorization || req.headers.Authorization;
  if (!authHeader?.startsWith("Bearer ")) return res.sendStatus(401);
  const token = authHeader && authHeader.split(" ")[1];
  // console.log("the auth header is ", authHeader); //
  if (token === null)
    return res.status(401).json({ message: "no accessToken is present" });
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRETS, (err, user) => {
    if (err)
      return res.status(403).json({
        message:
          "access token is either expired or tampered with, request a new one ",
      });
    req.user = user.UserInfo.username;
    req.roles = user.UserInfo.roles;

    next();
  });
}

module.exports = veryftJwt;
