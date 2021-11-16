const express = require("express");
const Board = require("../schemas/board");

const router = express.Router();

router.get("/board", async (req, res, next) => {
  try {
    const { date } = req.query;
    const board = await Board.find({ date }).sort("-date");
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

module.exports = router;