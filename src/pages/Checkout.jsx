import "./Checkout.css";
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import StoreHeader from "../components/StoreHeader";
import { useCart } from "../context/CartContext";
import StoreFooter from "../components/StoreFooter";
import axios from "axios";
import {
  ArrowLeft,
  MessageCircle,
  MapPin,
  User,
  Phone,
  ShoppingBag,
  Check,
  ChevronDown,
} from "lucide-react";
import { toast } from "react-toastify";

function Checkout() {


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
    setCart,
    setStoreUsername,
  } = useCart();

  useEffect(() => {
    setStoreUsername(storeUsername);
  }, [storeUsername, setStoreUsername]);

  const [orderData, setOrderData] = useState({
    customer: {
      name: "",
      whatsappNumber: "",
      email: "",
    },

    delivery: {
      address: "",
      city: "",
      note: "",
    },
  });

  const handleCustomerChange = (e) => {
    const { name, value } = e.target;

    setOrderData((prev) => ({
      ...prev,
      customer: {
        ...prev.customer,
        [name]: value,
      },
    }));
  };

  const handleDeliveryChange = (e) => {
    const { name, value } = e.target;

    setOrderData((prev) => ({
      ...prev,
      delivery: {
        ...prev.delivery,
        [name]: value,
      },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/product/orders`,
        {
          storeId: store._id,

          customer: orderData.customer,

          delivery: orderData.delivery,

          items: cart.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
          })),
        }
      );

      toast.success(response.data.msg);
      
      // Order successfully saved
      const order = response.data.order;

      const message = `
        New Order

        Order ID: ${order._id}

        Customer Details:
        Name: ${order.customer.name}
        WhatsApp: ${order.customer.whatsappNumber}
        Email: ${order.customer.email || "N/A"}

        Delivery Details:
        Address: ${order.delivery.address}
        City: ${order.delivery.city}
        Note: ${order.delivery.note || "N/A"}

        Products:
        ${order.items
                  .map(
                    (item) =>
                      `${item.productName}
        Rs. ${item.price} × ${item.quantity} = Rs. ${item.total}`
                  )
                  .join("\n\n")}

        Total Amount: Rs. ${order.totalAmount}
        `;

      const whatsappNumber = store.whatsappNumber.replace(/\D/g, "");

      const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
        message
      )}`;

      window.open(whatsappUrl, "_blank");

      setCart([]);

    } catch (error) {
      toast.error(error.response?.data || error);
    }
  };


  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="checkout-page min-h-screen bg-[#FAF8F4] text-[#1E1C1A] font-['Inter',sans-serif]">
      <StoreHeader
        store={store}
        storeUsername={storeUsername}
      />

      <section className="max-w-[1180px] mx-auto px-6 py-10">
        {/* ---------- breadcrumb + back link ---------- */}
        <div className="flex items-center justify-between gap-3 flex-wrap mb-3">
          <div className="flex items-center gap-1.5 text-[13px] text-[#716B63]">
            <span>Store</span>
            <span>/</span>
            <span>Cart</span>
            <span>/</span>
            <span className="text-[#1E1C1A] font-medium">Checkout</span>
          </div>

          <a
            href="#"
            className="inline-flex items-center gap-1.5 text-[13px] font-medium text-[#716B63] hover:text-[#1E1C1A] transition-colors"
          >
            <ArrowLeft size={14} />
            Back to Cart
          </a>
        </div>

        {/* ---------- heading ---------- */}
        <h1 className="font-['Playfair_Display',serif] font-bold text-2xl sm:text-3xl mb-8">
          Checkout
        </h1>
        <form onSubmit={handleSubmit}>

          <div className="flex flex-col lg:flex-row gap-10 items-start">
            {/* ===================== LEFT COLUMN ===================== */}
            <div className="w-full lg:w-[62%] flex flex-col gap-6">
              {/* ---------- customer information ---------- */}
              <div className="bg-white border border-[#E6E1D8] rounded-xl p-6 shadow-[0_1px_2px_rgba(30,28,26,0.04)]">
                <h2 className="font-semibold text-base mb-5">Customer Information</h2>

                <div className="flex flex-col gap-4">
                  <div>
                    <label className="flex items-center gap-1.5 text-[13px] font-medium text-[#1E1C1A] mb-1.5">
                      <User size={13} className="text-[#716B63]" />
                      Full Name
                    </label>
                    <input
                      type="text"
                      placeholder="Enter your full name"
                      className="checkout-input"
                      name="name"
                      value={orderData.customer.name}
                      onChange={handleCustomerChange}
                    />
                  </div>

                  <div>
                    <label className="flex items-center gap-1.5 text-[13px] font-medium text-[#1E1C1A] mb-1.5">
                      <Phone size={13} className="text-[#716B63]" />
                      WhatsApp Number
                    </label>
                    <input
                      type="tel"
                      placeholder="03XX XXXXXXX"
                      className="checkout-input"
                      name="whatsappNumber"
                      value={orderData.customer.whatsappNumber}
                      onChange={handleCustomerChange}
                    />
                  </div>

                  <div>
                    <label className="flex items-center justify-between text-[13px] font-medium text-[#1E1C1A] mb-1.5">
                      <span>Email</span>
                      <span className="text-[11px] font-normal text-[#A39C92]">Optional</span>
                    </label>
                    <input
                      type="email"
                      placeholder="Enter your email"
                      className="checkout-input"
                      name="email"
                      value={orderData.customer.email}
                      onChange={handleCustomerChange}
                    />
                  </div>
                </div>
              </div>

              {/* ---------- delivery information ---------- */}
              <div className="bg-white border border-[#E6E1D8] rounded-xl p-6 shadow-[0_1px_2px_rgba(30,28,26,0.04)]">
                <h2 className="font-semibold text-base mb-5">Delivery Information</h2>

                <div className="flex flex-col gap-4">
                  <div>
                    <label className="flex items-center gap-1.5 text-[13px] font-medium text-[#1E1C1A] mb-1.5">
                      <MapPin size={13} className="text-[#716B63]" />
                      Address
                    </label>
                    <input
                      type="text"
                      placeholder="House / Street / Area"
                      className="checkout-input"
                      name="address"
                      value={orderData.delivery.address}
                      onChange={handleDeliveryChange}
                    />
                  </div>

                  <div className="flex flex-col gap-4">
                    <div>
                      <label className="flex items-center gap-1.5 text-[13px] font-medium text-[#1E1C1A] mb-1.5">
                        <MapPin size={13} className="text-[#716B63]" />
                        City
                      </label>
                      <input
                        type="text"
                        placeholder="City"
                        className="checkout-input"
                        name="city"
                        value={orderData.delivery.city}
                        onChange={handleDeliveryChange}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="flex items-center justify-between text-[13px] font-medium text-[#1E1C1A] mb-1.5">
                      <span>Delivery Note</span>
                      <span className="text-[11px] font-normal text-[#A39C92]">Optional</span>
                    </label>
                    <textarea
                      placeholder="Any instructions for the seller..."
                      rows={3}
                      className="checkout-input resize-y"
                      name="note"
                      value={orderData.delivery.note}
                      onChange={handleDeliveryChange}
                    ></textarea>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3 bg-[#25D366]/[0.06] border border-[#25D366]/20 rounded-xl p-5">
                <span className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-white border border-[#25D366]/25 text-[#25D366] shrink-0">
                  <MessageCircle size={16} />
                </span>
                <div>
                  <p className="font-semibold text-sm text-[#1E1C1A]">
                    Order confirmation via WhatsApp
                  </p>
                  <p className="text-[13px] text-[#716B63] mt-1 leading-relaxed">
                    After placing your order, WhatsApp will open with your order details so
                    you can confirm the order directly with the store.
                  </p>
                </div>
              </div>
            </div>

            <aside className="w-full lg:w-[38%] bg-white border border-[#E6E1D8] rounded-xl p-6 lg:sticky lg:top-24 shadow-[0_1px_2px_rgba(30,28,26,0.04),0_14px_28px_-16px_rgba(30,28,26,0.14)]">
              <h2 className="font-semibold text-base mb-5 flex items-center gap-2">
                <ShoppingBag size={16} className="text-[#716B63]" />
                Your Order
              </h2>

              {/* ---------- products ---------- */}
              <div className="flex flex-col gap-4">
                {cart.map((item) => (
                  <div key={item.productId} className="flex items-center gap-3">
                    <div className="w-14 h-14 rounded-lg overflow-hidden bg-[#F1ECE3] shrink-0">
                      <img src={item.image} alt={item.productName} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm text-[#1E1C1A] truncate">{item.productName}</p>
                      <p className="text-[12px] text-[#716B63]">Qty {item.quantity}</p>
                    </div>
                    <span className="text-sm font-semibold text-[#1E1C1A] shrink-0">
                      Rs. {item.price.toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>

              <div className="border-t border-[#E6E1D8] my-5" />

              {/* <div className="flex flex-col gap-3 text-sm">
              <div className="flex items-center justify-between text-[#716B63]">
                <span>Subtotal</span>
                <span className="text-[#1E1C1A] font-medium">
                  Rs. {subtotal.toLocaleString()}
                </span>
              </div>
              <div className="flex items-center justify-between text-[#716B63]">
                <span>Delivery</span>
                <span className="text-[#1E1C1A] font-medium">Calculated by store</span>
              </div>
            </div> */}

              <div />

              <div className="flex items-center justify-between mb-6">
                <span className="font-semibold text-[#1E1C1A]">Total</span>
                <span className="font-bold text-xl text-[#1E1C1A]">
                  Rs. {subtotal.toLocaleString()}
                </span>
              </div>

              {/* ---------- place order ---------- */}
              <button
                type="Submit"
                className="w-full inline-flex items-center justify-center gap-2 bg-[#1E1C1A] text-[#FAF8F4] font-semibold text-sm py-3.5 rounded-md hover:bg-black hover:-translate-y-0.5 transition-all"
              >
                <MessageCircle size={17} />
                Place Order on WhatsApp
              </button>
              <p className="text-[12px] text-[#A39C92] text-center mt-2.5">
                You'll be redirected to WhatsApp to confirm your order.
              </p>

              {/* ---------- trust points ---------- */}
              <div className="flex flex-col gap-2 mt-5 pt-5 border-t border-[#E6E1D8]">
                <div className="flex items-center gap-2 text-[12.5px] text-[#716B63]">
                  <Check size={13} className="text-[#25D366]" />
                  Order directly from the store
                </div>
                <div className="flex items-center gap-2 text-[12.5px] text-[#716B63]">
                  <Check size={13} className="text-[#25D366]" />
                  Secure WhatsApp confirmation
                </div>
                <div className="flex items-center gap-2 text-[12.5px] text-[#716B63]">
                  <Check size={13} className="text-[#25D366]" />
                  No online payment required
                </div>
              </div>
            </aside>

          </div>

        </form>
      </section>

      <StoreFooter store={store} />
    </div>
  );
}

export default Checkout;
