
const connection = require("../../connection/connection")

const createContactData = (req, res) => {
  const { firstname, lastname, email, mobilenumber, message } = req.body;

  if (!firstname || !lastname || !email || !mobilenumber || !message) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const sql = `
    INSERT INTO inquiry (first_name, last_name, email, mobile_number, message)
    VALUES (?, ?, ?, ?, ?)
  `;

  connection.query(
    sql,
    [firstname, lastname, email, mobilenumber, message],
    (err, result) => {
      if (err) {
        console.error("Database Error:", err);
        return res.status(500).json({ error: "Failed to save contact data" });
      }

      res.status(201).json({
        message: "Contact message saved successfully",
        contactId: result.insertId
      });
    }
  );
};

const getInquiryData = (req, res) => {
  const sql = "SELECT * FROM inquiry ORDER BY id DESC";
  connection.query(sql, (error, result) => {
    if (error) {
      console.log("Error Getting Data inquiry Table in server.js" + error);
    }
    return res.json(result);
  });
};

const getInquiryDataWithId = (req, res) => {
  const id = req.params.id
  const sql = `SELECT * FROM inquiry WHERE id=?`;
  connection.query(sql, [id], (error, result) => {
    if (error) {
      console.log("Error Getting Data inquiry Table in server.js" + error);
    }
    return res.json(result);
  });
};

module.exports = { createContactData, getInquiryData, getInquiryDataWithId }
