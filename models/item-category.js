const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const idGenerator = require("./../utils/id-generator");
const labelConstants = require("./../constants/lable-constants");

const itemCategory = new Schema(
  {
    itemCategoryId: {
      type: "String",
      require: true,
    },
    title: {
      type: "String",
    },
    description: {
      type: "String",
    },
    brand: {
      type: "Array",
      default: [],
    },
    itemCategoryImage: {
      type: "String",
      default: "",
    },
    status: {
      type: "String",
      enum: ["active", "inactive"],
      default: "active",
    },
  },
  { timestamps: true }
);

itemCategory.pre("save", (callback) => {
  this.itemCategoryId = idGenerator.generateRandom(
    labelConstants.ITEM_CATEGORY
  );
  callback();
});

const ItemCategory = mongoose.model("ItemCategory", itemCategory);
module.exports = { ItemCategory };
