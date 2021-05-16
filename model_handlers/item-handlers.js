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

const Item = require("../models/item");

const creatItem = (body, files) => {
  return new Promise(async (resolve, reject) => {
    try {
      let Photo = "";
      if (!_.isEmpty(files) && files["itemImage"]) {
        let fileName = files.itemImage.name;
        let str = fileName.split(".");
        if (
          str[1].toLowerCase() == "png" ||
          str[1].toLowerCase() == "JPG" ||
          str[1].toLowerCase() == "jpg" ||
          str[1].toLowerCase() == "jpeg"
        ) {
          let updatedFileName =
            "itemImage_" + generateRandomString() + "." + str.pop();
          Photo = updatedFileName;

          let filePath = imagePathConstant.ITEM_IMAGE + updatedFileName;

          fs.writeFile(
            filePath,
            files.itemImage.data,
            async function (data, err) {
              if (err) {
                reject(err);
                return;
              }
              Photo = updatedFileName;

              let insertObj = {
                itemId: idGenerator.generateRandom(labelConstants.ITEM),
                title: body.title,
                description: body.description,
                availableQuantity: body.availableQuantity || 0,
                cushions: body.cushions || "",
                ingredients: body.ingredients || "",
                itemCategoryId: body.itemCategoryId || "",
                itemImage: Photo,
                brand: body.brand.split(",") || [],
              };

              let insertDocumnet = await query.insertSingle(
                dbConstant.dbSchema.items,
                insertObj
              );
              resolve("Item Added Successfully");
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

const updateItem = (body, files) => {
  return new Promise(async (resolve, reject) => {
    try {
      let itemImage = "";

      let updateColum = {};

      if (!_.isEmpty(body.title)) {
        updateColum["title"] = body.title;
      }
      if (!_.isEmpty(body.description)) {
        updateColum["description"] = body.description;
      }
      if (!_.isEmpty(body.availableQuantity)) {
        updateColum["availableQuantity"] = body.availableQuantity;
      }
      if (!_.isEmpty(body.cushions)) {
        updateColum["cushions"] = body.cushions;
      }
      if (!_.isEmpty(body.ingredients)) {
        updateColum["ingredients"] = body.ingredients;
      }
      if (!_.isEmpty(body.itemCategoryId)) {
        updateColum["itemCategoryId"] = body.itemCategoryId;
      }

      if (!_.isEmpty(body.brand)) {
        updateColum["brand"] = body.brand.split(",") || [];
      }

      if (!_.isEmpty(files) && files["itemImage"]) {
        let fileName = files.itemImage.name;
        let str = fileName.split(".");
        if (
          str[1].toLowerCase() == "png" ||
          str[1].toLowerCase() == "JPG" ||
          str[1].toLowerCase() == "jpg" ||
          str[1].toLowerCase() == "jpeg"
        ) {
          let updatedFileName =
            "itemImage_" + generateRandomString() + "." + str.pop();
          itemImage = updatedFileName;

          let filePath =
            imagePathConstant.ITEM_CATEGORY_IMAGE + updatedFileName;

          fs.writeFile(
            filePath,
            files.itemImage.data,
            async function (data, err) {
              if (err) {
                console.log(err);
                reject(err);
                return;
              }
              itemImage = updatedFileName;
              if (!_.isEmpty(itemImage)) {
                updateColum["itemImage"] = itemImage;
              }

              let update = await query.updateSinglWithUpdateRecodePromise(
                dbConstant.dbSchema.items,
                updateColum,
                {
                  itemId: body.itemId,
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
          dbConstant.dbSchema.items,
          updateColum,
          {
            itemId: body.itemId,
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

const getItem = (queryParams) => {
  return new Promise(async (resolve, reject) => {
    try {
      let matchColumn = {};
      if (!_.isEmpty(queryParams.itemId)) {
        matchColumn["itemId"] = queryParams.itemId;
      }
      let getList = await query.selectWithAnd(
        dbConstant.dbSchema.items,
        matchColumn,
        {},
        { created_at: -1 }
      );
      for (let x in getList) {
        getList[
          x
        ].itemImage = `${config.baseUrl}${imagePathConstant.ITEM_IMAGE_URL}${getList[x].itemImage}`;
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
        dbConstant.dbSchema.items,
        {
          status: "active",
        },
        {
          itemId: { $in: body.ids },
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
        dbConstant.dbSchema.items,
        {
          status: "inactive",
        },
        {
          itemId: { $in: body.ids },
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
      let DeleteData = await query.removeMultiple(dbConstant.dbSchema.items, {
        itemId: {
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

const getActiveItem = () => {
  return new Promise(async (resolve, reject) => {
    try {
      console.log("call");
      let matchColumn = {
        status: "active",
      };

      let getList = await query.selectWithAnd(
        dbConstant.dbSchema.items,
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
  creatItem,
  updateItem,
  getItem,
  active,
  inactive,
  deleteMethod,
  getActiveItem,
};
