const connection = require("../../connection/connection");

const getProductData = (req, res) => {
  const sql = `
    SELECT 
      p.id,
      p.name,
      p.image,
      p.slogan,
      p.brand_id,
      b.name AS brand_name,
      p.cate_id,
      c.name AS category_name,
      p.created_date,
      p.status
    FROM product p
    LEFT JOIN brand b ON p.brand_id = b.id
    LEFT JOIN category c ON p.cate_id = c.id
    ORDER BY p.id DESC
  `;

  connection.query(sql, (error, result) => {
    if (error) {
      console.error("Error fetching merged product data:", error);
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
  try {
    const { brand_id, cate_id, slogan, name, description, status } = req.body;

    let variants = [];
    if (req.body.variants) {
      try {
        variants = JSON.parse(req.body.variants);
      } catch (err) {
        console.error("Invalid variants JSON:", err);
        return res.status(400).json({ message: "Invalid variants format" });
      }
    }

    const image = req.files?.map((file) => file.filename) || [];

    const productQuery = `
      INSERT INTO product (brand_id, cate_id, slogan, name, description, image, status)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    connection.query(
      productQuery,
      [
        brand_id,
        cate_id,
        slogan,
        name,
        description,
        JSON.stringify(image),
        status || 1,
      ],
      (err, result) => {
        if (err) {
          console.error("Product Insert Error:", err);
          return res.status(500).json({ message: "Failed to add product", error: err });
        }

        const productId = result.insertId;

        if (Array.isArray(variants) && variants.length > 0) {
          const variantQuery = `
            INSERT INTO product_variants (product_id, memory, storage, price, discount, final_price)
            VALUES ?
          `;

          const variantValues = variants.map((v) => [
            productId,
            v.memory,
            v.storage,
            v.price,
            v.discount || 0,
            v.final_price || Math.ceil(v.price - (v.price * (v.discount || 0) / 100)),
          ]);

          connection.query(variantQuery, [variantValues], (err2) => {
            if (err2) {
              console.error("Variant Insert Error:", err2);
              return res
                .status(500)
                .json({ message: "Product added but variants failed", error: err2 });
            }

            return res
              .status(200)
              .json({ message: "Product and variants added successfully" });
          });
        } else {
          return res.status(200).json({ message: "Product added without variants" });
        }
      }
    );
  } catch (error) {
    console.error("Unexpected Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
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
  const { brand_id, cate_id, slogan, name, description, status } = req.body;

  let newImages = req.files?.map((file) => file.filename) || [];
  let existingImages = [];
  if (req.body.existingImages) {
    try { existingImages = JSON.parse(req.body.existingImages); } catch { }
  }
  const finalImages = JSON.stringify([...existingImages, ...newImages]);

  const sql = `UPDATE product
    SET brand_id=?, cate_id=?, slogan=?, name=?, description=?, image=?, status=?
    WHERE id=?`;

  const data = [
    brand_id,
    cate_id,
    slogan,
    name,
    description,
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

const getProductVariantData = (req, res) => {
  const id = req.params.id;
  const sql = "SELECT * FROM product_variants WHERE product_id = ? ORDER BY id ASC";
  connection.query(sql, [id], (error, result) => {
    if (error) {
      console.log("Error Getting Variants:", error);
      return res.status(500).send("Error fetching variants");
    }
    return res.json(result);
  });
};

const addSingleVariant = (req, res) => {
  const product_id = req.params.id;
  const { memory, storage, price, discount } = req.body;
  if (!memory || !storage || !price) {
    return res.status(400).json({ message: "memory, storage, price required" });
  }
  const final_price = Math.ceil(price - (price * (discount || 0) / 100));
  const sql = `
    INSERT INTO product_variants (product_id, memory, storage, price, discount, final_price)
    VALUES (?, ?, ?, ?, ?, ?)
  `;
  connection.query(
    sql,
    [product_id, memory, storage, price, discount || 0, final_price],
    (err, result) => {
      if (err) {
        console.error("Add variant error:", err);
        return res.status(500).json({ message: "Add variant failed" });
      }
      res.json({
        id: result.insertId,
        product_id,
        memory,
        storage,
        price,
        discount: discount || 0,
        final_price,
      });
    }
  );
};

const updateVariant = (req, res) => {
  const variantId = req.params.variantId;
  const { memory, storage, price, discount } = req.body;
  const final_price = Math.ceil(price - (price * (discount || 0) / 100));
  const sql = `
    UPDATE product_variants
    SET memory=?, storage=?, price=?, discount=?, final_price=?
    WHERE id=?
  `;
  connection.query(
    sql,
    [memory, storage, price, discount || 0, final_price, variantId],
    (err) => {
      if (err) {
        console.error("Update variant error:", err);
        return res.status(500).json({ message: "Update variant failed" });
      }
      res.sendStatus(200);
    }
  );
};

const deleteVariant = (req, res) => {
  const variantId = req.params.variantId;
  const sql = "DELETE FROM product_variants WHERE id=?";
  connection.query(sql, [variantId], (err) => {
    if (err) {
      console.error("Delete variant error:", err);
      return res.status(500).json({ message: "Delete variant failed" });
    }
    res.sendStatus(200);
  });
};

module.exports = { getProductData, addProductData, getProductDataWithId, editProductData, deleteProduct, getProductVariantData, addSingleVariant, updateVariant, deleteVariant };