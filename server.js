const express = require("express");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT || 3100;
const path = require("path");

app.get("^/$|index(.html)?", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

app.get("/newPage(.html)?", (req, res) => {
  // res.sendFile("./views/newPage.html", { root: __dirname });
  res.sendFile(path.join(__dirname, "views", "newPage.html"));
});

app.get("/old-page(.html)?", (req, res) => {
  res.redirect(301, "newPage.html");
});

// app.get(/a/, (req, res) => {
//   res.sendFile("Any.html");
// });

// ROUTE HANDLERS
app.get(
  "/example(.html)?",
  (req, res, next) => {
    console.log("this is a handle with the next"); //
    next();
  },
  (req, res) => {
    res.send("this is an example");
    console.log("success with the example"); //
  }
);

// CHAINING HANDLERS
const one = (req, res, next) => {
  console.log("first");
  next();
};
const two = (req, res, next) => {
  console.log("two");
  next();
};
const three = (req, res, next) => {
  console.log("three");
  res.send("this is a trial on the combination of array and function ❤❤");
};

app.get(
  "/chain(.html)?",
  (req, res, next) => {
    console.log("we tried  a marginary fourth one ");
    next();
  },
  [one, two, three]
);

app.get("/*", (req, res) => {
  res.status(404).sendFile(path.join(__dirname, "views", "404.html"));
});

app.listen(PORT, () => console.log(`listening to PORT ${PORT}`));
