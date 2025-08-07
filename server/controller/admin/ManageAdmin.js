const connection = require("../../connection/connection");


const getAdminData = (req, res) => {
  const sql = "SELECT * FROM admin ORDER BY id DESC";
  connection.query(sql, (error, result) => {
    if (error) {
      console.log("Error Getting Data Admin Table in server.js" + error);
    }
    return res.json(result);
  });
};

const getAdminDataWithId = (req, res) => {
  const id = req.params.id
  const sql = `SELECT * FROM admin WHERE id=${id}`;
  connection.query(sql, (error, result) => {
    if (error) {
      console.log("Error Getting Data Admin Table in server.js" + error);
    }
    return res.json(result);
  });
};


const addAdminData = (req, res) => {
  try {
    const { first_name, middle_name, last_name, user_name, email, mobile_number, dob, password, status } = req.body;
    const imagePath = req.file ? req.file.filename : null;
    const sql = "INSERT INTO admin (first_name, middle_name, last_name, user_name, profile, email, mobile_number, dob, password, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    const data = [first_name, middle_name, last_name, user_name, imagePath, email, mobile_number, dob, password, status];

    connection.query(sql, data, (error) => {
      if (error) {
        console.log("Error Adding Admin Data in server.js: ", error);
        return res.status(500).send("Error adding Admin data");

      } else {
        return res.sendStatus(200);
      }
    });
  } catch (error) {
    console.log("Error in server.js: ", error);
    return res.status(500).send("Internal server error");
  }
};

const deleteAdmin = (req, res) => {
  try {
     
    const id = req.params.id;
    const sql =  `DELETE FROM admin WHERE id= ${id}`

    connection.query(sql, (error) => {
      if (error) {
        console.log("Error Adding Admin Data in server.js: ", error);
        return res.status(500).send("Error adding Admin data");

      } else {
        return res.sendStatus(200);
      }
    });
  } catch (error) {
    console.log("Error in server.js: ", error);
    return res.status(500).send("Internal server error");
  }
}


const editAdminData = (req, res) => {
  try {
    const id = req.params.id;
    const { first_name, middle_name, last_name, user_name, email, mobile_number, dob, password, status } = req.body;
    const imagePath = req?.file?.filename;

    // Declare sql and data outside the if-else blocks
    let sql = '';
    let data = [];

    if (imagePath) {
      sql = "UPDATE admin SET first_name=?, middle_name=?, last_name=?, user_name=?, profile=?, email=?, mobile_number=?, dob=?, password=?, status=? WHERE id=?";
      data = [first_name, middle_name, last_name, user_name, imagePath, email, mobile_number, dob, password, status, id];
    } else {
      sql = "UPDATE admin SET first_name=?, middle_name=?, last_name=?, user_name=?, email=?, mobile_number=?, dob=?, password=?, status=? WHERE id=?";
      data = [first_name, middle_name, last_name, user_name, email, mobile_number, dob, password, status, id];
    }

    connection.query(sql, data, (error) => {
      if (error) {
        console.log("Error Updating Admin Data in server.js: ", error);
        return res.status(500).send("Error updating Admin data");
      } else {
        return res.sendStatus(200);
      }
    });
  } catch (error) {
    console.log("Error in server.js: ", error);
    return res.status(500).send("Internal server error");
  }
};


module.exports = { getAdminData, addAdminData, getAdminDataWithId, editAdminData, deleteAdmin };
