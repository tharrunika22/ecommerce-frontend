import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ProductList() {
  const [products, setProducts] = useState([]); 
  const [quantities, setQuantities] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const response = await axios.get("http://127.0.0.1:8000/products/");
    setProducts(response.data);
  }; 
  const handleQtyChange = (productId, value) => {
  setQuantities((prev) => ({
    ...prev,
    [productId]: value,
  }));
};
const placeOrder = async (product, quantity) => {
  const token = localStorage.getItem("token");
  const user_id = Number(localStorage.getItem("user_id"));

  if (!token) {
    navigate("/login");
    return;
  }

  try {
    const response = await fetch("http://localhost:8000/orders/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        user_id,
        product_id: product.id,
        quantity: Number(quantity),
      }),
    });

    const text = await response.text();

    if (response.ok) {
      navigate("/dashboard/orders");
    } else {
      alert(text);
    }
  } catch (err) {
    console.error(err);
    alert("Something went wrong");
  }
};

  const handleBuyNow = async (product) => {
    console.log("BUY NOW CLICKED", product);
    const token = localStorage.getItem("token");
    console.log("USER ID FROM STORAGE:", localStorage.getItem("user_id"));

    const user_id = Number(localStorage.getItem("user_id"));

    if (!token) {
      navigate("/login");
      return;
    }

    const response = await fetch("http://localhost:8000/orders/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        user_id: Number(user_id),
        product_id: product.id,
        quantity: 1,
      }),
    });

    const text = await response.text();
    console.log("STATUS:", response.status);
    console.log("RESPONSE:", text);

    if (response.ok) {
      navigate("/dashboard/orders");
    } else {
      alert(text);
    }
  };

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
        gap: "25px",
        padding: "20px",
      }}
    >
      {products.map((product) => (
        <div
          key={product.id}
          style={{
            borderRadius: "16px",
            overflow: "hidden",
            backgroundColor: "#f8fafc95",
            boxShadow: "0 4px 15px rgba(0,0,0,0.08)",
          }}
        >
          <div
            style={{
              height: "220px",
              backgroundColor: "#f8fafc95",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img
              src="https://picsum.photos/300"
              alt={product.name}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                borderRadius: "8px",
              }}
            />
          </div>

          <div
            style={{
              padding: "15px",
            }}
          >
            <span
              style={{
                backgroundColor: "#feefe9",
                color: "#793aed",
                padding: "5px 10px",
                borderRadius: "20px",
                fontSize: "16px",
              }}
            >
              Featured
            </span>

            <h3
              style={{
                marginTop: "12px",
                marginBottom: "8px",
                color: "#1e293b",
              }}
            >
              {product.name}
            </h3>

            <p
              style={{
                color: "#64748b",
                minHeight: "50px",
                marginBottom: "10px",
              }}
            >
              {product.description}
            </p>

            <h2
              style={{
                color: "#8b5cf6",
                marginBottom: "15px",
              }}
            >
              ₹ {product.price}
            </h2>

            <div
              style={{
                display: "flex",
                gap: "10px",
                alignItems: "center",
                marginBottom: "15px",
              }}
            >
              <input
                type="number"
                min="1"
                value={quantities[product.id] || 1}
                onChange={(e) =>
                  handleQtyChange(product.id, e.target.value)
                }
                style={{
                  width: "60px",
                  padding: "8px",
                  borderRadius: "6px",
                  border: "1px solid #ccc",
                }}
              />
              <button
                onClick={() =>
                  placeOrder(product, quantities[product.id] || 1)
                }
                style={{
                  flex: 1,
                  padding: "12px",
                  backgroundColor: "#f1f5f9",
                  color: "#475569",
                  border: "none",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontWeight: "bold",
                  transition: "0.2s ease",
                }}
              >
                Add to Cart
              </button>
            </div>

            <div
              style={{
                display: "flex",
                gap: "10px",
                marginTop: "15px",
              }}
            >
              <button
                style={{
                  flex: 1,
                  padding: "12px",
                  backgroundColor: "#f1f5f9",
                  color: "#475569",
                  border: "none",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontWeight: "bold",
                  transition: "0.2s ease",
                }}
              >
                Cart
              </button>

              <button
                onClick={() => handleBuyNow(product)}
                style={{
                  flex: 1,
                  padding: "12px",
                  backgroundColor: "#ddd6fe",
                  color: "#5b21b6",
                  border: "none",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontWeight: "bold",
                  transition: "0.2s ease",
                }}
              >
                Buy
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ProductList;
