import { useEffect, useState } from "react";
import axios from "axios";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts"; 
import {
  FiDollarSign,
  FiShoppingCart,
  FiUsers,
  FiPackage,
} from "react-icons/fi";
function VendorDashboard() {
  const [stats, setStats] = useState({
    profit: 0,
    orders: 0,
    customers: 0,
    products: 0,
  }); 
  const [chartData, setChartData] = useState([]); 
  const [orders, setOrders] = useState([]);


  useEffect(() => {
    fetchDashboard();
  }, []); 
  
  const fetchDashboard = async () => {
    try {
      const token = localStorage.getItem("token");

      const ordersRes = await axios.get(
        "http://127.0.0.1:8000/orders/vendor/orders",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const productsRes = await axios.get(
        "http://127.0.0.1:8000/products/vendor/products",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const orders = ordersRes.data; 
      const monthlySales = {};

orders.forEach((order) => {
  const month = new Date(
    order.ordered_at
  ).toLocaleString("default", {
    month: "short",
  });

  monthlySales[month] =
    (monthlySales[month] || 0) +
    order.product_price * order.quantity;
});

const salesData = Object.keys(monthlySales).map(
  (month) => ({
    month,
    sales: monthlySales[month],
  })
);

setChartData(salesData);
      const products = productsRes.data; 
      setOrders(orders);

      const profit = orders.reduce(
        (sum, order) =>
          sum + order.product_price * order.quantity,
        0
      );

      const customers = new Set(
        orders.map((o) => o.user_id)
      ).size;

      setStats({
        profit,
        orders: orders.length,
        customers,
        products: products.length,
      });
    } catch (error) {
      console.error(error);
    }
  };
  return (
  <div className="min-h-screen p-8 bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100">

    {/* Header */}

    <div className="mb-8">
      <h1 className="text-4xl font-extrabold text-slate-800">
        Vendor Dashboard 🚀
      </h1>

      <p className="text-slate-500 mt-2">
        Monitor your store performance and sales insights
      </p>
    </div>

    {/* Stats Cards */}

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">

      {/* Revenue */}

      <div className="relative overflow-hidden rounded-3xl p-6 text-white shadow-2xl bg-gradient-to-br from-emerald-400 via-green-500 to-emerald-700 hover:scale-105 transition-all duration-300">
        <div className="absolute -top-8 -right-8 w-32 h-32 bg-white/10 rounded-full"></div>

        <div className="relative flex justify-between items-center">
          <div>
            <p className="text-white/80 font-medium">
              Revenue
            </p>

            <h2 className="text-4xl font-bold mt-2">
              ₹{stats.profit}
            </h2>
          </div>

          <div className="bg-white/20 backdrop-blur-md p-4 rounded-2xl">
            <FiDollarSign size={34} />
          </div>
        </div>
      </div>

      {/* Orders */}

      <div className="relative overflow-hidden rounded-3xl p-6 text-white shadow-2xl bg-gradient-to-br from-sky-400 via-blue-500 to-indigo-700 hover:scale-105 transition-all duration-300">
        <div className="absolute -top-8 -right-8 w-32 h-32 bg-white/10 rounded-full"></div>

        <div className="relative flex justify-between items-center">
          <div>
            <p className="text-white/80 font-medium">
              Orders
            </p>

            <h2 className="text-4xl font-bold mt-2">
              {stats.orders}
            </h2>
          </div>

          <div className="bg-white/20 backdrop-blur-md p-4 rounded-2xl">
            <FiShoppingCart size={34} />
          </div>
        </div>
      </div>

      {/* Customers */}

      <div className="relative overflow-hidden rounded-3xl p-6 text-white shadow-2xl bg-gradient-to-br from-violet-400 via-purple-500 to-indigo-700 hover:scale-105 transition-all duration-300">
        <div className="absolute -top-8 -right-8 w-32 h-32 bg-white/10 rounded-full"></div>

        <div className="relative flex justify-between items-center">
          <div>
            <p className="text-white/80 font-medium">
              Customers
            </p>

            <h2 className="text-4xl font-bold mt-2">
              {stats.customers}
            </h2>
          </div>

          <div className="bg-white/20 backdrop-blur-md p-4 rounded-2xl">
            <FiUsers size={34} />
          </div>
        </div>
      </div>

      {/* Products */}

      <div className="relative overflow-hidden rounded-3xl p-6 text-white shadow-2xl bg-gradient-to-br from-orange-400 via-amber-500 to-red-600 hover:scale-105 transition-all duration-300">
        <div className="absolute -top-8 -right-8 w-32 h-32 bg-white/10 rounded-full"></div>

        <div className="relative flex justify-between items-center">
          <div>
            <p className="text-white/80 font-medium">
              Products
            </p>

            <h2 className="text-4xl font-bold mt-2">
              {stats.products}
            </h2>
          </div>

          <div className="bg-white/20 backdrop-blur-md p-4 rounded-2xl">
            <FiPackage size={34} />
          </div>
        </div>
      </div>

    </div>

    {/* Analytics */}

    <div className="grid grid-cols-1 xl:grid-cols-4 gap-6 mb-8">

      {/* Chart */}

      <div className="xl:col-span-3 bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl p-6 border border-white">

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-slate-800">
            Revenue Analytics
          </h2>

          <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-medium">
            Live
          </span>
        </div>

        <div style={{ height: "400px" }}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>

              <defs>
                <linearGradient
                  id="salesGradient"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop
                    offset="5%"
                    stopColor="#6366f1"
                    stopOpacity={0.8}
                  />

                  <stop
                    offset="95%"
                    stopColor="#6366f1"
                    stopOpacity={0}
                  />
                </linearGradient>
              </defs>

              <CartesianGrid
                strokeDasharray="3 3"
                opacity={0.2}
              />

              <XAxis dataKey="month" />

              <YAxis />

              <Tooltip />

              <Area
                type="monotone"
                dataKey="sales"
                stroke="#6366f1"
                strokeWidth={4}
                fill="url(#salesGradient)"
              />

            </AreaChart>
          </ResponsiveContainer>
        </div>

      </div>

      {/* Summary */}

      <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl p-6 border border-white">

        <h2 className="text-2xl font-bold text-slate-800 mb-6">
          Sales Summary
        </h2>

        <div className="space-y-4">

          <div className="bg-indigo-50 rounded-2xl p-5">
            <p className="text-gray-500 text-sm">
              Average Order Value
            </p>

            <h3 className="text-3xl font-bold text-indigo-700 mt-2">
              ₹
              {stats.orders
                ? Math.round(stats.profit / stats.orders)
                : 0}
            </h3>
          </div>

          <div className="bg-green-50 rounded-2xl p-5">
            <p className="text-gray-500 text-sm">
              Total Customers
            </p>

            <h3 className="text-3xl font-bold text-green-700 mt-2">
              {stats.customers}
            </h3>
          </div>

          <div className="bg-orange-50 rounded-2xl p-5">
            <p className="text-gray-500 text-sm">
              Products Listed
            </p>

            <h3 className="text-3xl font-bold text-orange-700 mt-2">
              {stats.products}
            </h3>
          </div>

          <div className="bg-emerald-100 rounded-2xl p-5 text-center">
            <span className="bg-emerald-600 text-white px-5 py-2 rounded-full font-medium">
              Store Active
            </span>
          </div>

        </div>

      </div>

    </div>

    {/* Recent Orders */}

    <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl p-6 border border-white">

      <div className="flex justify-between items-center mb-6">

        <h2 className="text-2xl font-bold text-slate-800">
          Recent Orders
        </h2>

        <span className="text-gray-400 text-sm">
          Latest Activity
        </span>

      </div>

      <div className="space-y-4">

        {orders.slice(0, 5).map((order) => (
          <div
            key={order.order_id}
            className="flex justify-between items-center p-5 rounded-2xl border bg-gradient-to-r from-white to-slate-50 hover:shadow-lg transition-all duration-300"
          >

            <div>
              <p className="font-semibold text-slate-800">
                {order.product_name}
              </p>

              <p className="text-sm text-slate-500">
                Quantity: {order.quantity}
              </p>
            </div>

            <div className="text-right">

              <p className="font-bold text-green-600 text-lg">
                ₹
                {order.product_price *
                  order.quantity}
              </p>

              <span className="inline-block mt-2 bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-medium">
                Completed
              </span>

            </div>

          </div>
        ))}

      </div>

    </div> 
    

  </div>
);
}

  export default VendorDashboard;