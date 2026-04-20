import { categories } from "../data/products";
import "./FilterBar.css";

export default function FilterBar({ activeCategory, setActiveCategory, sortBy, setSortBy, productCount }) {
  return (
    <div className="filter-bar">
      <div className="category-pills">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`category-pill ${activeCategory === cat ? "active" : ""}`}
            onClick={() => setActiveCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="filter-right">
        <span className="product-count">{productCount} product{productCount !== 1 ? "s" : ""}</span>
        <select
          className="sort-select"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="default">Featured</option>
          <option value="price-asc">Price: Low → High</option>
          <option value="price-desc">Price: High → Low</option>
          <option value="rating">Top Rated</option>
          <option value="name">Name A–Z</option>
        </select>
      </div>
    </div>
  );
}
