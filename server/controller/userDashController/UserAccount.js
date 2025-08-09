const connection = require("../../connection/connection");
const bcrypt = require("bcrypt");

const getUserWithId = (req, res) => {
  const id = req.params.id
  const sql = `SELECT * FROM users WHERE id= ?`;
  connection.query(sql, [id], (error, result) => {
    if (error) {
      console.log("Error Getting user data from server.js" + error);
    }
    return res.json(result);
  });
};

const editUserData = (req, res) => {
  try {
    const id = req.params.id;

    const {
      first_name,
      last_name,
      username,
      email,
      mobile_number,
      country,
      state,
      city,
      pincode
    } = req.body;

    const profile = req.file ? req.file.filename : req.body.profile || null;

    const sql = `
      UPDATE users
      SET first_name = ?, 
          last_name = ?, 
          profile = ?, 
          username = ?, 
          email = ?, 
          mobile_number = ?, 
          country = ?, 
          state = ?, 
          city = ?, 
          pincode = ?
      WHERE id = ?
    `;

    const data = [
      first_name,
      last_name,
      profile,
      username,
      email,
      mobile_number,
      country,
      state,
      city,
      pincode,
      id
    ];

    connection.query(sql, data, (error, results) => {
      if (error) {
        console.error("Error updating user data:", error);
        return res.status(500).send("Error updating user data");
      } else {
        return res.status(200).send("User data updated successfully");
      }
    });
  } catch (error) {
    console.error("Error in editUserData:", error);
    return res.status(500).send("Internal server error");
  }
};

const changePassword = async (req, res) => {
  try {
    const { id } = req.params;
    const { newPassword } = req.body;

    if (!newPassword) {
      return res.status(400).json({ message: "New password is required" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    const sql = `UPDATE users SET password = ? WHERE id = ?`;

    connection.query(sql, [hashedPassword, id], (error, result) => {
      if (error) {
        console.error("Error updating password:", error);
        return res.status(500).json({ message: "Failed to update password" });
      }
      return res.status(200).json({ message: "Password updated successfully" });
    });
  } catch (error) {
    console.error("Error in changePassword:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};


module.exports = { getUserWithId, editUserData, changePassword }