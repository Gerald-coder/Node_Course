const usersDB = {
  users: require("../model/users.json"),
  setUsers: function (data) {
    this.users = data;
  },
};
const path = require("path");
const fsPromises = require("fs").promises;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const handleLogin = async (req, res) => {
  const { user, pwd } = req.body;
  if (!user || !pwd)
    return res.status(400).json({ messgae: "username and password required" });
  const foundUser = usersDB.users.find((person) => person.username === user);
  if (!foundUser)
    return res
      .status(401) //unauthorized
      .json({ message: `user with name ${user} does not seem to exist` });
  // check password
  const match = await bcrypt.compare(pwd, foundUser.password);
  if (match) {
    // create jwt
    const accessToken = jwt.sign(
      { username: foundUser.username },
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
    const otherUsers = usersDB.users.filter(
      (person) => person.username !== foundUser.username
    );
    const curUser = { ...foundUser, refreshToken };
    usersDB.setUsers([...otherUsers, curUser]);
    await fsPromises.writeFile(
      path.join(__dirname, "..", "model", "users.json"),
      JSON.stringify(usersDB.users)
    );
    // sending the refresh token as a http only for security
    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.json({ accessToken });
  } else return res.status(401).json({ message: "password not correct" });
};

module.exports = handleLogin;
