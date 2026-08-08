import "./Home.css";
import { useState, useEffect, useRef } from "react";
import {
  Store,
  Package,
  Share2,
  MessageCircle,
  Menu,
  X,
  Check,
  ChevronDown,
  Globe,
  ArrowRight,
  Zap,
  Smartphone,
  Search,
  Lock,
  Image as ImageIcon,
  LayoutGrid,
  TrendingUp,
  Clock,
  RefreshCcw,
  HelpCircle,
  UserPlus,
  Link2,
  Eye,
  ShoppingBag,
  ArrowDown,
  Sparkles,
  BarChart3,
  Settings,
  ListOrdered,
  // Facebook,
  // Instagram,
  // Twitter,
  CheckCircle2,
} from "lucide-react";

function Home() {
  // mobile nav menu open/closed
  const [menuOpen, setMenuOpen] = useState(false);

  // adds a shadow/border to the navbar once the page is scrolled
  const [scrolled, setScrolled] = useState(false);

  // simple English / Urdu toggle for the hero + nav text
  const [lang, setLang] = useState("en");

  // which FAQ item is open (-1 = none open)
  const [openFaq, setOpenFaq] = useState(0);

  // plays the "How It Works" chat bubbles in once they scroll into view
  const [chatVisible, setChatVisible] = useState(false);
  const chatRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setChatVisible(true);
      },
      { threshold: 0.25 }
    );
    if (chatRef.current) observer.observe(chatRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <>
    <div className="page">
      {/* ===================== NAVBAR ===================== */}
      <header className={`nav-shell ${scrolled ? "nav-shell--scrolled" : ""}`}>
        <div className="mx-auto w-full max-w-6xl px-6 flex h-[72px] items-center justify-between">
          <a href="#home" className="flex items-center gap-2 shrink-0">
            <span className="logo-mark">
              <MessageCircle size={18} strokeWidth={2.5} />
            </span>
            <span className="logo-word">Dukania</span>
          </a>

          <nav className="hidden lg:flex items-center gap-1">
            <a href="#home" className="nav-link">
              {lang === "en" ? "Home" : "ہوم"}
            </a>
            <a href="#features" className="nav-link">
              {lang === "en" ? "Features" : "خصوصیات"}
            </a>
            <a href="#how-it-works" className="nav-link">
              {lang === "en" ? "How It Works" : "طریقہ کار"}
            </a>
            <a href="#pricing" className="nav-link">
              {lang === "en" ? "Pricing" : "قیمت"}
            </a>
            <a href="#faq" className="nav-link">
              {lang === "en" ? "FAQ" : "سوالات"}
            </a>
            <a href="#contact" className="nav-link">
              {lang === "en" ? "Contact" : "رابطہ"}
            </a>
          </nav>

          <div className="hidden lg:flex items-center gap-3">
            <button
              onClick={() => setLang(lang === "en" ? "ur" : "en")}
              className="lang-pill"
              aria-label="Switch language"
            >
              <Globe size={14} />
              {lang === "en" ? "اردو" : "English"}
            </button>
            <a href="/login" className="nav-link">
              {lang === "en" ? "Log In" : "لاگ ان"}
            </a>
            <a href="/register" className="btn btn--primary btn--sm">
              {lang === "en" ? "Get Started" : "شروع کریں"}
            </a>
          </div>

          <button
            className="lg:hidden inline-flex items-center justify-center h-10 w-10 rounded-lg"
            style={{ color: "var(--ink)" }}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {menuOpen && (
          <div className="lg:hidden border-t" style={{ borderColor: "var(--line)" }}>
            <div className="mx-auto w-full max-w-6xl px-6 flex flex-col gap-1 py-4">
              <a href="#home" className="nav-link nav-link--mobile" onClick={() => setMenuOpen(false)}>
                {lang === "en" ? "Home" : "ہوم"}
              </a>
              <a href="#features" className="nav-link nav-link--mobile" onClick={() => setMenuOpen(false)}>
                {lang === "en" ? "Features" : "خصوصیات"}
              </a>
              <a href="#how-it-works" className="nav-link nav-link--mobile" onClick={() => setMenuOpen(false)}>
                {lang === "en" ? "How It Works" : "طریقہ کار"}
              </a>
              <a href="#pricing" className="nav-link nav-link--mobile" onClick={() => setMenuOpen(false)}>
                {lang === "en" ? "Pricing" : "قیمت"}
              </a>
              <a href="#faq" className="nav-link nav-link--mobile" onClick={() => setMenuOpen(false)}>
                {lang === "en" ? "FAQ" : "سوالات"}
              </a>
              <a href="#contact" className="nav-link nav-link--mobile" onClick={() => setMenuOpen(false)}>
                {lang === "en" ? "Contact" : "رابطہ"}
              </a>
              <div className="mt-3 flex items-center gap-3">
                <button onClick={() => setLang(lang === "en" ? "ur" : "en")} className="lang-pill">
                  <Globe size={14} />
                  {lang === "en" ? "اردو" : "English"}
                </button>
                <a href="/register" className="btn btn--primary btn--sm flex-1 justify-center">
                  {lang === "en" ? "Get Started" : "شروع کریں"}
                </a>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* ===================== HERO ===================== */}
      <section id="home" className="hero">
        <div className="mx-auto w-full max-w-6xl px-6 grid items-center gap-16 lg:grid-cols-2 pt-16 pb-24">
          <div dir={lang === "en" ? "ltr" : "rtl"}>
            <span className="eyebrow">
              <span className="eyebrow-dot" />
              {lang === "en" ? "Built for shop owners who sell on WhatsApp" : "واٹس ایپ پر فروخت کرنے والے دکانداروں کے لیے"}
            </span>

            <h1 className="hero-title mt-5">
              {lang === "en"
                ? "Create Your Online Store & Receive Orders on WhatsApp"
                : "اپنا آن لائن اسٹور بنائیں اور واٹس ایپ پر آرڈرز وصول کریں"}
            </h1>

            <p className="hero-sub mt-6 max-w-xl">
              {lang === "en"
                ? "Local shop owners are building beautiful storefronts in minutes — showcase every product once, share a single link, and let orders land straight in your WhatsApp."
                : "مقامی دکاندار منٹوں میں خوبصورت اسٹور بنا رہے ہیں — ہر پروڈکٹ ایک بار دکھائیں، ایک لنک شیئر کریں، اور آرڈرز براہ راست واٹس ایپ پر حاصل کریں۔"}
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-4">
              <a href="#pricing" className="btn btn--primary">
                {lang === "en" ? "Get Started Free" : "مفت شروع کریں"}
                <ArrowRight size={16} />
              </a>
              <a href="#how-it-works" className="btn btn--ghost">
                {lang === "en" ? "Watch Demo" : "ڈیمو دیکھیں"}
              </a>
            </div>

            <div className="mt-10 flex items-center gap-6 hero-trust">
              <div className="flex -space-x-3">
                <span className="hero-avatar" style={{ background: "#25D366" }} />
                <span className="hero-avatar" style={{ background: "#128C7E" }} />
                <span className="hero-avatar" style={{ background: "#F15C4F" }} />
                <span className="hero-avatar" style={{ background: "#1F2937" }} />
              </div>
              <p>
                <strong>2,400+</strong> shop owners already taking orders on WhatsApp
              </p>
            </div>
          </div>

          {/* dashboard mockup */}
          <div className="hero-mock">
            <div className="hero-mock__chrome">
              <span />
              <span />
              <span />
            </div>
            <div className="hero-mock__body">
              <div className="hero-mock__side">
                <div className="hero-mock__side-item hero-mock__side-item--active">
                  <Store size={14} /> Store
                </div>
                <div className="hero-mock__side-item">
                  <Package size={14} /> Products
                </div>
                <div className="hero-mock__side-item">
                  <ListOrdered size={14} /> Orders
                </div>
                <div className="hero-mock__side-item">
                  <BarChart3 size={14} /> Analytics
                </div>
                <div className="hero-mock__side-item">
                  <Settings size={14} /> Settings
                </div>
              </div>
              <div className="hero-mock__main">
                <div className="hero-mock__stats">
                  <div className="hero-mock__stat">
                    <span className="hero-mock__stat-label">Orders today</span>
                    <span className="hero-mock__stat-value">28</span>
                  </div>
                  <div className="hero-mock__stat">
                    <span className="hero-mock__stat-label">Store views</span>
                    <span className="hero-mock__stat-value">642</span>
                  </div>
                </div>
                <div className="hero-mock__row">
                  <div className="hero-mock__thumb" />
                  <div className="hero-mock__lines">
                    <span className="w-3/4" />
                    <span className="w-1/2" />
                  </div>
                  <span className="hero-mock__price">Rs 1,450</span>
                </div>
                <div className="hero-mock__row">
                  <div className="hero-mock__thumb" />
                  <div className="hero-mock__lines">
                    <span className="w-2/3" />
                    <span className="w-1/3" />
                  </div>
                  <span className="hero-mock__price">Rs 2,200</span>
                </div>
              </div>
            </div>

            <div className="hero-float hero-float--order">
              <span className="hero-float__badge">
                <MessageCircle size={12} />
              </span>
              <div>
                <p className="hero-float__title">New order · WhatsApp</p>
                <p className="hero-float__sub">2× Embroidered Kurti — Rs 4,900</p>
              </div>
            </div>

            <div className="hero-float hero-float--views">
              <TrendingUp size={14} />
              <span>+34% views this week</span>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== PROBLEM ===================== */}
      <section className="section section--tint">
        <div className="mx-auto w-full max-w-6xl px-6">
          <div className="mb-14 text-center">
            <span className="eyebrow">
              <span className="eyebrow-dot" />
              The daily grind
            </span>
            <h2 className="section-title mt-4">Still Sending Product Details Again and Again?</h2>
            <p className="section-sub mx-auto mt-4 max-w-2xl">
              If your day looks like this, your store is living in your chat history instead of in front of your customers.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div className="problem-card">
              <span className="problem-card__icon">
                <RefreshCcw size={20} />
              </span>
              <h3 className="problem-card__title">Same Price, Fiftieth Time</h3>
              <p className="problem-card__body">Typing out the same price list for every new customer, every single day.</p>
            </div>
            <div className="problem-card">
              <span className="problem-card__icon">
                <ImageIcon size={20} />
              </span>
              <h3 className="problem-card__title">Photo After Photo</h3>
              <p className="problem-card__body">Re-sending the same product photos because last week's chat is already buried.</p>
            </div>
            <div className="problem-card">
              <span className="problem-card__icon">
                <HelpCircle size={20} />
              </span>
              <h3 className="problem-card__title">The Same Five Questions</h3>
              <p className="problem-card__body">"Is this in stock?" "What colors?" "Any discount on two?" — answered on repeat, all day.</p>
            </div>
            <div className="problem-card">
              <span className="problem-card__icon">
                <Clock size={20} />
              </span>
              <h3 className="problem-card__title">Slow Reply, Lost Sale</h3>
              <p className="problem-card__body">By the time you type a reply, the customer has already ordered from someone faster.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== SOLUTION ===================== */}
      <section id="features" className="section">
        <div className="mx-auto w-full max-w-6xl px-6">
          <div className="mb-14 text-center">
            <span className="eyebrow">
              <span className="eyebrow-dot" />
              The fix
            </span>
            <h2 className="section-title mt-4">One Store. Unlimited Customers.</h2>
            <p className="section-sub mx-auto mt-4 max-w-2xl">
              Build your catalog once. Every customer gets the full, up-to-date picture — no retyping required.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div className="solution-card">
              <span className="solution-card__num">01</span>
              <span className="solution-card__icon">
                <Store size={22} />
              </span>
              <h3 className="solution-card__title">Create Store</h3>
              <p className="solution-card__body">Pick a name, add your logo and colors, and your storefront is live.</p>
            </div>
            <div className="solution-card">
              <span className="solution-card__num">02</span>
              <span className="solution-card__icon">
                <Package size={22} />
              </span>
              <h3 className="solution-card__title">Add Products</h3>
              <p className="solution-card__body">Upload photos, set prices, and write short descriptions in minutes.</p>
            </div>
            <div className="solution-card">
              <span className="solution-card__num">03</span>
              <span className="solution-card__icon">
                <Link2 size={22} />
              </span>
              <h3 className="solution-card__title">Share Store Link</h3>
              <p className="solution-card__body">One link for your bio, status, or flyer — however customers find you.</p>
            </div>
            <div className="solution-card">
              <span className="solution-card__num">04</span>
              <span className="solution-card__icon">
                <MessageCircle size={22} />
              </span>
              <h3 className="solution-card__title">Receive Orders on WhatsApp</h3>
              <p className="solution-card__body">Every order arrives as a ready-to-confirm WhatsApp message.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== HOW IT WORKS ===================== */}
      <section id="how-it-works" className="section section--dark">
        <div className="mx-auto w-full max-w-6xl px-6">
          <div className="mb-14 text-center">
            <span className="eyebrow">
              <span className="eyebrow-dot" />
              How it works
            </span>
            <h2 className="section-title mt-4">From Sign-Up to Sold — In One Conversation</h2>
            <p className="section-sub mx-auto mt-4 max-w-2xl">
              It really is this simple. Here's the exact path an order takes, start to finish.
            </p>
          </div>

          <div className="grid gap-14 lg:grid-cols-2 items-center">
            {/* phone-style chat thread */}
            <div className="thread-phone" ref={chatRef}>
              <div className="thread-phone__notch" />
              <div className="thread-phone__header">
                <span className="thread-phone__avatar">
                  <Store size={14} />
                </span>
                <div>
                  <p className="thread-phone__name">Your Store</p>
                  <p className="thread-phone__status">online</p>
                </div>
              </div>
              <div className="thread-phone__body">
                <div
                  className={`bubble-row bubble-row--you ${chatVisible ? "bubble-row--in" : ""}`}
                  style={{ transitionDelay: "0ms" }}
                >
                  <div className="bubble">
                    <span className="bubble__step">Step 1</span>
                    <p className="bubble__title">
                      <UserPlus size={14} /> Create Account
                    </p>
                    <p className="bubble__body">Sign up with a shop name and a phone number — takes under a minute.</p>
                  </div>
                </div>

                <div
                  className={`bubble-row bubble-row--you ${chatVisible ? "bubble-row--in" : ""}`}
                  style={{ transitionDelay: "140ms" }}
                >
                  <div className="bubble">
                    <span className="bubble__step">Step 2</span>
                    <p className="bubble__title">
                      <Store size={14} /> Create Store
                    </p>
                    <p className="bubble__body">Add your logo, pick a look, and your storefront goes live instantly.</p>
                  </div>
                </div>

                <div
                  className={`bubble-row bubble-row--you ${chatVisible ? "bubble-row--in" : ""}`}
                  style={{ transitionDelay: "280ms" }}
                >
                  <div className="bubble">
                    <span className="bubble__step">Step 3</span>
                    <p className="bubble__title">
                      <Package size={14} /> Add Products
                    </p>
                    <p className="bubble__body">Photos, prices, descriptions — your whole catalog in one place.</p>
                  </div>
                </div>

                <div
                  className={`bubble-row bubble-row--you ${chatVisible ? "bubble-row--in" : ""}`}
                  style={{ transitionDelay: "420ms" }}
                >
                  <div className="bubble">
                    <span className="bubble__step">Step 4</span>
                    <p className="bubble__title">
                      <Link2 size={14} /> Share Store Link
                    </p>
                    <p className="bubble__body">dukan.store/your-shop — post it, pin it, done.</p>
                  </div>
                </div>

                <div
                  className={`bubble-row bubble-row--customer ${chatVisible ? "bubble-row--in" : ""}`}
                  style={{ transitionDelay: "560ms" }}
                >
                  <div className="bubble">
                    <span className="bubble__step">Step 5</span>
                    <p className="bubble__title">
                      <Eye size={14} /> Customer Views Products
                    </p>
                    <p className="bubble__body">They browse your catalog like any online store. No app to install.</p>
                  </div>
                </div>

                <div
                  className={`bubble-row bubble-row--customer ${chatVisible ? "bubble-row--in" : ""}`}
                  style={{ transitionDelay: "700ms" }}
                >
                  <div className="bubble">
                    <span className="bubble__step">Step 6</span>
                    <p className="bubble__title">
                      <ShoppingBag size={14} /> Orders on WhatsApp
                    </p>
                    <p className="bubble__body">One tap sends their order straight to your WhatsApp, ready to confirm.</p>
                  </div>
                </div>

                <div
                  className={`bubble-row bubble-row--customer ${chatVisible ? "bubble-row--in" : ""}`}
                  style={{ transitionDelay: "900ms" }}
                >
                  <div className="bubble bubble--confirm">
                    <CheckCircle2 size={14} /> Order received — confirming now
                  </div>
                </div>
              </div>
            </div>

            {/* written-out steps next to the phone */}
            <div className="how-steps">
              <div className="how-step">
                <span className="how-step__num">01</span>
                <div>
                  <h4 className="how-step__title">Create Account</h4>
                  <p className="how-step__body">Sign up with a shop name and a phone number — takes under a minute.</p>
                </div>
                <ArrowDown size={16} className="how-step__arrow" />
              </div>
              <div className="how-step">
                <span className="how-step__num">02</span>
                <div>
                  <h4 className="how-step__title">Create Store</h4>
                  <p className="how-step__body">Add your logo, pick a look, and your storefront goes live instantly.</p>
                </div>
                <ArrowDown size={16} className="how-step__arrow" />
              </div>
              <div className="how-step">
                <span className="how-step__num">03</span>
                <div>
                  <h4 className="how-step__title">Add Products</h4>
                  <p className="how-step__body">Photos, prices, descriptions — your whole catalog in one place.</p>
                </div>
                <ArrowDown size={16} className="how-step__arrow" />
              </div>
              <div className="how-step">
                <span className="how-step__num">04</span>
                <div>
                  <h4 className="how-step__title">Share Store Link</h4>
                  <p className="how-step__body">dukan.store/your-shop — post it, pin it, done.</p>
                </div>
                <ArrowDown size={16} className="how-step__arrow" />
              </div>
              <div className="how-step">
                <span className="how-step__num">05</span>
                <div>
                  <h4 className="how-step__title">Customer Views Products</h4>
                  <p className="how-step__body">They browse your catalog like any online store. No app to install.</p>
                </div>
                <ArrowDown size={16} className="how-step__arrow" />
              </div>
              <div className="how-step">
                <span className="how-step__num">06</span>
                <div>
                  <h4 className="how-step__title">Orders on WhatsApp</h4>
                  <p className="how-step__body">One tap sends their order straight to your WhatsApp, ready to confirm.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== FEATURES ===================== */}
      <section className="section">
        <div className="mx-auto w-full max-w-6xl px-6">
          <div className="mb-14 text-center">
            <span className="eyebrow">
              <span className="eyebrow-dot" />
              Everything included
            </span>
            <h2 className="section-title mt-4">Built for Shops, Not Developers</h2>
            <p className="section-sub mx-auto mt-4 max-w-2xl">
              Every feature exists for one reason: fewer messages, more confirmed orders.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
            <div className="feature-tile">
              <span className="feature-tile__icon">
                <Sparkles size={18} />
              </span>
              <h4 className="feature-tile__title">Beautiful Storefront</h4>
              <p className="feature-tile__body">A clean, professional store page customers actually enjoy browsing.</p>
            </div>
            <div className="feature-tile">
              <span className="feature-tile__icon">
                <Package size={18} />
              </span>
              <h4 className="feature-tile__title">Product Management</h4>
              <p className="feature-tile__body">Add, edit, or retire products in seconds from any device.</p>
            </div>
            <div className="feature-tile">
              <span className="feature-tile__icon">
                <LayoutGrid size={18} />
              </span>
              <h4 className="feature-tile__title">Categories</h4>
              <p className="feature-tile__body">Group products so customers find what they need faster.</p>
            </div>
            <div className="feature-tile">
              <span className="feature-tile__icon">
                <ImageIcon size={18} />
              </span>
              <h4 className="feature-tile__title">Multiple Photos</h4>
              <p className="feature-tile__body">Show every angle — up to 6 photos per product.</p>
            </div>
            <div className="feature-tile">
              <span className="feature-tile__icon">
                <Smartphone size={18} />
              </span>
              <h4 className="feature-tile__title">Mobile Responsive</h4>
              <p className="feature-tile__body">Looks sharp on the phone your customers actually use.</p>
            </div>
            <div className="feature-tile">
              <span className="feature-tile__icon">
                <MessageCircle size={18} />
              </span>
              <h4 className="feature-tile__title">WhatsApp Ordering</h4>
              <p className="feature-tile__body">One tap turns a browsing customer into a confirmed order.</p>
            </div>
            <div className="feature-tile">
              <span className="feature-tile__icon">
                <Zap size={18} />
              </span>
              <h4 className="feature-tile__title">Fast Dashboard</h4>
              <p className="feature-tile__body">No lag, no clutter — manage your shop without the wait.</p>
            </div>
            <div className="feature-tile">
              <span className="feature-tile__icon">
                <Clock size={18} />
              </span>
              <h4 className="feature-tile__title">5-Minute Setup</h4>
              <p className="feature-tile__body">Store, products, and link — live before your tea gets cold.</p>
            </div>
            <div className="feature-tile">
              <span className="feature-tile__icon">
                <Search size={18} />
              </span>
              <h4 className="feature-tile__title">SEO Friendly</h4>
              <p className="feature-tile__body">Your store is built to be found on Google, not just shared.</p>
            </div>
            <div className="feature-tile">
              <span className="feature-tile__icon">
                <Lock size={18} />
              </span>
              <h4 className="feature-tile__title">Secure Login</h4>
              <p className="feature-tile__body">Your store and customer data stay protected, always.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== DASHBOARD PREVIEW ===================== */}
      <section className="section section--tint">
        <div className="mx-auto w-full max-w-6xl px-6">
          <div className="mb-14 text-center">
            <span className="eyebrow">
              <span className="eyebrow-dot" />
              Inside the dashboard
            </span>
            <h2 className="section-title mt-4">Everything About Your Shop, In One Screen</h2>
            <p className="section-sub mx-auto mt-4 max-w-2xl">
              Products, orders, store settings, and analytics — no switching apps to run your business.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div className="panel-card">
              <div className="panel-card__head">
                <Package size={14} />
                <span>Products</span>
              </div>
              <div className="panel-line" />
              <div className="panel-line panel-line--sm" />
              <div className="panel-line" />
            </div>

            <div className="panel-card">
              <div className="panel-card__head">
                <ListOrdered size={14} />
                <span>Orders</span>
              </div>
              <div className="panel-order">
                <span>#1042</span>
                <span className="panel-tag panel-tag--new">New</span>
              </div>
              <div className="panel-order">
                <span>#1041</span>
                <span className="panel-tag">Confirmed</span>
              </div>
            </div>

            <div className="panel-card">
              <div className="panel-card__head">
                <Settings size={14} />
                <span>Store Settings</span>
              </div>
              <div className="panel-line panel-line--sm" />
              <div className="panel-toggle" />
            </div>

            <div className="panel-card">
              <div className="panel-card__head">
                <BarChart3 size={14} />
                <span>Analytics</span>
              </div>
              <div className="panel-bars">
                <span style={{ height: "40%" }} />
                <span style={{ height: "70%" }} />
                <span style={{ height: "55%" }} />
                <span style={{ height: "90%" }} />
                <span style={{ height: "65%" }} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== WHY CHOOSE US ===================== */}
      <section className="section">
        <div className="mx-auto w-full max-w-6xl px-6">
          <div className="mb-14 text-center">
            <span className="eyebrow">
              <span className="eyebrow-dot" />
              Why shop owners switch
            </span>
            <h2 className="section-title mt-4">Made for the Way You Already Sell</h2>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div className="why-card">
              <span className="why-card__icon">
                <Clock size={18} />
              </span>
              <div>
                <h4 className="why-card__title">5-Minute Setup</h4>
                <p className="why-card__body">From sign-up to a live store link, faster than making chai.</p>
              </div>
            </div>
            <div className="why-card">
              <span className="why-card__icon">
                <Zap size={18} />
              </span>
              <div>
                <h4 className="why-card__title">No Coding Required</h4>
                <p className="why-card__body">If you can use WhatsApp, you can run your store.</p>
              </div>
            </div>
            <div className="why-card">
              <span className="why-card__icon">
                <Store size={18} />
              </span>
              <div>
                <h4 className="why-card__title">Built for Local Businesses</h4>
                <p className="why-card__body">Designed around how neighborhood shops actually sell.</p>
              </div>
            </div>
            <div className="why-card">
              <span className="why-card__icon">
                <Smartphone size={18} />
              </span>
              <div>
                <h4 className="why-card__title">Mobile Friendly</h4>
                <p className="why-card__body">Built phone-first, because that's where your customers are.</p>
              </div>
            </div>
            <div className="why-card">
              <span className="why-card__icon">
                <TrendingUp size={18} />
              </span>
              <div>
                <h4 className="why-card__title">Fast Loading</h4>
                <p className="why-card__body">Quick on any connection, so no customer gives up waiting.</p>
              </div>
            </div>
            <div className="why-card">
              <span className="why-card__icon">
                <Package size={18} />
              </span>
              <div>
                <h4 className="why-card__title">Easy Product Management</h4>
                <p className="why-card__body">Update a price or swap a photo in a few taps.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== PRICING ===================== */}
      <section id="pricing" className="section section--tint">
        <div className="mx-auto w-full max-w-6xl px-6">
          <div className="mb-14 text-center">
            <span className="eyebrow">
              <span className="eyebrow-dot" />
              Simple pricing
            </span>
            <h2 className="section-title mt-4">Start Free, Grow When You're Ready</h2>
            <p className="section-sub mx-auto mt-4 max-w-2xl">
              No setup fees, no hidden charges — just a store that pays for itself in a day or two of orders.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {/* Free Trial */}
            <div className="plan-card">
              <h3 className="plan-card__name">Free Trial</h3>
              <div className="plan-card__price">
                <span>Rs 0</span>
                <small>for 30 days</small>
              </div>
              <ul className="plan-card__features">
                <li>
                  <Check size={15} /> Full store for 30 days
                </li>
                <li>
                  <Check size={15} /> Basic storefront features
                </li>
                <li>
                  <Check size={15} /> WhatsApp ordering included
                </li>
                <li>
                  <Check size={15} /> No card required
                </li>
              </ul>
              <a href="#contact" className="btn btn--outline w-full justify-center">
                Start Free Trial
              </a>
            </div>

            {/* Basic (highlighted) */}
            <div className="plan-card plan-card--highlight">
              <span className="plan-card__badge plan-card__badge--popular">Most Popular</span>
              <h3 className="plan-card__name">Basic</h3>
              <div className="plan-card__price">
                <span>Rs 799</span>
                <small>/ month</small>
              </div>
              <ul className="plan-card__features">
                <li>
                  <Check size={15} /> Unlimited products
                </li>
                <li>
                  <Check size={15} /> WhatsApp order links
                </li>
                <li>
                  <Check size={15} /> Custom store page
                </li>
                <li>
                  <Check size={15} /> Priority support
                </li>
              </ul>
              <a href="#contact" className="btn btn--primary w-full justify-center">
                Choose Basic
              </a>
            </div>

            {/* Pro */}
            <div className="plan-card">
              <span className="plan-card__badge">Coming Soon</span>
              <h3 className="plan-card__name">Pro</h3>
              <div className="plan-card__price">
                <span>—</span>
                <small>Coming soon</small>
              </div>
              <ul className="plan-card__features">
                <li>
                  <Check size={15} /> Multiple staff logins
                </li>
                <li>
                  <Check size={15} /> Advanced analytics
                </li>
                <li>
                  <Check size={15} /> Custom domain
                </li>
                <li>
                  <Check size={15} /> Automated catalogs
                </li>
              </ul>
              <a href="#contact" className="btn btn--outline w-full justify-center">
                Notify Me
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== FAQ ===================== */}
      <section id="faq" className="section">
        <div className="mx-auto w-full max-w-3xl px-6">
          <div className="mb-14 text-center">
            <span className="eyebrow">
              <span className="eyebrow-dot" />
              Questions
            </span>
            <h2 className="section-title mt-4">Frequently Asked Questions</h2>
          </div>

          <div className="faq-list">
            <div className={`faq-item ${openFaq === 0 ? "faq-item--open" : ""}`}>
              <button className="faq-item__q" onClick={() => setOpenFaq(openFaq === 0 ? -1 : 0)}>
                Can I use it for free?
                <ChevronDown size={18} className="faq-item__chev" />
              </button>
              <div className="faq-item__a-wrap">
                <p className="faq-item__a">
                  Yes. Every shop starts with a 30-day free trial with no card required, so you can list products and take real orders before paying anything.
                </p>
              </div>
            </div>

            <div className={`faq-item ${openFaq === 1 ? "faq-item--open" : ""}`}>
              <button className="faq-item__q" onClick={() => setOpenFaq(openFaq === 1 ? -1 : 1)}>
                How do WhatsApp orders work?
                <ChevronDown size={18} className="faq-item__chev" />
              </button>
              <div className="faq-item__a-wrap">
                <p className="faq-item__a">
                  When a customer taps "Order on WhatsApp" on a product, it opens a pre-filled message with the product, price, and quantity — sent straight to your shop's WhatsApp number.
                </p>
              </div>
            </div>

            <div className={`faq-item ${openFaq === 2 ? "faq-item--open" : ""}`}>
              <button className="faq-item__q" onClick={() => setOpenFaq(openFaq === 2 ? -1 : 2)}>
                Can I use my own domain?
                <ChevronDown size={18} className="faq-item__chev" />
              </button>
              <div className="faq-item__a-wrap">
                <p className="faq-item__a">
                  Yes, on the Basic and Pro plans you can connect a custom domain so your store lives at your own web address.
                </p>
              </div>
            </div>

            <div className={`faq-item ${openFaq === 3 ? "faq-item--open" : ""}`}>
              <button className="faq-item__q" onClick={() => setOpenFaq(openFaq === 3 ? -1 : 3)}>
                Is coding required?
                <ChevronDown size={18} className="faq-item__chev" />
              </button>
              <div className="faq-item__a-wrap">
                <p className="faq-item__a">
                  No. Everything — your store, products, and settings — is managed from a simple dashboard built for shop owners, not developers.
                </p>
              </div>
            </div>

            <div className={`faq-item ${openFaq === 4 ? "faq-item--open" : ""}`}>
              <button className="faq-item__q" onClick={() => setOpenFaq(openFaq === 4 ? -1 : 4)}>
                Can I change my language?
                <ChevronDown size={18} className="faq-item__chev" />
              </button>
              <div className="faq-item__a-wrap">
                <p className="faq-item__a">
                  Yes, the storefront and dashboard support both English and Urdu, switchable anytime from the navigation bar.
                </p>
              </div>
            </div>

            <div className={`faq-item ${openFaq === 5 ? "faq-item--open" : ""}`}>
              <button className="faq-item__q" onClick={() => setOpenFaq(openFaq === 5 ? -1 : 5)}>
                Is the dashboard mobile friendly?
                <ChevronDown size={18} className="faq-item__chev" />
              </button>
              <div className="faq-item__a-wrap">
                <p className="faq-item__a">
                  Completely. You can add products, check orders, and update your store from your phone, exactly as easily as from a laptop.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== FINAL CTA ===================== */}
      <section id="contact" className="cta-band">
        <div className="mx-auto w-full max-w-6xl px-6 text-center py-20">
          <h2 className="cta-band__title">Start Growing Your Business Today</h2>
          <p className="cta-band__sub">Join thousands of local shop owners turning WhatsApp chats into confirmed orders.</p>
          <a href="#pricing" className="btn btn--onlight mt-8">
            Create Your Store Free
            <ArrowRight size={16} />
          </a>
        </div>
      </section>

      {/* ===================== FOOTER ===================== */}
      <footer className="footer">
        <div className="mx-auto w-full max-w-6xl px-6 py-14">
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="logo-mark">
                  <MessageCircle size={16} strokeWidth={2.5} />
                </span>
                <span className="logo-word2">Dukania</span>
              </div>
              <p className="footer__tag">Your store. One link. Orders on WhatsApp.</p>
            </div>
            <div>
              <h5 className="footer__head">Product</h5>
              <a href="#features">Features</a>
              <a href="#pricing">Pricing</a>
              <a href="#faq">FAQ</a>
            </div>
            <div>
              <h5 className="footer__head">Company</h5>
              <a href="#home">About</a>
              <a href="#contact">Contact</a>
            </div>
            <div>
              <h5 className="footer__head">Legal</h5>
              <a href="#">Privacy Policy</a>
              <a href="#">Terms of Service</a>
            </div>
          </div>
          <div className="footer__bottom">
            <span>© 2026 Dukania. All rights reserved.</span>
            <div className="flex gap-3">
              <a href="#" aria-label="Facebook">
                {/* <Facebook size={16} /> */}
              </a>
              <a href="#" aria-label="Instagram">
                {/* <Instagram size={16} /> */}
              </a>
              <a href="#" aria-label="Twitter">
                {/* <Twitter size={16} /> */}
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
    </>
  );
}

export default Home;