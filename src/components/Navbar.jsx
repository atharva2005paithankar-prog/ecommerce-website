import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

function Navbar() {
  const { totalItems } = useCart();

  return (
    <header className="navbar">
      <div className="navbar-inner">
        <Link to="/" className="logo">
          Mini Shop
        </Link>

        <Link to="/cart" className="cart-link" aria-label="Open cart">
          Cart
          <span className="cart-badge">{totalItems}</span>
        </Link>
      </div>
    </header>
  );
}

export default Navbar;
