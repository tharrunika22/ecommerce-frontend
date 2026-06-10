import { useEffect, useState } from "react";
import axios from "axios";

function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    const userId = localStorage.getItem("user_id");

    const response = await axios.get(
      `http://127.0.0.1:8000/orders/user/${userId}`
    );

    setOrders(response.data);
  };

  return (
    <div>
      <h2
        style={{
          marginBottom: "20px",
          color: "#111827",
        }}
      >
        📦 My Orders
      </h2>

      {orders.length === 0 ? (
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
          No orders found.
        </div>
      ) : (
        <div
          style={{
            display: "grid",
            gap: "20px",
          }}
        >
          {orders.map((order) => (
            <div
              key={order.id}
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
                  marginBottom: "15px",
                }}
              >
                <h3
                  style={{
                    margin: 0,
                    color: "#1f2937",
                  }}
                >
                  {order.product_name}
                </h3>

                <span
                  style={{
                    backgroundColor: "#dbeafe",
                    color: "#2563eb",
                    padding: "6px 12px",
                    borderRadius: "20px",
                    fontSize: "14px",
                    fontWeight: "500",
                  }}
                >
                  Qty: {order.quantity}
                </span>
              </div>

              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "25px",
                  color: "#6b7280",
                }}
              >
                <p>
                  <strong>User:</strong> {order.username}
                </p>

                <p>
                  <strong>Date:</strong>{" "}
                  {new Date(order.ordered_at).toLocaleDateString()}
                </p>

                <p>
                  <strong>Time:</strong>{" "}
                  {new Date(order.ordered_at).toLocaleTimeString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Orders;