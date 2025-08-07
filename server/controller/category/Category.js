const connection = require("../../connection/connection");

const getCategoryData = (req, res) => {
  const sql =
    "SELECT * FROM category ORDER BY id DESC";
  connection.query(sql, (error, result) => {
    if (error) {
      console.log("Error Getting Data from category Table:", error);
      return res.status(500).send("Error fetching category data");
    }
    return res.json(result);
  });
};

const getCategoryDataWithId = (req, res) => {
  const id = req.params.id;
  const sql = `SELECT * FROM category WHERE id=${id}`;
  connection.query(sql, (error, result) => {
    if (error) {
      console.log("Error Getting Data from category Table:", error);
      return res.status(500).send("Error fetching category data");
    }
    return res.json(result);
  });
};

const addCategoryData = (req, res) => {
  try {
    const { name, description, brand_id, status } = req.body;
    const imagePath = req.file ? req.file.filename : null;

   
    const brandCheckSql = "SELECT id FROM brand WHERE id = ?";
    connection.query(brandCheckSql, [brand_id], (brandError, brandResult) => {
      if (brandError) {
        console.log("Error Checking brand_id: ", brandError);
        return res.status(500).send("Error checking brand_id");
      }
      if (brandResult.length === 0) {
        return res.status(400).send("Invalid brand_id. Brand does not exist.");
      }

      const sql =
        "INSERT INTO category (name, description, brand_id, image, status) VALUES (?, ?, ?, ?, ?)";
      const data = [name, description, brand_id, imagePath, status];

      connection.query(sql, data, (error) => {
        if (error) {
          console.log("Error Adding category Data: ", error);
          return res.status(500).send("Error adding category data");
        }
        return res.sendStatus(200);
      });
    });
  } catch (error) {
    console.log("Error in server.js: ", error);
    return res.status(500).send("Internal server error");
  }
};

const deleteCategory = (req, res) => {
  try {
    const id = req.params.id;
    const sql = `DELETE FROM category WHERE id= ${id}`;

    connection.query(sql, (error) => {
      if (error) {
        console.log("Error Deleting category Data: ", error);
        return res.status(500).send("Error deleting category data");
      } else {
        return res.sendStatus(200);
      }
    });
  } catch (error) {
    console.log("Error in server.js: ", error);
    return res.status(500).send("Internal server error");
  }
};

const editCategoryData = (req, res) => {
  try {
    const id = req.params.id;
    const { name, description, brand_id, status } = req.body;
    const imagePath = req?.file?.filename;

    let sql = "";
    let data = [];

    if (imagePath) {
      sql =
        "UPDATE category SET name=?, description=?, brand_id=?, image=?, status=? WHERE id=?";
      data = [name, description, brand_id, imagePath, status, id];
    } else {
      sql =
        "UPDATE category SET name=?, description=?, brand_id=?, status=? WHERE id=?";
      data = [name, description, brand_id, status, id];
    }

    connection.query(sql, data, (error) => {
      if (error) {
        console.log("Error Updating category Data: ", error);
        return res.status(500).send("Error updating category data");
      }
      return res.sendStatus(200);
    });
  } catch (error) {
    console.log("Error in server.js: ", error);
    return res.status(500).send("Internal server error");
  }
};

module.exports = { getCategoryData, addCategoryData, getCategoryDataWithId, editCategoryData, deleteCategory,};
