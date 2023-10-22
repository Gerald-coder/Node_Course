const userDB = {
  users: require("../model/users.json"),
  setUsers: function (data) {
    this.users = data;
  },
};

const fsPromises = require("fs").promises;
const path = require("path");

const handleLogout = async (req, res) => {
  // loging out means deactivating the refresh token to avoid it from recreating the accesstoken
  const cookies = req.cookies;
  if (!cookies?.jwt)
    return res.status(204).json({ message: "no tokens to logout from" });
  const refreshToken = cookies.jwt;
  const foundUser = userDB.users.find(
    (user) => user.refreshToken === refreshToken
  );
  if (!foundUser) {
    res.clearCookie("jwt", { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });
    return res.sendStatus(204);
  }
  const otherUsers = userDB.users.filter(
    (user) => user.refreshToken !== foundUser.refreshToken
  );
  const curUser = { ...foundUser, refreshToken: "" };
  userDB.setUsers([...otherUsers, curUser]);
  await fsPromises.writeFile(
    path.join(__dirname, "..", "model", "users.json"),
    JSON.stringify(userDB.users)
  );
  res.clearCookie("jwt", {
    httpOnly: true,
    sameSite: "none",
    secure: true,
  });
  res.sendStatus(204);
};

module.exports = handleLogout;
