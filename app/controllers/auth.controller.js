const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../../databaseConnection");
require("dotenv").config();

exports.signup = async (req, res) => {
  const { first_name, last_name, email, password, role } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await db.User.create({
      first_name,
      last_name,
      email,
      password: hashedPassword,
      role,
    });
    res
      .status(201)
      .json({ success: true, message: "User created successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error creating user", error });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await db.User.findOne({ where: { email } });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      {
        expiresIn: "48h",
      }
    );

    res.json({ token });
  } catch (error) {
    res.status(500).json({ success: false, message: "error", error });
  }
};
