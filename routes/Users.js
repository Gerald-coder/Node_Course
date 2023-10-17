const express = require("express");
const router = express.Router();
const path = require("path");
const registerController = require("../controller/registerController");

router.route("/").post(registerController.registerNewUser);

module.exports = router;
