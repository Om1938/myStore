const { ObjectId } = require("mongodb");
const db = require("../../config/db");
const throwError = require("../../helper/throwError");

module.exports.get = async (email) => {
  const dbo = await db;
  const Cart = dbo.collection("cart");

  let result = await Cart.aggregate([
    {
      $match: {
        email,
      },
    },
    {
      $unwind: "$cart",
    },
    {
      $lookup: {
        from: "product",
        localField: "cart.productId",
        foreignField: "_id",
        as: "product",
      },
    },
    {
      $unwind: "$product",
    },
    {
      $project: {
        _id: 0,
        "cart.Quantity": 1,
        "product.name": 1,
        "product.price": 1,
        "product.image": 1,
      },
    },
  ]).toArray();

  console.log(result);
  return result.map((res) => {
    return {
      quantity: res.cart.Quantity,
      ...res.product,
    };
  });
};
module.exports.addProduct = async (email, { productId }) => {
  const dbo = await db;
  const Cart = dbo.collection("cart");

  let result = await Cart.findOne({ email });

  return result;
};
