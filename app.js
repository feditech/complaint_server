require("dotenv").config({ path: "./src/config/.env" });
const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
require("./src/database/db")();
const router = require("./src/routes/router");
const errorHandler = require("./src/middlewares/errorHandler");

const app = express();

app.use(cors({ credentials: true, origin: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//root api
app.use("/api", router);

//handle all error
app.use(errorHandler);

//create a Server
const port = process.env.PORT || 8080;
const host = process.env.HOST;
app.listen(port, () =>
  console.log(`Server is Running on http://${host}${port}`)
);
