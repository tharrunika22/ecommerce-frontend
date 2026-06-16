import { useEffect, useState } from "react";

function Cart() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    const token = localStorage.getItem("token");

    const response = await fetch("http://localhost:8000/cart/", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();
    setItems(data);
  };
return (
  <div>
    <h2
      style={{
        marginBottom: "20px",
        color: "#111827",
      }}
    >
      🛒 My Cart
    </h2>

    {items.length === 0 ? (
      <div
        style={{
          backgroundColor: "#fff",
          padding: "30px",
          borderRadius: "12px",
          textAlign: "center",
          color: "#6b7280",
          boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
        }}
      >
        No items in cart.
      </div>
    ) : (
      <div
        style={{
          display: "grid",
          gap: "20px",
        }}
      >
        {items.map((item) => {
          const product = item.product || {};
          const price = Number(product.price || 0);
          const itemTotal = price * (Number(item.quantity) || 0);

          return (
            <div
              key={item.id}
              style={{
                backgroundColor: "#ffffff",
                borderRadius: "16px",
                padding: "20px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                border: "1px solid #e5e7eb",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "12px",
                }}
              >
                <div>
                  <h3 style={{ margin: 0, color: "#1f2937" }}>{product.name || `Product #${item.product_id}`}</h3>
                  <div style={{ color: "#6b7280", fontSize: "14px" }}>{product.description}</div>
                </div>

                <div style={{ textAlign: "right" }}>
                  <div style={{ fontWeight: 700, color: "#111827" }}>${price.toLocaleString()}</div>
                  <div style={{ marginTop: "6px", fontSize: "13px", color: "#6b7280" }}>Stock: {product.stock ?? "-"}</div>
                </div>
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "20px", flexWrap: "wrap" }}>
                <div style={{ color: "#374151" }}>
                  <p style={{ margin: 0 }}><strong>Quantity:</strong> {item.quantity}</p>
                  <p style={{ margin: 0 }}><strong>Cart Item ID:</strong> {item.id}</p>
                  <p style={{ margin: 0 }}><strong>User ID:</strong> {item.user_id}</p>
                </div>

                <div style={{ textAlign: "right" }}>
                  <div style={{ fontSize: "14px", color: "#111827", fontWeight: 700 }}>${itemTotal.toLocaleString()}</div>
                  <div style={{ marginTop: "10px", display: "flex", gap: "10px", justifyContent: "flex-end" }}>
                    <button style={{ backgroundColor: "#ddd6fe", color: "#5b21b6", border: "none", padding: "10px 18px", borderRadius: "8px", cursor: "pointer", fontWeight: "600" }}>
                      Checkout
                    </button>
                    <button style={{ backgroundColor: "#fee2e2", color: "#dc2626", border: "none", padding: "10px 18px", borderRadius: "8px", cursor: "pointer", fontWeight: "600" }}>
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        {/* Cart summary */}
        <CartSummary items={items} />
      </div>
    )}
  </div>
);
  
  
}

export default Cart;

function CartSummary({ items }) {
  const total = items.reduce((acc, item) => {
    const price = Number(item.product?.price || 0);
    const qty = Number(item.quantity || 0);
    return acc + price * qty;
  }, 0);

  return (
    <div style={{ marginTop: "12px", background: "#fff", padding: "18px", borderRadius: "12px", border: "1px solid #e5e7eb", boxShadow: "0 2px 8px rgba(0,0,0,0.04)", maxWidth: "420px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px", color: "#6b7280" }}>
        <div>Items</div>
        <div>{items.length}</div>
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", fontWeight: 700, fontSize: "18px", color: "#111827" }}>
        <div>Total</div>
        <div>${total.toLocaleString()}</div>
      </div>
    </div>
  );
}