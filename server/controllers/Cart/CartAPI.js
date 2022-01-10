const router = require("express").Router();
const jwtVerify = require("../../helper/jwtVerify");
const {
  get,
  addProduct,
  updateQuantity,
  deleteProductFromCart,

  getProductsLocalStorage,
  mergeCart,
} = require("./CartDAL");
// /auth/
router
  .get("/", jwtVerify, (req, res, next) => {
    get(res.user.email)
      .then((resp) => {
        res.json(resp);
      })
      .catch(next);
  })
  .post("/", jwtVerify, (req, res, next) => {
    addProduct(res.user.email, req.body)
      .then((resp) => {
        res.json(resp);
      })
      .catch(next);
  })
  .get(
    "/updateQuantity/product/:productId/quantity/:quantity",
    jwtVerify,
    (req, res, next) => {
      updateQuantity(res.user.email, req.params)
        .then((resp) => {
          res.json(resp);
        })
        .catch(next);
    }
  )
  .delete("/product/:productId", jwtVerify, (req, res, next) => {
    deleteProductFromCart(res.user.email, req.params)
      .then((resp) => {
        res.json(resp);
      })
      .catch(next);
  })
  .post("/getProducts", (req, res, next) => {
    getProductsLocalStorage(req.body).then((resp) => {
      res.json(resp);
    });
  })
  .post("/mergeCart", jwtVerify, (req, res, next) => {
    mergeCart(res.user.email, req.body).then((resp) => {
      res.json(resp);
    });
  });

module.exports = router;
