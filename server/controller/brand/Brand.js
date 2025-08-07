const connection = require("../../connection/connection");

const getBrandData = (req, res) => {
  const sql = "SELECT * FROM brand  ORDER BY id DESC";
  connection.query(sql, (error, result) => {
    if (error) {
      console.log("Error Getting Data brand Table in server.js" + error);
    }
    return res.json(result);
  });
};

const getBrandDataWithId = (req, res) => {
  const id = req.params.id
  const sql = `SELECT * FROM brand WHERE id=${id}`;
  connection.query(sql, (error, result) => {
    if (error) {
      console.log("Error Getting Data brand Table in server.js" + error);
    }
    return res.json(result);
  });
};

const addBrandData = (req, res) => {
  try {
    const { name, description, status } = req.body;
    const imagePath = req.file ? req.file.filename : null;
    const sql = "INSERT INTO brand (name, description, image, status) VALUES (?, ?, ?, ?)";
    const data = [name, description, imagePath, status];

    connection.query(sql, data, (error) => {
      if (error) {
        console.log("Error Adding brand Data in server.js: ", error);
        return res.status(500).send("Error adding brand data");

      } else {
        return res.sendStatus(200);
      }
    });
  } catch (error) {
    console.log("Error in server.js: ", error);
    return res.status(500).send("Internal server error");
  }
};

const deleteBrand = (req, res) => {
  try {
     
    const id = req.params.id;
    const sql =  `DELETE FROM brand WHERE id= ${id}`

    connection.query(sql, (error) => {
      if (error) {
        console.log("Error Adding brand Data in server.js: ", error);
        return res.status(500).send("Error adding brand data");

      } else {
        return res.sendStatus(200);
      }
    });
  } catch (error) {
    console.log("Error in server.js: ", error);
    return res.status(500).send("Internal server error");
  }
}


const editBrandData = (req, res) => {
  try {
    const id = req.params.id;
    const { name, description, status } = req.body;
    const imagePath = req?.file?.filename;

    // Declare sql and data outside the if-else blocks
    let sql = '';
    let data = [];

    if (imagePath) {
      sql = "UPDATE brand SET name=?, description=?, image=?, status=? WHERE id=?";
      data = [name, description, imagePath, status, id];
    } else {
      sql = "UPDATE brand SET name=?, description=?, status=? WHERE id=?";
      data = [name, description, status, id];
    }

    connection.query(sql, data, (error) => {
      if (error) {
        console.log("Error Updating brand Data in server.js: ", error);
        return res.status(500).send("Error updating brand data");
      } else {
        return res.sendStatus(200);
      }
    });
  } catch (error) {
    console.log("Error in server.js: ", error);
    return res.status(500).send("Internal server error");
  }
};


module.exports = { getBrandData, addBrandData, getBrandDataWithId, editBrandData, deleteBrand };
