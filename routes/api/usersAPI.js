const express = require("express");
const router = express.Router();
const userController = require("../../controller/userController");
const verifyRoles = require("../../middleware/verifyRoles");
const ROLES_LISTS = require("../../config/users_list");

router
  .route("/")
  .get(userController.getAllUsers)
  .delete(verifyRoles(ROLES_LISTS.Admin), userController.deleteUser);

module.exports = router;
