import { useCart } from "../context/CartContext";
import "./CartDrawer.css";

const formatINR = (amount) =>
  "₹" + amount.toLocaleString("en-IN");

export default function CartDrawer({ isOpen, onClose }) {
  const { cartItems, removeFromCart, updateQuantity, clearCart, totalPrice } = useCart();

  const handleCheckout = () => {
    alert("🎉 Order placed successfully! Thank you for shopping at NexCart.");
    clearCart();
    onClose();
  };

  return (
    <>
      <div
        className={`cart-overlay ${isOpen ? "open" : ""}`}
        onClick={onClose}
      />
      <aside className={`cart-drawer ${isOpen ? "open" : ""}`}>
        <div className="cart-header">
          <h2 className="cart-title">
            <span>🛒</span> Your Cart
          </h2>
          <button className="cart-close-btn" onClick={onClose}>
            ✕
          </button>
        </div>

        {cartItems.length === 0 ? (
          <div className="cart-empty">
            <div className="empty-icon">🛍️</div>
            <p>Your cart is empty</p>
            <span>Start adding some amazing products!</span>
          </div>
        ) : (
          <>
            <div className="cart-items">
              {cartItems.map((item) => (
                <div className="cart-item" key={item.id}>
                  <img
                    src={item.image}
                    alt={item.name}
                    className="cart-item-img"
                    onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=80&h=80&fit=crop"; }}
                  />
                  <div className="cart-item-info">
                    <h4 className="cart-item-name">{item.name}</h4>
                    <p className="cart-item-price">{formatINR(item.price)}</p>
                    <div className="cart-item-controls">
                      <button
                        className="qty-btn"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      >
                        −
                      </button>
                      <span className="qty-value">{item.quantity}</span>
                      <button
                        className="qty-btn"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div className="cart-item-right">
                    <p className="cart-item-total">
                      {formatINR(item.price * item.quantity)}
                    </p>
                    <button
                      className="remove-btn"
                      onClick={() => removeFromCart(item.id)}
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="cart-footer">
              <div className="cart-summary">
                <div className="summary-row">
                  <span>Subtotal</span>
                  <span>{formatINR(totalPrice)}</span>
                </div>
                <div className="summary-row">
                  <span>Shipping</span>
                  <span className="free-tag">FREE</span>
                </div>
                <div className="summary-row summary-total">
                  <span>Total</span>
                  <span>{formatINR(totalPrice)}</span>
                </div>
              </div>
              <button className="checkout-btn" onClick={handleCheckout}>
                Checkout — {formatINR(totalPrice)}
              </button>
              <button className="clear-btn" onClick={clearCart}>
                Clear Cart
              </button>
            </div>
          </>
        )}
      </aside>
    </>
  );
}
