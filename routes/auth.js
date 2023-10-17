const express = require("express");
const router = express.Router();
const path = require("path");
const handleLogin = require("../controller/authController");

router.route("/").get(handleLogin);

module.exports = router;
