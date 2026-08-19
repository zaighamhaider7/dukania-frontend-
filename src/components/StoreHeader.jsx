import { Link } from "react-router-dom";
import {
  Store as StoreIcon,
  ShoppingBag,
  MessageCircle,
} from "lucide-react";

import { useCart } from "../context/CartContext";

function StoreHeader({ store, storeUsername }) {

  const { cart } = useCart();

  const cartCount = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <header className="store-header">
      <div className="store-header__inner">

        {/* Brand */}
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

        {/* Actions */}
        <div className="store-header__actions">

          {/* Cart */}
          <Link
            to={`/store/${storeUsername}/cart`}
            className="cart-button"
            aria-label="View cart"
          >
            <ShoppingBag
              size={19}
              strokeWidth={1.7}
            />

            {cartCount > 0 && (
              <span className="cart-button__count">
                {cartCount}
              </span>
            )}
          </Link>

          <span className="store-header__divider" />

          {/* WhatsApp */}
          {store?.whatsappNumber && (
            <a
              href={`https://wa.me/${store.whatsappNumber.replace(/\D/g, "")}`}
              target="_blank"
              rel="noreferrer"
              className="whatsapp-pill"
            >
              <MessageCircle
                size={15}
                className="whatsapp-pill__icon"
              />

              <span>
                Chat on WhatsApp
              </span>
            </a>
          )}

        </div>

      </div>
    </header>
  );
}

export default StoreHeader;