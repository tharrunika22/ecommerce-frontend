import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

function BuyerLayout() {
  return (
    <>
      <Navbar />

      <div
        style={{
          display: "flex",
          minHeight: "calc(100vh - 70px)",
          backgroundColor: "#f3f4f6",
        }}
      >
        <Sidebar />

        <div
          style={{
            flex: 1,
            padding: "20px",
          }}
        >
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default BuyerLayout;