const router = require("express").Router();
const jwtVerify = require("../../helper/jwtVerify");
const { getAll, addToCart } = require("./ProductDAL");
//
router.get("/", (req, res, next) => {
  getAll()
    .then((resp) => {
      res.status(200).json(resp);
    })
    .catch(next);
});
router.post("/addtocart", jwtVerify, (req, res, next) => {
  addToCart(req.body.productId, res.user.email)
    .then((resp) => {
      res.status(200).json(resp);
    })
    .catch(next);
});

module.exports = router;
