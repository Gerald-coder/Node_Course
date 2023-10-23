const userDB = {
  users: require("../model/users.json"),
  setUsers: function (data) {
    this.users = data;
  },
};

const jwt = require("jsonwebtoken");
require("dotenv").config();

const refreshTokenController = (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt)
    return res.status(401).json({ message: "no jwt cookies present" });
  console.log(cookies.jwt); //
  const refreshToken = cookies.jwt;
  const foundUser = userDB.users.find(
    (person) => person.refreshToken === refreshToken
  );

  if (!foundUser)
    return res.status(403).json({ message: "no matching RF token" });

  const roles = Object.values(foundUser.roles);
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if (err || user.username !== foundUser.username)
      return res
        .status(403)
        .json({ message: "refresh token seems to be tampered with" });
    const accessToken = jwt.sign(
      { UserInfo: { username: user.username, roles: roles } },
      process.env.ACCESS_TOKEN_SECRETS,
      { expiresIn: "30s" }
    );
    res.json({ accessToken });
  });
};

module.exports = refreshTokenController;
