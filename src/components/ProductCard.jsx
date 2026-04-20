import { useState } from "react";
import { useCart } from "../context/CartContext";
import "./ProductCard.css";

const formatINR = (amount) =>
  "₹" + amount.toLocaleString("en-IN");

export default function ProductCard({ product }) {
  const { addToCart, cartItems } = useCart();
  const [added, setAdded] = useState(false);
  const [imgError, setImgError] = useState(false);

  const inCart = cartItems.find((i) => i.id === product.id);
  const discount = product.originalPrice > product.price
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null;

  const handleAdd = () => {
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const stars = Array.from({ length: 5 }, (_, i) => {
    if (i < Math.floor(product.rating)) return "★";
    if (i < product.rating) return "½";
    return "☆";
  });

  return (
    <div className="product-card">
      <div className="product-img-wrap">
        <img
          src={imgError ? "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=400&fit=crop" : product.image}
          alt={product.name}
          className="product-img"
          onError={() => setImgError(true)}
          loading="lazy"
        />
        {product.badge && (
          <span className={`product-badge badge-${product.badge.toLowerCase().replace(" ", "-")}`}>
            {product.badge}
          </span>
        )}
        {discount && (
          <span className="discount-tag">−{discount}%</span>
        )}
        {!product.inStock && (
          <div className="out-of-stock-overlay">Out of Stock</div>
        )}
      </div>

      <div className="product-info">
        <p className="product-category">{product.category}</p>
        <h3 className="product-name">{product.name}</h3>
        <p className="product-desc">{product.description}</p>

        <div className="product-rating">
          <span className="stars" aria-label={`Rated ${product.rating} out of 5`}>
            {stars.map((s, i) => (
              <span key={i} className={s === "☆" ? "star-empty" : "star-filled"}>{s === "½" ? "★" : s}</span>
            ))}
          </span>
          <span className="rating-number">{product.rating}</span>
          <span className="review-count">({product.reviews.toLocaleString()})</span>
        </div>

        <div className="product-pricing">
          <span className="product-price">{formatINR(product.price)}</span>
          {product.originalPrice > product.price && (
            <span className="product-original">{formatINR(product.originalPrice)}</span>
          )}
        </div>

        <button
          className={`add-to-cart-btn ${added ? "added" : ""} ${!product.inStock ? "disabled" : ""}`}
          onClick={handleAdd}
          disabled={!product.inStock}
        >
          {!product.inStock
            ? "Out of Stock"
            : added
            ? "✓ Added!"
            : inCart
            ? `In Cart (${inCart.quantity}) • Add More`
            : "Add to Cart"}
        </button>
      </div>
    </div>
  );
}
