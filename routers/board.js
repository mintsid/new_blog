const express = require("express");
const Board = require("../schemas/board");

const router = express.Router();

//상세 페이지 조회
router.get("/board/:boardId", async (req, res) => {
  const { boardId } = req.params;
  board = await Board.findById(boardId);

  /**
   *
   * findbyid로 개별 id 가져옴
   *
   */
  res.json({ detail: board });
});

//게시판
router.get("/board", async (req, res, next) => {
  try {
    const { boardId } = req.query;

    const board = await Board.find({ boardId }).sort("-date");
    res.json({ board: board });
  } catch (err) {
    console.error(err);
    next(err);
  }
});

//저장
router.post("/board", async (req, res) => {
  const { title, author, password, contents, date } = req.body;
  isExist = await Board.find({ title });
  if (isExist.length == 0) {
    await Board.create({ title, author, password, contents, date });
  }
  res.send({ result: "success" });
});

//수정
router.patch("/board/:boardId", async (req, res) => {
  const { boardId } = req.params;
  const { title, author, contents, password } = req.body;

  //board = await Board.updateOne({ boardId }); // 여기가 문제 => 날리니 괜찮은데 다른게 튀어나오네..?

  if (board.password === password) {
    await Board.updateOne(
      { _id: boardId }, // _id: =>이거추가했는데 됀다..?? 이유는 모르겠다...
      { $set: { title, author, contents } }
    );

    res.send({ result: "success" });
  } else {
    res.send({ result: "fail" });
  }
});

//삭제
router.delete("/board/:boardId", async (req, res) => {
  const { boardId } = req.params;
  const { password } = req.body;

  const board = await Board.findOne({ _id: boardId });
  if (board["password"] == password) {
    await Board.deleteOne({ _id: boardId });
    res.send({ result: "success" });
  } else {
    res.send({ result: "fail" });
  }
});

//회원가입
// router.post("/user", async (req, res) => {
//   try {
//     const { email, password1, password2 } = req.body;

//     if (password1 !== password2) {
//       res.send({ result: "fail" });
//     } else {
//       await User.create({ email, password1, password2 });
//     }
//     res.send({ result: "success" });
//   } catch (err) {
//     console.error(err);
//     netx();
//   }
// });

// //로그인
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
