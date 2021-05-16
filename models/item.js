const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const idGenerator = require("./../utils/id-generator");
const labelConstants = require("./../constants/lable-constants");

const itemSchema = new Schema(
  {
    itemId: {
      type: "String",
      require: true,
    },
    title: {
      type: "String",
      default: "",
    },
    description: {
      type: "String",
      default: "",
    },
    availableQuantity: {
      type: "Number",
      default: 0,
    },
    cushions: {
      type: "String",
      default: "",
    },
    ingredients: {
      type: "String",
      default: "",
    },
    itemCategoryId: {
      type: "String",
      default: "",
    },
    brand: {
      type: "Array",
      default: [],
    },
    itemImage: {
      type: "String",
    },
    status: {
      type: "String",
      enum: ["active", "inactive"],
      default: "active",
    },
  },
  { timestamps: true }
);

itemSchema.pre("save", (callback) => {
  this.itemId = idGenerator.generateRandom(labelConstants.ITEM);
  callback();
});

const Item = mongoose.model("Item", itemSchema);
module.exports = { Item };
