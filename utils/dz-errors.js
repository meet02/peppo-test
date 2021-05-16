"use strict";

const _ = require("underscore");
const responseCodes = require("./../helpers/response-codes");

function DZError(message, code, name = "DZError") {
  this.name = name;
  this.message = message || "Default Message";
  this.code = code;
  this.stack = new Error().stack;
}

DZError.prototype = Object.create(Error.prototype);
DZError.prototype.constructor = DZError;

module.exports = {
  // Validation Error
  validationError: function (formatForWire, msg, errorName, language) {
    msg = msg.replace(/['"]+/g, "");
    console.log("msg", msg);
    const error = new DZError(msg, responseCodes.Invalid, errorName);
    return formatForWire ? this.formatErrorForWire(error) : error;
  },

  missingParameter: function (formatForWire) {
    const error = new DZError(
      "There are one or more parameters missing in the supplied request",
      responseCodes.BadRequest,
      "MissingParameter"
    );
    return formatForWire ? this.formatErrorForWire(error) : error;
  },
  internalServer: function (formatForWire) {
    const error = new DZError(
      "Internal server error",
      responseCodes.InternalServer,
      "InternalServerError"
    );
    return formatForWire ? this.formatErrorForWire(error) : error;
  },
  resourceNotFound: function (formatForWire) {
    const error = new DZError(
      "Resource Not Found",
      responseCodes.ResourceNotFound,
      "ResourceNotFound"
    );
    return formatForWire ? this.formatErrorForWire(error) : error;
  },
  unauthorizedAccess: function (formatForWire) {
    const error = new DZError(
      "Unauthorized access to resource",
      responseCodes.Unauthorized,
      "UnauthorizedAccess"
    );
    return formatForWire ? this.formatErrorForWire(error) : error;
  },

  noError: function () {
    return null;
  },
  errorWithMessage: function (error) {
    return new DZError(_.has(error, "message") ? error.message : "");
  },
  formatErrorForWire: function (DZError) {
    return _.omit(DZError, "stack");
  },
  customError: function (message, code, name, formatForWire) {
    const error = new DZError(message, code, name);
    return formatForWire ? this.formatErrorForWire(error) : error;
  },
};
