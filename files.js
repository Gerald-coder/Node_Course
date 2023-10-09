const path = require("path");
const fs = require("fs");

const msg = "hey, what do you think you are doing? \n\n ";
const msg2 = "hey, what is your business with what i am doing ?";

// fs.writeFile("./gerry.txt", msg, (err) => {
//   if (err) console.error(err);
// });

fs.readFile(path.join(__dirname, "file", "gerry.txt"), "utf8", (err, data) => {
  if (err) throw err;
  console.log(data);
});

console.log("Hello......");

fs.writeFile(path.join(__dirname, "file", "lorem.txt"), msg, (err) => {
  if (err) throw err;
  console.log("write complete");

  // this appends data into an already existing file or create a new file if the file does not exist
  fs.appendFile(path.join(__dirname, "file", "lorem.txt"), msg2, (err) => {
    if (err) throw err;
    console.log("append complete");
    fs.rename(
      path.join(__dirname, "file", "lorem.txt"),
      path.join(__dirname, "file", "lorem.txt"),
      (err) => {
        if (err) throw err;
      }
    );
  });
});

// exit on uncaught error
process.on("uncaughtException", (err) => {
  console.error(`the error encountered is: ${err.message}`);
  process.exit(1);
});

// in other of execution, irrespective of the order of call, fs methods are asynchronous, the write file executes first, followed by the read file and then the appendFile

