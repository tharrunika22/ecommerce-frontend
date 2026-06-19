import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const username = localStorage.getItem("username");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("role");
    localStorage.removeItem("username");
    localStorage.removeItem("user_id");

    navigate("/");
  };

  return (
    <nav
      style={{
        height: "70px",
        backgroundColor: "#111827",
        color: "#f9fafb",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 30px",
        borderBottom: "1px solid #374151",
        boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
      }}
    >
      {/* Logo */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
        }}
      >
        <span
          style={{
            fontSize: "26px",
          }}
        >
          🛒
        </span>

        <h2
          style={{
            margin: 0,
            fontSize: "22px",
            fontWeight: "600",
          }}
        >
          ShopSphere
        </h2>
      </div>

      {/* User Section */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "18px",
        }}
      >
        <div
          style={{
            backgroundColor: "#374151",
            padding: "8px 14px",
            borderRadius: "20px",
            fontSize: "14px",
          }}
        >
          👋 Welcome, {username}
        </div>

        <button
          onClick={handleLogout}
          style={{
            backgroundColor: "#4b5563",
            color: "white",
            border: "none",
            padding: "10px 18px",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "500",
            transition: "0.3s",
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = "#ef4444";
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = "#4b5563";
          }}
        >
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;