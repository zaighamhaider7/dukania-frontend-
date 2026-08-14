import "./Store.css";
import axios from "axios";
import { useState, useEffect } from "react";
import {
  Store as StoreIcon,
  MessageCircle,
  ShoppingBag,
  Search,
  Eye,
  ArrowRight,
} from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";


// ---------------------------------------------------------------------
// Mock store + product data — replace this with real API data later.
// ---------------------------------------------------------------------

// const PRODUCTS = [
//   { id: 1, name: "Embroidered Kurti", price: 2450, image: "https://picsum.photos/seed/kurti/500/620" },
//   { id: 2, name: "Leather Wallet", price: 1800, image: "https://picsum.photos/seed/wallet/500/620" },
//   { id: 3, name: "Wireless Earbuds", price: 3999, image: "https://picsum.photos/seed/earbuds/500/620" },
//   { id: 4, name: "Chiffon Dupatta", price: 1350, image: "https://picsum.photos/seed/dupatta/500/620" },
//   { id: 5, name: "Cotton Bedsheet Set", price: 2100, image: "https://picsum.photos/seed/bedsheet/500/620" },
//   { id: 6, name: "Scented Candle Pack", price: 950, image: "https://picsum.photos/seed/candle/500/620" },
//   { id: 7, name: "Handmade Jewelry Set", price: 1600, image: "https://picsum.photos/seed/jewelry/500/620" },
//   { id: 8, name: "Kids Winter Hoodie", price: 2250, image: "https://picsum.photos/seed/hoodie/500/620" },
//   { id: 9, name: "Ceramic Mug Set", price: 1450, image: "https://picsum.photos/seed/mug/500/620" },
//   { id: 10, name: "Leather Sandals", price: 2800, image: "https://picsum.photos/seed/sandals/500/620" },
//   { id: 11, name: "Denim Jacket", price: 4200, image: "https://picsum.photos/seed/jacket/500/620" },
//   { id: 12, name: "Printed Cushion Cover", price: 750, image: "https://picsum.photos/seed/cushion/500/620" },
// ];

