import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  Wallet,
  User, 
  Users,
  LogOut,
} from "lucide-react";

import { NavLink, useNavigate } from "react-router-dom";

function VendorSidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  const menuStyle = ({ isActive }) => ({
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "12px 15px",
    borderRadius: "10px",
    textDecoration: "none",
    color: isActive ? "#ffffff" : "#cbd5e1",
    background: isActive ? "#4f46e5" : "transparent",
    fontWeight: "500",
    transition: "0.3s",
  });

  return (
    <div
      style={{
        width: "260px",
        height: "100vh",
        background: "#0f172a",
        color: "white",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        position: "sticky",
        top: 0,
        padding: "20px",
        boxSizing: "border-box",
      }}
    >
      <div>
        {/* Logo */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            marginBottom: "40px",
          }}
        >
          <div
            style={{
              width: "45px",
              height: "45px",
              borderRadius: "12px",
              background: "#4f46e5",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "22px",
            }}
          >
            🏪
          </div>

          <div>
            <h2
              style={{
                margin: 0,
                fontSize: "18px",
              }}
            >
              Vendor Panel
            </h2>

            <small
              style={{
                color: "#94a3b8",
              }}
            >
              ShopSphere
            </small>
          </div>
        </div>

        {/* Menu */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
          }}
        >
          <NavLink to="/vendor/dashboard" style={menuStyle}>
            <LayoutDashboard size={20} />
            Dashboard
          </NavLink>

          <NavLink to="/vendor/inventory" style={menuStyle}>
            <Package size={20} />
            Inventory
          </NavLink>

          <NavLink to="/vendor/orders" style={menuStyle}>
            <ShoppingBag size={20} />
            Orders
          </NavLink>

          <NavLink to="/vendor/financials" style={menuStyle}>
            <Wallet size={20} />
            Financials
          </NavLink> 
          <NavLink to="/vendor/customers" style={menuStyle}>
  <Users size={20} />
  Customers
</NavLink>


          <NavLink to="/vendor/profile" style={menuStyle}>
            <User size={20} />
            Profile
          </NavLink>
        </div>
      </div>

      {/* Logout */}
      <button
        onClick={handleLogout}
        style={{
          width: "100%",
          border: "none",
          padding: "12px",
          borderRadius: "10px",
          background: "#dc2626",
          color: "white",
          cursor: "pointer",
          fontWeight: "600",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "8px",
        }}
      >
        <LogOut size={18} />
        Logout
      </button>
    </div>
  );
}

export default VendorSidebar;