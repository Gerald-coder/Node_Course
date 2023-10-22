const allowedOrigins = require("./allowedOrigins");

const corsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(
        new Error(
          "gerry, you have got a cors error, you are requesting from a wrong location"
        )
      );
    }
  },
  optionsSucessStatus: 200,
};

module.exports = corsOptions;
