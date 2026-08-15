import "./ProductDetails.css";
import { useState, useEffect } from "react";
import {
  Store as StoreIcon,
  MessageCircle,
  ShoppingBag,
  Star,
  Minus,
  Plus,
  CheckCircle2,
  XCircle,
  Zap,
  ShieldCheck,
  BadgeCheck,
  ChevronRight,
} from "lucide-react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";


// ---------------------------------------------------------------------
// Mock data — replace with real API data later.
// ---------------------------------------------------------------------
const STORE = {
  name: "Sana's Boutique",
  whatsappNumber: "923001234567",
};

const PRODUCT = {
  name: "Embroidered Kurti",
  rating: 4.5,
  reviewCount: 128,
  price: 2450,
  originalPrice: 2999,
  stock: 10, // set to 0 to preview the "Out of Stock" state
  description:
    "A hand-embroidered kurti made from breathable lawn cotton, finished with delicate thread work along the neckline and sleeves. Comfortable for everyday wear and elegant enough for small gatherings. Pairs well with trousers or a chiffon dupatta.",
  images: [
    "https://picsum.photos/seed/kurti-main/800/1000",
    "https://picsum.photos/seed/kurti-2/800/1000",
    "https://picsum.photos/seed/kurti-3/800/1000",
    "https://picsum.photos/seed/kurti-4/800/1000",
  ],
  variants: [
    { name: "Color", options: ["Black", "White", "Blue"] },
    { name: "Size", options: ["Small", "Medium", "Large", "XL"] },
  ],
};

const RELATED_PRODUCTS = [
  { id: 1, name: "Chiffon Dupatta", price: 1350, originalPrice: null, image: "https://picsum.photos/seed/dupatta/500/620" },
  { id: 2, name: "Leather Wallet", price: 1800, originalPrice: 2200, image: "https://picsum.photos/seed/wallet/500/620" },
  { id: 3, name: "Handmade Jewelry Set", price: 1600, originalPrice: null, image: "https://picsum.photos/seed/jewelry/500/620" },
  { id: 4, name: "Leather Sandals", price: 2800, originalPrice: 3400, image: "https://picsum.photos/seed/sandals/500/620" },
];

const INFO_STRIP = [
  { icon: MessageCircle, title: "WhatsApp Ordering", desc: "Order directly through chat" },
  { icon: Zap, title: "Fast Response", desc: "Replies within minutes" },
  { icon: ShieldCheck, title: "Secure Shopping", desc: "Trusted local seller" },
  { icon: BadgeCheck, title: "Quality Products", desc: "Checked before dispatch" },
];

