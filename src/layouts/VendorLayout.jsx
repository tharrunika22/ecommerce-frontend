 import { Outlet } from "react-router-dom";
import VendorSidebar from "../components/VendorSidebar";

function VendorLayout() {
  return (
    <div style={{ display: "flex" }}>
      <VendorSidebar />

      <div
        style={{
          flex: 1,
          padding: "20px",
        }}
      >
        <Outlet />
      </div>
    </div>
  );
}

export default VendorLayout; 