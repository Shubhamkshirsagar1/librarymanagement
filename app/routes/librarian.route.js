const express = require("express");
const router = express.Router();
const librarianController = require("../controllers/librarian.controller");
const { protect, authorize } = require("../middlewares/auth");

router.get(
  "/books",
  protect,
  authorize(["LIBRARIAN"]),
  librarianController.getAllBooks
);

router.get(
  "/book/:id",
  protect,
  authorize(["LIBRARIAN"]),
  librarianController.getBookById
);

router.post(
  "/book",
  protect,
  authorize(["LIBRARIAN"]),
  librarianController.addBook
);

router.put(
  "/book/:id",
  protect,
  authorize(["LIBRARIAN"]),
  librarianController.updateBook
);

router.delete(
  "/book/:id",
  protect,
  authorize(["LIBRARIAN"]),
  librarianController.deleteBook
);

router.get(
  "/members",
  protect,
  authorize(["LIBRARIAN"]),
  librarianController.getMembers
);

router.get(
  "/members",
  protect,
  authorize(["LIBRARIAN"]),
  librarianController.getMembers
);

router.get(
  "/member/:id",
  protect,
  authorize(["LIBRARIAN"]),
  librarianController.getMemberById
);

router.get(
  "/members/history/:id",
  protect,
  authorize(["LIBRARIAN"]),
  librarianController.getMemberHistory
);

router.post(
  "/member",
  protect,
  authorize(["LIBRARIAN"]),
  librarianController.addMember
);

router.put(
  "/member/:id",
  protect,
  authorize(["LIBRARIAN"]),
  librarianController.updateMember
);

router.delete(
  "/member/:id",
  protect,
  authorize(["LIBRARIAN"]),
  librarianController.removeMember
);

module.exports = router;
