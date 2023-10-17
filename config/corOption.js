const whiteList = [
  "www.mysite.com",
  "http://localhost:3400",
  "http://localhost:5173",
  "http://127.0.0.1:5500",
  "https://www.google.com",
];
const corsOptions = {
  origin: (origin, callback) => {
    if (whiteList.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("gerry, you have got a cors error"));
    }
  },
  optionsSucessStatus: 200,
};

module.exports = corsOptions;
