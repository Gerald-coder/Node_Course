const fsPromises = require("fs").promises;
const path = require("path");

const readFile = async (msg, msg2) => {
  try {
    const data = await fsPromises.readFile("./file/gerry.txt", "utf-8");
    console.log(data);
    await fsPromises.appendFile(path.join(__dirname, "file", "gerry.txt"), msg);
    fsPromises.unlink("./file/gerry.txt");
    await fsPromises.writeFile("./file/promiseWrite.txt", msg2);
    await fsPromises.appendFile("./file/promiseWrite.txt", msg);
    await fsPromises.rename(
      path.join(__dirname, "file", "promiseWrite.txt"),
      path.join(__dirname, "file", "fsProm.txt")
    );
  } catch (error) {
    throw error;
  }

  process.on("uncaughtException", (err) => {
    console.error(`the error encountered was : ${err}`);
  });
};

readFile(
  "man, not gonnu lie, life has not been all we planned, but regardless, we move",
  "hey, gerry, what up with you "
);
