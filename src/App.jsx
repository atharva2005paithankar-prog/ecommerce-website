import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import NotFound from "./pages/NotFound";

function App() {
  // The product data is loaded once here and passed down to the pages
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Reads the local JSON file (public/products.json)
  function loadProducts() {
    setLoading(true);
    setError("");

    fetch("/products.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Could not load the products.");
        }
        return response.json();
      })
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Something went wrong while loading the products.");
        setLoading(false);
      });
  }

  // Run loadProducts one time when the app opens
  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <div>
      <Navbar />
      <main className="container">
        <Routes>
          <Route
            path="/"
            element={
              <Home
                products={products}
                loading={loading}
                error={error}
                onRetry={loadProducts}
              />
            }
          />
          <Route
            path="/product/:id"
            element={
              <ProductDetails
                products={products}
                loading={loading}
                error={error}
                onRetry={loadProducts}
              />
            }
          />
          <Route path="/cart" element={<Cart />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
