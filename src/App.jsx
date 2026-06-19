import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgetPassword";

import ProductList from "./components/ProductList";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Orders from "./pages/Orders";
import Address from "./pages/Address";
import Profile from "./pages/profile";

import OrderSuccess from "./pages/OrderSuccess";
import OrderFailed from "./pages/OrderFailed";

import BuyerLayout from "./layouts/BuyerLayout";

import VendorLayout from "./layouts/VendorLayout";
import VendorDashboard from "./pages/vendor/VendorDashboard";
import Inventory from "./pages/vendor/Inventory";
import Financials from "./pages/vendor/Financials";
import VendorProfile from "./pages/vendor/VendorProfile";
import VendorOrders from "./pages/vendor/VendorOrders"; 
import Customers from "./pages/vendor/Customers";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        
        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/signup"
          element={<Signup />}
        />

        <Route
          path="/forgot-password"
          element={<ForgotPassword />}
        />

        <Route
          path="/order-success"
          element={<OrderSuccess />}
        />

        <Route
          path="/order-failed"
          element={<OrderFailed />}
        />

        {/* Buyer Routes */}
        <Route
          path="/"
          element={<BuyerLayout />}
        >
          <Route
            path="products"
            element={<ProductList />}
          />

          <Route
            path="products/:id"
            element={<ProductDetails />}
          />

          <Route
            path="cart"
            element={<Cart />}
          />

          <Route
            path="orders"
            element={<Orders />}
          />

          <Route
            path="address"
            element={<Address />}
          />

          <Route
            path="profile"
            element={<Profile />}
          />
        </Route>

        {/* Vendor Routes */}
        <Route
          path="/vendor"
          element={<VendorLayout />}
        >
          <Route
            index
            element={<VendorDashboard />}
          />

          <Route
            path="dashboard"
            element={<VendorDashboard />}
          />

          <Route
            path="inventory"
            element={<Inventory />}
          />

          <Route
            path="orders"
            element={<VendorOrders />}
          />

          <Route
            path="financials"
            element={<Financials />}
          /> 
          <Route
  path="customers"
  element={<Customers />}
/>

          <Route
            path="profile"
            element={<VendorProfile />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;