const User = require("../model/User");
const fsPromises = require("fs").promises;
const path = require("path");

const handleLogout = async (req, res) => {
  // loging out means deactivating the refresh token to avoid it from recreating the accesstoken
  const cookies = req.cookies;
  if (!cookies?.jwt)
    return res.status(204).json({ message: "no tokens to logout from" });
  const refreshToken = cookies.jwt;
  const foundUser = await User.findOne({ refreshToken }).exec();
  if (!foundUser) {
    res.clearCookie("jwt", { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });
    return res.sendStatus(204);
  }
  foundUser.refreshToken = "";
  const result = await foundUser.save();
  console.log(result);
  res.clearCookie("jwt", {
    httpOnly: true,
    sameSite: "none",
    secure: true,
  });
  res.sendStatus(204);
};

module.exports = handleLogout;
