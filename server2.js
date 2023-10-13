const http = require("http");
const fs = require("fs");
const fsPromises = require("fs").promises;
const path = require("path");
const logEvents = require("./logEvent");
require("dotenv").config();
const EventEmitter = require("events");

const PORT = process.env.PORT || 3100;
class Emitter extends EventEmitter {}
const MyEmitter = new Emitter();
MyEmitter.on("server", (msg, file) => logEvents(msg, file));

const serve = async (filePath, ContentType, response, ext) => {
  console.log(ext);
  try {
    const rawData = await fsPromises.readFile(
      filePath,
      !ContentType.includes("image") ? "utf8" : ""
    );
    const data =
      ContentType === "application/json" ? JSON.parse(rawData) : rawData;
    // this means that requesting for a json file, you need it to be parsed as an object
    response.writeHead(filePath.includes("404") ? 404 : 200, {
      "Content-Type": ContentType,
    });
    response.end(
      ContentType === "application/json" ? JSON.stringify(data) : data
    );
    // this means sending a json file to the browser needs it to be stringified
  } catch (error) {
    console.error(error);
    response.statusCode = 500;
    response.end();
    MyEmitter.emit(
      "server",
      `response error ${error.name}:${error.message}`,
      "errLog.txt"
    );
  }
};

const server = http.createServer((req, res) => {
  console.log(req.method, req.url);
  MyEmitter.emit("server", `${req.url}\t${req.method}`, "reqLog.txt");
  //   if (req.url === "/" || req.url === "index.html") {
  //     res.statusCode = 200;
  //     res.setHeader("Content-Type", "text/html");
  //     fs.readFile("./data/data.txt", "utf8", (err, data) => {
  //       if (err) throw err;
  //       res.end(data);
  //     });
  //   }

  const extName = path.extname(req.url);

  let ContentType;

  switch (extName) {
    case ".css":
      ContentType = "text/css";
      break;
    case ".js":
      ContentType = "text/javascript";
      break;
    case ".json":
      ContentType = "application/json";
      break;
    case ".jpg":
      ContentType = "image/jpg";
      break;
    case ".png":
      ContentType = "image/png";
      break;
    case ".txt":
      ContentType = "text/plain";
      break;
    default:
      ContentType = "text/html";
      break;
  }

  let filePath =
    ContentType === "text/html" && req.url === "/"
      ? path.join(__dirname, "views", "index.html")
      : ContentType === "text/html" && req.url.slice(-1) === "/"
      ? path.join(__dirname, "views", req.url, "index.html")
      : ContentType === "text/html"
      ? path.join(__dirname, "views", req.url)
      : path.join(__dirname, req.url);

  // making the .html not required
  if (!extName && req.url.slice(-1) !== "/") filePath += ".html";

  const fileExist = fs.existsSync(filePath);

  if (fileExist) {
    //server file
    serve(filePath, ContentType, res, extName);
  } else {
    switch (path.parse(filePath).base) {
      case "old-page.html":
        res.writeHead(301, { location: "./newPage.html" });
        res.end();
        break;
      case "www-page.html":
        res.writeHead(301, { location: "./" });
        res.end();

        break;

      default:
        // serve 404 page
        serve(
          path.join(__dirname, "views", "404.html"),
          "text/html",
          res,
          extName
        );
    }
  }
});

server.listen(PORT, () => console.log(`listening to the port ${PORT}`));

process.on("uncaughtException", (err) => {
  console.error(`the error is ${err}`);
  process.exit();
});
