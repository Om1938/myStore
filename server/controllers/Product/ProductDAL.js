const db = require("../../config/db");

module.exports.getAll = async () => {
  const dbo = await db;
  const Products = dbo.collection("product");

  let res = Products.find({}).toArray();

  return res;
};
