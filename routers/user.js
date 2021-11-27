const express = require("express");
const User = require("../schemas/user");
const router = express.Router();
const authMiddleware = require("../middlewares/auth-middleware");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

//joi
const postAuthSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(4).required(),
  nickname: Joi.string().min(2).max(10).required(),
  confirmPassword: Joi.string().required(),
});

//회원가입
router.post("/user", async (req, res) => {
  try {
    const {
      nickname,
      password,
      email,
      confirmPassword,
    } = await postUsersSchema.validateAsync(req.body);

    if (password !== confirmPassword) {
      //클라이언트는 400보다 낮은값을 성공으로 인식
      res.status(400).send({
        errorMessage: "일치하지 않습니다",
      });
      return; // => 이거 없으면 패스워드가 다르더라도  밑에 있는 코드가 실행됨
    }
    const existUsers = await User.find({
      $or: [{ email }, { nickname }],
    });
    if (existUsers.length) {
      res.status(400).send({
        errorMessage: "중복이지롱.",
      });
      return;
    }

    const user = new User({
      email,
      nickname,
      password,
    });
    await user.save();
    res.status(201).send({});
  } catch (err) {
    console.log(err);
    res.status(400).send({
      errorMessage: "요청한 데이터 형식이 올바르지 않습니다.",
    });
  }
});

//로그인 joi
const postUsersSchema = Joi.object({
  nickname: Joi.string().min(2).max(10).required(),
  password: Joi.string().min(4).required(),
  confirmPassword: Joi.string().required(),
});

router.post("/auth", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).exec();

  // NOTE: 인증 메세지는 자세히 설명하지 않는것을 원칙으로 한다: https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html#authentication-responses
  if (!user || password !== user.password) {
    res.status(400).send({
      errorMessage: "이메일 또는 패스워드가 틀렸습니다.",
    });
    return;
  }

  res.send({
    token: jwt.sign({ userId: user.userId }, "stella-key"),
  });
});

// 유저 인증
router.get("/user", authMiddleware, async (req, res) => {
  const { user } = res.locals;
  res.send({
    user,
  });
});

module.exports = router;
