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
import StoreHeader from "../components/StoreHeader";
import { useCart } from "../context/CartContext";
import StoreFooter from "../components/StoreFooter";


const INFO_STRIP = [
  { icon: MessageCircle, title: "WhatsApp Ordering", desc: "Order directly through chat" },
  { icon: Zap, title: "Fast Response", desc: "Replies within minutes" },
  { icon: ShieldCheck, title: "Secure Shopping", desc: "Trusted local seller" },
  { icon: BadgeCheck, title: "Quality Products", desc: "Checked before dispatch" },
];

function ProductDetails() {

  const [product, setProducts] = useState(null);

  const [store, setStore] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);

  const { storeUsername, productId } = useParams();

  const { cart,
    addToCart,
    increaseQuantity,
    decreaseQuantity, } = useCart();


  const getProductData = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/product/store/${storeUsername}/product/${productId}`
      );
      if (response) {
        setProducts(response.data.product)
        setStore(response.data.store)
        setRelatedProducts(response.data.relatedProducts)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getProductData();
  }, [storeUsername, productId]);

  const [activeImage, setActiveImage] = useState(0);

  const [selectedVariants, setSelectedVariants] = useState({});
  const [quantity, setQuantity] = useState(1);


  const inStock = product?.stocks > 0;

  const selectVariant = (variantName, option) => {
    setSelectedVariants({ ...selectedVariants, [variantName]: option });
  };

  const cartItem = cart.find(
    (item) => item.productId === productId
  );

  return (
    <div className="pd-page">
      <StoreHeader
        store={store}
        storeUsername={storeUsername}
      />
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
                  disabled={quantity === 1}
                  onClick={() => {
                    if (quantity > 1) {
                      setQuantity(quantity - 1);
                    }
                  }}
                  aria-label="Decrease quantity"
                >
                  <Minus size={14} />
                </button>
                <span className="pd-qty__value">{quantity}</span>
                <button
                  type="button"
                  className="pd-qty__btn"
                  onClick={() => setQuantity(quantity + 1)}
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
              <button type="button" className="pd-btn-secondary" disabled={!inStock} onClick={() => addToCart(product, quantity)}>
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
            {relatedProducts.map((product) => (
              <Link key={product._id}
                to={`/store/${storeUsername}/product/${product._id}`}
              >
                <div className="product-card">
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
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();

                        addToCart(product, 1);
                      }}
                    >
                      <ShoppingBag size={16} strokeWidth={1.8} />
                    </button>
                  </div>

                  <div className="product-card__body">
                    <h5 className="product-card__name">
                      {product.productName}
                    </h5>
                    <p className="product-card__price">
                      Rs.{product.productPrice.toLocaleString()}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <StoreFooter
        store={store}
      />
    </div>
  );
}

export default ProductDetails;
