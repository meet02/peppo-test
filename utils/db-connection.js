const mongoose = require("mongoose");
const func = require("../function");
let confi = require("../config");

let liveDbUrl ="";
let localDbUrl = "mongodb://localhost:27017/peppo";

mongoose
  .connect(localDbUrl, {
    useNewUrlParser: true,
  })
  .then((result) => {
    func.printLog(
      func.logCons.LOG_LEVEL_INFO,
      "Database connected successfully",
      func.logCons.LOG_ENTER
    );
  })
  .catch((error) => {
    func.printLog(func.logCons.LOG_LEVEL_ERROR, JSON.stringify(error));
  });

const dbConnection = mongoose.connection;
