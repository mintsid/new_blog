let express = require("express");
let router = express.Router();

router.get("/join", function (req, res, next) {
  res.send("router 회원가입페이지");
});

router.get("/login", function (req, res, next) {
  res.send("router 로그인페이지");
});

module.exports = router;
