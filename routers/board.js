const express = require("express");
const Board = require("../schemas/board");

const router = express.Router();

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

//상세 페이지 조회
router.get("/board/:boardId", async (req, res) => {
  const { boardId } = req.params;
  board = await Board.findOne({ boardId: boardId });
  res.json({ detail: board });
});

//작성
router.post('/board', async (req, res) => {
  const { title, author, password, contents, date } = req.body;
  isExist = await Board.find({ title });
  if (isExist.length == 0) {
    await Board.create({title, author, password, contents, date });
  }
  res.send({ result: "success" });
});


module.exports = router;