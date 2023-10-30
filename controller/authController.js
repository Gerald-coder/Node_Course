const User = require("../model/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const handleLogin = async (req, res) => {
  const { user, pwd } = req.body;
  if (!user || !pwd)
    return res.status(400).json({ messgae: "username and password required" });
  const foundUser = await User.findOne({ username: user }).exec();
  if (!foundUser)
    return res
      .status(401) //unauthorized
      .json({ message: `user with name ${user} does not seem to exist` });
  // check password
  const match = await bcrypt.compare(pwd, foundUser.password);
  if (match) {
    // create jwt

    const roles = Object.values(foundUser.roles);
    const accessToken = jwt.sign(
      { UserInfo: { username: foundUser.username, roles: roles } },
      process.env.ACCESS_TOKEN_SECRETS,
      {
        expiresIn: "30s",
      }
    );
    const refreshToken = jwt.sign(
      { username: foundUser.username },
      process.env.REFRESH_TOKEN_SECRET,
      {
        expiresIn: "1d",
      }
    );
    foundUser.refreshToken = refreshToken;
    const result = await foundUser.save();
    console.log(result);
    // sending the refresh token as a http only for security
    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      sameSite: "none",
      // secure: true,  // this is removed because thunder client will not get the cookies for a secure connection
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.json({ accessToken });
  } else return res.status(401).json({ message: "password not correct" });
};

module.exports = handleLogin;
