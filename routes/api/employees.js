const express = require("express");
const router = express.Router();
const path = require("path");
const employeeController = require("../../controller/employeeController");
const data = {};
data.employees = require("../../model/employees.json");

// console.log(data);

router
  .route("/")
  .get(employeeController.getAllEmployees)
  .post(employeeController.RegisterNewEmployee)
  .put(employeeController.updateEmployee)
  .delete(employeeController.deleteEmployee);

router.route("/:id").get(employeeController.getEmployee);

module.exports = router;
