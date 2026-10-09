import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

function CartItem({ item }) {
  const { removeFromCart, increaseQuantity, decreaseQuantity } = useCart();

  return (
    <div className="cart-item">
      <img src={item.image} alt={item.name} className="cart-item-image" />

      <div className="cart-item-details">
        <Link to={`/product/${item.id}`} className="product-name">
          {item.name}
        </Link>
        <p className="muted">${item.price.toFixed(2)} each</p>

        <div className="quantity-box">
          <button
            className="quantity-button"
            onClick={() => decreaseQuantity(item.id)}
            disabled={item.quantity === 1}
            aria-label="Decrease quantity"
          >
            -
          </button>
          <span className="quantity-number">{item.quantity}</span>
          <button
            className="quantity-button"
            onClick={() => increaseQuantity(item.id)}
            aria-label="Increase quantity"
          >
            +
          </button>
        </div>
      </div>

      <div className="cart-item-right">
        <p className="cart-item-total">
          ${(item.price * item.quantity).toFixed(2)}
        </p>
        <button className="btn-link" onClick={() => removeFromCart(item.id)}>
          Remove
        </button>
      </div>
    </div>
  );
}

export default CartItem;