function Store() {

  const navigate = useNavigate();

  const { storeUsername } = useParams();

  const [store, setStore] = useState(null);

  const [Products, setProducts] = useState([]);

  const [notFound, setNotFound] = useState(false);



  useEffect(() => {
    const getStore = async () => {
      try {

        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/store/${storeUsername}`
        );

        setStore(response.data.store);
        setProducts(response.data.products);

      } catch (error) {
        if (error.response?.status === 404) {
          setNotFound(true);
        }
      }
    };

    getStore();
  }, [storeUsername]);

  if (notFound) {
    navigate("/404");
  }

  const [searchTerm, setSearchTerm] = useState("");

  const [sortBy, setSortBy] = useState("");

  const [cartCount, setCartCount] = useState(0);

  const handleAddToCart = () => {
    setCartCount(cartCount + 1);
  };

  const filteredProducts = Products.filter((product) =>
    product.productName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === "lowToHigh") return a.productPrice - b.productPrice;
    if (sortBy === "highToLow") return b.productPrice - a.productPrice;
    return 0; 
  });

  return (
    <div className="store-page">
      {/* ===================== HEADER ===================== */}
      <header className="store-header">
        <div className="store-header__inner">
          <div className="store-header__brand">
            {store?.logo ? (
              <img
                src={store.logo}
                alt={`${store.storeName} logo`}
                className="store-header__logo"
              />
            ) : (
              <div className="store-header__icon">
                <StoreIcon size={22} strokeWidth={1.7} />
              </div>
            )}

            <span className="store-header__name">
              {store?.storeName}
            </span>
          </div>

          <div className="store-header__actions">
            <button type="button" className="cart-button" aria-label="View cart">
              <ShoppingBag size={19} strokeWidth={1.7} />
              <span className="cart-button__count">{cartCount}</span>
            </button>

            <span className="store-header__divider" />

            <a
              href={`https://wa.me/${store?.whatsappNumber.replace(/\D/g, "")}`}
              target="_blank"
              rel="noreferrer"
              className="whatsapp-pill"
            >
              <MessageCircle size={15} className="whatsapp-pill__icon" />
              <span>Chat on WhatsApp</span>
            </a>
          </div>
        </div>
      </header>

      {/* ===================== HERO ===================== */}
      <section className="store-hero">
        <div className="store-hero__inner">
          <p className="store-hero__eyebrow">Welcome to</p>
          <h1 className="store-hero__title">{store?.storeName}</h1>
          {store?.description && (
            <p className="store-hero__desc">{store?.description}</p>
          )}
          <a href="#products" className="btn-dark store-hero__cta">
            Browse Products
            <ArrowRight size={15} />
          </a>
        </div>
      </section>

      {/* ===================== PRODUCTS ===================== */}
      <section id="products" className="store-products">
        <div className="store-products__inner">
          <div className="store-products__layout">
            {/* ---------- filter sidebar ---------- */}
            <aside className="store-filters">
              <div className="store-filters__group">
                <h3 className="store-filters__heading">Search Products</h3>
                <div className="store-search">
                  <Search size={16} className="store-search__icon" />
                  <input
                    type="text"
                    placeholder="Search products..."
                    className="store-search__input"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>

              <div className="store-filters__group">
                <h3 className="store-filters__heading">Sort by Price</h3>

                <label className="filter-radio">
                  <input
                    type="radio"
                    name="sortByPrice"
                    checked={sortBy === "lowToHigh"}
                    onChange={() => setSortBy("lowToHigh")}
                  />
                  <span className="filter-radio__mark" />
                  Price: Low to High
                </label>

                <label className="filter-radio">
                  <input
                    type="radio"
                    name="sortByPrice"
                    checked={sortBy === "highToLow"}
                    onChange={() => setSortBy("highToLow")}
                  />
                  <span className="filter-radio__mark" />
                  Price: High to Low
                </label>
              </div>
            </aside>

            {/* ---------- product grid ---------- */}
            <div className="store-products__main">
              <p className="store-products__count">
                {sortedProducts.length} product{sortedProducts.length !== 1 ? "s" : ""}
              </p>

              {sortedProducts.length > 0 ? (
                <div className="store-products__grid">
                  {sortedProducts.map((product) => (
                    <div key={product._id} className="product-card">
                      <div className="product-card__image-wrap">
                        <img
                          src={product.productImages?.[0]}
                          alt={product.productName}
                          className="product-card__image"
                        />
                        <button
                          type="button"
                          className="product-card__quick-add"
                          aria-label={`Add ${product.productName} to cart`}
                          onClick={handleAddToCart}
                        >
                          <ShoppingBag size={16} strokeWidth={1.8} />
                        </button>
                      </div>

                      <div className="product-card__body">
                        {/* the product name doubles as the "view details" link */}
                        <a href="#" className="product-card__name">
                          {product.productName}
                        </a>
                        <p className="product-card__price">
                          Rs.{product.productPrice.toLocaleString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="store-products__empty">
                  No products match your search. Try a different keyword.
                </p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ===================== FOOTER ===================== */}
      <footer className="store-footer">
        <div className="store-footer__inner">
          <div className="store-footer__brand">
            <span className="store-header__logo">
              <StoreIcon size={18} />
            </span>
            <div>
              <p className="store-footer__name">{store?.storeName}</p>
              <p className="store-footer__desc">
                Quality products, straight to your WhatsApp.
              </p>
            </div>
          </div>

          <a
            href={`https://wa.me/${store?.whatsappNumber.replace(/\D/g, "")}`}
            target="_blank"
            rel="noreferrer"
            className="whatsapp-pill"
          >
            <MessageCircle size={15} className="whatsapp-pill__icon" />
            <span>Chat on WhatsApp</span>
          </a>
        </div>

        <div className="store-footer__bottom">
          <span>© 2026 {store?.storeName}. All rights reserved.</span>
          <span>Powered by Dukania</span>
        </div>
      </footer>
    </div>
  );
}

export default Store;
