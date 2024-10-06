const db = require("../../databaseConnection");

exports.viewBooks = async (req, res) => {
  try {
    const books = await db.Book.findAll({ where: { status: "AVAILABLE" } });
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: "Error fetching books", error });
  }
};

exports.borrowBook = async (req, res) => {
  try {
    const book = await db.Book.findByPk(req.params.bookId);
    console.log("BOOK", book);

    if (!book || book.status !== "AVAILABLE") {
      return res.status(400).json({ message: "Book not available" });
    }

    await book.update({ status: "BORROWED" });

    await db.TakeBookHistory.create({ user_id: req.user.id, book_id: book.id });

    res.json({ message: "Book borrowed" });
  } catch (error) {
    res.status(500).json({ message: "Error borrowing book", error });
  }
};

exports.returnBook = async (req, res) => {
  try {
    const book = await db.Book.findByPk(req.params.bookId);
    if (!book || book.status !== "BORROWED") {
      return res.status(400).json({ message: "Book not borrowed" });
    }

    await book.update({ status: "AVAILABLE" });
    await db.TakeBookHistory.update(
      { returned_at: new Date() },
      { where: { book_id: book.id, user_id: req.user.id, returned_at: null } }
    );

    res.json({ message: "Book returned" });
  } catch (error) {
    res.status(500).json({ message: "Error returning book", error });
  }
};

exports.deleteOwnAccount = async (req, res) => {
  try {
    await db.User.update(
      { status: "DELETED" },
      { where: { id: req.user.id, role: "MEMBER" } }
    );
    res.json({ message: "Account deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting account", error });
  }
};

exports.getBorrowHistory = async (req, res) => {
  try {
    const history = await db.TakeBookHistory.findAll({
      where: { user_id: req.user.id },
      include: [
        {
          model: db.Book,
          as: "book",
          attributes: ["id", "title", "author"],
        },
      ],
    });

    if (!history.length) {
      return res.status(404).json({ message: "No borrow history found" });
    }

    res.json(history);
  } catch (error) {
    res.status(500).json({ message: "Error fetching borrow history", error });
  }
};
