const jwt = require("jsonwebtoken");
const User = require("../schemas/user");

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  const [tokenType, tokenValue] = authorization.split(" ");

  if (tokenType !== "Bearer") {
    res.status(401).send({
      errorMessage: "로그인 후 사용하세요",
    });
    return;
  }

  try {
    const { userId } = jwt.verify(tockeValue, "stella-key");

    User.findById(userId)
      .exec()
      .then((user) => {
        res.locals.user = user;
        next(); // 반드시 호출 없으면 예외처리에 걸려 뒤에 있는 미들웨어랑 연결안됨
      });
    res.locals.user = user;
  } catch (error) {
    res.status(401).send({
      errorMessage: "로그인 후 사용하세요",
    });
    return;
  }
};
