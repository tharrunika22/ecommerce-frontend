import { Link } from "react-router-dom";

function HomeNavbar() {
  return (
    <nav
  style={{
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "15px 40px",
    backgroundColor: "#1e293b",
    color: "white",
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
  }}
>
    
      <h2
  style={{
    margin: 0,
    fontSize: "28px",
  }}
>
  🛒 ShopSphere
</h2>

      <div
        style={{
          display: "flex",
          gap: "20px",
        }}
      >
        <Link
  to="/login"
  style={{
    textDecoration: "none",
    color: "white",
    padding: "10px 20px",
    border: "1px solid white",
    borderRadius: "8px",
  }}
>
  Login
</Link>

        <Link
  to="/signup"
  style={{
    textDecoration: "none",
    backgroundColor: "#8b5cf6",
    color: "white",
    padding: "10px 20px",
    borderRadius: "8px",
    fontWeight: "bold",
  }}
>
  Sign Up
</Link>
      </div>
    </nav>
  );
}

export default HomeNavbar;