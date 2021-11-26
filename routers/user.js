const express = require("express");
const User = require("../schemas/user");
const router = express.Router();

//회원가입
router.post("/user", async (req, res) => {
  const { nickname, password } = req.body;

  //  nickname이 동일한게 이미 있는지 확인
  const existsUsers = await User.findOne({ nickname });
  if (existsUsers) {
    // NOTE: 보안을 위해 인증 메세지는 자세히 설명하지 않는것을 원칙으로 한다: https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html#authentication-responses
    res.status(400).send({
      errorMessage: "이메일 또는 닉네임이 이미 사용중입니다.",
    });
    return;
  }

  const user = new User({ nickname, password });
  await user.save();

  res.status(201).send({});
});

//로그인;
const jwt = require("jsonwebtoken");

router.post("/user/login", async (req, res) => {
  const { nickname, password } = req.body;

  console.log(req.body);
  user = await User.find({ nickname });
  console.log(user);
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
