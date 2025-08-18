const connection = require("../../connection/connection");

const addToCart = (req, res) => {
  const { user_id, product_id, variant_id, quantity = 1 } = req.body;
  if (!user_id || !product_id || !variant_id) {
    return res.status(400).json({ message: "user_id, product_id, and variant_id are required" });
  }
  const checkSql = `SELECT quantity, total_price FROM shopping_cart WHERE user_id = ? AND product_id = ? AND variant_id = ?`;
  connection.query(checkSql, [user_id, product_id, variant_id], (err, rows) => {
    if (err) {
      console.error("Error checking cart:", err);
      return res.status(500).json({ message: "Database error" });
    }
    // Fetch price to calculate total_price
    const priceSql = `SELECT final_price, price FROM product_variants WHERE id = ?`;
    connection.query(priceSql, [variant_id], (err2, priceRows) => {
      if (err2 || !priceRows[0]) {
        console.error("Error fetching price:", err2);
        return res.status(500).json({ message: "Error fetching product price" });
      }
      const price = priceRows[0].final_price || priceRows[0].price;
      const newTotalPrice = quantity * price;

      if (rows.length > 0) {
        const newQuantity = rows[0].quantity + quantity;
        const updateSql = `UPDATE shopping_cart SET quantity = ?, total_price = ? WHERE user_id = ? AND product_id = ? AND variant_id = ?`;
        connection.query(updateSql, [newQuantity, newQuantity * price, user_id, product_id, variant_id], (err3) => {
          if (err3) {
            console.error("Error updating cart:", err3);
            return res.status(500).json({ message: "Error updating cart" });
          }
          return res.status(200).json({ message: "Cart updated successfully" });
        });
      } else {
        const insertSql = `INSERT INTO shopping_cart (user_id, product_id, variant_id, quantity, total_price) VALUES (?, ?, ?, ?, ?)`;
        connection.query(insertSql, [user_id, product_id, variant_id, quantity, newTotalPrice], (err3) => {
          if (err3) {
            console.error("Error adding to cart:", err3);
            return res.status(500).json({ message: "Error adding to cart" });
          }
          const fetchProductSql = `
            SELECT 
              p.id, 
              p.slogan, 
              pv.price, 
              pv.discount,
              pv.final_price,
              p.image,
              pv.id AS variant_id,
              pv.memory,
              pv.storage
            FROM product p
            INNER JOIN product_variants pv ON p.id = pv.product_id
            WHERE p.id = ? AND pv.id = ?
            LIMIT 1
          `;
          connection.query(fetchProductSql, [product_id, variant_id], (err4, productRows) => {
            if (err4) {
              console.error("Error fetching product after insert:", err4);
              return res.status(201).json({ message: "Product added to cart" });
            }
            return res.status(201).json({
              message: "Product added to cart",
              product: productRows[0] || null,
            });
          });
        });
      }
    });
  });
};

const removeFromCart = (req, res) => {
  const { user_id, product_id, variant_id } = req.params;
  if (!user_id || !product_id || !variant_id) {
    return res.status(400).json({ message: "user_id, product_id, and variant_id are required" });
  }
  const sql = `DELETE FROM shopping_cart WHERE user_id = ? AND product_id = ? AND variant_id = ?`;
  connection.query(sql, [user_id, product_id, variant_id], (error) => {
    if (error) {
      console.error("Error removing from cart:", error);
      return res.status(500).json({ message: "Error removing from cart" });
    }
    return res.status(200).json({ message: "Product removed from cart successfully" });
  });
};

const getCartByUserId = (req, res) => {
  const user_id = req.params.user_id;
  if (!user_id) {
    return res.status(400).json({ message: "user_id param is required" });
  }
  const sql = `
    SELECT 
      p.id AS id, 
      p.slogan, 
      pv.price, 
      pv.discount,
      pv.final_price,
      p.image,
      pv.id AS variant_id,
      pv.memory,
      pv.storage,
      sc.quantity,
      sc.total_price
    FROM shopping_cart sc
    INNER JOIN product p 
      ON sc.product_id = p.id
    INNER JOIN product_variants pv 
      ON pv.id = sc.variant_id
    WHERE sc.user_id = ?
    ORDER BY sc.id DESC;
  `;
  connection.query(sql, [user_id], (error, cartItems) => {
    if (error) {
      console.error("Error fetching cart:", error);
      return res.status(500).json({ message: "Error fetching cart", error: error.message });
    }
    const subtotal = cartItems.reduce((sum, item) => sum + (item.total_price || 0), 0);
    const tax = 2999; // Hardcoded as per ShoppingCart.js
    const discount = 999; // Hardcoded as per ShoppingCart.js
    const total = subtotal + tax - discount;
    return res.json({
      items: cartItems || [],
      totals: { subtotal, tax, discount, total },
    });
  });
};

const updateCartQuantity = (req, res) => {
  const { user_id, product_id, variant_id, quantity } = req.body;
  if (!user_id || !product_id || !variant_id || !quantity) {
    return res.status(400).json({ message: "user_id, product_id, variant_id, and quantity are required" });
  }
  const priceSql = `SELECT final_price, price FROM product_variants WHERE id = ?`;
  connection.query(priceSql, [variant_id], (err, priceRows) => {
    if (err || !priceRows[0]) {
      console.error("Error fetching price:", err);
      return res.status(500).json({ message: "Error fetching product price" });
    }
    const price = priceRows[0].final_price || priceRows[0].price;
    const newTotalPrice = quantity * price;
    const sql = `UPDATE shopping_cart SET quantity = ?, total_price = ? WHERE user_id = ? AND product_id = ? AND variant_id = ?`;
    connection.query(sql, [quantity, newTotalPrice, user_id, product_id, variant_id], (error) => {
      if (error) {
        console.error("Error updating cart quantity:", error);
        return res.status(500).json({ message: "Error updating cart quantity" });
      }
      return res.status(200).json({ message: "Cart quantity updated successfully" });
    });
  });
};

module.exports = { addToCart, removeFromCart, getCartByUserId, updateCartQuantity };