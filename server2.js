const fs = require("fs");
const fsPromises = require("fs").promises;
const path = require("path");
const http = require("http");
require("dotenv").config();

const PORT = process.env.PORT || 3300;

const serveFile = async (filePath, ContentType, response) => {
  try {
    response.statusCode = 200;
    response.setHeader("Content-Type", ContentType);
    const data = await fsPromises.readFile(filePath, "utf8");
    response.end(data);
  } catch (error) {
    response.statusCode = 500;
    response.end();
  }
};

const server = http.createServer((req, res) => {
  console.log(req.url, req.method);

  //   if (req.url === "/" || req.url === "index.html") {
  //     res.statusCode = 200;
  //     res.setHeader("Content-Type", "text/html");
  //     fs.readFile("./views/index.html", "utf8", (err, data) => {
  //       if (err) throw err;
  //       res.end(data);
  //     });
  //   }

  // more dynamic server
  const extension = path.extname(req.url);
  let ContentType;

  switch (extension) {
    case ".css":
      ContentType = "text/css";
      break;
    case ".txt":
      ContentType = "text/plain";
      break;
    case ".js":
      ContentType = "text/javascript";
      break;
    case ".jpg":
      ContentType = "image/jpg";
      break;
    case ".png":
      ContentType = "image/png";
      break;
    case ".json":
      ContentType = "application/json";
      break;
    default:
      ContentType = "text/html";
  }

  let filePath =
    req.url === "/" && ContentType === "text/html"
      ? path.join(__dirname, "views", "index.html")
      : ContentType === "text/html" && req.url.slice(-1) === "/"
      ? path.join(__dirname, "views", req.url, "index.html")
      : ContentType === "text/html"
      ? path.join(__dirname, "views", req.url)
      : path.join(__dirname, req.url);

  if (!extension && req.url.slice(-1) !== "/") filePath += ".html";

  const fileExist = fs.existsSync(filePath);

  if (fileExist) {
    // server file
    serveFile(filePath, ContentType, res);
  } else {
    // 404 04 301
    switch (path.parse(filePath).base) {
      case "old-page.html":
        res.writeHead(301, { location: "/newPage.html" });
        res.end();
        break;
      case "www-page.html":
        res.writeHead(301, { location: "/" });
        res.end();
        break;

      default:
        // 404
        serveFile(path.join(__dirname, "views", "404.html"), "text/html", res);
    }
  }
});

server.listen(PORT, () => console.log(`listening to port ${PORT}`));

console.log("server2");
