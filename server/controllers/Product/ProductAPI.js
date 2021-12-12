const router = require("express").Router();
const jwtVerify = require("../../helper/jwtVerify");
const { getAll } = require("./ProductDAL");
//
router.get("/", (req, res, next) => {
  getAll()
    .then((resp) => {
      res.status(200).json(resp);
    })
    .catch(next);
});

module.exports = router;
