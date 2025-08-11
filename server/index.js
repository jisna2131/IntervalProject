import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import mysql from "mysql2/promise";

dotenv.config();

const app = express();
app.use(cors()); // adjust origin in production
app.use(express.json());

// create a MySQL connection pool
const pool = mysql.createPool({
  host: process.env.DB_HOST || "127.0.0.1",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "auth_app",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// helper: generate JWT
function generateToken(payload) {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1d" });
}

// middleware: verify JWT
async function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ msg: "No token provided" });
  }
  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch (err) {
    return res.status(401).json({ msg: "Invalid or expired token" });
  }
}

/**
 * Register
 * body: { name, email, password }
 */
app.post("/api/auth/register", async (req, res) => {
  const { name, email, password } = req.body ?? {};

  if (!name || !email || !password) {
    return res.status(400).json({ msg: "Name, email and password are required" });
  }

  try {
    const conn = await pool.getConnection();
    try {
      // check if user exists
      const [existing] = await conn.query("SELECT id FROM users WHERE email = ?", [email]);
      if (existing.length > 0) {
        conn.release();
        return res.status(400).json({ msg: "Email already registered" });
      }

      // hash password
      const salt = await bcrypt.genSalt(10);
      const hashed = await bcrypt.hash(password, salt);

      // insert user
      const [result] = await conn.query(
        "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
        [name, email, hashed]
      );

      conn.release();
      return res.status(201).json({ msg: "User registered", userId: result.insertId });
    } catch (err) {
      conn.release();
      console.error("DB error (register):", err);
      return res.status(500).json({ msg: "Server error" });
    }
  } catch (err) {
    console.error("Connection error (register):", err);
    return res.status(500).json({ msg: "Database connection error" });
  }
});

/**
 * Login
 * body: { email, password }
 * returns: { token, user: { id, name, email } }
 */
app.post("/api/auth/login", async (req, res) => {
  const { email, password } = req.body ?? {};

  if (!email || !password) {
    return res.status(400).json({ msg: "Email and password are required" });
  }

  try {
    const conn = await pool.getConnection();
    try {
      const [rows] = await conn.query("SELECT id, name, email, password FROM users WHERE email = ?", [email]);
      conn.release();

      if (!rows || rows.length === 0) {
        return res.status(400).json({ msg: "Invalid credentials" });
      }

      const user = rows[0];
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ msg: "Invalid credentials" });
      }

      const token = generateToken({ id: user.id });
      return res.json({ token, user: { id: user.id, name: user.name, email: user.email } });
    } catch (err) {
      conn.release();
      console.error("DB error (login):", err);
      return res.status(500).json({ msg: "Server error" });
    }
  } catch (err) {
    console.error("Connection error (login):", err);
    return res.status(500).json({ msg: "Database connection error" });
  }
});

/**
 * Protected dashboard route
 */
app.get("/api/dashboard", authMiddleware, async (req, res) => {
  const userId = req.userId;
  try {
    const conn = await pool.getConnection();
    try {
      const [rows] = await conn.query("SELECT id, name, email, created_at FROM users WHERE id = ?", [userId]);
      conn.release();
      if (!rows || rows.length === 0) {
        return res.status(404).json({ msg: "User not found" });
      }
      return res.json({ user: rows[0] });
    } catch (err) {
      conn.release();
      console.error("DB error (dashboard):", err);
      return res.status(500).json({ msg: "Server error" });
    }
  } catch (err) {
    console.error("Connection error (dashboard):", err);
    return res.status(500).json({ msg: "Database connection error" });
  }
});

// health
app.get("/", (req, res) => res.send("Auth server running"));

// start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
