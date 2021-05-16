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
const itemCategory = require("./../models/item-category");

const creatItemCategory = (body, files) => {
  return new Promise(async (resolve, reject) => {
    try {
      let Photo = "";
      if (!_.isEmpty(files) && files["itemCategoryImage"]) {
        let fileName = files.itemCategoryImage.name;
        let str = fileName.split(".");
        if (
          str[1].toLowerCase() == "png" ||
          str[1].toLowerCase() == "JPG" ||
          str[1].toLowerCase() == "jpg" ||
          str[1].toLowerCase() == "jpeg"
        ) {
          let updatedFileName =
            "itemCategoryImage_" + generateRandomString() + "." + str.pop();
          Photo = updatedFileName;

          let filePath =
            imagePathConstant.ITEM_CATEGORY_IMAGE + updatedFileName;

          fs.writeFile(
            filePath,
            files.itemCategoryImage.data,
            async function (data, err) {
              if (err) {
                reject(err);
                return;
              }
              Photo = updatedFileName;

              let insertObj = {
                itemCategoryId: idGenerator.generateRandom(
                  labelConstants.ITEM_CATEGORY
                ),
                title: body.title,
                description: body.description,
                itemCategoryImage: Photo,
                brand: body.brand.split(",") || [],
              };

              let insertDocumnet = await query.insertSingle(
                dbConstant.dbSchema.itemCategories,
                insertObj
              );
              resolve("Item Category Added Successfully");
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
            "Please Upload Item Cateogry Photo",
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

const updateItemCategory = (body, files) => {
  return new Promise(async (resolve, reject) => {
    try {
      let itemCategoryImage = "";

      let updateColum = {};

      if (!_.isEmpty(body.title)) {
        updateColum["title"] = body.title;
      }
      if (!_.isEmpty(body.description)) {
        updateColum["description"] = body.description;
      }

      if (!_.isEmpty(body.brand)) {
        updateColum["brand"] = body.brand.split(",") || [];
      }

      if (!_.isEmpty(files) && files["itemCategoryImage"]) {
        let fileName = files.itemCategoryImage.name;
        let str = fileName.split(".");
        if (
          str[1].toLowerCase() == "png" ||
          str[1].toLowerCase() == "JPG" ||
          str[1].toLowerCase() == "jpg" ||
          str[1].toLowerCase() == "jpeg"
        ) {
          let updatedFileName =
            "itemCategoryImage_" + generateRandomString() + "." + str.pop();
          itemCategoryImage = updatedFileName;

          let filePath =
            imagePathConstant.ITEM_CATEGORY_IMAGE + updatedFileName;

          fs.writeFile(
            filePath,
            files.itemCategoryImage.data,
            async function (data, err) {
              if (err) {
                console.log(err);
                reject(err);
                return;
              }
              itemCategoryImage = updatedFileName;
              if (!_.isEmpty(itemCategoryImage)) {
                updateColum["itemCategoryImage"] = itemCategoryImage;
              }

              let update = await query.updateSinglWithUpdateRecodePromise(
                dbConstant.dbSchema.itemCategories,
                updateColum,
                {
                  itemCategoryId: body.itemCategoryId,
                },
                {}
              );

              if (!update) {
                reject(errors.customError("Not Found", 404, "NOT_FOUND", true));
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
        let update = await query.updateSinglWithUpdateRecodePromise(
          dbConstant.dbSchema.itemCategories,
          updateColum,
          {
            itemCategoryId: body.itemCategoryId,
          },
          {}
        );

        if (!update) {
          reject(
            errors.customError(
              "Item category Not Found",
              404,
              "ITEM_CATEOGRY_NOT_FOUND",
              true
            )
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

const getItemCategoryList = (queryParams) => {
  return new Promise(async (resolve, reject) => {
    try {
      let matchColumn = {};
      if (!_.isEmpty(queryParams.itemCategoryId)) {
        matchColumn["itemCategoryId"] = queryParams.itemCategoryId;
      }
      let getList = await query.selectWithAnd(
        dbConstant.dbSchema.itemCategories,
        matchColumn,
        {},
        { created_at: -1 }
      );
      for (let x in getList) {
        getList[
          x
        ].itemCategoryImage = `${config.baseUrl}${imagePathConstant.ITEM_CATEGORY_IMAGE_URL}${getList[x].itemCategoryImage}`;
      }
      resolve(getList);
      return;
    } catch (err) {
      reject(err);
      return;
    }
  });
};

const active = (body) => {
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
        dbConstant.dbSchema.itemCategories,
        {
          status: "active",
        },
        {
          itemCategoryId: { $in: body.ids },
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

const inactive = (body) => {
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
        dbConstant.dbSchema.itemCategories,
        {
          status: "inactive",
        },
        {
          itemCategoryId: { $in: body.ids },
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

const deleteMethod = (body) => {
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
      let DeleteData = await query.removeMultiple(
        dbConstant.dbSchema.itemCategories,
        {
          itemCategoryId: {
            $in: body.ids,
          },
        }
      );

      resolve("Data Deleted Successfully");
      return;
    } catch (err) {
      reject(err);
      return;
    }
  });
};

const getActiveItemCategory = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let matchColumn = {
        status: "active",
      };

      let getList = await query.selectWithAnd(
        dbConstant.dbSchema.itemCategories,
        matchColumn,
        { _id: 0, itemCategoryId: 1, title: 1 },
        { created_at: -1 }
      );
      console.log("getList", getList);
      resolve(getList);
      return;
    } catch (err) {
      console.log(err);
      reject(err);
      return;
    }
  });
};

module.exports = {
  creatItemCategory,
  updateItemCategory,
  getItemCategoryList,
  active,
  inactive,
  deleteMethod,
  getActiveItemCategory,
};
