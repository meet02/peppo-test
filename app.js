"use strict";

//configurations
const path = require("path");
const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const logger = require("./utils/logger");
const jsonResponse = require("./utils/json-response");
const errors = require("./utils/dz-errors");
const cors = require("cors");

const dbConnection = require("./utils/db-connection");

//other configurations

const favicon = require("serve-favicon");
const multiparty = require("connect-multiparty");
const expressUpload = require("express-fileupload");

// App API route

const apiRoute = require("./routes/index");
const apiAdmin = require("./routes/api/adminUser");
const apiBrand = require("./routes/api/brand");
const apiItem = require("./routes/api/item");
const apiItemCategory = require("./routes/api/itemCategory");

//express configurations
const app = express();

const token = require("./utils/token");
app.use(favicon(path.join(__dirname, "./public/img", "favicon.png")));
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.json({ limit: "5000mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "5000mb" }));
app.use(cookieParser());

app.use(
  require("express-session")({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(cors());
app.use(expressUpload());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

app.use("/web", express.static(path.join(__dirname, "/web")));
app.get("/web/*", function (req, res) {
  res.sendFile(path.join(__dirname + "/web/admin/index.html"));
});

// JTW TOKEN VERIFICATION

var authToken = () => {
  return (req, res, next) => {
    // next()
    let url = req.url;
    console.log("url", url);
    if (req.query) {
      console.log(req.query);
      url = url.split("?")[0] || url;
    }
    if (req.url == "/login-admin-user") {
      next();
    } else {
      token.authenticate(req, res, (err, res) => {
        next();
      });
    }
  };
};

app.use("/api", apiRoute);
app.use("/api/admin", authToken(), apiAdmin);
app.use("/api/brand", authToken(), apiBrand);
app.use("/api/item-category", authToken(), apiItemCategory);
app.use("/api/item", authToken(), apiItem);

var swaggerUi = require("swagger-ui-express"),
  swaggerDocument = require("./swagger.json");

app.use("/api-swagger", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

app.use((req, res) => {
  logger("Error: No route found or Wrong method name");
  // res.send(jsonResponse(req, res, errors.resourceNotFound(true), null))
});

module.exports = app;
