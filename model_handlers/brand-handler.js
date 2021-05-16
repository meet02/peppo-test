const errors = require("./../utils/dz-errors");
const _ = require("underscore");
const { generateRandomString } = require("./../utils/random-string-generator");
const imagePathConstant = require("./../constants/image-path-constants");
const fs = require("fs");
const query = require("./../utils/query-creator-api");
const dbConstant = require("./../constants/db-constants");
const idGenerator = require("./../utils/id-generator");
const labelConstants = require("./../constants/lable-constants");
const passwordHandler = require("./../utils/password-handler");
const Brand = require("./../models/brand");
const config = require("./../config");
const jwtToken = require("./../utils/jtw-token");

const creatBrand = (body, files) => {
  return new Promise(async (resolve, reject) => {
    try {
      let Photo = "";
      if (!_.isEmpty(files) && files["brandImage"]) {
        let fileName = files.brandImage.name;
        let str = fileName.split(".");
        if (
          str[1].toLowerCase() == "png" ||
          str[1].toLowerCase() == "JPG" ||
          str[1].toLowerCase() == "jpg" ||
          str[1].toLowerCase() == "jpeg"
        ) {
          let updatedFileName =
            "brandImage_" + generateRandomString() + "." + str.pop();
          Photo = updatedFileName;

          let filePath = imagePathConstant.BRAND_IMAGE + updatedFileName;

          fs.writeFile(
            filePath,
            files.brandImage.data,
            async function (data, err) {
              if (err) {
                reject(err);
                return;
              }
              Photo = updatedFileName;

              let insertObj = {
                brandId: idGenerator.generateRandom(labelConstants.BRAND),
                title: body.title,
                description: body.description,
                brandImage: Photo,
              };

              let insertDocumnet = await query.insertSingle(
                dbConstant.dbSchema.brands,
                insertObj
              );
              resolve("Brand Added Successfully");
              return;
            }
          );
        } else {
          reject(
            errors.customError(
              "wrong image type, we only allow png,JPG,jpg,jpeg",
              401,
              "WorngType",
              true
            )
          );
          return;
        }
      } else {
        reject(
          errors.customError(
            "Please Upload Brand Photo",
            404,
            "MISSING_PROFILE_PHOTO"
          ),
          true
        );
        return;
      }
    } catch (err) {
      reject(err);
      return;
    }
  });
};

const updateBrand = (body, files) => {
  return new Promise(async (resolve, reject) => {
    try {
      let brandImage = "";

      let updateColum = {};

      if (!_.isEmpty(body.title)) {
        updateColum["title"] = body.title;
      }
      if (!_.isEmpty(body.description)) {
        updateColum["description"] = body.description;
      }

      if (!_.isEmpty(files) && files["brandImage"]) {
        let fileName = files.brandImage.name;
        let str = fileName.split(".");
        if (
          str[1].toLowerCase() == "png" ||
          str[1].toLowerCase() == "JPG" ||
          str[1].toLowerCase() == "jpg" ||
          str[1].toLowerCase() == "jpeg"
        ) {
          let updatedFileName =
            "brandImage_" + generateRandomString() + "." + str.pop();
          brandImage = updatedFileName;

          let filePath = imagePathConstant.BRAND_IMAGE + updatedFileName;

          fs.writeFile(
            filePath,
            files.brandImage.data,
            async function (data, err) {
              if (err) {
                console.log(err);
                reject(err);
                return;
              }
              brandImage = updatedFileName;
              if (!_.isEmpty(brandImage)) {
                updateColum["brandImage"] = brandImage;
              }

              let updateUser = await query.updateSinglWithUpdateRecodePromise(
                dbConstant.dbSchema.brands,
                updateColum,
                {
                  brandId: body.brandId,
                },
                {}
              );

              if (!updateUser) {
                reject(
                  errors.customError(
                    "User Not Found",
                    404,
                    "USER_NOT_FOUND",
                    true
                  )
                );
                return;
              }

              resolve("Data Updated Successfully");
              return;
            }
          );
        } else {
          reject(
            errors.customError(
              "wrong image type, we only allow png,JPG,jpg,jpeg",
              401,
              "WorngType",
              true
            )
          );
          return;
        }
      } else {
        let updateUser = await query.updateSinglWithUpdateRecodePromise(
          dbConstant.dbSchema.brands,
          updateColum,
          {
            brandId: body.brandId,
          },
          {}
        );

        if (!updateUser) {
          reject(
            errors.customError("Brand Not Found", 404, "BRAND_NOT_FOUND", true)
          );
          return;
        }

        resolve("Data Updated Successfully");
        return;
      }
    } catch (err) {
      reject(err);
      return;
    }
  });
};

