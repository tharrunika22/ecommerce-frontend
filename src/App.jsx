import { BrowserRouter, Routes, Route } from "react-router-dom"; 
import Home from "./pages/Home";
import Login from "./pages/Login"; 
import Dashboard from "./pages/Dashboard"; 
import ProductList from "./components/ProductList";
import Orders from "./pages/Orders"; 
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />  
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />}>
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
            path="profile"
            element={<Profile />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;