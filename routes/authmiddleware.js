var express = require("express");
var router = express.Router();

router.get("/user", authMiddleware, async (req, res) => {
  const { user } = res.locals;
  console.log(user);
  res.send({
    user: {
      nickname: user.nickname,
    },
  });
});

module.exports = router;
