const jwt = require("jsonwebtoken");
require("dotenv").config();

const fetchToken = (req) => {
  if (
    !req.headers["authorization"] ||
    !(req.headers["authorization"] && req.headers["x-api-key"])
  ) {
    let objt = {
      code: 404,
    };
    return objt;
  }
  let token = req.headers["x-access-token"] || req.headers["authorization"];
  let userId = req.headers["x-api-key"];

  if (token && token.startsWith("Bearer ")) {
    token = token.slice(7, token.length);
  }
  let obj = {
    token: token,
    userId: userId,
  };

  return obj;
};

const verifyToken = (requestParam) => {
  return new Promise(async (resolve, reject) => {
    if (requestParam.token.code) {
      resolve(405);
    } else if (requestParam.token.token) {
      jwt.verify(
        requestParam.token.token,
        process.env.ACCESS_TOKEN_SECRET,
        async (error, decoded) => {
          if (error) {
            if (error.name == "TokenExpiredError") {
              resolve(412);
              return;
            }
            if (error.name == "JsonWebTokenError") {
              resolve(509);
              return;
            }
          }

          if (
            decoded.id == requestParam.token.userId ||
            decoded.id == config.ADMIN_ID
          ) {
            resolve(200);
            return;
          } else {
            resolve(509);
            return;
          }
        }
      );
    } else {
      resolve(509);
    }
  });
};

const generateToken = (requestParam) => {
  expireTime = "8h";
  let token = jwt.sign(
    {
      id: requestParam.user_id,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      /*expiresIn: '1h',*/
      expiresIn: expireTime,
    }
  );

  return token;
};

const verifyAuthToken = async (req, res, next) => {
  let tokenCode = await verifyToken({
    token: fetchToken(req),
  });

  if (tokenCode == "200") {
    next();
  } else {
    let token = jwt.sign(
      {
        id: req.body.user_id,
      },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "1h",
      }
    );
    let json = {
      error: {
        access_token: token,
        message: "Invalid Token",
        code: 501,
      },
      payload: null,
      status: "501",
    };
    res.json(json);
  }
};

module.exports = {
  fetchToken,
  verifyToken,
  generateToken,
  verifyAuthToken,
};
