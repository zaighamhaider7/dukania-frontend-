import "./Dashboard.css";
import DashboardLayout from "../layouts/DashboardLayout";
import {
  Package,
  LayoutGrid,
  ListOrdered,
  Users,
  PlusCircle,
  Settings,
  Eye,
  Store
} from "lucide-react";

function Dashboard() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <DashboardLayout>
      {!user?.storeUsername ? (
        <div className="create-store-message">
          <div className="create-store-card">
            <div className="create-store-icon">
              <Store size={38} strokeWidth={2} />
            </div>

            <h1>Welcome, {user?.name} 👋</h1>

            <p>
              Your online store hasn't been created yet.
              Create your store to start showcasing your products and receive orders on WhatsApp.
            </p>

            <a href="/create-store" className="btn btn--primary">
              Create Store
            </a>
          </div>
        </div>
      ) : (

        <div className="dashboard-content">
          {/* ===================== WELCOME SECTION ===================== */}
          <div className="dashboard-welcome">
            <h1 className="dashboard-welcome__title">Dashboard</h1>
            <p className="dashboard-welcome__sub">
              Welcome back! Here's what's happening with your store today.
            </p>
            <a href={`/store/${user.storeUsername}`}>
              View Store
            </a>
          </div>

          {/* ===================== OVERVIEW CARDS ===================== */}
          <div className="stat-grid">
            <div className="stat-card">
              <span className="stat-card__icon">
                <Package size={20} />
              </span>
              <div>
                <p className="stat-card__value">128</p>
                <p className="stat-card__label">Total Products</p>
              </div>
            </div>

            <div className="stat-card">
              <span className="stat-card__icon">
                <LayoutGrid size={20} />
              </span>
              <div>
                <p className="stat-card__value">14</p>
                <p className="stat-card__label">Total Categories</p>
              </div>
            </div>

            <div className="stat-card">
              <span className="stat-card__icon">
                <ListOrdered size={20} />
              </span>
              <div>
                <p className="stat-card__value">356</p>
                <p className="stat-card__label">Total Orders</p>
              </div>
            </div>

            <div className="stat-card">
              <span className="stat-card__icon">
                <Users size={20} />
              </span>
              <div>
                <p className="stat-card__value">982</p>
                <p className="stat-card__label">Total Customers</p>
              </div>
            </div>
          </div>

          {/* ===================== QUICK ACTIONS ===================== */}
          <div className="section-block">
            <h2 className="section-block__title">Quick Actions</h2>

            <div className="quick-actions">
              <button className="quick-action-card">
                <span className="quick-action-card__icon">
                  <PlusCircle size={20} />
                </span>
                <div>
                  <p className="quick-action-card__title">Add Product</p>
                  <p className="quick-action-card__body">List a new product in your store.</p>
                </div>
              </button>

              <button className="quick-action-card">
                <span className="quick-action-card__icon">
                  <Settings size={20} />
                </span>
                <div>
                  <p className="quick-action-card__title">Manage Products</p>
                  <p className="quick-action-card__body">Edit prices, photos, and details.</p>
                </div>
              </button>

              <button className="quick-action-card">
                <span className="quick-action-card__icon">
                  <LayoutGrid size={20} />
                </span>
                <div>
                  <p className="quick-action-card__title">Create Category</p>
                  <p className="quick-action-card__body">Group products so they're easy to find.</p>
                </div>
              </button>
            </div>
          </div>

          {/* ===================== RECENT ORDERS ===================== */}
          <div className="section-block">
            <div className="section-block__head">
              <h2 className="section-block__title">Recent Orders</h2>
              <button className="btn btn--outline btn--sm">
                <Eye size={14} /> View All
              </button>
            </div>

            <div className="table-card">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Customer Name</th>
                    <th>Product</th>
                    <th>Status</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Ayesha Khan</td>
                    <td>Embroidered Kurti</td>
                    <td>
                      <span className="status-badge status-badge--new">New</span>
                    </td>
                    <td>Aug 4, 2026</td>
                  </tr>
                  <tr>
                    <td>Bilal Ahmed</td>
                    <td>Leather Wallet</td>
                    <td>
                      <span className="status-badge status-badge--confirmed">Confirmed</span>
                    </td>
                    <td>Aug 3, 2026</td>
                  </tr>
                  <tr>
                    <td>Sana Malik</td>
                    <td>Wireless Earbuds</td>
                    <td>
                      <span className="status-badge status-badge--delivered">Delivered</span>
                    </td>
                    <td>Aug 2, 2026</td>
                  </tr>
                  <tr>
                    <td>Usman Tariq</td>
                    <td>Cotton Bedsheet Set</td>
                    <td>
                      <span className="status-badge status-badge--new">New</span>
                    </td>
                    <td>Aug 1, 2026</td>
                  </tr>
                  <tr>
                    <td>Hira Sheikh</td>
                    <td>Scented Candle Pack</td>
                    <td>
                      <span className="status-badge status-badge--confirmed">Confirmed</span>
                    </td>
                    <td>Jul 31, 2026</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* ===================== RECENT PRODUCTS ===================== */}
          <div className="section-block">
            <div className="section-block__head">
              <h2 className="section-block__title">Recent Products</h2>
              <button className="btn btn--outline btn--sm">
                <Eye size={14} /> View All
              </button>
            </div>

            <div className="table-card">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Product Name</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th>Stock</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Embroidered Kurti</td>
                    <td>Women's Wear</td>
                    <td>Rs 2,450</td>
                    <td>
                      <span className="stock-badge stock-badge--good">32 in stock</span>
                    </td>
                  </tr>
                  <tr>
                    <td>Leather Wallet</td>
                    <td>Accessories</td>
                    <td>Rs 1,800</td>
                    <td>
                      <span className="stock-badge stock-badge--good">54 in stock</span>
                    </td>
                  </tr>
                  <tr>
                    <td>Wireless Earbuds</td>
                    <td>Electronics</td>
                    <td>Rs 3,999</td>
                    <td>
                      <span className="stock-badge stock-badge--low">6 in stock</span>
                    </td>
                  </tr>
                  <tr>
                    <td>Cotton Bedsheet Set</td>
                    <td>Home & Living</td>
                    <td>Rs 2,100</td>
                    <td>
                      <span className="stock-badge stock-badge--good">21 in stock</span>
                    </td>
                  </tr>
                  <tr>
                    <td>Scented Candle Pack</td>
                    <td>Home & Living</td>
                    <td>Rs 950</td>
                    <td>
                      <span className="stock-badge stock-badge--out">Out of stock</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>

  );
}

export default Dashboard;
