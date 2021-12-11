const router = require("express").Router();
const jwtVerify = require("../../helper/jwtVerify");
const { welcome, register, login, get } = require("./AuthDAL");

// /auth/
router.get("/", jwtVerify, (req, res, next) => {
  get(res.user.email)
    .then((resp) => {
      res.json(resp);
    })
    .catch(next);
});

// Register User
router.post("/", (req, res, next) => {
  register(req.body)
    .then((resp) => {
      res.status(201).json(resp);
    })
    .catch(next);
});

// Login User
router.post("/login", (req, res, next) => {
  login(req.body)
    .then((resp) => res.json(resp))
    .catch(next);
});

module.exports = router;
