import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import CartItem from "../components/CartItem";
import EmptyState from "../components/EmptyState";

function Cart() {
  const { cartItems, totalItems, totalPrice, clearCart } = useCart();

  // Empty cart state
  if (cartItems.length === 0) {
    return (
      <EmptyState
        title="Your cart is empty"
        message="Add some products and they will show up here."
      >
        <Link to="/" className="btn">
          Browse products
        </Link>
      </EmptyState>
    );
  }

  return (
    <div>
      <h1>Your Cart</h1>

      <div className="cart-layout">
        <div className="cart-list">
          {cartItems.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}
        </div>

        <div className="cart-summary">
          <h2>Summary</h2>
          <p className="summary-row">
            <span>Total items</span>
            <span>{totalItems}</span>
          </p>
          <p className="summary-row summary-total">
            <span>Total price</span>
            <span>${totalPrice.toFixed(2)}</span>
          </p>

          <button className="btn btn-outline" onClick={clearCart}>
            Clear cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default Cart;
