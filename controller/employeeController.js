const Employee = require("../model/Employee");

const getAllEmployees = (req, res) => {
  console.log("req header", req.headers); //
  console.log("res header", res.header()); //
  res.json(data.employees);
};

const RegisterNewEmployee = async (req, res) => {
  const { firstname, lastname } = req.body;
  if (!firstname || !lastname) {
    res.status(403).json({ message: "required user details" });
  }
  const newEm = {
    firstname,
    lastname,
    id: data.employees[data.employees.length - 1].id + 1 || 1,
  };

  const result = await Employee.create({ newEm });
  console.log(result);

  res.status(201).json(data.employees);
};

const updateEmployee = (req, res) => {
  const { firstname, lastname, id } = req.body;

  const curEmpl = data.employees.find(
    (employee) => employee.id === parseInt(id)
  );
  if (!curEmpl)
    res
      .status(400)
      .json({ message: `employee with id ${id} seems not to exist` });
  if (firstname) curEmpl.firstname = firstname;
  if (lastname) curEmpl.lastname = lastname;
  const filteredArray = data.employees.filter(
    (employees) => employees.id !== parseInt(id)
  );
  const unsortedArray = [...filteredArray, curEmpl];
  const sortedArray = unsortedArray.sort((a, b) => a.id - b.id);
  data.setEmployee(sortedArray);
  res.json(data.employees);
};

const deleteEmployee = (req, res) => {
  const employee = data.employees.find((em) => em.id === parseInt(req.body.id));
  if (!employee)
    res.status(400).json({
      message: `please gerry, this user with id ${req.body.id} does not exist`,
    });
  const newEmployees = data.employees.filter(
    (employee) => employee.id !== parseInt(req.body.id)
  );
  data.setEmployee(newEmployees);
  res.json(data.employees);
};

const getEmployee = (req, res) => {
  const employee = data.employees.find(
    (em) => em.id === parseInt(req.params.id)
  );
  if (!employee)
    res.status(400).json({
      message: `please gerry ➡⬅😥, this user with id ${req.body.id} does not exist`,
    });
  res.json(employee);
};

// error catcher
process.on("uncaughtException", (err) => {
  console.error(err.message);
  process.exit();
});
module.exports = {
  RegisterNewEmployee,
  updateEmployee,
  deleteEmployee,
  getAllEmployees,
  getEmployee,
};
