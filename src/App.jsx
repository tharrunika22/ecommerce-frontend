import { BrowserRouter, Routes, Route } from "react-router-dom"; 
import Home from "./pages/Home";
import Login from "./pages/Login"; 
import Dashboard from "./pages/Dashboard"; 
import ProductList from "./components/ProductList";
import Orders from "./pages/Orders"; 
import Signup from "./pages/Signup";
import Profile from "./pages/profile"; 
import Cart from "./pages/Cart"; 
import Address from "./pages/Address"; 
import ForgotPassword from "./pages/ForgetPassword";
import OrderSuccess from "./pages/OrderSuccess";
import OrderFailed from "./pages/OrderFailed";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />  
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/order-success" element={<OrderSuccess />} />
        <Route path="/order-failed" element={<OrderFailed />} />
        <Route path="/dashboard" element={<Dashboard />}> 
          <Route path="cart" element={<Cart />} />  
          <Route path="order-success" element={<OrderSuccess />} />
          <Route path="order-failed" element={<OrderFailed />} />
          <Route
            index
            element={
              <>
                <h1>Dashboard</h1>
                <p>Welcome to ShopSphere</p>
              </>
            }
          />

          <Route
            path="products"
            element={<ProductList />}
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
      </Routes>
    </BrowserRouter>
  );
}

export default App;