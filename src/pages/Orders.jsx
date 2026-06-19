import { useEffect, useState } from "react";
import axios from "axios";
import {
  ShoppingBag,
  CheckCircle,
  Clock,
  Package,
} from "lucide-react";

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

  const paidOrders = orders.filter(
    (o) => o.payment_status?.toLowerCase() === "paid"
  ).length;

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: "25px" }}>
        <h1
          style={{
            margin: 0,
            fontSize: "28px",
            color: "#111827",
          }}
        >
          My Orders
        </h1>

        <p
          style={{
            color: "#6b7280",
            marginTop: "8px",
          }}
        >
          Track and manage your purchases
        </p>
      </div>

      {/* Stats Cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(220px,1fr))",
          gap: "20px",
          marginBottom: "30px",
        }}
      >
        <div
          style={{
            background:
              "linear-gradient(to right,#6366f1,#4f46e5)",
            color: "white",
            borderRadius: "18px",
            padding: "20px",
            boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
          }}
        >
          <ShoppingBag size={30} />
          <h2>{orders.length}</h2>
          <p>Total Orders</p>
        </div>

        <div
          style={{
            background:
              "linear-gradient(to right,#10b981,#059669)",
            color: "white",
            borderRadius: "18px",
            padding: "20px",
            boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
          }}
        >
          <CheckCircle size={30} />
          <h2>{paidOrders}</h2>
          <p>Paid Orders</p>
        </div>

        <div
          style={{
            background:
              "linear-gradient(to right,#f59e0b,#d97706)",
            color: "white",
            borderRadius: "18px",
            padding: "20px",
            boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
          }}
        >
          <Package size={30} />
          <h2>
            {orders.reduce(
              (sum, order) => sum + order.quantity,
              0
            )}
          </h2>
          <p>Items Purchased</p>
        </div>
      </div>

      {/* Orders List */}
      {orders.length === 0 ? (
        <div
          style={{
            background: "white",
            borderRadius: "20px",
            padding: "40px",
            textAlign: "center",
            boxShadow:
              "0 10px 25px rgba(0,0,0,0.05)",
          }}
        >
          <Package
            size={60}
            color="#9ca3af"
          />

          <h3>No Orders Yet</h3>

          <p
            style={{
              color: "#6b7280",
            }}
          >
            Start shopping to see your orders here.
          </p>
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
                background: "white",
                borderRadius: "20px",
                padding: "24px",
                boxShadow:
                  "0 8px 20px rgba(0,0,0,0.06)",
                border:
                  "1px solid rgba(229,231,235,0.8)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent:
                    "space-between",
                  alignItems: "center",
                  marginBottom: "20px",
                }}
              >
                <div>
                  <h3
                    style={{
                      margin: 0,
                      color: "#111827",
                    }}
                  >
                    {order.product_name}
                  </h3>

                  <p
                    style={{
                      margin: "5px 0 0",
                      color: "#6b7280",
                    }}
                  >
                    Order #{order.id}
                  </p>
                </div>

                <span
                  style={{
                    background:
                      order.payment_status?.toLowerCase() ===
                      "paid"
                        ? "#dcfce7"
                        : "#fee2e2",
                    color:
                      order.payment_status?.toLowerCase() ===
                      "paid"
                        ? "#15803d"
                        : "#dc2626",
                    padding:
                      "8px 14px",
                    borderRadius:
                      "999px",
                    fontWeight:
                      "600",
                    fontSize:
                      "14px",
                  }}
                >
                  {order.payment_status}
                </span>
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns:
                    "repeat(auto-fit,minmax(180px,1fr))",
                  gap: "15px",
                }}
              >
                <div>
                  <p
                    style={{
                      color: "#6b7280",
                      marginBottom:
                        "5px",
                    }}
                  >
                    Customer
                  </p>

                  <strong>
                    {order.username}
                  </strong>
                </div>

                <div>
                  <p
                    style={{
                      color: "#6b7280",
                      marginBottom:
                        "5px",
                    }}
                  >
                    Quantity
                  </p>

                  <strong>
                    {order.quantity}
                  </strong>
                </div>

                <div>
                  <p
                    style={{
                      color: "#6b7280",
                      marginBottom:
                        "5px",
                    }}
                  >
                    Date
                  </p>

                  <strong>
                    {new Date(
                      order.ordered_at
                    ).toLocaleDateString()}
                  </strong>
                </div>

                <div>
                  <p
                    style={{
                      color: "#6b7280",
                      marginBottom:
                        "5px",
                    }}
                  >
                    Time
                  </p>

                  <strong>
                    {new Date(
                      order.ordered_at
                    ).toLocaleTimeString()}
                  </strong>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Orders;