const { Schema, model } = require("mongoose");

const orderSchema = new Schema(
  {
    clientName: {
      type: String,
      required: true,
    },
    products: {
      type: Array,
      required: true,
    },
    checkout: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Orders = model("Orders", orderSchema);

module.exports = Orders;
