const mongoose = require("mongoose");
const DB_URL =
  "mongodb+srv://samyak786jain:rcALdz2hda8fL0OH@database-server.kykq2ld.mongodb.net/expense-tracker";

mongoose
  .connect(DB_URL)
  .then((res) => {
    console.log("databse connected");
  })
  .catch((err) => {
    console.log("error");
  });
