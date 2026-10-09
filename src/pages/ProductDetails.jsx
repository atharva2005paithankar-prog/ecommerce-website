import { Link, useParams } from "react-router-dom";
import { useCart } from "../context/CartContext";
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";
import EmptyState from "../components/EmptyState";

function ProductDetails({ products, loading, error, onRetry }) {
  // useParams reads the :id from the URL  (/product/3  ->  id = "3")
  const { id } = useParams();
  const { cartItems, addToCart } = useCart();

  if (loading) {
    return <Loader />;
  }
  if (error) {
    return <ErrorMessage message={error} onRetry={onRetry} />;
  }

  // The id from the URL is a string, so we convert it to a number
  const product = products.find((p) => p.id === Number(id));

  // If the id in the URL does not match any product
  if (!product) {
    return (
      <EmptyState
        title="Product not found"
        message="This product does not exist or was removed."
      >
        <Link to="/" className="btn">
          Back to products
        </Link>
      </EmptyState>
    );
  }

  // How many of this product are already in the cart?
  const itemInCart = cartItems.find((item) => item.id === product.id);

  return (
    <div>
      <Link to="/" className="back-link">
        &larr; Back to products
      </Link>

      <div className="details">
        <img src={product.image} alt={product.name} className="details-image" />

        <div className="details-info">
          <p className="product-category">{product.category}</p>
          <h1>{product.name}</h1>
          <p className="product-rating">Rating: {product.rating} / 5</p>
          <p className="details-price">${product.price.toFixed(2)}</p>
          <p className="details-description">{product.description}</p>

          <button className="btn" onClick={() => addToCart(product)}>
            Add to Cart
          </button>

          {itemInCart && (
            <p className="muted">
              {itemInCart.quantity} in your cart.{" "}
              <Link to="/cart">View cart</Link>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
