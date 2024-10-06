const express = require("express");
const router = express.Router();
const memberController = require("../controllers/member.controller");
const { protect, authorize } = require("../middlewares/auth");

router.get(
  "/books",
  protect,
  authorize(["MEMBER"]),
  memberController.viewBooks
);

router.post(
  "/borrow/:bookId",
  protect,
  authorize(["MEMBER"]),
  memberController.borrowBook
);

router.post(
  "/return/:bookId",
  protect,
  authorize(["MEMBER"]),
  memberController.returnBook
);

router.delete(
  "/account",
  protect,
  authorize(["MEMBER"]),
  memberController.deleteOwnAccount
);

router.get(
  "/history",
  protect,
  authorize(["MEMBER"]),
  memberController.getBorrowHistory
);
module.exports = router;
