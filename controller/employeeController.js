const Employee = require("../model/Employee");

const getAllEmployees = async (req, res) => {
  // console.log("req header", req.headers); //
  // console.log("res header", res.header()); //
  // res.json(data.employees);

  // using mongoose
  const employees = await Employee.find();
  if (!employees)
    return res
      .status(204)
      .json({ message: "no employees found in this end point" });
  res.json(employees);
};

const RegisterNewEmployee = async (req, res) => {
  const { firstname, lastname } = req.body;
  if (!firstname || !lastname) {
    res.status(400).json({ message: "required user details" });
  }
  try {
    const result = await Employee.create({ firstname, lastname });
    res.status(201).json(result);
    console.log(result);
  } catch (error) {
    console.log(error.message);
  }
};

const updateEmployee = async (req, res) => {
  const { id } = req?.body;
  if (!id)
    return res
      .status(400)
      .json({ message: "ID parameter is required for this action" });

  const employee = await Employee.findOne({ _id: id }).exec();

  if (!employee)
    return res
      .json(400)
      .json({ message: `no employee found with the given id ${id}` });
  if (req?.body?.firstname) employee.firstname = req.body.firstname;
  if (req?.body?.lastname) employee.lastname = req.body.lastname;

  const result = await employee.save();
  res.json(result);

  //BELOW IS  CODE WITHOUT MONGODB AND MONGOOSE

  // const { firstname, lastname, id } = req.body;

  // const curEmpl = await Employee.findOne({ _id }).exec();
  // if (!curEmpl)
  //   res
  //     .status(400)
  //     .json({ message: `employee with id ${id} seems not to exist` });
  // if (firstname) curEmpl.firstname = firstname;
  // if (lastname) curEmpl.lastname = lastname;
  // const filteredArray = data.employees.filter(
  //   (employees) => employees.id !== parseInt(id)
  // );
  // const unsortedArray = [...filteredArray, curEmpl];
  // const sortedArray = unsortedArray.sort((a, b) => a.id - b.id);
  // data.setEmployee(sortedArray);
  // res.json(data.employees);
};

const deleteEmployee = async (req, res) => {
  const { id } = req?.body;
  if (!id)
    return res
      .status(400)
      .json({ message: "ID parameter is required for this action" });

  const employee = await Employee.findOne({ _id: id }).exec();
  if (!employee)
    return res
      .json(400)
      .json({ message: `no employee found with the given id ${id}` });

  const result = await employee.deleteOne({ _id: id });
  res.json(result);

  //BELOW IS  CODE WITHOUT MONGODB AND MONGOOSE

  // const employee = data.employees.find((em) => em.id === parseInt(req.body.id));
  // if (!employee)
  //   res.status(400).json({
  //     message: `please gerry, this user with id ${req.body.id} does not exist`,
  //   });
  // const newEmployees = data.employees.filter(
  //   (employee) => employee.id !== parseInt(req.body.id)
  // );
  // data.setEmployee(newEmployees);
  // res.json(data.employees);
};

const getEmployee = async (req, res) => {
  const { id } = req?.params;
  if (!id)
    return res
      .status(400)
      .json({ message: "ID parameter is required for this action" });
  const employee = await Employee.findOne({ _id: id }).exec();
  if (!employee)
    return res
      .status(400)
      .json({ message: `employee with id ${id} does not seem to exist` });
  res.json(employee);

  //BELOW IS  CODE WITHOUT MONGODB AND MONGOOSE

  // const employee = data.employees.find(
  //   (em) => em.id === parseInt(req.params.id)
  // );
  // if (!employee)
  //   res.status(400).json({
  //     message: `please gerry ➡⬅😥, this user with id ${req.body.id} does not exist`,
  //   });
  // res.json(employee);
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
