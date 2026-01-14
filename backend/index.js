const express = require('express')
require("dotenv").config()
const cors = require("cors")
var cookieParser = require('cookie-parser');

const app = express()
const port = process.env.PORT

// read req.body
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.use(cors({
  origin: process.env.FE_URL, 
  credentials: true               
}));    

app.use(cookieParser());

const routerApiVer1 = require("./api/v1/routes/index.route")

const database = require("./config/database");
database.connect();

routerApiVer1(app);



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
