import HomeNavbar from "../components/HomeNavbar";
import ProductList from "../components/ProductList";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <>
      <HomeNavbar />

      {/* Hero Section */}
      <div
        style={{
          height: "60vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          background:
           "linear-gradient(to right, #1e293b, #334155)",
          color: "white",
          textAlign: "center",
        }}
      >
        <h1
          style={{
            fontSize: "50px",
            marginBottom: "10px",
          }}
        >
          Shop Smarter
        </h1>

        <p
          style={{
            fontSize: "20px",
            marginBottom: "20px",
          }}
        >
          Discover amazing products at affordable prices
        </p>

        <button
          onClick={() => navigate("/login")}
          style={{
            padding: "15px 30px",
            border: "none",
            borderRadius: "10px",
            cursor: "pointer",
            fontSize: "16px",
          }}
        >
          Shop Now
        </button>
      </div>

      {/* Products Section */}
      <div style={{ padding: "20px" }}>
        <h1>Featured Products</h1>

        <ProductList />
      </div>
    </>
  );
}

export default Home;