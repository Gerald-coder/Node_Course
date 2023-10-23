const express = require("express");
const router = express.Router();
const path = require("path");
const employeeController = require("../../controller/employeeController");
const data = {};
data.employees = require("../../model/employees.json");
const ROLES_LISTS = require("../../config/users_list");
const verifyRoles = require("../../middleware/verifyRoles");

// console.log(data);

router
  .route("/")
  .get(employeeController.getAllEmployees)
  .post(
    verifyRoles(ROLES_LISTS.Admin, ROLES_LISTS.Editor),
    employeeController.RegisterNewEmployee
  )
  .put(
    verifyRoles(ROLES_LISTS.Admin, ROLES_LISTS.Editor),
    employeeController.updateEmployee
  )
  .delete(verifyRoles(ROLES_LISTS.Admin), employeeController.deleteEmployee);

router.route("/:id").get(employeeController.getEmployee);

module.exports = router;
