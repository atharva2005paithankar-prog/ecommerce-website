import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

function ProductCard({ product }) {
  const { addToCart } = useCart();

  return (
    <div className="product-card">
      <Link to={`/product/${product.id}`}>
        <img src={product.image} alt={product.name} className="product-image" />
      </Link>

      <div className="product-info">
        <p className="product-category">{product.category}</p>

        <Link to={`/product/${product.id}`} className="product-name">
          {product.name}
        </Link>

        <p className="product-rating">Rating: {product.rating} / 5</p>
        <p className="product-price">${product.price.toFixed(2)}</p>

        <button className="btn" onClick={() => addToCart(product)}>
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
