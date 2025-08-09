const connection = require("../../connection/connection");


const saveShippingAddress = (req, res) => {
  try {
    const {
      user_id,
      first_name,
      last_name,
      company_name,
      address,
      country,
      state,
      city,
      pincode,
      email,
      mobile_number
    } = req.body;

    if (!user_id) {
      return res.status(400).send("User ID is required");
    }

    // Check if address exists for this user
    const checkSql = "SELECT id FROM address WHERE user_id = ?";
    connection.query(checkSql, [user_id], (err, results) => {
      if (err) return res.status(500).send("Database error");

      if (results.length > 0) {
        // Update existing address
        const updateSql = `
          UPDATE address SET
          first_name=?, last_name=?, company_name=?, address=?, country=?, state=?, city=?, pincode=?, email=?, mobile_number=?
          WHERE user_id=?
          `;
        const updateData = [
          first_name, last_name, company_name, address, country, state, city, pincode, email, mobile_number, user_id
        ];

        connection.query(updateSql, updateData, (updateErr) => {
          if (updateErr) return res.status(500).send("Error updating address");
          return res.status(200).send("Address updated successfully");
        });

      } else {
        // Insert new address
        const insertSql = `
        INSERT INTO address 
        (user_id, first_name, last_name, company_name, address, country, state, city, pincode, email, mobile_number)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;
        const insertData = [
          user_id, first_name, last_name, company_name, address, country, state, city, pincode, email, mobile_number
        ];

        connection.query(insertSql, insertData, (insertErr) => {
          if (insertErr) return res.status(500).send("Error saving address");
          return res.status(200).send("Address saved successfully");
        });
      }
    });

  } catch (error) {
    console.error("Error in saveShippingAddress:", error);
    return res.status(500).send("Internal server error");
  }
};

// Get address for logged-in user
const getShippingAddress = (req, res) => {
  const user_id = req.params.user_id;

  if (!user_id) {
    return res.status(400).send("User ID is required");
  }

  const sql = "SELECT * FROM address WHERE user_id = ?";
  connection.query(sql, [user_id], (err, results) => {
    if (err) return res.status(500).send("Error fetching address");

    if (results.length > 0) {
      return res.status(200).json(results[0]);
    } else {
      return res.status(404).send("No address found");
    }
  });
};

const getUserAddressWithId = (req, res) => {
  const id = req.params.id
  const sql = `SELECT * FROM address WHERE user_id= ?`;
  connection.query(sql, [id], (error, result) => {
    if (error) {
      console.log("Error Getting user data from server.js" + error);
    }
    return res.json(result);
  });
};

module.exports = { saveShippingAddress, getShippingAddress, getUserAddressWithId };
