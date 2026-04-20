import { useState, useMemo } from "react";
import { CartProvider } from "./context/CartContext";
import Navbar from "./components/Navbar";
import FilterBar from "./components/FilterBar";
import ProductCard from "./components/ProductCard";
import { products } from "./data/products";
import "./App.css";

function ShopContent() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [sortBy, setSortBy] = useState("default");

  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Category filter
    if (activeCategory !== "All") {
      result = result.filter((p) => p.category === activeCategory);
    }

    // Search filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      );
    }

    // Sort
    switch (sortBy) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
      case "name":
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        break;
    }

    return result;
  }, [searchQuery, activeCategory, sortBy]);

  return (
    <div className="app">
      <Navbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      <main className="main-content">
        {/* Hero Banner */}
        <section className="hero-banner">
          <div className="hero-glow hero-glow-1" />
          <div className="hero-glow hero-glow-2" />
          <div className="hero-text">
            <p className="hero-tag">✨ New arrivals every week</p>
            <h1 className="hero-title">
              Next-Gen Tech,<br />
              <span className="gradient-text">Unbeatable Prices</span>
            </h1>
            <p className="hero-sub">
              Discover premium electronics, gadgets, and accessories curated for tech enthusiasts.
            </p>
          </div>
        </section>

        {/* Product Section */}
        <section className="products-section">
          <FilterBar
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
            sortBy={sortBy}
            setSortBy={setSortBy}
            productCount={filteredProducts.length}
          />

          {filteredProducts.length > 0 ? (
            <div className="products-grid">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="no-results">
              <div className="no-results-icon">🔍</div>
              <h3>No products found</h3>
              <p>Try a different search term or category</p>
            </div>
          )}
        </section>
      </main>

      <footer className="footer">
        <p>© 2025 NexCart — Your premium tech destination ⚡</p>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <CartProvider>
      <ShopContent />
    </CartProvider>
  );
}
