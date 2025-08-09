const connection = require("../../connection/connection");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

// SIGNUP
const signup = async (req, res) => {
  const { username, email, password, mobile_number } = req.body;

  // Check if user exists
  connection.query(
    "SELECT * FROM users WHERE email = ?",
    [email],
    async (err, results) => {
      if (err) return res.status(500).json({ message: "Database error", err });

      if (results.length > 0) {
        return res.status(400).json({ message: "User already exists" });
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Insert new user
      connection.query(
        "INSERT INTO users (username, email, password, mobile_number) VALUES (?, ?, ?, ?)",
        [username, email, hashedPassword, mobile_number],
        (err, result) => {
          if (err) return res.status(500).json({ message: "Signup failed", err });

          return res.status(201).json({ message: "User registered successfully" });
        }
      );
    }
  );
};

// LOGIN
const login = (req, res) => {
  const { email, password } = req.body;

  connection.query(
    "SELECT * FROM users WHERE email = ?",
    [email],
    async (err, results) => {
      if (err) return res.status(500).json({ message: "Database error", err });

      if (results.length === 0) {
        return res.status(401).json({ message: "Email not registered" });
      }

      const user = results[0];

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ message: "Password does not match" });
      }

      const token = jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
      );

      res.json({
        message: "Login successful",
        token,
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          mobile_number: user.mobile_number,
        },
      });
    }
  );
};


module.exports = {signup, login}