import "./Cart.css";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

import {
  Store as StoreIcon,
  MessageCircle,
  ShoppingBag,
  ShoppingCart,
  Minus,
  Plus,
  Trash2,
  ChevronRight,
  ArrowRight,
} from "lucide-react";
import StoreHeader from "../components/StoreHeader";
import { useCart } from "../context/CartContext";
import StoreFooter from "../components/StoreFooter";

function Cart() {

  const { storeUsername } = useParams();

  const [store, setStore] = useState(null);

  useEffect(() => {
    const getStore = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/store/${storeUsername}`
        );

        setStore(response.data.store);
      } catch (error) {
        console.log(error);
      }
    };

    getStore();
  }, [storeUsername]);

  const {
    cart,
    setStoreUsername,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
  } = useCart();

  useEffect(() => {
    setStoreUsername(storeUsername);
  }, [storeUsername, setStoreUsername]);


  // purely for display — not real cart logic, just rendering totals for the static list above
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discount = Math.round(subtotal * 0.2);
  const deliveryFee = 0;
  const total = subtotal - discount + deliveryFee;
  const isEmpty = cart.length === 0;

  return (
    <div className="cart-page min-h-screen bg-[#FAF8F4] text-[#1E1C1A] font-['Inter',sans-serif]">
      <StoreHeader
        store={store}
        storeUsername={storeUsername}
      />

      {/* ===================== CART CONTENT ===================== */}
      {isEmpty ? (
        /* ---------- empty cart state ---------- */
        <section className="max-w-[520px] mx-auto px-6 py-24 text-center">
          <span className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#F1ECE3] text-[#716B63] mb-6">
            <ShoppingCart size={28} />
          </span>
          <h1 className="font-['Playfair_Display',serif] font-bold text-2xl mb-2">
            Your cart is empty
          </h1>
          <p className="text-[#716B63] text-sm mb-8">
            Looks like you haven't added anything yet.
          </p>
          <a
            href="#"
            className="inline-flex items-center gap-2 bg-[#1E1C1A] text-[#FAF8F4] font-semibold text-sm px-7 py-3.5 rounded-md hover:bg-black hover:-translate-y-0.5 transition-all"
          >
            Continue Shopping
            <ArrowRight size={15} />
          </a>
        </section>
      ) : (
        <section className="max-w-[1180px] mx-auto px-6 py-10">
          {/* ---------- breadcrumb ---------- */}
          <div className="flex items-center gap-1.5 text-[13px] text-[#716B63] mb-4">
            <a href="#" className="hover:text-[#1E1C1A] transition-colors">
              Home
            </a>
            <ChevronRight size={13} />
            <span className="text-[#1E1C1A] font-medium">Cart</span>
          </div>

          {/* ---------- heading ---------- */}
          <h1 className="font-['Playfair_Display',serif] font-bold text-2xl sm:text-3xl uppercase tracking-wide mb-8">
            Your Cart
          </h1>

          <div className="flex flex-col lg:flex-row gap-10 items-start">
            {/* ---------- cart items: compact horizontal rows ---------- */}
            <div className="w-full lg:w-[62%]">
              {cart.map((item) => (
                <div
                  key={item.productId}
                  className="flex gap-4 py-6 border-b border-[#E6E1D8] first:pt-0 last:border-b-0"
                >
                  {/* image */}
                  <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-lg overflow-hidden bg-[#F1ECE3] shrink-0">
                    <img
                      src={item.image}
                      alt={item.productName}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* info + price + quantity */}
                  <div className="flex-1 min-w-0 flex flex-col justify-between">

                    <div className="flex items-start justify-between gap-3">

                      <div className="min-w-0">
                        <h3 className="font-semibold text-[15px] text-[#1E1C1A] truncate">
                          {item.productName}
                        </h3>
                      </div>

                      {/* remove */}
                      <button
                        type="button"
                        className="text-[#C0524A] hover:text-[#9c3f38] transition-colors shrink-0"
                        aria-label={`Remove ${item.productName}`}
                        onClick={() => removeFromCart(item.productId)}
                      >
                        <Trash2 size={16} />
                      </button>

                    </div>

                    <div className="flex items-end justify-between mt-3">

                      {/* price */}
                      <div className="flex items-baseline gap-2">
                        <span className="font-semibold text-[15px] text-[#1E1C1A]">
                          Rs. {item.price.toLocaleString()}
                        </span>
                      </div>

                      {/* quantity */}
                      <div className="inline-flex items-center border border-[#E6E1D8] rounded-md">

                        <button
                          type="button"
                          className="w-7 h-7 inline-flex items-center justify-center text-[#1E1C1A] hover:bg-[#F1ECE3] transition-colors"
                          aria-label="Decrease quantity"
                          onClick={() => decreaseQuantity(item.productId)}
                        >
                          <Minus size={12} />
                        </button>

                        <span className="w-7 text-center text-[13px] font-medium border-l border-r border-[#E6E1D8] leading-7">
                          {item.quantity}
                        </span>

                        <button
                          type="button"
                          className="w-7 h-7 inline-flex items-center justify-center text-[#1E1C1A] hover:bg-[#F1ECE3] transition-colors"
                          aria-label="Increase quantity"
                          onClick={() => increaseQuantity(item.productId)}
                        >
                          <Plus size={12} />
                        </button>

                      </div>

                    </div>

                  </div>
                </div>
              ))}
            </div>

            {/* ---------- order summary ---------- */}
            <aside className="w-full lg:w-[38%] bg-white border border-[#E6E1D8] rounded-xl p-6 lg:sticky lg:top-24">
              <h2 className="font-semibold text-lg mb-5">Order Summary</h2>

              <div className="flex flex-col gap-3 text-sm">
                <div className="flex items-center justify-between text-[#716B63]">
                  <span>Subtotal</span>
                  <span className="text-[#1E1C1A] font-medium">
                    Rs. {subtotal.toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center justify-between text-[#716B63]">
                  <span>Discount (-20%)</span>
                  <span className="text-[#C0524A] font-medium">
                    -Rs. {discount.toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center justify-between text-[#716B63]">
                  <span>Delivery Fee</span>
                  <span className="text-[#1E1C1A] font-medium">
                    Rs. {deliveryFee.toLocaleString()}
                  </span>
                </div>
              </div>

              <div className="border-t border-[#E6E1D8] my-5" />

              <div className="flex items-center justify-between mb-6">
                <span className="font-semibold text-[#1E1C1A]">Total</span>
                <span className="font-bold text-xl text-[#1E1C1A]">
                  Rs. {total.toLocaleString()}
                </span>
              </div>

              {/* coupon row */}
              <div className="flex items-center gap-2 mb-4">
                <input
                  type="text"
                  placeholder="Enter promo code"
                  className="flex-1 min-w-0 border border-[#E6E1D8] rounded-md px-3 py-2.5 text-sm bg-[#FAF8F4] placeholder:text-[#A39C92] focus:outline-none focus:border-[#1E1C1A] transition-colors"
                />
                <button
                  type="button"
                  className="shrink-0 px-4 py-2.5 rounded-md bg-[#1E1C1A] text-[#FAF8F4] text-sm font-semibold hover:bg-black transition-colors"
                >
                  Apply
                </button>
              </div>

              {/* checkout — full-width dark primary button */}
              <button
                type="button"
                className="w-full inline-flex items-center justify-center gap-2 bg-[#1E1C1A] text-[#FAF8F4] font-semibold text-sm py-3.5 rounded-md hover:bg-black hover:-translate-y-0.5 transition-all"
              >
                Go to Checkout
                <ArrowRight size={15} />
              </button>
            </aside>
          </div>
        </section>
      )}

      <StoreFooter store={store} />
    </div>
  );
}

export default Cart;
