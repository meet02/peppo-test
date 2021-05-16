const express = require("express");
const router = express.Router();
const commonFunction = require("../../utils/common-function");
const Joi = require("joi");
const jsonResponse = require("./../../utils/json-response");
const itemHandler = require("../../model_handlers/item-handlers");
const responseCodes = require("../../helpers/response-codes");
const errors = require("../../utils/dz-errors");
const _ = require("underscore");

router.post("/create-item", async (req, res) => {
  try {
    const { body, files } = req;

    let obj = {
      title: Joi.string().required(),
      description: Joi.string().required(),
      availableQuantity: Joi.number().required(),
      cushions: Joi.string().required(),
      ingredients: Joi.string().required(),
      itemCategoryId: Joi.string().required(),
      brand: Joi.string(),
    };
    let checkJoiValidationValidate = await commonFunction.checkJoiValidation(
      body,
      obj
    );
    let response = await itemHandler.creatItem(body, files);
    jsonResponse(res, responseCodes.OK, errors.noError(), response);
  } catch (error) {
    try {
      console.log("error", error);
      jsonResponse(res, error.code, errors.formatErrorForWire(error), null);
      return;
    } catch (error) {
      console.log("error", error);
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

router.put("/update-item", async (req, res) => {
  try {
    const { body, files } = req;

    let obj = {
      title: Joi.string().required(),
      description: Joi.string().required(),
      availableQuantity: Joi.number().required(),
      cushions: Joi.string().required(),
      ingredients: Joi.string().required(),
      itemCategoryId: Joi.string().required(),
      brand: Joi.string(),
      itemId: Joi.string().required(),
    };
    let checkJoiValidationValidate = await commonFunction.checkJoiValidation(
      body,
      obj
    );
    let response = await itemHandler.updateItem(body, files);
    jsonResponse(res, responseCodes.OK, errors.noError(), response);
  } catch (error) {
    try {
      console.log("error", error);
      jsonResponse(res, error.code, errors.formatErrorForWire(error), null);
      return;
    } catch (error) {
      console.log("error", error);
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

router.get("/get-item", async (req, res) => {
  try {
    let response = await itemHandler.getItem(req.query);
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

router.get("/get-active-item", async (req, res) => {
  try {
    let response = await itemHandler.getActiveItem();
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

router.put("/active-item", async (req, res) => {
  try {
    let response = await itemHandler.active(req.body);
    jsonResponse(res, responseCodes.OK, errors.noError(), response);
  } catch (error) {
    try {
      console.log("error", error);
      jsonResponse(res, error.code, errors.formatErrorForWire(error), null);
      return;
    } catch (error) {
      console.log("error", error);
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

router.put("/inactive-item", async (req, res) => {
  try {
    let response = await itemHandler.inactive(req.body);
    jsonResponse(res, responseCodes.OK, errors.noError(), response);
  } catch (error) {
    try {
      console.log("error", error);
      jsonResponse(res, error.code, errors.formatErrorForWire(error), null);
      return;
    } catch (error) {
      console.log("error", error);
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

router.put("/delete-item", async (req, res) => {
  try {
    let response = await itemHandler.deleteMethod(req.body);
    jsonResponse(res, responseCodes.OK, errors.noError(), response);
  } catch (error) {
    try {
      console.log("error", error);
      jsonResponse(res, error.code, errors.formatErrorForWire(error), null);
      return;
    } catch (error) {
      console.log("error", error);
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