function ProductDetails() {

  const [product, setProducts] = useState(null);

  const [store, setStore] = useState(null);


  const { storeUsername, productId } = useParams();

  const getProductData = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/product/store/${storeUsername}/product/${productId}`
      );
      if (response) {
        setProducts(response.data.product)
        setStore(response.data.store)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getProductData();
  }, [storeUsername, productId]);

  const [activeImage, setActiveImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const [selectedVariants, setSelectedVariants] = useState({});

  const inStock = product?.stocks > 0;

  const decreaseQty = () => setQuantity((q) => Math.max(1, q - 1));
  const increaseQty = () => setQuantity((q) => q + 1);

  const selectVariant = (variantName, option) => {
    setSelectedVariants({ ...selectedVariants, [variantName]: option });
  };

  return (
    <div className="pd-page">
      {/* ===================== HEADER (same style as the Store page) ===================== */}
      <header className="pd-header">
        <div className="pd-header__inner">
          <div className="pd-header__brand">
            <span className="pd-header__logo">
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
            </span>
            <span className="pd-header__name">{store?.storeName}</span>
          </div>

          <div className="pd-header__actions">
            <button type="button" className="pd-cart-button" aria-label="View cart">
              <ShoppingBag size={19} strokeWidth={1.7} />
              <span className="pd-cart-button__count">0</span>
            </button>

            <span className="pd-header__divider" />

            <a
              href={`https://wa.me/${store?.whatsappNumber.replace(/\D/g, "")}`}
              target="_blank"
              rel="noreferrer"
              className="pd-whatsapp-pill"
            >
              <MessageCircle size={15} className="pd-whatsapp-pill__icon" />
              <span>Chat on WhatsApp</span>
            </a>
          </div>
        </div>
      </header>

      {/* ===================== BREADCRUMB ===================== */}
      <div className="pd-breadcrumb">
        <div className="pd-breadcrumb__inner">
          <Link to={`/store/${storeUsername}`}>{store?.storeName}</Link>
          <ChevronRight size={13} />
          <span>{product?.productName}</span>
        </div>
      </div>

      {/* ===================== MAIN PRODUCT SECTION ===================== */}
      <section className="pd-main">
        <div className="pd-main__inner">
          {/* ---------- gallery ---------- */}
          <div className="pd-gallery">
            <div className="pd-gallery__main">
              <img src={product?.productImages[activeImage]} alt={product?.productName} />
            </div>

            <div className="pd-gallery__thumbs">
              {product?.productImages.map((img, index) => (
                <button
                  key={img}
                  type="button"
                  className={`pd-gallery__thumb ${index === activeImage ? "pd-gallery__thumb--active" : ""
                    }`}
                  onClick={() => setActiveImage(index)}
                  aria-label={`Show image ${index + 1}`}
                >
                  <img src={img} alt="" />
                </button>
              ))}
            </div>
          </div>

          {/* ---------- product info ---------- */}
          <div className="pd-info">
            <h1 className="pd-info__name">{product?.productName}</h1>

            {/* <div className="pd-rating">
              <div className="pd-rating__stars">
                {[1, 2, 3, 4, 5].map((n) => (
                  <Star
                    key={n}
                    size={15}
                    fill={n <= Math.round(PRODUCT.rating) ? "currentColor" : "none"}
                  />
                ))}
              </div>
              <span className="pd-rating__value">{PRODUCT.rating}</span>
              <span className="pd-rating__count">({PRODUCT.reviewCount} reviews)</span>
            </div> */}

            {/* <div className="pd-price-row">
              <span className="pd-price">Rs. {product?.productPrice.toLocaleString()}</span>
              {product?.discountPrice && (
                <span className="pd-price__original">
                  Rs. {product?.discountPrice.toLocaleString()}
                </span>
              )}

            </div> */}
            <div className="pd-price-row">
              <span className="pd-price">
                Rs. {(product?.discountPrice || product?.productPrice)?.toLocaleString()}
              </span>

              {product?.discountPrice && (
                <span className="pd-price__original">
                  Rs. {product.productPrice.toLocaleString()}
                </span>
              )}
            </div>

            <div className={`pd-stock ${inStock ? "pd-stock--in" : "pd-stock--out"}`}>
              {inStock ? <CheckCircle2 size={16} /> : <XCircle size={16} />}
              <span>
                {inStock ? `In Stock` : "Out of Stock"}
                {inStock && (
                  <span className="pd-stock__count"> · {product?.stocks} pieces available</span>
                )}
              </span>
            </div>

            {/* ---------- description ---------- */}
            <div className="pd-section">
              <h3 className="pd-section__heading">Description</h3>
              <p className="pd-description">{product?.description}</p>
            </div>

            {/* ---------- variants ---------- */}
            {product?.variants.map((variant) => (
              <div className="pd-section" key={variant.name}>
                <h3 className="pd-section__heading">{variant.name}</h3>
                <div className="pd-variant-options">
                  {variant.options.map((option) => (
                    <button
                      key={option}
                      type="button"
                      className={`pd-variant-btn ${selectedVariants[variant.name] === option
                        ? "pd-variant-btn--active"
                        : ""
                        }`}
                      onClick={() => selectVariant(variant.name, option)}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            ))}

            {/* ---------- quantity ---------- */}
            <div className="pd-section">
              <h3 className="pd-section__heading">Quantity</h3>
              <div className="pd-qty">
                <button
                  type="button"
                  className="pd-qty__btn"
                  onClick={decreaseQty}
                  aria-label="Decrease quantity"
                >
                  <Minus size={14} />
                </button>
                <span className="pd-qty__value">{quantity}</span>
                <button
                  type="button"
                  className="pd-qty__btn"
                  onClick={increaseQty}
                  aria-label="Increase quantity"
                >
                  <Plus size={14} />
                </button>
              </div>
            </div>

            {/* ---------- actions ---------- */}
            <div className="pd-actions">
              <button type="button" className="pd-btn-primary" disabled={!inStock}>
                <MessageCircle size={18} />
                Order on WhatsApp
              </button>
              <button type="button" className="pd-btn-secondary" disabled={!inStock}>
                <ShoppingBag size={17} />
                Add to Cart
              </button>
            </div>

            {/* ---------- store context ---------- */}
            <Link to={`/store/${storeUsername}`}
              className="pd-store-context">
              <span className="pd-header__logo">
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
              </span>
              <div className="pd-store-context__text">
                <p className="pd-store-context__name">{store?.storeName}</p>
                <p className="pd-store-context__link">View Store</p>
              </div>
              <ChevronRight size={16} className="pd-store-context__arrow" />
            </Link>
          </div>
        </div>
      </section>

      {/* ===================== INFO STRIP ===================== */}
      <section className="pd-info-strip">
        <div className="pd-info-strip__inner">
          {INFO_STRIP.map((item) => (
            <div className="pd-info-strip__item" key={item.title}>
              <span className="pd-info-strip__icon">
                <item.icon size={18} />
              </span>
              <div>
                <p className="pd-info-strip__title">{item.title}</p>
                <p className="pd-info-strip__desc">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ===================== RELATED PRODUCTS ===================== */}
      <section className="pd-related">
        <div className="pd-related__inner">
          <h2 className="pd-related__heading">You May Also Like</h2>

          <div className="pd-related__grid">
            {RELATED_PRODUCTS.map((product) => (
              <div key={product.id} className="pd-product-card">
                <div className="pd-product-card__image-wrap">
                  <img src={product.image} alt={product.name} />
                </div>
                <div className="pd-product-card__body">
                  <p className="pd-product-card__name">{product.name}</p>
                  <div className="pd-product-card__price-row">
                    <span className="pd-product-card__price">
                      Rs.{product.price.toLocaleString()}
                    </span>
                    {product.originalPrice && (
                      <span className="pd-product-card__price-original">
                        Rs.{product.originalPrice.toLocaleString()}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== FOOTER (same style as the Store page) ===================== */}
      <footer className="pd-footer">
        <div className="pd-footer__inner">
          <div className="pd-footer__brand">
            <span className="pd-header__logo">
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
            </span>
            <div>
              <p className="pd-footer__name">{store?.storeName}</p>
              <p className="pd-footer__desc">Quality products, straight to your WhatsApp.</p>
            </div>
          </div>

          <a
            href={`https://wa.me/${store?.whatsappNumber.replace(/\D/g, "")}`}
            target="_blank"
            rel="noreferrer"
            className="pd-whatsapp-pill"
          >
            <MessageCircle size={15} className="pd-whatsapp-pill__icon" />
            <span>Chat on WhatsApp</span>
          </a>
        </div>

        <div className="pd-footer__bottom">
          <span>© 2026 {STORE.name}. All rights reserved.</span>
          <span>Powered by Dukania</span>
        </div>
      </footer>
    </div>
  );
}

export default ProductDetails;