const getBrandList = (queryParams) => {
  return new Promise(async (resolve, reject) => {
    try {
      let matchColumn = {};
      if (!_.isEmpty(queryParams.brandId)) {
        matchColumn["brandId"] = queryParams.brandId;
      }
      let getList = await query.selectWithAnd(
        dbConstant.dbSchema.brands,
        matchColumn,
        {},
        { created_at: -1 }
      );
      for (let x in getList) {
        getList[
          x
        ].brandImage = `${config.baseUrl}${imagePathConstant.BRAND_IMAGE_URL}${getList[x].brandImage}`;
      }
      resolve(getList);
      return;
    } catch (err) {
      reject(err);
      return;
    }
  });
};

const activeBrand = (body) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (_.isEmpty(body.ids)) {
        reject(
          errors.customError(
            "Please Select At Least one Ids",
            404,
            "ID NOT FOUND",
            true
          )
        );
        return;
      }

      body.ids = body.ids.split(",");

      let updateUser = await query.updateMultiple(
        dbConstant.dbSchema.brands,
        {
          status: "active",
        },
        {
          brandId: { $in: body.ids },
        }
      );

      resolve("Data Updated Successfully");
      return;
    } catch (err) {
      reject(err);
      return;
    }
  });
};

const inactiveBrand = (body) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (_.isEmpty(body.ids)) {
        reject(
          errors.customError(
            "Please Select At Least one Ids",
            404,
            "ID NOT FOUND",
            true
          )
        );
        return;
      }

      body.ids = body.ids.split(",");

      let updateAdmin = await query.updateMultiple(
        dbConstant.dbSchema.brands,
        {
          status: "inactive",
        },
        {
          brandId: { $in: body.ids },
        }
      );

      resolve("Data Updated Successfully");
      return;
    } catch (err) {
      reject(err);
      return;
    }
  });
};

const deleteBrand = (body) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (_.isEmpty(body.ids)) {
        reject(
          errors.customError(
            "Please Select At Least one Ids",
            404,
            "ID NOT FOUND",
            true
          )
        );
        return;
      }

      body.ids = body.ids.split(",");
      console.log("body.ids", body.ids);
      let DeleteData = await query.removeMultiple(dbConstant.dbSchema.brands, {
        brandId: {
          $in: body.ids,
        },
      });

      resolve("Data Deleted Successfully");
      return;
    } catch (err) {
      reject(err);
      return;
    }
  });
};

const getBrandAdminList = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let matchColumn = { status: "active" };

      let getList = await query.selectWithAnd(
        dbConstant.dbSchema.brands,
        matchColumn,
        {},
        { created_at: -1 }
      );
      for (let x in getList) {
        getList[
          x
        ].brandImage = `${config.baseUrl}${imagePathConstant.BRAND_IMAGE_URL}${getList[x].brandImage}`;
      }
      resolve(getList);
      return;
    } catch (err) {
      reject(err);
      return;
    }
  });
};

const getBrandAdminListByCategory = (queryParams) => {
  return new Promise(async (resolve, reject) => {
    try {
      let getCateogry = await query.selectWithAndOne(
        dbConstant.dbSchema.itemCategories,
        { itemCategoryId: queryParams.itemCategoryId },
        {}
      );
      if (!getCateogry) {
        reject(errors.resourceNotFound(true));
        return;
      }
      let brandIdList = [];
      for (let x of getCateogry.brand) {
        brandIdList.push(x[0]);
      }
      console.log(brandIdList);

      let matchColumn = {
        status: "active",
        brandId: { $in: brandIdList },
      };

      let getList = await query.selectWithAnd(
        dbConstant.dbSchema.brands,
        matchColumn,
        {},
        { created_at: -1 }
      );
      for (let x in getList) {
        getList[
          x
        ].brandImage = `${config.baseUrl}${imagePathConstant.BRAND_IMAGE_URL}${getList[x].brandImage}`;
      }
      resolve(getList);
      return;
    } catch (err) {
      reject(err);
      return;
    }
  });
};

module.exports = {
  creatBrand,
  updateBrand,
  getBrandList,
  activeBrand,
  inactiveBrand,
  deleteBrand,
  getBrandAdminList,
  getBrandAdminListByCategory,
};
