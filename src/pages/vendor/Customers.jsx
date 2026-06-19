import { useEffect, useState } from "react";
import axios from "axios";
import { Users, ShoppingBag, IndianRupee } from "lucide-react";

function Customers() {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(
        "http://127.0.0.1:8000/orders/vendor/orders",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const orders = response.data;

      const uniqueCustomers = Object.values(
        orders.reduce((acc, order) => {
          const id = order.customer_id;

          if (!acc[id]) {
            acc[id] = {
              id,
              name: order.customer_name,
              email: order.customer_email,
              orders: 0,
              totalSpent: 0,
            };
          }

          acc[id].orders += 1;
          acc[id].totalSpent +=
            order.product_price * order.quantity;

          return acc;
        }, {})
      );

      setCustomers(uniqueCustomers);
    } catch (error) {
      console.error(error);
    }
  };

  const totalRevenue = customers.reduce(
    (sum, customer) => sum + customer.totalSpent,
    0
  );

  const totalOrders = customers.reduce(
    (sum, customer) => sum + customer.orders,
    0
  );

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
          Customers
        </h1>

        <p
          style={{
            color: "#6b7280",
            marginTop: "8px",
          }}
        >
          Customers who purchased your products
        </p>
      </div>

      {/* Stats Cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "20px",
          marginBottom: "30px",
        }}
      >
        <div
          style={{
            background:
              "linear-gradient(to right,#3b82f6,#2563eb)",
            color: "white",
            borderRadius: "18px",
            padding: "20px",
            boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
          }}
        >
          <Users size={30} />
          <h2>{customers.length}</h2>
          <p>Total Customers</p>
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
          <ShoppingBag size={30} />
          <h2>{totalOrders}</h2>
          <p>Total Orders</p>
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
          <IndianRupee size={30} />
          <h2>₹{totalRevenue}</h2>
          <p>Total Revenue</p>
        </div>
      </div>

      {/* Customer Table */}
      <div
        style={{
          background: "white",
          borderRadius: "20px",
          padding: "20px",
          boxShadow: "0 8px 20px rgba(0,0,0,0.06)",
        }}
      >
        <h3
          style={{
            marginBottom: "20px",
            color: "#111827",
          }}
        >
          Customer List
        </h3>

        <div
          style={{
            overflowX: "auto",
          }}
        >
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
            }}
          >
            <thead>
              <tr
                style={{
                  backgroundColor: "#f9fafb",
                }}
              >
                <th
                  style={{
                    padding: "14px",
                    textAlign: "left",
                  }}
                >
                  Customer
                </th>

                <th
                  style={{
                    padding: "14px",
                    textAlign: "left",
                  }}
                >
                  Email
                </th>

                <th
                  style={{
                    padding: "14px",
                    textAlign: "center",
                  }}
                >
                  Orders
                </th>

                <th
                  style={{
                    padding: "14px",
                    textAlign: "center",
                  }}
                >
                  Total Purchase
                </th>
              </tr>
            </thead>

            <tbody>
              {customers.map((customer) => (
                <tr
                  key={customer.id}
                  style={{
                    borderBottom:
                      "1px solid #e5e7eb",
                  }}
                >
                  <td style={{ padding: "14px" }}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "12px",
                      }}
                    >
                      <div
                        style={{
                          width: "42px",
                          height: "42px",
                          borderRadius: "50%",
                          backgroundColor: "#6366f1",
                          color: "white",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontWeight: "bold",
                        }}
                      >
                        {customer.name?.charAt(0)}
                      </div>

                      <strong>
                        {customer.name}
                      </strong>
                    </div>
                  </td>

                  <td style={{ padding: "14px" }}>
                    {customer.email}
                  </td>

                  <td
                    style={{
                      padding: "14px",
                      textAlign: "center",
                    }}
                  >
                    {customer.orders}
                  </td>

                  <td
                    style={{
                      padding: "14px",
                      textAlign: "center",
                      fontWeight: "600",
                      color: "#059669",
                    }}
                  >
                    ₹{customer.totalSpent}
                  </td>
                </tr>
              ))}

              {customers.length === 0 && (
                <tr>
                  <td
                    colSpan="4"
                    style={{
                      padding: "30px",
                      textAlign: "center",
                      color: "#6b7280",
                    }}
                  >
                    No customers found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Customers;