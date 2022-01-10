const { ObjectId, ReturnDocument } = require("mongodb");
const db = require("../../config/db");
const throwError = require("../../helper/throwError");
const { getProducts } = require("../Product/ProductDAL");

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

        "product._id": 1,
        "product.name": 1,
        "product.price": 1,
        "product.image": 1,
      },
    },
  ]).toArray();

  return result.map((res) => {
    return {
      quantity: res.cart.Quantity,
      ...res.product,
    };
  });
};

module.exports.createCart = async (email) => {
  const dbo = await db;
  const Cart = dbo.collection("cart");

  const res = await Cart.insertOne({ email, cart: [] });

  return res;
};

module.exports.addProduct = async (email, { productId }) => {
  const dbo = await db;
  const Cart = dbo.collection("cart");

  let result = await Cart.findOne({ email });

  return result;
};

module.exports.updateQuantity = async (email, { productId, quantity }) => {
  const dbo = await db;
  const Cart = dbo.collection("cart");

  if (quantity <= 0) {
    await this.deleteProductFromCart(email, { productId });
  } else {
    let res = await Cart.updateOne(
      {
        email,
        cart: { $elemMatch: { productId: ObjectId(productId) } },
      },
      { $set: { "cart.$.Quantity": quantity } }
    );
  }
};

module.exports.deleteProductFromCart = async (email, { productId }) => {
  const dbo = await db;
  const Cart = dbo.collection("cart");

  let res = await Cart.updateOne(
    {
      email,
    },
    { $pull: { cart: { productId: new ObjectId(productId) } } }
  );
};

module.exports.getProductsLocalStorage = async ({ productIds }) => {
  let retProducts = await getProducts(productIds);

  return retProducts.map((product) => {
    let { image, name, price, _id } = product;
    return { image, name, price, _id };
  });
};

module.exports.mergeCart = async (email,productIds) => {
  const dbo = await db;
  const Cart = dbo.collection("cart");

  // let res = await Cart.updateMany({
  //   email,
    
  // })

};
