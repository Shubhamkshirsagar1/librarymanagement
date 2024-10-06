const db = require("../../databaseConnection");
const bcrypt = require("bcryptjs");

exports.getAllBooks = async (req, res) => {
  try {
    const books = await db.Book.findAll();
    return res.status(200).json(books); // Return the response with status code
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error fetching books",
      error: error.message,
    });
  }
};

exports.getBookById = async (req, res) => {
  const bookId = req.params.id;
  try {
    const book = await db.Book.findByPk(bookId);

    if (book) {
      return res.status(200).json(book);
    } else {
      return res.status(404).json({ error: "Book not found" });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error fetching book",
      error: error.message,
    });
  }
};

exports.addBook = async (req, res) => {
  const { title, author } = req.body;
  if (!title || !author) {
    return res.status(404).json({
      success: false,
      message: "Title or Author should be there will adding a book",
    });
  }
  try {
    const book = await db.Book.create({ title, author });
    res.status(201).json(book);
  } catch (error) {
    res.status(500).json({ message: "Error adding book", error });
  }
};

exports.updateBook = async (req, res) => {
  const { title, author } = req.body;
  if (!title || !author) {
    return res.status(404).json({
      success: false,
      message: "Title or Author should be there ",
    });
  }
  try {
    const book = await db.Book.findOne({
      where: { id: req.params.id },
    });

    if (!book) {
      return res.status(404).json({
        success: false,
        message: "Book not found",
      });
    }

    const updateBook = await book.update({
      title,
      author,
    });

    res.json({ message: "Book updated", book: updateBook });
  } catch (error) {
    res.status(500).json({ message: "Error updating book", error });
  }
};

exports.deleteBook = async (req, res) => {
  try {
    await db.Book.destroy({ where: { id: req.params.id } });
    res.json({ message: "Book deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting book", error });
  }
};

exports.getMembers = async (req, res) => {
  try {
    const members = await db.User.findAll({
      where: { role: "MEMBER" },
      attributes: ["id", "first_name", "last_name", "email", "status"],
    });
    res.json(members);
  } catch (error) {
    res.status(500).json({ message: "Error fetching members", error });
  }
};

exports.getMemberById = async (req, res) => {
  const memberId = req.params.id;
  console.log(memberId);

  try {
    const member = await db.User.findByPk(memberId);

    if (member) {
      return res.status(200).json(member);
    } else {
      return res.status(404).json({ error: "Member not found" });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error fetching member",
      error: error.message,
    });
  }
};

exports.getMemberHistory = async (req, res) => {
  try {
    const TakeBookHistorys = await db.TakeBookHistory.findAll({
      where: { user_id: req.params.id },
      include: [
        {
          model: db.Book,
          as: "book",
          attributes: ["id", "title", "author"],
        },
      ],
    });

    if (!TakeBookHistorys.length) {
      return res
        .status(404)
        .json({ message: "No borrow history found for this member" });
    }

    res.json(TakeBookHistorys);
  } catch (error) {
    res.status(500).json({ message: "Error fetching borrow history", error });
  }
};

exports.addMember = async (req, res) => {
  const { first_name, last_name, email, password } = req.body;
  console.log(req.body);

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await db.User.create({
      first_name,
      last_name,
      email,
      password: hashedPassword,
      role: "MEMBER",
      status: "ACTIVE",
    });

    res.status(201).json({ message: "Member created successfully", user });
  } catch (error) {
    console.log(error);

    res.status(500).json({ message: "Error creating member", error });
  }
};

exports.updateMember = async (req, res) => {
  const { first_name, last_name, email, status } = req.body;
  try {
    const user = await db.User.update(
      { first_name, last_name, email, status },
      { where: { id: req.params.id, role: "MEMBER" } }
    );
    res.json({ message: "Member updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error updating member", error });
  }
};
exports.removeMember = async (req, res) => {
  try {
    await db.User.update(
      { status: "DELETED" },
      { where: { id: req.params.id, role: "MEMBER" } }
    );
    res.json({ message: "Member marked as deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error removing member", error });
  }
};
