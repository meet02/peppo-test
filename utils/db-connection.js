const mongoose = require("mongoose");
const func = require("../function");
let confi = require("../config");

let liveDbUrl =
  "mongodb://doodle:J4nU6Q2vzDTu4gM4@cluster0-shard-00-00.yttgz.mongodb.net:27017,cluster0-shard-00-01.yttgz.mongodb.net:27017,cluster0-shard-00-02.yttgz.mongodb.net:27017/peppo?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority";
let localDbUrl = "mongodb://localhost:27017/peppo";

mongoose
  .connect(liveDbUrl, {
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
    console.log(error);
    func.printLog(func.logCons.LOG_LEVEL_ERROR, JSON.stringify(error));
  });

const dbConnection = mongoose.connection;
