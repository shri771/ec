import { useState } from "react";
import { useCart } from "../context/CartContext";
import CartDrawer from "./CartDrawer";
import "./Navbar.css";

export default function Navbar({ searchQuery, setSearchQuery }) {
  const { totalItems } = useCart();
  const [cartOpen, setCartOpen] = useState(false);

  return (
    <>
      <nav className="navbar">
        <div className="navbar-brand">
          <span className="brand-icon">⚡</span>
          <span className="brand-name">NexCart</span>
        </div>

        <div className="navbar-search">
          <div className="search-wrapper">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              className="search-input"
              placeholder="Search products, categories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button className="search-clear" onClick={() => setSearchQuery("")}>
                ✕
              </button>
            )}
          </div>
        </div>

        <div className="navbar-actions">
          <button
            className="cart-btn"
            onClick={() => setCartOpen(true)}
            aria-label="Open cart"
          >
            <span className="cart-icon">🛒</span>
            <span className="cart-label">Cart</span>
            {totalItems > 0 && (
              <span className="cart-badge">{totalItems}</span>
            )}
          </button>
        </div>
      </nav>

      <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
}
