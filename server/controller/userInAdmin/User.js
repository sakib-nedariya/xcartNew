const connection = require("../../connection/connection");

const getAllUsers = (req, res) => {
  const sql = "SELECT * FROM users ORDER BY id DESC";
  connection.query(sql, (error, result) => {
    if (error) {
      console.log("Error Getting Data users Table in server.js" + error);
    }
    return res.json(result);
  });
};

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

module.exports = { getAllUsers, getUserWithId };