const express = require("express");
const router = express.Router();
const commonFunction = require("../../utils/common-function");
const Joi = require("joi");
const jsonResponse = require("./../../utils/json-response");
const adminUserHandler = require("../../model_handlers/adminUser-handler");
const responseCodes = require("../../helpers/response-codes");
const errors = require("../../utils/dz-errors");
const _ = require("underscore");

router.post("/create-admin-user", async (req, res) => {
  try {
    const { body, files } = req;

    let obj = {
      userName: Joi.string().required(),
      email: Joi.string().required(),
      password: Joi.string().required(),
    };
    let checkJoiValidationValidate = await commonFunction.checkJoiValidation(
      body,
      obj
    );
    let response = await adminUserHandler.creatAdminUser(body, files);
    jsonResponse(res, responseCodes.OK, errors.noError(), response);
  } catch (error) {
    try {
      jsonResponse(res, error.code, errors.formatErrorForWire(error), null);
      return;
    } catch (error) {
      jsonResponse(
        res,
        responseCodes.BadRequest,
        errors.internalServer(true),
        null
      );
      return;
    }
  }
});

router.post("/login-admin-user", async (req, res) => {
  try {
    const { body } = req;

    let obj = {
      userName: Joi.string().required(),
      password: Joi.string().required(),
    };
    let checkJoiValidationValidate = await commonFunction.checkJoiValidation(
      body,
      obj
    );
    let response = await adminUserHandler.loginUserName(body);
    jsonResponse(res, responseCodes.OK, errors.noError(), response);
  } catch (error) {
    try {
      jsonResponse(res, error.code, errors.formatErrorForWire(error), null);
      return;
    } catch (error) {
      jsonResponse(
        res,
        responseCodes.BadRequest,
        errors.internalServer(true),
        null
      );
      return;
    }
  }
});

router.put("/update-admin-user", async (req, res) => {
  try {
    const { body, files } = req;

    let obj = {
      userName: Joi.string().required(),
      email: Joi.string().required(),
      password: Joi.string(),
      userId: Joi.string().required(),
    };
    let checkJoiValidationValidate = await commonFunction.checkJoiValidation(
      body,
      obj
    );
    let response = await adminUserHandler.updateAdminUser(body, files);
    jsonResponse(res, responseCodes.OK, errors.noError(), response);
  } catch (error) {
    try {
      jsonResponse(res, error.code, errors.formatErrorForWire(error), null);
      return;
    } catch (error) {
      jsonResponse(
        res,
        responseCodes.BadRequest,
        errors.internalServer(true),
        null
      );
      return;
    }
  }
});

router.get("/get-admin-user", async (req, res) => {
  try {
    let response = await adminUserHandler.getAdminUser(req.query);
    jsonResponse(res, responseCodes.OK, errors.noError(), response);
  } catch (error) {
    try {
      jsonResponse(res, error.code, errors.formatErrorForWire(error), null);
      return;
    } catch (error) {
      jsonResponse(
        res,
        responseCodes.BadRequest,
        errors.internalServer(true),
        null
      );
      return;
    }
  }
});

router.put("/active-admin-user", async (req, res) => {
  try {
    let response = await adminUserHandler.activeAdminUser(req.body);
    jsonResponse(res, responseCodes.OK, errors.noError(), response);
  } catch (error) {
    try {
      jsonResponse(res, error.code, errors.formatErrorForWire(error), null);
      return;
    } catch (error) {
      jsonResponse(
        res,
        responseCodes.BadRequest,
        errors.internalServer(true),
        null
      );
      return;
    }
  }
});

router.put("/inactive-admin-user", async (req, res) => {
  try {
    let response = await adminUserHandler.inactiveAdminUser(req.body);
    jsonResponse(res, responseCodes.OK, errors.noError(), response);
  } catch (error) {
    try {
      jsonResponse(res, error.code, errors.formatErrorForWire(error), null);
      return;
    } catch (error) {
      jsonResponse(
        res,
        responseCodes.BadRequest,
        errors.internalServer(true),
        null
      );
      return;
    }
  }
});

router.put("/delete-admin-user", async (req, res) => {
  try {
    let response = await adminUserHandler.deleteAdminUser(req.body);
    jsonResponse(res, responseCodes.OK, errors.noError(), response);
  } catch (error) {
    try {
      jsonResponse(res, error.code, errors.formatErrorForWire(error), null);
      return;
    } catch (error) {
      jsonResponse(
        res,
        responseCodes.BadRequest,
        errors.internalServer(true),
        null
      );
      return;
    }
  }
});

module.exports = router;
