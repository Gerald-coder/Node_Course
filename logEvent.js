const path = require("path");
const fsPromises = require("fs").promises;
const fs = require("fs");
const EventEmitter = require("events");
const { v4: uuid } = require("uuid");
const { format } = require("date-fns");

const logEvents = async (msg, logName) => {
  const dateTime = `${format(new Date(), "yyyy/MM/dd")}`;
  const logItem = `${dateTime}\t ${uuid()} \t ${msg} \n`;
  console.log(logItem);
  try {
    if (!fs.existsSync("./logs")) await fsPromises.mkdir("./logs");
    await fsPromises.appendFile(path.join(__dirname, "logs", logName), logItem);
  } catch (error) {
    throw error;
  }
};

process.on("uncaughtException", (err) => {
  console.error(`error is ${err}`);
  process.exit();
});

module.exports = logEvents;
