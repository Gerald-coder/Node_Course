const { logEvents } = require("./logEvent");

const errorHander = (err, req, res, next) => {
  console.error(err.stack);
  logEvents(`${err.name}: ${err.message}`, "errLog.txt");
  res.status(500).send(err.message);
};

module.exports = errorHander;
