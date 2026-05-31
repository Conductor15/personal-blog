const express = require("express");
require("dotenv").config();
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();
const port = process.env.PORT || 8000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
  origin: true,
  credentials: true,
}));

app.use(cookieParser());

const routerApiVer1 = require("./api/v1/routes/index.route");

const database = require("./config/database");
database.connect();

routerApiVer1(app);

app.get("/", (req, res) => {
  res.json({
    message: "Personal Blog API is running",
  });
});

if (require.main === module) {
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
}

module.exports = app;