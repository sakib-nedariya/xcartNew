const connection = require("../../connection/connection");


const getCouponData = (req, res) => {
  const sql = "SELECT * FROM coupon ORDER BY id DESC";
  connection.query(sql, (error, result) => {
    if (error) {
      console.log("Error Getting Data coupon Table in server.js" + error);
    }
    return res.json(result);
  });
};


const getCouponDataWithId = (req, res) => {
  const id = req.params.id
  const sql = `SELECT * FROM coupon WHERE id=${id}`;
  connection.query(sql, (error, result) => {
    if (error) {
      console.log("Error Getting Data coupon Table in server.js" + error);
    }
    return res.json(result);
  });
};


const createCouponData = (req, res) => {
  try {
    const { coupon_code, discount, max_price, min_price, start_date, expiry_date, status } = req.body;
    const sql = "INSERT INTO coupon (coupon_code, discount, max_price, min_price, start_date, expiry_date, status) VALUES (?, ?, ?, ?, ?, ?, ?)";
    const data = [coupon_code, discount, max_price, min_price, start_date, expiry_date, status];

    connection.query(sql, data, (error) => {
      if (error) {
        console.log("Error Adding coupon Data in server.js: ", error);
        return res.status(500).send("Error adding coupon data");
  

      } else {
        return res.sendStatus(200);
      }
    });
  } catch (error) {
    console.log("Error in server.js: ", error);
    return res.status(500).send("Internal server error");
  }
};

  const deleteCoupon = (req, res) => {
    try {
      
      const id = req.params.id;
      const sql =  `DELETE FROM coupon WHERE id= ${id}`

      connection.query(sql, (error) => {
        if (error) {
          console.log("Error Adding coupon Data in server.js: ", error);
          return res.status(500).send("Error adding coupon data");

        } else {
          return res.sendStatus(200);
        }
      });
    } catch (error) {
      console.log("Error in server.js: ", error);
      return res.status(500).send("Internal server error");
    }
  }


const editCouponData = (req, res) => {
  try {
    const id = req.params.id;
    const { coupon_code, discount, max_price, min_price, start_date, expiry_date, status } = req.body;

      sql = "UPDATE coupon SET coupon_code=?, discount=?, max_price=?, min_price=?, start_date=?, expiry_date=?, status=? WHERE id=?";
      data = [coupon_code, discount, max_price, min_price, start_date, expiry_date, status, id];
    

    connection.query(sql, data, (error) => {
      if (error) {
        console.log("Error Updating coupon Data in server.js: ", error);
        return res.status(500).send("Error updating coupon data");
      } else {
        return res.sendStatus(200);
      }
    });
  } catch (error) {
    console.log("Error in server.js: ", error);
    return res.status(500).send("Internal server error");
  }
};


// Apply Coupon
const applyCoupon = (req, res) => {
  try {
    const { coupon_code, subtotal } = req.body;

    const sql = "SELECT * FROM coupon WHERE coupon_code = ? AND status = 1";
    connection.query(sql, [coupon_code], (error, result) => {
      if (error) {
        console.log("Error applying coupon:", error);
        return res.status(500).send("Internal server error");
      }

      if (result.length === 0) {
        return res.status(400).json({ message: "Invalid or inactive coupon" });
      }

      const coupon = result[0];

      // check validity (date range)
      const today = new Date();
      if (today < new Date(coupon.start_date) || today > new Date(coupon.expiry_date)) {
        return res.status(400).json({ message: "Coupon expired or not active yet" });
      }

      // check min/max
      if (subtotal < coupon.min_price) {
        return res.status(400).json({ message: `Minimum purchase required ₹${coupon.min_price}` });
      }

      // discount calculation
      let discount = (subtotal * coupon.discount) / 100; // मान लो % discount है
      if (discount > coupon.max_price) discount = coupon.max_price;

      const total = subtotal - discount;

      return res.json({
        success: true,
        discount,
        total,
        message: "Coupon applied successfully"
      });
    });
  } catch (error) {
    console.log("applyCoupon error:", error);
    return res.status(500).send("Internal server error");
  }
};


module.exports = { getCouponData, getCouponDataWithId, createCouponData, deleteCoupon, editCouponData, applyCoupon };
