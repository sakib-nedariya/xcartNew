
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


const deleteInquiry = (req, res) => {
  try {
     
    const id = req.params.id;
    const sql =  `DELETE FROM inquiry WHERE id= ${id}`

    connection.query(sql, (error) => {
      if (error) {
        console.log("Error Adding inquiry Data in server.js: ", error);
        return res.status(500).send("Error adding inquiry data");

      } else {
        return res.sendStatus(200);
      }
    });
  } catch (error) {
    console.log("Error in server.js: ", error);
    return res.status(500).send("Internal server error");
  }
}

// Get all inquiries
const getInquiryData = (req, res) => {
  connection.query("SELECT * FROM inquiry ORDER BY id DESC", (err, rows) => {
    if (err) {
      console.error("Error Getting Data inquiry Table:", err);
      return res.status(500).json({ error: "Database error" });
    }
    res.json(rows);
  });
};

// Get unread count
const getUnreadInquiryCount = (req, res) => {
  connection.query(
    "SELECT COUNT(*) AS count FROM inquiry WHERE is_read = 0",
    (err, rows) => {
      if (err) {
        console.error("Error Getting Unread Count:", err);
        return res.status(500).json({ error: "Database error" });
      }
      res.json({ count: rows[0].count });
    }
  );
};

// Mark all inquiries as read
const markInquiriesRead = (req, res) => {
  connection.query(
    "UPDATE inquiry SET is_read = 1 WHERE is_read = 0",
    (err) => {
      if (err) {
        console.error("Error Marking Inquiries Read:", err);
        return res.status(500).json({ error: "Database error" });
      }
      res.json({ success: true });
    }
  );
};

module.exports = { createContactData, getInquiryData, getInquiryDataWithId, deleteInquiry, getUnreadInquiryCount, markInquiriesRead };
