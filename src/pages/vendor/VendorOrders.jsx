import { useEffect, useState } from "react";
import axios from "axios";
import {
  FiPackage,
  FiCreditCard,
  FiCalendar,
  FiHash,
  FiShoppingCart,
  FiDollarSign,
} from "react-icons/fi";

function VendorOrders() {
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await axios.get(
          "http://localhost:8000/orders/vendor/orders",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setOrders(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchOrders();
  }, []);

  const filteredOrders = orders.filter((order) =>
    order.product_name
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const totalRevenue = orders.reduce(
    (sum, order) =>
      sum + order.product_price * order.quantity,
    0
  );

  const paidOrders = orders.filter(
    (order) => order.payment_status === "Paid"
  ).length;

  return (
    <div className="p-8 min-h-screen bg-slate-100">

      {/* Header */}

      <div className="mb-8">
        <h1 className="text-4xl font-bold text-slate-800">
          Orders Management
        </h1>

        <p className="text-slate-500 mt-2">
          View and manage customer orders
        </p>
      </div>

      {/* Summary Cards */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-3xl p-6 shadow-lg">
          <div className="flex justify-between items-center">
            <div>
              <p className="opacity-80">
                Total Orders
              </p>

              <h2 className="text-3xl font-bold mt-2">
                {orders.length}
              </h2>
            </div>

            <FiShoppingCart size={40} />
          </div>
        </div>

        <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-3xl p-6 shadow-lg">
          <div className="flex justify-between items-center">
            <div>
              <p className="opacity-80">
                Paid Orders
              </p>

              <h2 className="text-3xl font-bold mt-2">
                {paidOrders}
              </h2>
            </div>

            <FiCreditCard size={40} />
          </div>
        </div>

        <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-3xl p-6 shadow-lg">
          <div className="flex justify-between items-center">
            <div>
              <p className="opacity-80">
                Revenue
              </p>

              <h2 className="text-3xl font-bold mt-2">
                ₹{totalRevenue}
              </h2>
            </div>

            <FiDollarSign size={40} />
          </div>
        </div>

      </div>

      {/* Search */}

      <div className="mb-8">
        <input
          type="text"
          placeholder="Search orders by product name..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          className="
            w-full
            p-4
            rounded-2xl
            border
            border-slate-300
            focus:outline-none
            focus:ring-2
            focus:ring-indigo-500
            bg-white
          "
        />
      </div>

      {/* Orders List */}

      <div className="space-y-5">

        {filteredOrders.length === 0 ? (
          <div className="bg-white p-10 rounded-3xl text-center shadow">
            <p className="text-slate-500">
              No orders found
            </p>
          </div>
        ) : (
          filteredOrders.map((order) => (
            <div
              key={order.order_id}
              className="
                bg-white
                rounded-3xl
                p-6
                shadow-md
                hover:shadow-xl
                transition-all
                duration-300
                border
                border-slate-200
              "
            >

              <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-4">

                {/* Left Side */}

                <div>

                  <h3 className="text-xl font-bold text-slate-800">
                    {order.product_name}
                  </h3>

                  <div className="mt-4 space-y-2">

                    <p className="flex items-center gap-2 text-slate-600">
                      <FiPackage />
                      Quantity: {order.quantity}
                    </p>

                    <p className="flex items-center gap-2 text-slate-600">
                      <FiCreditCard />
                      Amount: ₹
                      {order.product_price *
                        order.quantity}
                    </p>

                    <p className="flex items-center gap-2 text-slate-600">
                      <FiCalendar />
                      {new Date(
                        order.ordered_at
                      ).toLocaleString()}
                    </p>

                    <p className="flex items-center gap-2 text-slate-600 break-all">
                      <FiHash />
                      Order ID:
                      {" "}
                      {order.razorpay_order_id}
                    </p>

                    {order.razorpay_payment_id && (
                      <p className="flex items-center gap-2 text-slate-600 break-all">
                        <FiHash />
                        Payment ID:
                        {" "}
                        {order.razorpay_payment_id}
                      </p>
                    )}

                  </div>

                </div>

                {/* Right Side */}

                <div className="flex flex-col items-start lg:items-end gap-3">

                  <span
                    className={`px-4 py-2 rounded-full text-sm font-medium ${
                      order.payment_status ===
                      "Paid"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {order.payment_status}
                  </span>

                  <div className="text-right">
                    <p className="text-slate-400 text-sm">
                      Total Amount
                    </p>

                    <p className="text-2xl font-bold text-green-600">
                      ₹
                      {order.product_price *
                        order.quantity}
                    </p>
                  </div>

                </div>

              </div>

            </div>
          ))
        )}

      </div>

    </div>
  );
}

export default VendorOrders;