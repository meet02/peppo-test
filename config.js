"use strict";

const path = require("path");
const _ = require("underscore");
const fs = require("fs");
const admin = require("firebase-admin");

process.env.DZ_PORT = "9002";

module.exports = {
  appName: "Peppo",
  port: process.env.DZ_PORT,
  // baseUrl: "http://localhost:" + process.env.DZ_PORT,
  baseUrl: "http://3.22.15.207:9002",
};
