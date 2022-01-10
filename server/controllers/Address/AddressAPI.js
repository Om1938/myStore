const router = require("express").Router();
const jwtVerify = require("../../helper/jwtVerify");

router.get('',jwtVerify,(req,res,next)=>{
  
})

module.exports = router;
