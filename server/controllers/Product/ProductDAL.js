const { ObjectId } = require("mongodb");
const db = require("../../config/db");
const { throwError } = require("../../helper/throwError");

module.exports.getAll = async () => {
  const dbo = await db;
  const Products = dbo.collection("product");

  let res = Products.find({}).toArray();

  return res;
};

module.exports.addToCart = async (id, email) => {
  const dbo = await db;
  const Cart = dbo.collection("cart");

  let res = await Cart.find({
    email,
    cart: {
      $elemMatch: {
        productId: new ObjectId(id),
      },
    },
  }).toArray();

  if (res.length > 0) throwError("Product already in Cart");

  await Cart.updateOne(
    { email },
    { $push: { cart: { productId: new ObjectId(id), Quantity: 1 } } }
  );

  return res;
};
