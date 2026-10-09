import { useState } from "react";
import SearchBar from "../components/SearchBar";
import CategoryFilter from "../components/CategoryFilter";
import ProductCard from "../components/ProductCard";
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";
import EmptyState from "../components/EmptyState";

function Home({ products, loading, error, onRetry }) {
  // State for the search box and the selected category
  const [searchText, setSearchText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Loading and error states
  if (loading) {
    return <Loader />;
  }
  if (error) {
    return <ErrorMessage message={error} onRetry={onRetry} />;
  }

  // Get the list of categories from the products (no duplicates)
  const categories = ["All", ...new Set(products.map((p) => p.category))];

  // Keep only the products that match BOTH the search text and the category
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchText.trim().toLowerCase());

    const matchesCategory =
      selectedCategory === "All" || product.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  function clearFilters() {
    setSearchText("");
    setSelectedCategory("All");
  }

  return (
    <div>
      <h1>Products</h1>

      <SearchBar value={searchText} onChange={setSearchText} />
      <CategoryFilter
        categories={categories}
        selectedCategory={selectedCategory}
        onSelect={setSelectedCategory}
      />

      <p className="muted result-count">
        Showing {filteredProducts.length} of {products.length} products
      </p>

      {/* Empty state when nothing matches */}
      {filteredProducts.length === 0 ? (
        <EmptyState
          title="No products found"
          message="Try a different search or choose another category."
        >
          <button className="btn" onClick={clearFilters}>
            Clear filters
          </button>
        </EmptyState>
      ) : (
        <div className="product-grid">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;
