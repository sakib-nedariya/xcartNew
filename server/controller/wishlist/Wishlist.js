const connection = require("../../connection/connection");

const addToWishlist = (req, res) => {
  const user_id = req.body.user_id || req.body.id;
  const product_id = req.body.product_id || req.params.product_id;

  if (!user_id || !product_id) {
    return res.status(400).json({ message: "user_id and product_id are required" });
  }

  const checkSql = `SELECT * FROM wishlist WHERE user_id = ? AND product_id = ? AND status = 1`;
  connection.query(checkSql, [user_id, product_id], (err, rows) => {
    if (err) {
      console.error("Error checking wishlist:", err);
      return res.status(500).json({ message: "Database error" });
    }

    if (rows.length > 0) {
      // already wishlisted
      return res.status(200).json({ message: "Already in wishlist" });
    }

    const insertSql = `INSERT INTO wishlist (user_id, product_id, status) VALUES (?, ?, 1)`;
    connection.query(insertSql, [user_id, product_id], (err2, result) => {
      if (err2) {
        console.error("Error adding to wishlist:", err2);
        return res.status(500).json({ message: "Error adding to wishlist" });
      }

      // return the product row so frontend has consistent item shape
      const fetchProductSql = `SELECT id, slogan, price, image FROM product WHERE id = ? LIMIT 1`;
      connection.query(fetchProductSql, [product_id], (err3, productRows) => {
        if (err3) {
          console.error("Error fetching product after insert:", err3);
          return res.status(201).json({ message: "Product added to wishlist" });
        }
        return res.status(201).json({ message: "Product added to wishlist", product: productRows[0] });
      });
    });
  });
};

const removeFromWishlist = (req, res) => {
  const user_id = req.params.user_id || req.params.id || req.body.user_id;
  const product_id = req.params.product_id || req.body.product_id;

  if (!user_id || !product_id) {
    return res.status(400).json({ message: "user_id and product_id are required" });
  }

  const sql = `DELETE FROM wishlist WHERE user_id = ? AND product_id = ?`;
  connection.query(sql, [user_id, product_id], (error, result) => {
    if (error) {
      console.error("Error removing from wishlist:", error);
      return res.status(500).json({ message: "Error removing from wishlist" });
    }
    return res.status(200).json({ message: "Product removed from wishlist successfully" });
  });
};


const getWishlistByUserId = (req, res) => {
  const user_id = req.params.user_id || req.params.id;

  if (!user_id) {
    return res.status(400).json({ message: "user_id param is required" });
  }

  const sql = `
    SELECT p.id AS id, p.slogan, p.price, p.image
    FROM wishlist w
    INNER JOIN product p ON w.product_id = p.id
    WHERE w.user_id = ? AND w.status = 1
    ORDER BY w.id DESC
  `;

  connection.query(sql, [user_id], (error, result) => {
    if (error) {
      console.error("Error fetching wishlist:", error);
      return res.status(500).json({ message: "Error fetching wishlist" });
    }
    return res.json(result || []);
  });
};

module.exports = { addToWishlist, removeFromWishlist, getWishlistByUserId };
