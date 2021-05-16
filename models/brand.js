const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const idGenerator = require("./../utils/id-generator");
const labelConstants = require("./../constants/lable-constants");

const brandSchema = new Schema(
  {
    brandId: {
      type: "String",
      require: true,
    },
    title: {
      type: "String",
    },
    description: {
      type: "String",
    },
    brandImage: {
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

brandSchema.pre("save", (callback) => {
  this.brandId = idGenerator.generateRandom(labelConstants.BRAND);
  callback();
});

const Brand = mongoose.model("Brand", brandSchema);
module.exports = { Brand };
