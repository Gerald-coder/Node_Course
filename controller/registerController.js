const usersDB = {
  users: require("../model/users.json"),
  setUsers: function (data) {
    this.users = data;
  },
};
const path = require("path");
const fsPromises = require("fs").promises;
const bcrypt = require("bcrypt");

const registerNewUser = async (req, res) => {
  const { user, pwd } = req.body;
  if (!user || !pwd)
    return res.status(400).json({ messgae: "username and password required" });

  const duplicate = usersDB.users.find((person) => person.username === user);
  if (duplicate) return res.sendStatus(409); // conflict
  try {
    const hashedPwd = await bcrypt.hash(pwd, 10);
    //store new user
    const newUser = {
      username: user,
      password: hashedPwd,
      roles: { user: 2001 },
    };
    usersDB.setUsers([...usersDB.users, newUser]);
    await fsPromises.writeFile(
      path.join(__dirname, "..", "model", "users.json"),
      JSON.stringify(usersDB.users)
    );
    console.log(`we have ${usersDB.users.length} number of active users now`);
    res.status(201).json({ success: `new user ${user} created` });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { registerNewUser };
