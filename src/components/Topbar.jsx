import "./Topbar.css";
import { useState } from "react";
import { Search, Bell, ChevronDown, User, Settings, LogOut } from "lucide-react";

function Topbar() {
  // opens/closes the profile dropdown menu
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const currentUser = JSON.parse(localStorage.getItem("user"));


  return (
    <header className="topbar">
      <div className="topbar-left">
        {/* <h1 className="topbar-title">Dashboard</h1>
        <p className="topbar-welcome">Welcome back, Zaigham</p> */}
      </div>

      <div className="topbar-right">

        <div className="topbar-profile">
          <button
            className="topbar-profile-btn"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            <span className="topbar-avatar">
              {currentUser?.logo ? (
                <img
                  src={currentUser.logo}
                  alt={currentUser.storeName}
                  className="topbar-avatar__img"
                />
              ) : (
                currentUser?.logo
              )}
            </span>
            <span className="topbar-user-info">
              <span className="topbar-username">{currentUser?.storeName}</span>
              <span className="topbar-userrole">Store Owner</span>
            </span>
            <ChevronDown
              size={14}
              className={`topbar-chevron ${dropdownOpen ? "topbar-chevron--open" : ""}`}
            />
          </button>

          {dropdownOpen && (
            <div className="topbar-dropdown">
              <a href="/profile" className="topbar-dropdown-item">
                <User size={15} /> Profile
              </a>
              <a href="/store-settings" className="topbar-dropdown-item">
                <Settings size={15} /> Settings
              </a>
              <button className="topbar-dropdown-item topbar-dropdown-item--danger">
                <LogOut size={15} /> Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Topbar;
