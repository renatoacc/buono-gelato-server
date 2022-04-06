const { Schema, model } = require("mongoose");

const orderSchema = new Schema(
  {
    number: {
      type: Number,
      required: true,
    },
    products: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
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
