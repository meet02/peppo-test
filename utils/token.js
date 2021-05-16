const token = require("./jtw-token");
const errors = require("./dz-errors");
const jsonResponse = require("./json-response");

const authenticate = async (req, res, done) => {
  let code = await token.verifyToken({ token: token.fetchToken(req) });
  console.log("code", code);
  if (code == 200) {
    done(null, code);
  } else {
    //console.log('nope')
    badRequest(code, req, res, done);
  }
};

const badRequest = (code, req, res, done) => {
  if (code == 412) {
    let obj = {
      error: { name: "InvalidToken", message: "Token is invalid", code: 412 },
      payload: null,
      status: "412",
    };
    jsonResponse(
      res,
      obj.error.code,
      errors.formatErrorForWire(obj.error),
      null
    );
  }

  if (code == 509) {
    let obj = {
      error: { name: "NoAccess", message: "No access.", code: 509 },
      payload: null,
      status: "509",
    };
    jsonResponse(
      res,
      obj.error.code,
      errors.formatErrorForWire(obj.error),
      null
    );
  }
  if (code == 405) {
    let obj = {
      error: {
        name: "Access token or user id not found",
        message: "Access token or user id not found.",
        code: 404,
      },
      payload: null,
      status: "404",
    };
    jsonResponse(
      res,
      obj.error.code,
      errors.formatErrorForWire(obj.error),
      null
    );
  }
};

module.exports = {
  authenticate,
  badRequest,
};
