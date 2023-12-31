const express = require("express");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT || 3100;
const path = require("path");
const fsPromises = require("fs").promises;
const { logger } = require("./middleware/logEvent");
const cors = require("cors");
const errorHander = require("./middleware/errorLog");
const corsOptions = require("./config/corOption");
const veryftJwt = require("./middleware/verifyJWT");
const cookieParser = require("cookie-parser");
const credentials = require("./middleware/credentials");
const mongoose = require("mongoose");
const connectDB = require("./config/dbConn");

// conecting to db
connectDB();

// custom middleware
app.use(logger);

//ACESS CONTROL ALLOWED ORIGIN middleware
app.use(credentials);

// CROSS ORIGIN RESOURCE SHARING
app.use(cors(corsOptions));

// middleware for cookies
app.use(cookieParser());

// built in middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "/public")));
app.use("/subdir", express.static(path.join(__dirname, "/public")));

// routers
app.use("/", require("./routes/root"));
app.use("/subdir", require("./routes/subdir"));
app.use("/register", require("./routes/Users"));
app.use("/login", require("./routes/auth"));
app.use("/refresh", require("./routes/refresh"));
app.use("/logout", require("./routes/logout"));
app.use(veryftJwt);
app.use("/employees", require("./routes/api/employees"));
app.use("/users", require("./routes/api/usersAPI"));

// app.get(/a/, (req, res) => {
//   res.sendFile("Any.html");
// });

// ROUTE HANDLERS
// app.get(
//   "/example(.html)?",
//   (req, res, next) => {
//     console.log("this is a handle with the next"); //
//     next();
//   },
//   (req, res) => {
//     res.send("this is an example");
//     console.log("success with the example"); //
//   }
// );

// // CHAINING HANDLERS
// const one = (req, res, next) => {
//   console.log("first");
//   next();
// };
// const two = (req, res, next) => {
//   console.log("two");
//   next();
// };
// const three = (req, res, next) => {
//   console.log("three");
//   res.send("this is a trial on the combination of array and function ❤❤");
// };

// app.get(
//   "/chain(.html)?",
//   (req, res, next) => {
//     console.log("we tried  a marginary fourth one ");
//     next();
//   },
//   [one, two, three]
// );

app.all("*", (req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "views", "404.html"));
  } else if (req.accepts("json")) {
    res.json({ error: "gerry, 404 not found json" });
  } else {
    res.type("txt").send("404 on txt not found");
  }
});

app.use(errorHander);

mongoose.connection.once("open", () => {
  console.log("connection created");
  app.listen(PORT, () => console.log(`listening to PORT ${PORT}`));
});
