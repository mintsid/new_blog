const express = require("express");
const User = require("../schemas/user");
const router = express.Router();

//회원가입
router.post("/user", async (req, res) => {
  const { nickname, password } = req.body;

  //  nickname이 동일한게 이미 있는지 확인
  exist = await User.find({ nickname });

  if (exist.length > 0) {
    res.send({ result: "fail" });
  } else {
    await User.create({ nickname, password });
    res.send({ result: "success" });
  }
});

//로그인;
const jwt = require("jsonwebtoken");

router.post("/user", async (req, res) => {
  const { nickname, password } = req.body;

  user = await User.findOne({ nickname });

  // NOTE: 인증 메세지는 자세히 설명하지 않는것을 원칙으로 한다: https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html#authentication-responses
  if (!user || password !== user.password) {
    res.send({ result: "fail" });
  } else {
    res.send({ result: "success" });
  }

  res.send({
    token: jwt.sign({ userId: user.userId }, "stella-key"),
  });
});

module.exports = router;
