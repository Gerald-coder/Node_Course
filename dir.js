const fsPromises = require("fs").promises;
const fs = require("fs");
const path = require("path");

const inFiles = async (data) => {
  try {
    if (!fs.existsSync("./new")) {
      await fsPromises.mkdir("./new");
    } else {
      await fsPromises.unlink("./new/newFile.txt");
      await fsPromises.rmdir("./new");
      console.log("already existed, but it has been removed");
    }
    // await fsPromises.writeFile("./new/newFile.txt", data);
    // const msg = await fsPromises.readFile("./new/newFile.txt", "utf8");
    // console.log(msg);
  } catch (error) {
    throw error;
  }
};

inFiles("akuko uwa bu eziokwu, Amen and amen");

// if (fs.existsSync("./new")) {
//   fs.rmdir("./new", (err) => {
//     if (err) throw err;
//     console.log("removed");
//   });
// }

process.on("uncaughtException", (err) => {
  console.log(`the error occured was : ${err}`);
  process.exit();
});
