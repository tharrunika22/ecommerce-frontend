import { useNavigate, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Package, 
  ShoppingCart,
  ShoppingBag, 
  MapPin,
  User,
} from "lucide-react";

function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: <LayoutDashboard size={20} />,
    },
    {
      name: "Products",
      path: "/dashboard/products",
      icon: <Package size={20} />,
    }, 
    {
  name: "Cart",
  path: "/dashboard/cart",
  icon: <ShoppingCart size={20} />,
    },
    {
      name: "Orders",
      path: "/dashboard/orders",
      icon: <ShoppingBag size={20} />,
    }, 
    {
  name: "Address",
  path: "/dashboard/address",
  icon: <MapPin size={20} />,
},
    {
      name: "Profile",
      path: "/dashboard/profile",
      icon: <User size={20} />,
    },
  ];

  return (
    <div
      style={{
        width: "240px",
        height: "calc(140vh - 60px)",
        background: "#1f2937",
        color: "white",
        padding: "24px 16px",
        boxSizing: "border-box",
      }}
    >
      <h2
        style={{
          marginBottom: "30px",
          textAlign: "center",
          color: "#f9fafb",
        }}
      >
        My Store
      </h2>

      <ul
        style={{
          listStyle: "none",
          padding: 0,
          margin: 0,
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        {menuItems.map((item) => {
          const active = location.pathname === item.path;

          return (
            <li
              key={item.path}
              onClick={() => navigate(item.path)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                padding: "12px 16px",
                borderRadius: "10px",
                cursor: "pointer",
                backgroundColor: active
                  ? "#374151"
                  : "transparent",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                if (!active) {
                  e.currentTarget.style.backgroundColor =
                    "#2d3748";
                }
              }}
              onMouseLeave={(e) => {
                if (!active) {
                  e.currentTarget.style.backgroundColor =
                    "transparent";
                }
              }}
            >
              {item.icon}
              <span>{item.name}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Sidebar;