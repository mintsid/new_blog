const express = require("express");
const router = express.Router();
const User = require("../schemas/user");

//회원가입
router.post("/user", async (req, res) => {
  const { nickname, password } = req.body;

  // email or nickname이 동일한게 이미 있는지 확인하기 위해 가져온다.
  Users = await User.find({ nickname });

  if (Users.length == 0) {
    await User.create({ nickname, password });

    res.send({ result: "success" });
  } else {
    res.send({ result: "fail" });
  }
});

//로그인
// const jwt = require("jsonwebtoken");

// router.put("/user", async (req, res) => {
//   const user = await user.findOne({ email });

//   if (!user || passowrd !== user.password) {
//     res.status(400).send({
//       errorMessage: "이메일 또는 비밀번호가 틀려습니다.",
//     });
//     return;
//   }

//   res.send({
//     token: jwt.sign({ userId: user.userId }, "my-secret-key"),
//   });
// });

module.exports = router;
