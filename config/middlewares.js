const bodyParser = require("body-parser");
const cors = require("cors");

module.exports = (app) => {
  app.use(bodyParser.json({ limit: "50mb", extended: true }));
  app.use(
    bodyParser.urlencoded({
      parameterLimit: 100000,
      limit: "50mb",
      extended: true,
    })
  );
  app.use(cors());
};
