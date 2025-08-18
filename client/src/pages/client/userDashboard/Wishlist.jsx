import Navbar from "../layout/Navbar";
import UserSidebar from "./UserSidebar";
import "../../../assets/css/client/userDashboard/wishlist.css";
import { MdOutlineCancel } from "react-icons/md";
import Footer from "../layout/Footer";
import { useWishlist } from "../../../context/WishlistContext";
import { useCart } from "../../../context/CartContext";
import noItemFound from "../../../assets/image/wishlist.jpg";
import { useNavigate } from "react-router-dom";

const WishList = () => {
  const { wishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const getFirstImage = (image) => {
    if (Array.isArray(image)) return image[0];
    try {
      const parsed = JSON.parse(image);
      return Array.isArray(parsed) ? parsed[0] : image;
    } catch {
      return image;
    }
  };

  const handleAddToCart = (product) => {
    addToCart(
      {
        ...product,
        price: product.price,
        final_price: product.final_price,
        discount: product.discount,
        memory: product.memory,
        storage: product.storage,
      },
      product.variant_id, 
      1 // pass quantity
    );
  };

  return (
    <>
      <Navbar />
      <div className="container-fluid userdashboard_main">
        <div className="container userdashboard_flex padding-main">
          <UserSidebar />
          <div className="userdashboard_main_content_div userdashboard_main_border">
            <h6>Wishlist</h6>
            <table>
              {wishlist.length > 0 && (
                <thead>
                  <tr>
                    <th>Products</th>
                    <th>Variant</th>
                    <th>Price</th>
                    <th>Status</th>
                    <th>Action</th>
                    <th></th>
                  </tr>
                </thead>
              )}
              <tbody>
                {wishlist.length === 0 ? (
                  <tr>
                    <td colSpan={6} align="center">
                      <img src={noItemFound} alt="No items in wishlist" />
                    </td>
                  </tr>
                ) : (
                  wishlist.map((product, index) => (
                    <tr key={index}>
                      <td
                        className="userdashboard_inner_content_div"
                        onClick={() =>
                          navigate(`/product/${product.id}`, {
                            state: { variant_id: product.variant_id },
                          })
                        }
                      >
                        <img
                          src={`/upload/${getFirstImage(product.image)}`}
                          alt="product_image"
                        />
                        <span className="shopping-cart-product-name">
                          {product.slogan}
                        </span>
                      </td>
                      <td>
                        {product.memory || product.storage ? (
                          <span
                            className="variant-details"
                            style={{ fontSize: "14px" }}
                          >
                            {product.memory && product.storage
                              ? `${product.memory}/${product.storage} GB`
                              : product.memory
                              ? `${product.memory} GB RAM`
                              : product.storage
                              ? `${product.storage} GB Storage`
                              : "No Variant"}
                          </span>
                        ) : (
                          "No Variant"
                        )}
                      </td>
                      <td>
                        <div className="price">
                          {product.discount > 0 && (
                            <>
                              <span className="product-old-price">
                                ₹{product.price}
                              </span>
                            </>
                          )}
                          <span className="product-new-price">
                            ₹{product.final_price}
                          </span>
                        </div>
                      </td>
                      <td className="product-in-stock">In Stock</td>
                      <td>
                        <button
                          className="primary-btn wishlist_add_to_cart_btn"
                          onClick={() => handleAddToCart(product)}
                        >
                          Add to Cart
                        </button>
                      </td>
                      <td>
                        <span
                          className="product-remove-btn"
                          title="Remove"
                          onClick={() =>
                            removeFromWishlist(product.id, product.variant_id)
                          }
                        >
                          <MdOutlineCancel />
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default WishList;
