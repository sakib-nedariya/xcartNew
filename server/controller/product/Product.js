const connection = require("../../connection/connection");

const getProductData = (req, res) => {
  const sql =
    "SELECT * FROM product ORDER BY id DESC";
  connection.query(sql, (error, result) => {
    if (error) {
      console.log("Error Getting Data from product Table:", error);
      return res.status(500).send("Error fetching product data");
    }
    return res.json(result);
  });
};

const getProductDataWithId = (req, res) => {
  const id = req.params.id;
  const sql = `SELECT product.*, brand.name AS brand_name, category.name AS cate_name FROM product JOIN brand ON product.brand_id = brand.id JOIN category ON product.cate_id = category.id WHERE product.id = ${id}`;

  connection.query(sql, (error, result) => {
    if (error) {
      console.log("Error Getting Data from product Table:", error);
      return res.status(500).send("Error fetching product data");
    }
    return res.json(result);
  });
};

const addProductData = (req, res) => {
  const {
    brand_id,
    cate_id,
    slogan,
    name,
    description,
    price,
    discount,
    memory,
    storage,
    status,
  } = req.body;

  const images = req.files?.map((file) => file.filename) || [];

  const brandCheck = "SELECT id FROM brand WHERE id=?";
  connection.query(brandCheck, [brand_id], (err, brandRes) => {
    if (err || brandRes.length === 0) return res.status(400).send("Invalid brand_id");

    const cateCheck = "SELECT id FROM category WHERE id=?";
    connection.query(cateCheck, [cate_id], (err, cateRes) => {
      if (err || cateRes.length === 0) return res.status(400).send("Invalid cate_id");

      const sql = `INSERT INTO product 
        (brand_id, cate_id, slogan, name, description, price, discount, memory, storage, image, status)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

      const data = [
        brand_id,
        cate_id,
        slogan,
        name,
        description,
        price,
        discount,
        memory,
        storage,
        JSON.stringify(images),
        status,
      ];

      connection.query(sql, data, (err) => {
        if (err) {
          console.error("Insert error:", err);
          return res.status(500).send("Insert failed");
        }
        return res.sendStatus(200);
      });
    });
  });
};

const deleteProduct = (req, res) => {
  try {
    const id = req.params.id;
    const sql = `DELETE FROM product WHERE id= ${id}`;

    connection.query(sql, (error) => {
      if (error) {
        console.log("Error Deleting product Data: ", error);
        return res.status(500).send("Error deleting product data");
      } else {
        return res.sendStatus(200);
      }
    });
  } catch (error) {
    console.log("Error in server.js: ", error);
    return res.status(500).send("Internal server error");
  }
};

const editProductData = (req, res) => {
  const id = req.params.id;
  const {
    brand_id,
    cate_id,
    slogan,
    name,
    description,
    price,
    discount,
    memory,
    storage,
    status,
  } = req.body;

  let newImages = req.files?.map((file) => file.filename) || [];
  let existingImages = [];

  if (req.body.existingImages) {
    try {
      existingImages = JSON.parse(req.body.existingImages);
    } catch (err) {
      console.error("Error parsing existing images:", err);
    }
  }

  const finalImages = JSON.stringify([...existingImages, ...newImages]);

  const sql = `UPDATE product SET brand_id=?, cate_id=?, slogan=?, name=?, description=?, price=?, discount=?, memory=?, storage=?, image=?, status=? WHERE id=?`;

  const data = [
    brand_id,
    cate_id,
    slogan,
    name,
    description,
    price,
    discount,
    memory,
    storage,
    finalImages,
    status,
    id,
  ];

  connection.query(sql, data, (error) => {
    if (error) {
      console.error("Error Updating product Data: ", error);
      return res.status(500).send("Error updating product data");
    }
    return res.sendStatus(200);
  });
};



module.exports = { getProductData, addProductData, getProductDataWithId, editProductData, deleteProduct };
