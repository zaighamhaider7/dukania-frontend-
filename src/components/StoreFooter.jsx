import {
  Store as StoreIcon,
  MessageCircle,
} from "lucide-react";

function StoreFooter({ store }) {
  return (
    <footer className="store-footer">

      <div className="store-footer__inner">

        <div className="store-footer__brand">

          <span className="store-header__logo">
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
            <p className="store-footer__name">
              {store?.storeName}
            </p>

            <p className="store-footer__desc">
              Quality products, straight to your WhatsApp.
            </p>
          </div>

        </div>

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

      <div className="store-footer__bottom">
        <span>
          © 2026 {store?.storeName}. All rights reserved.
        </span>

        <span>
          Powered by Dukania
        </span>
      </div>

    </footer>
  );
}

export default StoreFooter;