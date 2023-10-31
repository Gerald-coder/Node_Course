const Users = require("../model/User");

const getAllUsers = async (req, res) => {
  const users = await Users.find();
  if (!users) return res.status(204).json({ message: "no users found" });
  res.json(users);
};

const deleteUser = async (req, res) => {
  const { id } = req.body;
  if (!id)
    return res
      .status(400)
      .json({ message: "ID parameter required to perform action" });
  const foundUser = await Users.findOne({ _id: id }).exec();
  if (!foundUser)
    return res
      .status(403)
      .json({ message: `user with id of ${id} does not seem to exist` });

  const result = await foundUser.deleteOne({ _id: id });
  console.log(result);
};

module.exports = { getAllUsers, deleteUser };
