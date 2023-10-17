const usersDB = {
  users: require("../model/users.json"),
  setUsers: function (data) {
    this.users = data;
  },
};
const path = require("path");
const fsPromises = require("fs").promises;
const bcrypt = require("bcrypt");

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
    return res.json({ message: `user ${user} is logged in` });
  }
  return res.status(401).json({ message: "password not correct" });
};

module.exports = handleLogin;
