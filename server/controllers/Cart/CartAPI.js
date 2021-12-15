const router = require("express").Router();
const jwtVerify = require("../../helper/jwtVerify");
const { get, addProduct } = require("./CartDAL");
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
  });

module.exports = router;
