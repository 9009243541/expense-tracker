const express = require("express");

const bodyParser = require("body-parser");
const App = express();
require("./database");
App.use(bodyParser.json());
const router = require("./api/route");
App.use("/", router);

module.exports = App;
