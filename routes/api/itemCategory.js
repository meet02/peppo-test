const express = require("express");
const router = express.Router();
const commonFunction = require("../../utils/common-function");
const Joi = require("joi");
const jsonResponse = require("./../../utils/json-response");
const itemCategoryHandler = require("../../model_handlers/item-category-handler");
const responseCodes = require("../../helpers/response-codes");
const errors = require("../../utils/dz-errors");
const _ = require("underscore");

router.post("/create-item-category", async (req, res) => {
  try {
    const { body, files } = req;

    let obj = {
      title: Joi.string().required(),
      description: Joi.string().required(),
      brand: Joi.string(),
    };
    let checkJoiValidationValidate = await commonFunction.checkJoiValidation(
      body,
      obj
    );
    let response = await itemCategoryHandler.creatItemCategory(body, files);
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

router.put("/update-item-category", async (req, res) => {
  try {
    const { body, files } = req;

    let obj = {
      title: Joi.string().required(),
      description: Joi.string().required(),
      itemCategoryId: Joi.string().required(),
      brand: Joi.string(),
    };
    let checkJoiValidationValidate = await commonFunction.checkJoiValidation(
      body,
      obj
    );
    let response = await itemCategoryHandler.updateItemCategory(body, files);
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

router.get("/get-item-category", async (req, res) => {
  try {
    let response = await itemCategoryHandler.getItemCategoryList(req.query);
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

router.get("/get-active-item-category", async (req, res) => {
  try {
    console.log("get");
    let response = await itemCategoryHandler.getActiveItemCategory();
    console.log("response", response);
    jsonResponse(res, responseCodes.OK, errors.noError(), response);
  } catch (error) {
    try {
      console.log(error);
      jsonResponse(res, error.code, errors.formatErrorForWire(error), null);
      return;
    } catch (error) {
      console.log(error);
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

router.put("/active-item-category", async (req, res) => {
  try {
    let response = await itemCategoryHandler.active(req.body);
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

router.put("/inactive-item-category", async (req, res) => {
  try {
    let response = await itemCategoryHandler.inactive(req.body);
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

router.put("/delete-item-category", async (req, res) => {
  try {
    let response = await itemCategoryHandler.deleteMethod(req.body);
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
