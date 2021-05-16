const express = require("express");
const router = express.Router();
const commonFunction = require("../../utils/common-function");
const Joi = require("joi");
const jsonResponse = require("./../../utils/json-response");
const brandHandler = require("../../model_handlers/brand-handler");
const responseCodes = require("../../helpers/response-codes");
const errors = require("../../utils/dz-errors");
const _ = require("underscore");

router.post("/create-brand", async (req, res) => {
  try {
    const { body, files } = req;

    let obj = {
      title: Joi.string().required(),
      description: Joi.string().required(),
    };
    let checkJoiValidationValidate = await commonFunction.checkJoiValidation(
      body,
      obj
    );
    let response = await brandHandler.creatBrand(body, files);
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

router.put("/update-brand", async (req, res) => {
  try {
    const { body, files } = req;

    let obj = {
      title: Joi.string().required(),
      description: Joi.string().required(),
      brandId: Joi.string().required(),
    };
    let checkJoiValidationValidate = await commonFunction.checkJoiValidation(
      body,
      obj
    );
    let response = await brandHandler.updateBrand(body, files);
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

router.get("/get-brand", async (req, res) => {
  try {
    let response = await brandHandler.getBrandList(req.query);
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

router.get("/admin/get-brand", async (req, res) => {
  try {
    let response = await brandHandler.getBrandAdminList();
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

router.get("/get-brand-list-by-category", async (req, res) => {
  try {
    let response = await brandHandler.getBrandAdminListByCategory(req.query);
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

router.put("/active-brand", async (req, res) => {
  try {
    let response = await brandHandler.activeBrand(req.body);
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

router.put("/inactive-brand", async (req, res) => {
  try {
    let response = await brandHandler.inactiveBrand(req.body);
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

router.put("/delete-brand", async (req, res) => {
  try {
    let response = await brandHandler.deleteBrand(req.body);
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
