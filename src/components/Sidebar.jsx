import "./Sidebar.css";
import { useState } from "react";
import {
  MessageCircle,
  LayoutDashboard,
  Store,
  Package,
  LayoutGrid,
  ListOrdered,
  User,
  LogOut,
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import { useNavigate } from 'react-router-dom';


function Sidebar() {

  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("jwttoken");
    localStorage.removeItem("user");

    navigate("/login");
  }
  // controls the thin/wide desktop sidebar
  const [collapsed, setCollapsed] = useState(false);

  // controls the slide-in sidebar on mobile
  const [mobileOpen, setMobileOpen] = useState(false);

  // just highlights whichever menu item was clicked last
  const [active, setActive] = useState("Dashboard");

  return (
    <>
      {/* hamburger button — only shown on small screens */}
      <button
        className="sidebar-mobile-toggle"
        onClick={() => setMobileOpen(true)}
        aria-label="Open menu"
      >
        <Menu size={20} />
      </button>

      {/* dark overlay behind the sidebar when open on mobile */}
      {mobileOpen && (
        <div className="sidebar-backdrop" onClick={() => setMobileOpen(false)} />
      )}

      <aside
        className={`sidebar ${collapsed ? "sidebar--collapsed" : ""} ${mobileOpen ? "sidebar--mobile-open" : ""
          }`}
      >
        <div className="sidebar-top">
          <a href="/" className="sidebar-logo">
            <span className="logo-mark">
              <MessageCircle size={18} strokeWidth={2.5} />
            </span>
            {!collapsed && <span className="logo-word">Dukania</span>}
          </a>

          <button
            className="sidebar-close"
            onClick={() => setMobileOpen(false)}
            aria-label="Close menu"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="sidebar-nav">
          <button
            className={`sidebar-link ${active === "Dashboard" ? "sidebar-link--active" : ""}`}
            onClick={() => setActive("Dashboard")}
          >
            <LayoutDashboard size={18} />
            {!collapsed && <span>Dashboard</span>}
          </button>

          <button
            className={`sidebar-link ${active === "Store Settings" ? "sidebar-link--active" : ""}`}
            onClick={() => setActive("Store Settings")}
          >
            <Store size={18} />
            {!collapsed && <span>Store Settings</span>}
          </button>

          <button
            className={`sidebar-link ${active === "Products" ? "sidebar-link--active" : ""}`}
            onClick={() => setActive("Products")}
          >
            <Package size={18} />
            {!collapsed && <span>Products</span>}
          </button>

          <button
            className={`sidebar-link ${active === "Categories" ? "sidebar-link--active" : ""}`}
            onClick={() => setActive("Categories")}
          >
            <LayoutGrid size={18} />
            {!collapsed && <span>Categories</span>}
          </button>

          <button
            className={`sidebar-link ${active === "Orders" ? "sidebar-link--active" : ""}`}
            onClick={() => setActive("Orders")}
          >
            <ListOrdered size={18} />
            {!collapsed && <span>Orders</span>}
          </button>

          <button
            className={`sidebar-link ${active === "Profile" ? "sidebar-link--active" : ""}`}
            onClick={() => setActive("Profile")}
          >
            <User size={18} />
            {!collapsed && <span>Profile</span>}
          </button>
        </nav>

        <div className="sidebar-bottom">
          <button onClick={logout} className="sidebar-link sidebar-link--logout">
            <LogOut size={18} />
            {!collapsed && <span>Logout</span>}
          </button>

          {/* collapse/expand button — only useful on desktop */}
          <button
            className="sidebar-collapse-btn"
            onClick={() => setCollapsed(!collapsed)}
            aria-label="Collapse sidebar"
          >
            {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
          </button>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;
