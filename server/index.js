const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const Routes = require("./routes/index");
const db = require("./connection/connection");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(Routes);

app.get("/", (req, res) => {
  res.json("XCART server");
});

// Get all inquiries
app.get("/getinquirydata", (req, res) => {
  db.query("SELECT * FROM inquiry ORDER BY id DESC", (err, rows) => {
    if (err) {
      console.error("Error Getting Data inquiry Table:", err);
      return res.status(500).json({ error: "Database error" });
    }
    res.json(rows);
  });
});

// Get unread count
app.get("/getunreadinquirycount", (req, res) => {
  db.query(
    "SELECT COUNT(*) AS count FROM inquiry WHERE is_read = 0",
    (err, rows) => {
      if (err) {
        console.error("Error Getting Unread Count:", err);
        return res.status(500).json({ error: "Database error" });
      }
      res.json({ count: rows[0].count });
    }
  );
});

// Mark all inquiries as read
app.post("/markinquiriesread", (req, res) => {
  db.query(
    "UPDATE inquiry SET is_read = 1 WHERE is_read = 0",
    (err) => {
      if (err) {
        console.error("Error Marking Inquiries Read:", err);
        return res.status(500).json({ error: "Database error" });
      }
      res.json({ success: true });
    }
  );
});

// Delete inquiry
app.delete("/deleteinquirydata/:id", (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM inquiry WHERE id = ?", [id], (err) => {
    if (err) {
      console.error("Error Deleting Inquiry:", err);
      return res.status(500).json({ error: "Database error" });
    }
    res.json({ success: true });
  });
});


app.listen(process.env.PORT, () => {
  console.log(`Server Listening on port ${process.env.PORT}`);
});
