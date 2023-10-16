const fs = require("fs");
const path = require("path");

const rs = fs.createReadStream("./file/lorem2.txt", { encoding: "utf8" });
const ws = fs.createWriteStream("./file/newLorem.txt");

// rs.on("data", (dataChunk) => {
//   ws.write(dataChunk);
//   console.log(dataChunk);
// });

// this accomplishes the same purpose as the line 7
rs.pipe(ws);
